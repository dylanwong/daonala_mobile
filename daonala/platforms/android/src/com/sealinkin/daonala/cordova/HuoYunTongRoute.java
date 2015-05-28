package com.sealink.huoyuntong.cordova;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

import android.app.Activity;
import android.os.Bundle;

import com.iflytek.cloud.SpeechConstant;
import com.iflytek.cloud.SpeechError;
import com.iflytek.cloud.SpeechSynthesizer;
import com.iflytek.cloud.SynthesizerListener;
import com.sealink.huoyuntong.Cons;
import com.sealink.huoyuntong.CordovaApp;

public class HuoYunTongRoute extends CordovaPlugin {

    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) 
            throws JSONException {
        Activity activity = this.cordova.getActivity();
        if (action.equals("route")) {
        	if(Cons.IS_OPEN)
        	{
        		webView.post(new Runnable() {
            	    @Override
            	    public void run() {
            	    	CordovaApp ca = (CordovaApp)cordova.getActivity();
            	    	String method = Cons.TRIGGER_FUNC;
            	    	String message = Cons.MESSAGE;
            	    	String parameter = Cons.PARAMETER;
                		String parameters = "";
                		
                		for (String i : parameter.split(","))
                		{
                			parameters +="'"+i+"',";
        				}
                		parameters= parameters.substring(0, parameters.length()-1);
                		parameters = method +"(" +parameters +")";
                		
                		ca.method(message);
            	    	ca.loadUrl("javascript:"+parameters+"");
            	    	Cons.IS_OPEN = false;
            	    }
        		});
        	}
            return true;
        }
        return false;
    }
    
   
}