package com.loopzero.debug;

/**
 * Alias of our real MainActivity, for rn-cli's sake.
 *
 * This helps work around an issue in `react-native run-android` where it
 * doesn't notice that the APK it built has app ID `com.loopzero.debug`,
 * and tries to start app `com.loopzero` instead.
 *
 * See AndroidManifest.xml for more context.
 **/
public class MainActivity extends com.loopzero.MainActivity {

}
