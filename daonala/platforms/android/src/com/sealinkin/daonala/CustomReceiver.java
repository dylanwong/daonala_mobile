package com.sealinkin.daonala;

import org.json.JSONObject;

import android.app.ActivityManager;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;

import com.avos.avoscloud.AVOSCloud;
import com.avos.avoscloud.LogUtil;
import com.avos.avospush.notification.NotificationCompat;

public class CustomReceiver extends BroadcastReceiver {
	private static final String TAG = "MyCustomReceiver";

	@Override
	public void onReceive(Context context, Intent intent) {
		LogUtil.log.d(TAG, "Get Broadcat");
		LogUtil.log.d(TAG, intent.getAction());
		try {
			if (intent.getAction().equals("com.sealinkin.daonala.PUSH")) {
				Bundle bundle = intent.getExtras();
				if (isRunningForeground(context)) {
					// 应用再打开的时候
					processAPPInsideMessage(context, bundle);
				} else {
					// 应用关闭的时候
					JSONObject json = new JSONObject(intent.getExtras()
							.getString("com.avos.avoscloud.Data"));
					final String message = json.getString("alert");
					Intent resultIntent = new Intent(
							AVOSCloud.applicationContext, CordovaApp.class);
					resultIntent.putExtras(bundle);
					PendingIntent pendingIntent = PendingIntent.getActivity(
							AVOSCloud.applicationContext, 0, resultIntent,
							PendingIntent.FLAG_UPDATE_CURRENT);
					NotificationCompat.Builder mBuilder = new NotificationCompat.Builder(
							AVOSCloud.applicationContext)
							.setSmallIcon(R.drawable.icon)
							.setContentTitle(
									AVOSCloud.applicationContext.getResources()
											.getString(R.string.app_name))
							.setContentText(message).setTicker(message);
					mBuilder.setContentIntent(pendingIntent);
					mBuilder.setAutoCancel(true);

					int mNotificationId = 10086;
					NotificationManager mNotifyMgr = (NotificationManager) AVOSCloud.applicationContext
							.getSystemService(Context.NOTIFICATION_SERVICE);
					mNotifyMgr.notify(mNotificationId, mBuilder.build());

				}
			}
		} catch (Exception e) {
		}
	}

	private void processAPPInsideMessage(Context context, Bundle bundle) {
		Intent mIntent = new Intent(CordovaApp.ACTION_INTENT_RECEIVER);
		mIntent.putExtras(bundle);
		context.sendBroadcast(mIntent);
	}

	private boolean isRunningForeground(Context context)
	// 每次APP唤醒
	{
		ActivityManager am = (ActivityManager) context
				.getSystemService(Context.ACTIVITY_SERVICE);
		ComponentName cn = am.getRunningTasks(1).get(0).topActivity;
		String currentPackageName = cn.getPackageName();
		if (!TextUtils.isEmpty(currentPackageName)
				&& currentPackageName.equals(context.getPackageName())) {
			return true;
		}

		return false;
	}
}