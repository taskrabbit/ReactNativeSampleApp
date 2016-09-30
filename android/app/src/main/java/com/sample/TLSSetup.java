package com.sample;

import android.util.Log;
import com.facebook.react.modules.network.OkHttpClientProvider;
import com.facebook.react.modules.network.ReactCookieJarContainer;
import okhttp3.ConnectionSpec;
import okhttp3.OkHttpClient;
import okhttp3.TlsVersion;

import javax.net.ssl.*;
import java.util.Arrays;
import java.util.concurrent.TimeUnit;

public class TLSSetup {

    static String TAG = "TLSSetup";

    public static void configure(){
        try {
            SSLContext sc = SSLContext.getInstance("TLSv1.1");
            sc.init(null, null, null);
            ConnectionSpec cs = new ConnectionSpec.Builder(ConnectionSpec.MODERN_TLS)
                    .tlsVersions(TlsVersion.TLS_1_2, TlsVersion.TLS_1_1)
                    .build();
            // Taken from OkHttpClientProvider.java
            // Set no timeout by default
            OkHttpClient sClient = new OkHttpClient.Builder()
                    .connectTimeout(0, TimeUnit.MILLISECONDS)
                    .readTimeout(0, TimeUnit.MILLISECONDS)
                    .writeTimeout(0, TimeUnit.MILLISECONDS)
                    .cookieJar(new ReactCookieJarContainer())
                    // set sslSocketFactory
                    .sslSocketFactory(new TLSSocketFactory(sc.getSocketFactory()))
                    // set connectionSpecs
                    .connectionSpecs(Arrays.asList(cs, ConnectionSpec.COMPATIBLE_TLS, ConnectionSpec.CLEARTEXT))
                    .build();

            OkHttpClientProvider.replaceOkHttpClient(sClient);
        } catch (Exception e) {
            Log.e(TAG, e.getMessage());
        }
    }

}
