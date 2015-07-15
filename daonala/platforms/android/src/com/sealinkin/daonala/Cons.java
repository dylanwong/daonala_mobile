package com.sealinkin.daonala;

import java.io.Serializable;

/**
 * 常量类
 * @author 翔
 *
 */
public class Cons implements Serializable {

	private static final long serialVersionUID = 1L;
	
	//消息类型
	public static String MSG_TYPE = "";
	//触发方法
	public static String TRIGGER_FUNC = "";
	//是否通知打开 默认FALSE
	public static Boolean IS_OPEN = false;
	//参数
	public static String PARAMETER = "";
	//内容
	public static String MESSAGE = "";
	//安装唯一ID
	public static String INSTALLATIONID = "";
}
