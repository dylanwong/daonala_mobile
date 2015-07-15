package com.sealinkin.daonala;

import org.apache.cordova.CordovaActivity;
import org.json.JSONObject;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import android.os.StrictMode;
import android.util.Log;

import com.avos.avoscloud.AVAnalytics;
import com.avos.avoscloud.AVException;
import com.avos.avoscloud.AVInstallation;
import com.avos.avoscloud.PushService;
import com.avos.avoscloud.SaveCallback;
import com.iflytek.cloud.SpeechConstant;
import com.iflytek.cloud.SpeechError;
import com.iflytek.cloud.SpeechSynthesizer;
import com.iflytek.cloud.SpeechUtility;
import com.iflytek.cloud.SynthesizerListener;

public class CordovaApp extends CordovaActivity {

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		super.init();

		try {
			AVInstallation.getCurrentInstallation().saveInBackground(
					new SaveCallback() {
						public void done(AVException e) {
							if (e == null) {
								Cons.INSTALLATIONID = AVInstallation.getCurrentInstallation().getInstallationId();
								//loadUrl("javascript:window.OSInfo ={os:'android',push:'"+ AVInstallation.getCurrentInstallation().getInstallationId() + "'}");
							} else {
								// 保存失败，输出错误信息
							}
						}
			});
			
			SpeechUtility.createUtility(this, SpeechConstant.APPID
					+ "=55239db0");
			PushService.setDefaultPushCallback(this, CordovaApp.class);// 这里不回调的话不能接收消息

			// 监控打开情况
			AVAnalytics.trackAppOpened(getIntent());

			if (android.os.Build.VERSION.SDK_INT > 9) {
				// SDK > 9 的时候主线程发HTTP请求
				Log.i("out", android.os.Build.VERSION.SDK_INT + "");
				StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder()
						.permitAll().build();
				StrictMode.setThreadPolicy(policy);
			}
			// 动态注册广播接收器（用于推送来了如果应用是运行状态）
			registerMessageReceiver();

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
		   loadUrl(launchUrl);
		   try
		   {
			   Bundle bundle = getIntent().getExtras();
				if (bundle != null && bundle.containsKey("com.avos.avoscloud.Data")) {
					JSONObject json = new JSONObject(getIntent().getExtras()
							.getString("com.avos.avoscloud.Data"));
					String message = json.getString("alert");
					String method = json.getString("method");
					String parameter = json.getString("parameter");
					Cons.IS_OPEN = true;
					Cons.TRIGGER_FUNC = method;
					Cons.PARAMETER = parameter;
					Cons.MESSAGE = message;
				}
		   }catch(Exception e)
		   {
			   e.printStackTrace();
		   }
		}
	}

	@Override
	protected void onNewIntent(Intent intent) {
		// 通过intent启动应用(处于后台状况打开的信息)
		// TODO Auto-generated method stub
		super.onNewIntent(intent);

		try {
			Bundle bundle = intent.getExtras();
			if (bundle != null && bundle.containsKey("com.avos.avoscloud.Data")) {
				JSONObject json = new JSONObject(intent.getExtras().getString(
						"com.avos.avoscloud.Data"));
				String message = json.getString("alert");
				String method = json.getString("method");
				String parameter = json.getString("parameter");
				String parameters = "";

				for (String i : parameter.split(",")) {
					parameters += "'" + i + "',";
				}
				parameters = parameters.substring(0, parameters.length() - 1);
				parameters = method + "(" + parameters + ")";
				method(message);

				loadUrl("javascript:" + parameters + " ");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	protected void onResume() {
		// TODO Auto-generated method stub
		// 每次APP唤醒
		super.onResume();
	}

	@Override
	public void onDestroy() {
		// TODO Auto-generated method stub
		unregisterReceiver(mMessageReceiver);
		super.onDestroy();
	}

	// 合成监听器
	private SynthesizerListener mSynListener = new SynthesizerListener() {
		// 会话结束回调接口，没有错误时，error为null
		public void onCompleted(SpeechError error) {
		}
		// 缓冲进度回调
		// percent为缓冲进度0~100，beginPos为缓冲音频在文本中开始位置，endPos表示缓冲音频在文本中结束位置，info为附加信息。
		public void onBufferProgress(int percent, int beginPos, int endPos,
				String info) {
		}
		// 开始播放
		public void onSpeakBegin() {
		}
		// 暂停播放
		public void onSpeakPaused() {
		}
		// 播放进度回调
		// percent为播放进度0~100,beginPos为播放音频在文本中开始位置，endPos表示播放音频在文本中结束位置.
		public void onSpeakProgress(int percent, int beginPos, int endPos) {
		}
		// 恢复播放回调接口
		public void onSpeakResumed() {
		}
		// 会话事件回调接口
		public void onEvent(int arg0, int arg1, int arg2, Bundle arg3) {
		}
	};

	public MessageReceiver mMessageReceiver;
	public static String ACTION_INTENT_RECEIVER = "com.sealinkin.daonala.inside.push";
	public static String ONRESUME_RECEIVER = "com.sealinkin.daonala.onresume.push";

	public void method(String message) {
		// 1.创建SpeechSynthesizer对象, 第二个参数：本地合成时传InitListener
		SpeechSynthesizer mTts = SpeechSynthesizer
				.createSynthesizer(this, null);
		// 2.合成参数设置，详见《科大讯飞MSC API手册(Android)》SpeechSynthesizer 类
		mTts.setParameter(SpeechConstant.VOICE_NAME, "xiaoyan");// 设置发音人
		mTts.setParameter(SpeechConstant.SPEED, "50");// 设置语速
		mTts.setParameter(SpeechConstant.VOLUME, "80");// 设置音量，范围0~100
		mTts.setParameter(SpeechConstant.ENGINE_TYPE, SpeechConstant.TYPE_CLOUD); // 设置云端
		// 3.开始合成
		mTts.startSpeaking(message, mSynListener);
	}

	/**
	 * 动态注册广播
	 */
	public void registerMessageReceiver() {
		mMessageReceiver = new MessageReceiver();
		IntentFilter filter = new IntentFilter();

		filter.addAction(ACTION_INTENT_RECEIVER);
		registerReceiver(mMessageReceiver, filter);
	}

	public class MessageReceiver extends BroadcastReceiver {
		@Override
		public void onReceive(Context context, Intent intent) {
			// TODO Auto-generated method stub
			if (intent.getAction().equals(ACTION_INTENT_RECEIVER)) {
				try {
					Bundle bundle = intent.getExtras();
					if (bundle != null
							&& bundle.containsKey("com.avos.avoscloud.Data")) {
						JSONObject json = new JSONObject(intent.getExtras()
								.getString("com.avos.avoscloud.Data"));
						String message = json.getString("alert");
						String method = json.getString("method");
						String parameter = json.getString("parameter");
						String parameters = "";

						for (String i : parameter.split(",")) {
							parameters += "\"" + i + "\"" + ",";// 添加JS引号转义
						}
						parameters = parameters.substring(0,
								parameters.length() - 1);
						parameters = "'" + method + "(" + parameters + ")"
								+ "'";
						method(message);
						loadUrl("javascript:pushMsg('" + message + "',"
								+ parameters + " )");
					}
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}

			}
		}
	}
}
