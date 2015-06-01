package com.sealinkin.daonala;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.math.BigInteger;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.Principal;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.SSLSession;
import javax.net.ssl.X509TrustManager;

import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.params.BasicHttpParams;
import org.apache.http.params.HttpConnectionParams;
import org.apache.http.params.HttpParams;
import org.json.JSONObject;

import android.app.AlertDialog;
import android.app.Dialog;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.net.Uri;
import android.os.Environment;
import android.os.Handler;
import android.os.Message;
import android.util.Log;


public class Update {
	Boolean SDCard=false; //是否安装SD卡
    String versionNo="";
	String updateUrl="";
	Handler uiHandler = new Handler(); // 用于processDialog界面更新
	ProgressDialog pd = null;
	int iProcessIndex = 0; // 进度条的进度
	int iProcessMax = 100; // 进度条的最大值
	Context mContext;
	int iApkSize = 0; // apk的大小
	private Message message = null;

	//
	public Update(Context context) {
		this.mContext = context;
	}



	public String getUrl(String urlName, String fileName) {
		StringBuffer sf = new StringBuffer();
		sf.append(urlName).append(fileName);
		String url = sf.toString();
		return url;
	}

	/** 判断内存卡是否已插入*/
	public boolean hasStorage() {
	String state = android.os.Environment.getExternalStorageState();
	if (android.os.Environment.MEDIA_MOUNTED.equals(state)) {
	return true;
	}
	return false;
	}

	/**
	 * 从服务器端获取版本号与版本名称
	 * 
	 * @return
	 */
	public boolean getServerVer() {
		Log.i("out","getServerVer");
		try{
//			String apkUrl = mContext.getResources().getString(R.string.server_url);
//			Log.i("out",apkUrl);
//			URL url = new URL(apkUrl);
//			
//			SSLContext sslctxt = SSLContext.getInstance("TLS");
//			
//			sslctxt.init(null, new TrustManager[]{new MyX509TrustManager()}, new java.security.SecureRandom());
//			
//			HttpsURLConnection conn = (HttpsURLConnection)url.openConnection();
//			
//			conn.setSSLSocketFactory(sslctxt.getSocketFactory());
//			conn.setHostnameVerifier(new MyHostnameVerifier());
//			
//			conn.connect();
//			Log.i("out","connect");
//			if(conn.getResponseCode() != 200){
//				Log.i("out","not 200");
//				return false;
//			}
//			InputStream input = conn.getInputStream();
//			
//			
//			String result = toString(input);
//			
//			input.close();
//			
//			conn.disconnect();
//			
//			Log.i("out","is 200"+result);
//			
//			JSONObject resultJson = new JSONObject(result);
//			Log.i("out","aaaa"+resultJson.getBoolean("isSucc"));
//			if(!resultJson.getBoolean("isSucc")){
//				//需要更新
//				versionNo = resultJson.getJSONObject("obj").getString("versionNo");
//	 			updateUrl = resultJson.getJSONObject("obj").getString("versionUrl");
//			}else{
//				return false;
//			}

			HttpParams httpParameters = new BasicHttpParams();
		    int timeoutConnection = 8000;
		    HttpConnectionParams.setConnectionTimeout(httpParameters, timeoutConnection);
		    DefaultHttpClient client = new DefaultHttpClient(httpParameters);
		    StringBuilder builder = new StringBuilder();
			String apkUrl = mContext.getResources().getString(R.string.server_url);
		    HttpGet get = new HttpGet(apkUrl);
	        HttpResponse response = client.execute(get);
	        if(response.getStatusLine().getStatusCode()!=200){
	        	  throw new Exception();
	        }else{
	        BufferedReader reader = new BufferedReader(new InputStreamReader(
	                response.getEntity().getContent()));
	        for (String s = reader.readLine(); s != null; s = reader.readLine()) {
	            builder.append(s);
	            }
	       
	        Pattern pattern = Pattern.compile("\\((.*?)\\)");
	        Matcher matcher = pattern.matcher(builder.toString());
	        if( matcher.find(1)){ 
	        	 JSONObject jsonObject = new JSONObject(matcher.group(1));
	        	 if(jsonObject.getBoolean("isSucc")){
	 				versionNo = jsonObject.getJSONObject("obj").getString("versionNo");
	 	 			updateUrl = jsonObject.getJSONObject("obj").getString("versionUrl");
	        	 }else{
	        		 return false;
	        	 }
	        	}
			
			SDCard =this.hasStorage();
			}
			}catch (Exception e) {

			return false;
		}
		return true;
	}
	

	/**
	 * 更新版本
	 */
	public void doNewVersionUpdate() {
		StringBuffer sb = new StringBuffer();
		sb.append("当前版本不是最新版本");
//		sb.append(verCode);
//		sb.append("\n最新版本：V");
//		sb.append(newVerCode);
//		sb.append("(");
//		sb.append(strNewApkSize);
//		sb.append("M)");
		Dialog dialog = new AlertDialog.Builder(mContext)
				.setTitle("软件更新")
				.setMessage(sb.toString())
				.setCancelable(false)
				.setPositiveButton("立即升级",
						new DialogInterface.OnClickListener() {

							@SuppressWarnings("deprecation")
							@Override
							public void onClick(DialogInterface dialog,
									int which) {
								if(SDCard){
								// TODO Auto-generated method stub
								String apkName = mContext.getResources()
										.getString(R.string.app_name);
								pd = new ProgressDialog(mContext);
								pd.setTitle("正在下载");
								pd.setMessage(apkName + "( V " + versionNo
										+ ")");
								// 设置ProgressDialog 的进度条是否不明确
								pd.setIndeterminate(false);
								pd.setMax(iProcessMax);
								pd.setProgress(0);
								// 设置进度条风格，风格为长形
								pd.setProgressStyle(ProgressDialog.STYLE_HORIZONTAL);
								pd.setButton("取 消", new SureButtonListener());
								pd.setCancelable(true);
								downFile(updateUrl);
							}else{
								new AlertDialog.Builder(mContext)
								.setTitle("安装失败")
								.setMessage("SD卡已卸载或不存在")
								.setCancelable(false)
								.setPositiveButton("确定",   
						        new DialogInterface.OnClickListener(){  
						                  public void onClick(DialogInterface dialoginterface, int i){   
						                                 //按钮事件   
						                	  System.exit(0);
						                              }   
						                      }).show();  
							}
							}
						})
				.setNegativeButton("稍后升级",
						new DialogInterface.OnClickListener() {

							@Override
							public void onClick(DialogInterface dialog,
									int which) {
								// finish();
//								System.exit(0);
							}
						}).create();
		dialog.setCancelable(false);
		dialog.show();
	}

	/**
	 * 下载apk
	 */
	public void downFile(final String url) {
		pd.show();
		new Thread() {
			public void run() {
				try {
					// InputStream is = entity.getContent();
					URL urla = new URL(url);
					HttpURLConnection connection = (HttpURLConnection) urla
							.openConnection();
					iApkSize = connection.getContentLength();

					InputStream is = connection.getInputStream();
					FileOutputStream fileOutputStream = null;
					if (is != null) {
						File file = new File(
								Environment
										.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS),
								mContext.getResources().getString(
										R.string.app_name));
						fileOutputStream = new FileOutputStream(file);
						byte[] b = new byte[1024];
						int charb = -1;
						int count = 0;
						while ((charb = is.read(b)) != -1) {
							count += charb;
							fileOutputStream.write(b, 0, charb);
							int iIndex = (int) ((((double) count) / iApkSize) * 100);
							// 至少增加1%才更新processDialog一次
							if (iProcessIndex < iIndex) {
								iProcessIndex = (iIndex <= iProcessMax ? iIndex
										: iProcessMax);
								uiHandler.post(runnableUi);
							}
						}
					}
					fileOutputStream.flush();
					if (fileOutputStream != null) {
						fileOutputStream.close();
					}
					DoInstall();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}.start();
	}

	Handler installHandler = new Handler() {
		public void handleMessage(Message msg) {
			super.handleMessage(msg);
			install();
		}
	};

	/**
	 * 下载完成，通过handler将下载对话框取消
	 */
	public void DoInstall() {
		new Thread() {
			public void run() {
				Message message = installHandler.obtainMessage();
				installHandler.sendMessage(message);
			}
		}.start();
	}

	/**
	 * 安装应用
	 */
	public void install() {
		// 调用系统执行安装的接口
		Intent intent = new Intent(Intent.ACTION_VIEW);
		intent.setDataAndType(
				Uri.fromFile(new File(
						Environment
								.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS),
						mContext.getResources().getString(R.string.app_name))),
				"application/vnd.android.package-archive");
		mContext.startActivity(intent);
		// 程序自己退出
		System.exit(0);
	}

	// 构建Runnable对象，在runnable中更新界面
	Runnable runnableUi = new Runnable() {
		@Override
		public void run() {
			// 更新界面
			pd.setProgress(iProcessIndex);
			if (iProcessIndex == iProcessMax) {
				pd.cancel();
			}
		}

	};
	private String toString(InputStream input){
		
		String content = null;
		try{
		InputStreamReader ir = new InputStreamReader(input);
		BufferedReader br = new BufferedReader(ir);
		
		StringBuilder sbuff = new StringBuilder();
		while(null != br){
			String temp = br.readLine();
			if(null == temp)break;
			sbuff.append(temp).append(System.getProperty("line.separator"));
		}
		
		content = sbuff.toString();
		}catch(Exception e){
			e.printStackTrace();
		}
		
		return content;
	}	
	
	static class MyX509TrustManager implements X509TrustManager{

		@Override
		public void checkClientTrusted(X509Certificate[] chain, String authType)
				throws CertificateException {
			if(null != chain){
				for(int k=0; k < chain.length; k++){
					X509Certificate cer = chain[k];
					print(cer);
				}
			}
			
		}

		@Override
		public void checkServerTrusted(X509Certificate[] chain, String authType)
				throws CertificateException {
			if(null != chain){
				for(int k=0; k < chain.length; k++){
					X509Certificate cer = chain[k];
					print(cer);
				}
			}
		}

		@Override
		public X509Certificate[] getAcceptedIssuers() {
			
			
			return null;
		}
		
		
		private void print(X509Certificate cer){
			
			int version = cer.getVersion();
			String sinname = cer.getSigAlgName();
			String type = cer.getType();
			String algorname = cer.getPublicKey().getAlgorithm();
			BigInteger serialnum = cer.getSerialNumber();
			Principal principal = cer.getIssuerDN();
			String principalname = principal.getName();
			
		}
		
	}
	
	static class MyHostnameVerifier implements HostnameVerifier{

		@Override
		public boolean verify(String hostname, SSLSession session) {
			return true;
		}
		
	}

}
