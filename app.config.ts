export default {
  expo: {
    name: "Educado",
    slug: "educado-mobile",
    scheme: "educado-mobile",
    version: "2.1.5",
    owner: "edutest",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    splash: {
      image: "./assets/images/icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.blackchakers.eml",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/icon.png",
        backgroundColor: "#FFFFFF",
      },
      package: "com.blackchakers.eml",
      versionCode: 8,
    },
    web: {
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      [
        "expo-build-properties",
        {
          android: {
            compileSdkVersion: 35,
            targetSdkVersion: 35,
            buildToolsVersion: "35.0.0",
          },
        },
      ],
      [
        "expo-dev-client",
        {
          launchMode: "most-recent",
        },
      ],
      "expo-router",
      [
        "expo-localization",
        {
          supportedLocales: {
            android: ["en-rUS", "pt-rBR"],
          },
        },
      ],
      ["expo-video"],
      ["expo-audio"],
    ],
    extra: {
      JWT_SECRET: "test",
      eas: {
        projectId: "43a799e8-ffa3-41d8-b925-a0770fbb14b5",
      },
    },
    experiments: {
      typedRoutes: true,
    },
  },
};
