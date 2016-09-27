package com.sample.utils;

import java.util.Locale;

/**
 * TaskRabbit created on 5/12/14.
 */
public class LocaleUtils {

    public static Locale getDefault() {
        if (null == Locale.getDefault()) { return Locale.US; }
        return Locale.getDefault();
    }

    public static String getServerLocale(Locale locale) {
        if (null != locale) {
            return locale.toString().replace("_", "-");
        } else {
            return "";
        }
    }

    public static String getDefaultLocaleForServer() {
        Locale locale = getDefault();
        return getServerLocale(locale);
    }


}
