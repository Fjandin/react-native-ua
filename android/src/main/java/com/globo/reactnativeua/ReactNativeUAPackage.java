package com.globo.reactnativeua;

import android.app.Application;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.globo.reactnativeua.ReactNativeUA;
import com.globo.reactnativeua.ReactNativeUAEventEmitter;


public class ReactNativeUAPackage implements ReactPackage {

    private Application mainApplication;

    public ReactNativeUAPackage(Application application) {
        mainApplication = application;
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Arrays.asList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Arrays.asList();
    }

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();

        ReactNativeUAEventEmitter.setup(reactContext);

        modules.add(new ReactNativeUA(reactContext, mainApplication));

        return modules;
    }

}
