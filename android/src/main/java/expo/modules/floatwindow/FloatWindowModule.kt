package expo.modules.floatwindow

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
// import android.widget.Toast
import android.provider.Settings
import android.content.Intent
import android.net.Uri
import android.os.Build
import androidx.annotation.RequiresApi

class FloatWindowModule : Module() {
  companion object {
    const val REQUEST_WINDOW_OVERLAY = 1
  }
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  @RequiresApi(Build.VERSION_CODES.M)
  override fun definition() = ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('FloatWindow')` in JavaScript.
    Name("FloatWindow")

    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    Function("isFloatwindowOpen") {
      true
    }

    // Defines a JavaScript function that always returns a Promise and whose native code
    // is by default dispatched on the different thread than the JavaScript runtime runs on.
    AsyncFunction("openFloatwindow") {
      val reactContext = appContext.reactContext;
      val currentActivity = appContext.activityProvider?.currentActivity

      if (!Settings.canDrawOverlays(reactContext)) {
        // Toast.makeText(reactContext, "当前无权限，请授权", Toast.LENGTH_SHORT).show();
        currentActivity?.startActivityForResult(
          Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION, Uri.parse("package:" + reactContext?.packageName)),
          REQUEST_WINDOW_OVERLAY
        );
      } else {
          reactContext?.startService(Intent(reactContext, FloatingWidgetShowService::class.java))
      }
    }
  }
}
