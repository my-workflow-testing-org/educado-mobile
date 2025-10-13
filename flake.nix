{
  description = "Android emulation environment for Educado Mobile";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    nixpkgs-node18.url = "github:NixOS/nixpkgs/c5dd43934613ae0f8ff37c59f61c507c2e8f980d";
  };

  outputs = { self, nixpkgs, nixpkgs-node18 }:
    let
      supportedSystems = [ "aarch64-darwin" "x86_64-darwin" "x86_64-linux" "aarch64-linux" ];
      forAllSystems = nixpkgs.lib.genAttrs supportedSystems;
      
      # Map system architecture to Android ABI
      systemToAbi = system: 
        if nixpkgs.lib.hasInfix "x86_64" system then "x86_64"
        else if nixpkgs.lib.hasInfix "aarch64" system then "arm64-v8a"
        else throw "Unsupported system architecture: ${system}";
      
      # Centralized Android configuration
      androidConfig = system: {
        platformVersion = "34";
        buildToolsVersions = [ "34.0.0" "33.0.1" ];
        abi = systemToAbi system;
        systemImageType = "google_apis_playstore";
        ndkVersion = "25.1.8937393";
        cmakeVersion = "3.22.1";
      };
      
      pkgsWithUnfree = system: (import nixpkgs {
        system = system;
        config.allowUnfree = true;
        config.android_sdk.accept_license = true;
      }).extend (self: super: {
        nodejs_18 = nixpkgs-node18.legacyPackages.${system}.nodejs_18;
      });
    in
    {
      packages = forAllSystems (system:
        let
          pkgs = pkgsWithUnfree system;
          config = androidConfig system;
          
          # SDK composition for dev tools (adb, build-tools, platform-tools, NDK, CMake)
          androidComposition = pkgs.androidenv.composeAndroidPackages {
            platformVersions = [ config.platformVersion ];
            buildToolsVersions = config.buildToolsVersions;
            includeNDK = true;
            ndkVersions = [ config.ndkVersion ];
            cmakeVersions = [ config.cmakeVersion ];
          };
          
          # Emulator with its own SDK including system images
          androidEmulatorPkg = pkgs.androidenv.emulateApp {
            name = "educado-android-emulator";
            platformVersion = config.platformVersion;
            abiVersion = config.abi;
            systemImageType = config.systemImageType;
          };
        in {
          android-emulator = androidEmulatorPkg;
          android-sdk = androidComposition.androidsdk;

          start-emulator = pkgs.writeShellScriptBin "start-emulator" ''
            set -euo pipefail
            
            # Check if emulator is already running
            if adb devices 2>/dev/null | grep -q emulator; then
              echo "⚠️  Emulator already running"
              exit 0
            fi
            
            LOG_FILE="''${XDG_CACHE_HOME:-$HOME/.cache}/educado-emulator.log"
            mkdir -p "$(dirname "$LOG_FILE")"
            
            # Unset ANDROID_HOME/SDK_ROOT so emulator uses its own bundled SDK
            # Run in background and capture PID before subshell exits
            (
              unset ANDROID_HOME
              unset ANDROID_SDK_ROOT
              exec ${androidEmulatorPkg}/bin/run-test-emulator > "$LOG_FILE" 2>&1
            ) &
            EMULATOR_PID=$!
            
            echo "🚀 Emulator starting (PID: $EMULATOR_PID, ABI: ${config.abi})..."
            echo "📋 Check status: adb devices"
            echo "📄 View logs: tail -f $LOG_FILE"
            
            # Wait briefly to check if it crashes immediately
            sleep 2
            if ! kill -0 $EMULATOR_PID 2>/dev/null; then
              echo "❌ Emulator failed to start. Check logs: $LOG_FILE"
              exit 1
            fi
          '';
          
          stop-emulator = pkgs.writeShellScriptBin "stop-emulator" ''
            if adb emu kill 2>/dev/null; then
              echo "🛑 Emulator stopped via ADB"
            elif pkill -9 qemu-system 2>/dev/null; then
              echo "🛑 Emulator force-killed"
            else
              echo "ℹ️  No emulator running"
            fi
          '';
          
          emulator-status = pkgs.writeShellScriptBin "emulator-status" ''
            echo "📱 Connected devices:"
            adb devices -l 2>/dev/null || echo "  None (is ADB running?)"
            echo ""
            echo "🏗️  System ABI: ${config.abi}"
          '';
        });

      devShells = forAllSystems (system:
        let
          pkgs = pkgsWithUnfree system;
          config = androidConfig system;
          androidSdk = self.packages.${system}.android-sdk;
        in {
          default = pkgs.mkShell {
            buildInputs = with self.packages.${system}; [
              start-emulator
              stop-emulator
              emulator-status
            ] ++ (with pkgs; [
              nodejs_18
              jdk17
              watchman
            ]);
            
            shellHook = ''
              echo "🚀 Educado Mobile Development Environment"
              echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
              echo "📦 Node.js: $(node --version)"
              echo "☕ Java: $(java -version 2>&1 | head -n 1)"
              echo "🏗️  Android ABI: ${config.abi}"
              echo ""
              
              # Use the composed Android SDK for dev tools
              export ANDROID_HOME="${androidSdk}/libexec/android-sdk"
              export ANDROID_SDK_ROOT="$ANDROID_HOME"
              
              # Force Gradle to use JDK 17
              export JAVA_HOME="${pkgs.jdk17}"
              
              # Prepend to PATH - use the latest build tools version
              export PATH="$ANDROID_HOME/platform-tools:$ANDROID_HOME/build-tools/34.0.0:$ANDROID_HOME/ndk/${config.ndkVersion}:$ANDROID_HOME/cmake/${config.cmakeVersion}/bin:$PATH"
              
              # React Native optimizations
              export REACT_NATIVE_PACKAGER_HOSTNAME="127.0.0.1"
              
              echo "🔧 Android SDK: $ANDROID_HOME"
              echo "🔧 Java Home: $JAVA_HOME"
              echo "🔧 ADB: $(which adb)"
              echo "🔧 NDK: ${config.ndkVersion}"
              echo "🔧 CMake: ${config.cmakeVersion}"
              echo "🔧 Build Tools: 34.0.0, 33.0.1"
              echo ""
              echo "📱 Commands:"
              echo "  start-emulator    - Start Android emulator"
              echo "  stop-emulator     - Stop Android emulator"
              echo "  emulator-status   - Check connected devices"
              echo "  npm start         - Start Metro bundler"
              echo "  npm run android   - Build and run on Android"
            '';
          };
        });
    };
}