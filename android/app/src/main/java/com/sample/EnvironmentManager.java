package com.sample;

import android.app.Activity;
import android.content.Context;
import android.content.SharedPreferences;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;
import com.facebook.react.bridge.*;
import com.sample.utils.LocaleUtils;
import com.sample.utils.LocaleUtils;

import javax.annotation.Nullable;
import java.util.UUID;

public class EnvironmentManager extends ReactContextBaseJavaModule {
    static final String UUID_PARAM_NAME = "uuid";

    private static final String PREFS_DEBUG_SERVER_HOST_KEY = "debug_http_host";
    private static final String EMULATOR_LOCALHOST   = "10.0.2.2";
    private static final String GENYMOTION_LOCALHOST = "10.0.3.2";
    private static final String DEVICE_LOCALHOST     = "localhost";

    private Context mApplication;
    private Activity mActivity;

    public EnvironmentManager(ReactApplicationContext reactContext) {
        super(reactContext);
        mApplication = getReactApplicationContext().getApplicationContext();
    }

    @Override
    public String getName() {
        return "EnvironmentManager";
    }

    @ReactMethod
    public void get(Callback callback) {
        WritableMap environment = Arguments.createMap();

        PackageInfo packageInfo = null;
        try {
            packageInfo = mApplication.getPackageManager().getPackageInfo(mApplication.getPackageName(), 0);
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
        }

        environment.putString("name", "debug");
        //environment.putString("name", BuildConfig.ENVIRONMENT);
        environment.putBoolean("simulator", Build.FINGERPRINT.startsWith("generic"));
        environment.putString("buildCode",  String.valueOf(packageInfo.versionCode));
        environment.putString("version", String.valueOf(packageInfo.versionName));
        environment.putString("uuid", getUuid());
        environment.putString("locale", LocaleUtils.getDefaultLocaleForServer());
        environment.putString("packageName", mApplication.getPackageName());
        environment.putInt("clientApplicationId", 95);
        environment.putString("osVersion", "Android " + android.os.Build.VERSION.RELEASE);
        environment.putString("phoneVersion", getPhoneVersion());
        environment.putString("apiKey", "ecd3641df005e2a911ca78ce6d56064212esdere");
        environment.putString("remoteAPIHost", getRemoteApiHostWithPort());

        callback.invoke(environment);
    }

    private boolean isRunningOnGenymotion() {
        return Build.FINGERPRINT.contains("vbox");
    }

    private boolean isRunningOnStockEmulator() {
        return Build.FINGERPRINT.contains("generic");
    }

    private String getRemoteApiHostWithPort() {
        return getRemoteAPIHost() + ":" + getPortNumber();
    }

    private String getRemoteAPIHost() {
        if ("debug".equals("remote")) {
        //if (BuildConfig.ENVIRONMENT.equals("remote")) {
            return getLocalIpAddress();
        } else if (isRunningOnGenymotion()) {
            return GENYMOTION_LOCALHOST;
        } else if (isRunningOnStockEmulator()) {
            return EMULATOR_LOCALHOST;
        } else {
            if (getLocalIpAddress() != null && !getLocalIpAddress().isEmpty()) {
                return getLocalIpAddress();
            }
            return DEVICE_LOCALHOST;
        }
    }

    private @Nullable String getLocalIpAddress() {
        Bundle extras = getCurrentActivity().getIntent().getExtras();
        if (extras != null) {
            String localIpAddress = extras.getString("LOCAL_IP_ADDRESS");
            if (localIpAddress!= null) {
                return localIpAddress;
            }
        }
        return null;
    }

    private String getPortNumber() {
        Bundle extras = getCurrentActivity().getIntent().getExtras();
        if (extras != null) {
            String portNumber = extras.getString("PORT_NUMBER");
            if (portNumber != null) {
                return portNumber;
            }
        }

        return "3001";
    }

    private String getUuid() {
        SharedPreferences prefs = mApplication.getSharedPreferences(
                SampleConstants.APP_PREFS_NAME, Context.MODE_PRIVATE);
        String uuid = prefs.getString(UUID_PARAM_NAME, null);

        if (uuid == null) {
            String androidId = Settings.Secure.getString(mApplication.getContentResolver(), Settings.Secure.ANDROID_ID);
            uuid = androidId != null ? androidId : UUID.randomUUID().toString();
            uuid = "Sample_" + uuid;
            SharedPreferences.Editor editor = prefs.edit();
            editor.putString(UUID_PARAM_NAME, uuid);
            editor.apply();
        }

        return uuid;
    }

    private String getPhoneVersion() {
        String manufacturer = android.os.Build.MANUFACTURER;
        String model = android.os.Build.MODEL;
        if (model.startsWith(manufacturer)) {
            return capitalize(model);
        } else {
            return capitalize(manufacturer) + " " + model;
        }
    }

    private static String capitalize(String str) {
        if (str == null || str.length() == 0) {
            return "";
        }
        char[] arr = str.toCharArray();
        boolean capitalizeNext = true;
        String phrase = "";
        for (char c : arr) {
            if (capitalizeNext && Character.isLetter(c)) {
                phrase += Character.toUpperCase(c);
                capitalizeNext = false;
                continue;
            } else if (Character.isWhitespace(c)) {
                capitalizeNext = true;
            }
            phrase += c;
        }
        return phrase;
    }

}
