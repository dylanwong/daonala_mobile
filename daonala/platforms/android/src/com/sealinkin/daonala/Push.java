package com.sealinkin.daonala;

import android.app.Application;

import com.avos.avoscloud.AVAnalytics;
import com.avos.avoscloud.AVOSCloud;

public class Push extends Application {

	  @Override
	  public void onCreate() {
	    super.onCreate();
	    // 初始化应用信息
	    
        AVOSCloud.initialize(this, "5oizln9pd3t8e259paw1a29tpjm8rbc5761y7h0yl8vf6k9o", "f1ne2oc9te6zg2x27bw04vg769rnk4f8ihhauot6tnjvgi2z");
//	    // 启用崩溃错误统计
	    AVAnalytics.enableCrashReport(this.getApplicationContext(), true);
	    AVOSCloud.setDebugLogEnabled(true);
	  }
	}

