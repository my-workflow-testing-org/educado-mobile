{
  description = "Android emulation environment for Educado Mobile";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    nixpkgs-node18.url = "github:NixOS/nixpkgs/c5dd43934613ae0f8ff37c59f61c507c2e8f980d";
  };

  outputs = { self, nixpkgs, nixpkgs-node18 }:
    let
      supportedSystems = [ "aarch64-darwin" "x86_64-darwin" ]; # Add Intel Mac support
      forAllSystems = nixpkgs.lib.genAttrs supportedSystems;
      
      pkgsWithUnfree = system: (import nixpkgs {
        system = system;
        config.allowUnfree = true;
        config.android_sdk.accept_license = true;
      }).extend (self: super: {
        nodejs_18 = nixpkgs-node18.legacyPackages.${system}.nodejs_18;
      });
      
      # Extract common Android config to reduce duplication
      androidPlatformVersion = "34";
      androidBuildToolsVersion = "34.0.0";
      androidAbi = "arm64-v8a";
      androidSystemImageType = "google_apis_playstore";
    in
    {
      packages = forAllSystems (system:
        let
          pkgs = pkgsWithUnfree system;
          
          # Create the Android SDK separately
          androidComposition = pkgs.androidenv.composeAndroidPackages {
            platformVersions = [ androidPlatformVersion ];
            buildToolsVersions = [ androidBuildToolsVersion ];
            includeEmulator = true;
            includeSystemImages = true;
            systemImageTypes = [ androidSystemImageType ];
            abiVersions = [ androidAbi ];
          };
          
          androidEmulatorPkg = pkgs.androidenv.emulateApp {
            name = "educado-android-emulator"; # More descriptive name
            platformVersion = androidPlatformVersion;
            abiVersion = androidAbi;
            systemImageType = androidSystemImageType;
          };
        in {
          android-emulator = androidEmulatorPkg;
          android-sdk = androidComposition.androidsdk;

          start-emulator = pkgs.writeShellScriptBin "start-emulator" ''
            ${androidEmulatorPkg}/bin/run-test-emulator > /tmp/emulator.log 2>&1 &
            echo "🚀 Emulator starting in background..."
            echo "📋 Check status: adb devices"
            echo "📄 View logs: tail -f /tmp/emulator.log"
          '';
          
          # Add a stop-emulator command for convenience
          stop-emulator = pkgs.writeShellScriptBin "stop-emulator" ''
            adb emu kill 2>/dev/null || pkill -9 qemu-system 2>/dev/null || echo "No emulator running"
            echo "🛑 Emulator stopped"
          '';
        });

      devShells = forAllSystems (system:
        let
          pkgs = pkgsWithUnfree system;
          androidSdk = self.packages.${system}.android-sdk;
        in {
          default = pkgs.mkShell {
            buildInputs = [
              self.packages.${system}.start-emulator
              self.packages.${system}.stop-emulator
              pkgs.nodejs_18
              pkgs.jdk17
              androidSdk
              # Add helpful tools
              pkgs.watchman # React Native file watching
            ];
            
            shellHook = ''
              echo "🚀 Educado Mobile Development Environment"
              echo "📦 Node.js: $(node --version)"
              echo "☕ Java: $(java -version 2>&1 | head -n 1)"
              echo ""
              
              # Use the composed Android SDK
              export ANDROID_HOME="${androidSdk}/libexec/android-sdk"
              export ANDROID_SDK_ROOT="$ANDROID_HOME"
              
              # Prepend to PATH (cleaner than multiple appends)
              export PATH="$ANDROID_HOME/emulator:$ANDROID_HOME/platform-tools:$ANDROID_HOME/build-tools/${androidBuildToolsVersion}:$PATH"
              
              echo "🔧 Android SDK: $ANDROID_HOME"
              echo "🔧 ADB: $(which adb)"
              echo ""
              echo "📱 Commands:"
              echo "  start-emulator  - Start Android emulator"
              echo "  stop-emulator   - Stop Android emulator"
              echo "  npm start       - Start Metro bundler"
              echo "  npm run android - Build and run on Android"
            '';
          };
        });
    };
}