{
  description = "OkBrain organizer app.";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils/main";
  };

  outputs = {
    self,
    nixpkgs,
    flake-utils,
  }:
    flake-utils.lib.eachDefaultSystem (
      system: let
        pkgs = import nixpkgs {
          inherit system;
          config = {
            allowUnfree = true;
            android_sdk.accept_license = true;
          };
        };

        android = import ./nix/android.nix {inherit pkgs;};
      in {
        devShells.default = pkgs.mkShell {
          name = "ok-brain";

          buildInputs = with pkgs; [
            nodejs_22

            # Android
            jdk17
            android.androidEmulator
            android.platformTools
            android.androidSdk
          ];

          # Android
          JAVA_HOME = pkgs.jdk17.home;
          ANDROID_HOME = "${android.androidSdk}/libexec/android-sdk";
          NDK_HOME = "${android.androidSdk}/libexec/android-sdk/ndk-bundle";
          GRADLE_OPTS = "-Dorg.gradle.project.android.aapt2FromMavenOverride=${android.aapt2Path}";

          # Android emulator
          NIX_ANDROID_EMULATOR_FLAGS = "-gpu auto";
        };
      }
    );
}
