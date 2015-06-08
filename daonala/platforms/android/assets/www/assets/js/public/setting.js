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
var fileUrl ="http://192.168.16.98:8080/fileserver/struts_uploadReturnUrl.action";
var baseUrl = "http://192.168.16.97:8080/daonala_mobile/";

var queryOrderList=baseUrl+"order/query_deliverorderlistfordirver.action";

var saveFeedbackUrl = baseUrl + "base/saveFeedback.action";
var queryMySet = baseUrl + "base/query_device_set.action";
var updateOrUpdateMySet = baseUrl + "base/save_device_set.action";
var queryMsgList = baseUrl + "msg/query_msg_list.action";
var searchUrl = baseUrl +"order/query_suborderlist.action";
var searchTraceUrl = baseUrl+"order/query_deliverordertrace.action";
var choicedeliverOrdersUrl = baseUrl+"order/query_deliverorderlist.action";
var taskqueryUrl = baseUrl+"order/query_deliverorderlistfordirver.action";
var queryTaskUrl = baseUrl+"order/query_deliverorderlistfordirver.action";
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
var taskTabStatus = 0;
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

    init_homepage();

    //设备启动完毕发起 获取消息内容请求
    var DaoNaLaRoute = cordova.require('com.sealink.daonala.cordova.DaoNaLaRoute');
    DaoNaLaRoute.route(function(message) {
        alert(message);
    }, function(message) {
        alert(message);
    });

}

function init_homepage(){
    var user =  localStorage.getItem('user');
    user = JSON.parse(user);
    if(user==null)
    {
        $('#myboard').unbind('click');
        $('#myboard').attr('click','login_panel()');
        $('#myboard').bind('click',function(){

            login_panel();//login_panel();
        });
        $('#myboardText').html('我的订单');
    }else{
        if(user.obj.userType=='0'){
            $('#myboard').unbind('click');

            $('#myboard').bind('click',function(){
                logisticboard_panel();
            });
            $('#myboardText').html('看板');
        }else if(user.obj.userType=='1'){
            $('#myboard').unbind('click');
            $('#myboard').bind('click',function(){
                ownerboard_panel();
            });
            $('#myboardText').html('看板');
        }else if(user.obj.userType=='2'){
            $('#myboard').unbind('click');
            $('#myboard').bind('click',function(){
                custboard_panel();
            });
            $('#myboardText').html('看板');
        }else if(user.obj.userType=='3'){
            $('#myboard').unbind('click');
            $('#myboard').bind('click',function(){
                driverboard_panel();
            });
            $('#myboardText').html('我的任务');
        }
    }
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
