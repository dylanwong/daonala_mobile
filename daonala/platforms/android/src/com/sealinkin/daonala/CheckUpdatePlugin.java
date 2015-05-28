package com.sealink.huoyuntong;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

import android.content.Context;
import android.util.Log;



	public class CheckUpdatePlugin extends CordovaPlugin  {
	
		 @Override
		  public boolean execute(String action, JSONArray optionsArr, CallbackContext callbackContext) throws JSONException{
			  
			 if (action.equals("checkVersion")) {
		        	Log.i("out","checkVersion");
		        	boolean flag=updateVersion();
		        	 this.checkVersion(flag,callbackContext);
		            return flag;
		        }
		        return false;
		    }
		 
		

		private void checkVersion(boolean flag,CallbackContext callbackContext) {
			System.out.println("NewVersion--------------------------");
			Log.i("out","NewVersion");
		        if (flag) {
		            callbackContext.success("New Version");
		        } else {
		            callbackContext.error("Same Version.");
		        }
		    }
		
		 private Boolean  updateVersion() {
			 Log.i("out","updateVersion");
			 boolean flag=false;
			Update ap = new Update(cordova.getActivity());
			Log.i("out","Update");
			if (ap.getServerVer()) {
				Log.i("out","getServerVer");
					ap.doNewVersionUpdate();// 更新版本
					flag= true;
			}else{
				flag= false;
			}
			return flag;
		}
		 
}
