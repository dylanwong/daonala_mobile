/**
 * Created by xiaoF on 15/2/19.
 */

$.ui.autoLaunch = false;
$.ui.openLinksNewTab = false;
$.ui.animateHeaders = false;
$.ui.lockPageBounce = true;
$.os.useOSThemes = false;
$.ui.splitview=false;
$.feat.nativeTouchScroll=false
//    $.feat.nativeTouchScroll=true
$.ui.blockPageScroll();
// $.ui.setSideMenuWidth('238px');

var myScroller;
var loginStatus = 0;//0未登录1登陆界面登陆2注册登陆
var verify_flag = 0;//验证标志 0:未验证通过跳转页面 1:我的页面打开页面
//var fileUrl ="http://app.gongsuda.com:8051/smsfile/";
var fileUrl ="http://192.168.16.98:8080/fileserver/uploadFiles/sms/";
var baseUrl = "http://192.168.16.70:8080/daonala_mobile/";
var omsUrl="http://192.168.16.79:8081/oms1.0/";
var queryOrderList=baseUrl+"order/query_order_list.action";
var queryMyOrderList=baseUrl+"order/query_order_bidding_list.action";

//event target ID
var ETID = null;
//选中的任务ID
var TDID = null;
//位置ID
var lOCATIONID = null;
//选中角色 1:企业 2:个人
var ISSELROLE = "2";

// 用来判断是否展示启动引导页
// 变量为数字
var currentVersion=1.9;
var iOSInHouse=true;

var ajaxFlag=true;
var alertLocationPopup = false;
var isPullorInfinite =false;
var visitor=false
var myLocationFlag = false;
var lOCATIONID='currentlocation';

var imgLocation='';//反馈图片所在页面 0提取页面1跟踪页面2交接页面

// 全局变量已经在原生里面就赋值好了———— EX:【window.OSInfo={os:'iOS',push:'xxxx'}】



document.addEventListener("deviceready", onDeviceReadySettingEvents, false);

function onDeviceReadySettingEvents() {
    if (af.os.android) {
        document.addEventListener("backbutton", onBackKeyDown, false);
        setTimeout(function () {
            navigator.splashscreen.hide();
        }, 1000);
    }
    setTimeout(function () {
        getLocation()
    }, 3000);
    checkVersion();

    //设备启动完毕发起 获取消息内容请求
    var HuoYuanTongRoute = cordova.require('com.sealink.huoyuntong.cordova.HuoYunTongRoute');
    HuoYuanTongRoute.route(function(message) {
        alert(message);
    }, function(message) {
        alert(message);
    });
}

function onBackKeyDown(e) {
    exitAppPopup(e);
}

function exitAppPopup(e) {
    if(window.location.href.indexOf('#') == -1 || window.location.href.indexOf('#home') > 0)
    {
        e.preventDefault();
        af.ui.popup({
            title: "温馨提示",
            message: "您要关闭程序吗?",
            cancelText: "取消",
            cancelCallback: function () {
            },
            cancelClass: 'popup-btn',
            doneText: "确定",
            doneClass: 'popup-btn',
            doneCallback: function () {
                if (navigator.app) {
                    navigator.app.exitApp();
                } else if (navigator.device) {
                    navigator.device.exitApp();
                }
            },
            cancelOnly: false
        });
    }else
    {
        $.ui.goBack();
    }

}
