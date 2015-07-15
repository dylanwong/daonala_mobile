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


//var queryOrderList=baseUrl+"order/query_deliverorderlistfordirver.action";


var fileUrl ="http://192.168.16.98:8080/fileserver/struts_uploadReturnUrl.action";
//var omsUrl="http://192.168.16.79:8081/oms1.0/";
var omsUrl="http://192.168.16.98:8080/fileserver/struts_uploadReturnUrl.action";
var baseUrl = "http://192.168.16.98/daonala_mobile/";


var saveFeedbackUrl = baseUrl + "base/saveFeedback.action";
var queryMySet = baseUrl + "base/query_device_set.action";
var updateOrUpdateMySet = baseUrl + "base/save_device_set.action";
var queryMsgList = baseUrl + "msg/query_msg_list.action";
var searchUrl = baseUrl +"order/query_suborderlist.action";
var querySingleOrderUrl = baseUrl +"order/querySingleorder.action";
var searchTraceUrl = baseUrl+"order/query_deliverordertrace.action";
var choicedeliverOrdersUrl = baseUrl+"order/query_deliverorderlist.action";
var taskqueryUrl = baseUrl+"order/query_deliverorderlistfordirver.action";
var queryTaskUrl = baseUrl+"order/query_deliverorderlistfordirver.action";
//var goodSearchUrl = baseUrl+"order/query_goodslist.action";
var ordercount = baseUrl +"order/order_count.action";
var queryVersion = baseUrl + "base/queryNew_version.action";
var searchProductUrl = baseUrl + "order/query_order_detail.action";
var queryDeliverordertraceListUrl = baseUrl + "order/queryDeliverordertraceList.action";
var evaluteUrl = baseUrl + "order/view_evaluate.action";
var searchSubCompanyUrl = baseUrl + "order/query_subcompany.action";
var searchOwnerOrCustUrl = baseUrl + "order/getLinkDataList.action";
//var linkDataUrl = baseUrl + "order/getLinkDataList.action";
//event target ID
var ETID = null;
//选中的任务ID
var TDID = null;
//位置ID
var roleID = null;
//选中角色 1:物流商 2:货主 3: 货主客户 4：司机
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
//    setTimeout(function () {
//        getLocation()
//    }, 3000);
    checkVersion();
    init_home_ad();
    init_homepage();
    navigator.splashscreen.hide();
    androidQueryInstallId();
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

        $('#boardPanel').unbind('click');
        $('#boardPanel').bind('click',function(){
            login_panel(); //绑定物流看板
        });
//        $('#myFirstboard').unbind('click');
//        $('#myFirstboard').bind('click',function(){
//            searchorder_panel();
//        });
//        $('#myFirstboardText').html('订单跟踪');
        //initHomeModuleTable();


    }else{
        queryIndexOrderCountSucc();
        initHomeFooter(user.obj.userType);
        loginStatus=1;
        var result = '';
        if(user.obj.userType=='0'){
//            $('#myboard').unbind('click');
//            $('#myboard').bind('click',function(){
//                logisticboard_panel();
//            });
//            $('#myboardText').html('看板');

            $('#boardPanel').unbind('click');
            $('#boardPanel').bind('click',function(){
                logisticboard_panel(); //绑定物流看板
            });
//            $('#myFirstboard').unbind('click');
//            $('#myFirstboard').bind('click',function(){
//                addorder_panel();
//            });
//            $('#myFirstboardText').html('我要下单');
        }else if(user.obj.userType=='1'){
//            $('#myboard').unbind('click');
//            $('#myboard').bind('click',function(){
//                ownerboard_panel();
//            });
//            $('#myboardText').html('看板');

            $('#boardPanel').unbind('click');
            $('#boardPanel').bind('click',function(){
                ownerboard_panel();
            });

            $('#myFirstboard').unbind('click');
            $('#myFirstboard').bind('click',function(){
                addorder_panel();
            });
            $('#myFirstboardText').html('我要下单');
        }else if(user.obj.userType=='2'){
            $('#myboard').unbind('click');
            $('#myboard').bind('click',function(){
                custboard_panel();
            });

            $('#boardPanel').unbind('click');
            $('#boardPanel').bind('click',function(){
                custboard_panel();
            });


            $('#myboard').attr('statusType','0');
            $('#myboardText').html('看板');

            $('#myFirstboard').unbind('click');
            $('#myFirstboard').bind('click',function(){
                searchorder_panel();
            });
            $('#myFirstboardText').html('订单跟踪');
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
    }else if($("#swipebox-slider").css('display') != undefined)
    {
        $.swipebox.close();
    }
    else
    {
        $.ui.goBack();
    }

}
