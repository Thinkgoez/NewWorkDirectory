
package com.facebook.react;

import android.app.Application;
import android.content.Context;
import android.content.res.Resources;

import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainPackageConfig;
import com.facebook.react.shell.MainReactPackage;
import java.util.Arrays;
import java.util.ArrayList;

// @react-native-async-storage/async-storage
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
// @react-native-community/cameraroll
import com.reactnativecommunity.cameraroll.CameraRollPackage;
// @react-native-community/masked-view
import org.reactnative.maskedview.RNCMaskedViewPackage;
// react-native-bootsplash
import com.zoontek.rnbootsplash.RNBootSplashPackage;
// react-native-camera
import org.reactnative.camera.RNCameraPackage;
// react-native-exception-handler
import com.masteratul.exceptionhandler.ReactNativeExceptionHandlerPackage;
// react-native-fingerprint-scanner
import com.hieuvp.fingerprint.ReactNativeFingerprintScannerPackage;
// react-native-fs
import com.rnfs.RNFSPackage;
// react-native-geolocation-service
import com.agontuk.RNFusedLocation.RNFusedLocationPackage;
// react-native-gesture-handler
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
// react-native-maps
import com.airbnb.android.react.maps.MapsPackage;
// react-native-pager-view
import com.reactnativepagerview.PagerViewPackage;
// react-native-permissions
import com.zoontek.rnpermissions.RNPermissionsPackage;
// react-native-photoeditorsdk
import ly.img.react_native.pesdk.RNPhotoEditorSDKPackage;
// react-native-reanimated
import com.swmansion.reanimated.ReanimatedPackage;
// react-native-safe-area-context
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
// react-native-screens
import com.swmansion.rnscreens.RNScreensPackage;
// react-native-svg
import com.horcrux.svg.SvgPackage;
// react-native-webview
import com.reactnativecommunity.webview.RNCWebViewPackage;
// rn-fetch-blob
import com.RNFetchBlob.RNFetchBlobPackage;

public class PackageList {
  private Application application;
  private ReactNativeHost reactNativeHost;
  private MainPackageConfig mConfig;

  public PackageList(ReactNativeHost reactNativeHost) {
    this(reactNativeHost, null);
  }

  public PackageList(Application application) {
    this(application, null);
  }

  public PackageList(ReactNativeHost reactNativeHost, MainPackageConfig config) {
    this.reactNativeHost = reactNativeHost;
    mConfig = config;
  }

  public PackageList(Application application, MainPackageConfig config) {
    this.reactNativeHost = null;
    this.application = application;
    mConfig = config;
  }

  private ReactNativeHost getReactNativeHost() {
    return this.reactNativeHost;
  }

  private Resources getResources() {
    return this.getApplication().getResources();
  }

  private Application getApplication() {
    if (this.reactNativeHost == null) return this.application;
    return this.reactNativeHost.getApplication();
  }

  private Context getApplicationContext() {
    return this.getApplication().getApplicationContext();
  }

  public ArrayList<ReactPackage> getPackages() {
    return new ArrayList<>(Arrays.<ReactPackage>asList(
      new MainReactPackage(mConfig),
      new AsyncStoragePackage(),
      new CameraRollPackage(),
      new RNCMaskedViewPackage(),
      new RNBootSplashPackage(),
      new RNCameraPackage(),
      new ReactNativeExceptionHandlerPackage(),
      new ReactNativeFingerprintScannerPackage(),
      new RNFSPackage(),
      new RNFusedLocationPackage(),
      new RNGestureHandlerPackage(),
      new MapsPackage(),
      new PagerViewPackage(),
      new RNPermissionsPackage(),
      new RNPhotoEditorSDKPackage(),
      new ReanimatedPackage(),
      new SafeAreaContextPackage(),
      new RNScreensPackage(),
      new SvgPackage(),
      new RNCWebViewPackage(),
      new RNFetchBlobPackage()
    ));
  }
}
