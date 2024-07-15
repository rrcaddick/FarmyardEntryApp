package com.farmyardentryapp

import android.content.Intent
import androidx.activity.ComponentActivity

import android.util.Log
import android.os.Build
import android.os.Bundle
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import android.content.pm.PackageManager

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {
  companion object {
      private const val PERMISSION_REQUEST_CODE = 100
  } 

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    requestYocoPermissions()
  }

  private fun requestYocoPermissions() {
    val permissions = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
        arrayOf(
            android.Manifest.permission.ACCESS_COARSE_LOCATION,
            android.Manifest.permission.ACCESS_FINE_LOCATION,
            android.Manifest.permission.ACCESS_NETWORK_STATE,
            android.Manifest.permission.BLUETOOTH_SCAN,
            android.Manifest.permission.BLUETOOTH_CONNECT
        )
    } else {
        arrayOf(
            android.Manifest.permission.ACCESS_COARSE_LOCATION,
            android.Manifest.permission.ACCESS_FINE_LOCATION,
            android.Manifest.permission.ACCESS_NETWORK_STATE
        )
    }

    ActivityCompat.requestPermissions(this, permissions, PERMISSION_REQUEST_CODE)
  }
    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */
    override fun getMainComponentName(): String = "FarmyardEntryApp"

    /**
     * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
     * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
     */
    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

    

    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>, grantResults: IntArray) {
          super.onRequestPermissionsResult(requestCode, permissions, grantResults)
      
          // Dispatch the result to the ActivityResultRegistry
          // This ensures that any ActivityResultLauncher listening for this request code receives the result
          activityResultRegistry.dispatchResult(requestCode, grantResults.isNotEmpty() && grantResults.all { it == PackageManager.PERMISSION_GRANTED })
      
          when (requestCode) {
              PERMISSION_REQUEST_CODE -> {
                  if (grantResults.isNotEmpty() && grantResults.all { it == PackageManager.PERMISSION_GRANTED }) {
                      // All permissions granted, initialize SDK
                      (application as MainApplication).initialiseSdk()
                  } else {
                      // Handle the case where permissions are not granted
                      Log.e("MainActivity", "Not all permissions were granted")
                  }
              }
              // Include other cases if there are other request codes
          }
    }
      
}