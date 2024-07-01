{pkgs}: let
  android = {
    platformVersion = "34";
    buildToolsVersion = "34.0.0";
    ndkVersions = ["26.1.10909125"];
    abiVersion = "x86_64";
    systemImageType = "google_apis";
  };

  sdkArgs = {
    platformVersions = [android.platformVersion];
    abiVersions = [android.abiVersion];
    systemImageTypes = [android.systemImageType];
    buildToolsVersions = [android.buildToolsVersion];
    cmakeVersions = ["3.22.1"];

    includeNDK = true;
    inherit (android) ndkVersions;

    includeEmulator = true;
    includeSystemImages = true;
  };

  androidEmulator = pkgs.androidenv.emulateApp {
    name = "emulator";
    inherit (android) systemImageType abiVersion platformVersion;
  };

  androidComposition = pkgs.androidenv.composeAndroidPackages sdkArgs;
  androidSdk = androidComposition.androidsdk;
  platformTools = androidComposition.platform-tools;
in {
  inherit platformTools androidSdk androidEmulator;
  aapt2Path = "${androidSdk}/libexec/android-sdk/build-tools/${android.buildToolsVersion}/aapt2";
  scripts = {
    build.debug = {};
    build.release = {};
  };
}
