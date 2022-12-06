package mx.migob.micuentadigital;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.google.gson.Gson;

import android.app.Activity;
import android.content.Intent;
import android.view.Gravity;

import androidx.annotation.NonNull;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Iterator;

import javax.annotation.Nullable;

import mx.com.netpay.sdk.IPage;
import mx.com.netpay.sdk.SmartApi;
import mx.com.netpay.sdk.SmartApiFactory;

import mx.com.netpay.sdk.models.*;

public class RNNetPayModule extends ReactContextBaseJavaModule {
    private SmartApi smartApi;
    private Promise mPromise;
    private final ReactApplicationContext reactContext;
    
    public void sendResponse(Object response){
        if (mPromise == null){
            return;
        }
        try {
            final Gson gson = new Gson();
            final String responseStr = gson.toJson(response);
            WritableMap returnMap = this.convertJsonToMap(new JSONObject(responseStr));
            mPromise.resolve(returnMap);
        } catch (JSONException e) {
            mPromise.reject("Parse Error", e.getMessage());
        }
    }

    public RNNetPayModule (ReactApplicationContext context){
        super(context);
        this.reactContext = context;
        ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {

            @Override
            public void onActivityResult(Activity activity, int requestCode, int resultCode, @Nullable Intent intent) {
                if (intent != null) {
                    BaseResponse response = null;
                    switch (requestCode) {
                        case Constants.SALE_REQUEST:
                            response = (SaleResponse) smartApi.onResult(requestCode, resultCode, intent);
                            break;

                        case Constants.CANCEL_REQUEST:
                            response = (CancelResponse) smartApi.onResult(requestCode, resultCode, intent);
                            break;

                        case Constants.REPRINT_REQUEST:
                            response = (ReprintResponse) smartApi.onResult(requestCode, resultCode, intent);

                            break;

                        case Constants.PRINT_REQUEST:
                            response = (PrintResponse) smartApi.onResult(requestCode, resultCode, intent);
                            break;
                    }

                    sendResponse(response);
                }
                mPromise = null;
            }
        };
        context.addActivityEventListener(mActivityEventListener);
        
    }

    @NonNull
    @Override
    public String getName(){
        return "RNNetPay";
    }

    @ReactMethod
    public void doTrans(String total, final Promise promise){
        this.mPromise = promise;
        float total2 = Float.parseFloat(total);
        double tip = 0;
        SaleRequest sale = new SaleRequest("com.mobile", total2, tip, null, null, null,
                null, null, null, null, null, null, null,
                null, null);
        this.getApiInstance().doTrans(sale);
    }

    private SmartApi getApiInstance(){
        if (this.smartApi != null){
            return this.smartApi;
        }
        Activity activity = this.reactContext.getCurrentActivity();
        if (activity == null){
            throw new IllegalStateException("Not attached to an Activity");
        }
        this.smartApi = SmartApiFactory.INSTANCE.createSmartApi(activity);

        return this.smartApi;
    }
    
    @ReactMethod
    public void printTicket(final Promise promise){
        this.mPromise = promise;
        //Crear una página
        IPage page = this.getApiInstance().createPage();

        //Crear unidad qutiene texto e cony otros formatos
        IPage.ILine.IUnit unit1 = page.createUnit();
        unit1.setText("Texto 1");
        unit1.setGravity(Gravity.START);

        //Se pueden agregar 2 o más unidades a una línea y se dividirá en columnas
        IPage.ILine.IUnit unit2 = page.createUnit();
        unit2.setText("Texto 2");
        unit2.setGravity(Gravity.END);

        //Se crea una línea y se agregan sus unidades.
        page.addLine().
                addUnit(unit1).
                addUnit(unit2);

        //Se crea una nueva unidad
        IPage.ILine.IUnit unit3 = page.createUnit();
        unit3.setText("Texto 3");
        unit3.setGravity(Gravity.CENTER);

        //Se crea una nueva línea y se agrega la unidad pasada
        page.addLine().addUnit(unit3);

        //Se crea un request del tipo PrintRequest con el package name del app y la página creada
        PrintRequest printRequest = new PrintRequest("com.mobile", page);

        this.getApiInstance().doTrans(printRequest);
    }

    public WritableMap convertJsonToMap(JSONObject jsonObject) throws JSONException {
        WritableMap map = new WritableNativeMap();

        Iterator<String> iterator = jsonObject.keys();
        while (iterator.hasNext()) {
            String key = iterator.next();
            Object value = jsonObject.get(key);
            if (value instanceof JSONObject) {
                map.putMap(key, convertJsonToMap((JSONObject) value));
            } else if (value instanceof JSONArray) {
                map.putArray(key, convertJsonToArray((JSONArray) value));
                if (("option_values").equals(key)) {
                    map.putArray("options", convertJsonToArray((JSONArray) value));
                }
            } else if (value instanceof Boolean) {
                map.putBoolean(key, (Boolean) value);
            } else if (value instanceof Integer) {
                map.putInt(key, (Integer) value);
            } else if (value instanceof Double) {
                map.putDouble(key, (Double) value);
            } else if (value instanceof String) {
                map.putString(key, (String) value);
            } else {
                map.putString(key, value.toString());
            }
        }
        return map;
    }

    public ReadableArray convertJsonToArray(JSONArray jsonArray) throws JSONException {
        WritableArray array = new WritableNativeArray();

        for (int i = 0; i < jsonArray.length(); i++) {
            Object value = jsonArray.get(i);
            if (value instanceof JSONObject) {
                array.pushMap(this.convertJsonToMap((JSONObject) value));
            } else if (value instanceof JSONArray) {
                array.pushArray(convertJsonToArray((JSONArray) value));
            } else if (value instanceof Boolean) {
                array.pushBoolean((Boolean) value);
            } else if (value instanceof Integer) {
                array.pushInt((Integer) value);
            } else if (value instanceof Double) {
                array.pushDouble((Double) value);
            } else if (value instanceof String) {
                array.pushString((String) value);
            } else {
                array.pushString(value.toString());
            }
        }
        return array;
    }

    public JSONObject convertMapToJson(ReadableMap readableMap) throws JSONException {
        JSONObject object = new JSONObject();
        ReadableMapKeySetIterator iterator = readableMap.keySetIterator();
        while (iterator.hasNextKey()) {
            String key = iterator.nextKey();
            ReadableMap value;
            switch (readableMap.getType(key)) {
                case Null:
                    object.put(key, JSONObject.NULL);
                    break;
                case Boolean:
                    object.put(key, readableMap.getBoolean(key));
                    break;
                case Number:
                    object.put(key, readableMap.getDouble(key));
                    break;
                case String:
                    object.put(key, readableMap.getString(key));
                    break;
                case Map:
                case Array:
                    value = readableMap.getMap(key);
                    if (value != null){
                        object.put(key, convertMapToJson(value));
                    }
                    break;
            }
        }
        return object;
    }

    public JSONArray convertArrayToJson(ReadableArray readableArray) throws JSONException {

        JSONArray array = new JSONArray();

        for (int i = 0; i < readableArray.size(); i++) {
            switch (readableArray.getType(i)) {
                case Null:
                    break;
                case Boolean:
                    array.put(readableArray.getBoolean(i));
                    break;
                case Number:
                    array.put(readableArray.getDouble(i));
                    break;
                case String:
                    array.put(readableArray.getString(i));
                    break;
                case Map:
                    array.put(convertMapToJson(readableArray.getMap(i)));
                    break;
                case Array:
                    array.put(convertArrayToJson(readableArray.getArray(i)));
                    break;
            }
        }
        return array;
    }

}
