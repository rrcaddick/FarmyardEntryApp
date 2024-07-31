package com.farmyardentryapp

import android.content.pm.PackageManager
import android.os.Build
import android.os.Bundle
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import android.content.Intent

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.facebook.react.bridge.LifecycleEventListener
import com.facebook.react.ReactInstanceManager
import com.facebook.react.ReactNativeHost
import com.facebook.react.bridge.ReactContext


import com.yoco.payments.sdk.YocoSDK
import com.farmyardentryapp.MainApplication
import android.util.Log

class MainActivity : ReactActivity() {
    private val PERMISSION_REQUEST_CODE = 123

    override fun getMainComponentName(): String = "FarmyardEntryApp"

    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

    override fun onCreate(savedInstanceState: Bundle?) {
        Log.d("AddPayModule", "Starting main activity")
        Log.d("ReactNative", "Starting main activity")
        super.onCreate(savedInstanceState)
    }
}