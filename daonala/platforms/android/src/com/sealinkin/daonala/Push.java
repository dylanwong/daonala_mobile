package com.sealink.huoyuntong;

import android.app.Application;

import com.avos.avoscloud.AVAnalytics;
import com.avos.avoscloud.AVOSCloud;

public class Push extends Application {

	  @Override
	  public void onCreate() {
	    super.onCreate();
	    // 初始化应用信息
	    
        AVOSCloud.initialize(this, "bama788tjuoy57d0nvpfcfix6tdxp6cacuu7t1rzaml9uqxj", "egfq83obnstq60ljo8v2bjk3gtcspyd4lqz9xa7m63qzcvx9");
//	    // 启用崩溃错误统计
	    AVAnalytics.enableCrashReport(this.getApplicationContext(), true);
	    AVOSCloud.setDebugLogEnabled(true);
	  }
	}

