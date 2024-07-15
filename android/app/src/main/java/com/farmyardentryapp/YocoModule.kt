package com.farmyardentryapp

import android.app.Activity
import android.content.Intent
import android.util.Log
import androidx.activity.result.ActivityResultLauncher
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import com.facebook.react.bridge.LifecycleEventListener
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.yoco.payments.sdk.YocoSDK

class YocoModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private var pairingResult: ActivityResultLauncher<Intent>? = null

    init {
        reactContext.addLifecycleEventListener(object : LifecycleEventListener {
            override fun onHostResume() {
                pairingResult = (reactContext.currentActivity as? AppCompatActivity)?.activityResultRegistry?.register(
                    "StartYocoActivity",
                    ActivityResultContracts.StartActivityForResult()
                ) { result ->
                    if (result.resultCode == Activity.RESULT_OK) {
                        Log.d("YocoModule", "Pairing successful")
                    } else {
                        Log.d("YocoModule", "Pairing failed or cancelled")
                    }
                }
            }

            override fun onHostPause() {}
            override fun onHostDestroy() {}
        })
    }

    @ReactMethod
    fun pairTerminal(promise: Promise) {
        try {
            val intent = Intent(reactContext, YocoSDK::class.java)
            if (pairingResult == null) {
                Log.e("YocoModule", "Activity result launcher is not initialized.")
                promise.reject("E_ACTIVITY_LAUNCHER_UNAVAILABLE", "The activity result launcher is not initialized.")
                return
            }
            pairingResult?.launch(intent)
            Log.d("YocoModule", "Intent for pairing terminal launched.")
        } catch (e: Exception) {
            Log.e("YocoModule", "Failed to launch pairing intent: ${e.message}")
            promise.reject(e.message)
        }
    }

    override fun getName(): String {
        return "YocoModule"
    }
}
