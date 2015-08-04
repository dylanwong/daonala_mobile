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
var searchFlag = 0;//0     1为首页查询条件
//var fileUrl ="http://app.gongsuda.com:8051/smsfile/";


//var queryOrderList=baseUrl+"order/query_deliverorderlistfordirver.action";


//var smsManageUrl = "http://www.gongsuda.com:8070/sms_manage/uploadFiles/";
var smsManageUrl = "http://app.gongsuda.com:8051/smsfile/";
//var baseUrl = "http://www.gongsuda.com:8070/oms_mobile/";
//var baseUrl = "http://192.168.60.37:8080/oms_mobile/";
var baseUrl = "http://gsdoms.gongsuda.com:8888/oms_mobile/";

var omsManageUrl = "";

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
var searchTraceLongitudeUrl = baseUrl + "order/query_trace_longitude.action";
var queryIndexOrderCountUrl = baseUrl + "order/queryIndexOrderCount.action";
var searchOrderFromIndexUrl = baseUrl + "order/queryIndexOrderList.action";
//var linkDataUrl = baseUrl + "order/getLinkDataList.action";
var updateSelfInfoUrl = baseUrl + "base/updateSelfInfo.action";
var queryAdList = baseUrl + "base/query_ad_Version.action";
var choiceOwnerAddrUrl = baseUrl + "order/queryOwnerAddr.action";
var choiceCustAddrUrl = baseUrl + "order/queryCustAddr.action";
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
var currentVersion='1.0';
var iOSInHouse=true;

var ajaxFlag=true;
var alertLocationPopup = false;
var isPullorInfinite =false;
var visitor=false
var myLocationFlag = false;
var lOCATIONID='currentlocation';
var taskTabStatus = 0;
var imgLocation='';//反馈图片所在页面 0提取页面1跟踪页面2交接页面
var lastPage='';//上以页面PageId   做路由用
var scrollFlag =0; //回到最上面
// 全局变量已经在原生里面就赋值好了———— EX:【window.OSInfo={os:'iOS',push:'xxxx'}】
var swiper;


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
//    initMine();

    checkVersion();
   // init_home_ad();
    init_homepage();
    navigator.splashscreen.hide();
    androidQueryInstallId();

  //  toTestPage();
}
function toTestPage(){
    var testwrapper = new IScroll('#wrapper', {
        hScroll: false, //是否水平滚动
        vScroll: true, //是否垂直滚动
        y: 10, //滚动垂直初始位置
        bounce : false
    });

    $.ui.loadContent('#scrollTest', false, false, 'slide');
}

function init_homepage(){
    var user =  localStorage.getItem('e_user');
    user = JSON.parse(user);
    if(user==null)
    {
        initUnloginHomeTable();
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

        $('#addOrderPanel').unbind('click');
        $('#addOrderPanel').empty();
        $('#addOrderPanel').append('<div style="width:80px;'+
            'height:80px;border-radius:80px;background-color:#01cd88;">'+
            '<a href="tel:4001110005" >'+
            '<i class="iconfont icon-kefu "  style="color:#fff;font-size:56px;line-height:80px">'+
            '</i></a></div>'+
            '<div  id="addOrderPanelText" style="color:#4d4d4d;font-size:18px;width:100px;padding-top: 10px;">'+
            '客服</div>');

    }else{
        initHomeModuleTable();
        //queryIndexOrderCountSucc();
        initHomeFooter(user.obj.userType);
        loginStatus=1;
        var result = '';
        if(user.obj.userType=='0'){

            $('#boardPanel').unbind('click');
            $('#boardPanel').bind('click',function(){
                logisticboard_panel(); //绑定物流看板
            });
        }else if(user.obj.userType=='1'){

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

   //dwb-e是 mobiscroll 取消按钮的class 如果显示着 点击返回先取消该组件
   if($(".dwb-e")!=null && $(".dwb-e").length > 0)
    {
        $(".dwb-e").trigger('click');
    }else
    {
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
            $($($("#afui").find('header')[0]).find('a')[0]).trigger('click');
        }
    }


}
