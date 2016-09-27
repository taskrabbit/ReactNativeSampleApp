package com.sample;

import android.content.SharedPreferences;
import android.os.Build;
import android.preference.PreferenceManager;
import com.facebook.react.bridge.*;
import com.facebook.react.devsupport.DevSupportManager;

import javax.annotation.Nullable;

import java.lang.reflect.Field;

public class TestRunnerManager extends ReactContextBaseJavaModule {
    private @Nullable DevSupportManager mDevSupportManager;
    private @Nullable SharedPreferences mPreferences;
    private @Nullable ReactApplicationContext mReactContext;

    public TestRunnerManager (ReactApplicationContext reactContext) {
        super(reactContext);

        mReactContext = reactContext;

        setDevSupportManager();
    }

    private void setDevSupportManager() {
        try {
            Field field = ReactContext.class.getDeclaredField("mNativeModuleCallExceptionHandler");
            field.setAccessible(true);
            mDevSupportManager = (DevSupportManager) field.get(mReactContext);
        } catch (NoSuchFieldException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        }
    }

    @Override
    public String getName() {
        return "TestRunnerManager";
    }

    @ReactMethod
    public void reset(Callback callback) {
        if (mDevSupportManager != null) {
            UiThreadUtil.runOnUiThread(
                    new Runnable() {
                        @Override
                        public void run() {
                            mDevSupportManager.handleReloadJS();
                        }
                    }
            );
        }
    }
}
