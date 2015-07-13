function include(path){
    var a=document.createElement("script");
    a.type = "text/javascript";
    a.src=path;
    var head=document.getElementsByTagName("head")[0];
    head.appendChild(a);
}
include("assets/js/public/mine.js");
include("assets/js/login.js");
include("assets/js/register.js");
include("assets/js/public/setup.js");
include("assets/js/order/search.js");
include("assets/js/order/orderlist.js");
include("assets/js/order/trace.js");
include("assets/js/driver/task.js");
include("assets/js/board/boards.js");
include("assets/js/order/orderdetail.js");
include("assets/js/order/linkData.js");
include("assets/js/driver/feedback.js");
include("assets/js/driver/operateguide.js");
include("assets/js/public/filetooms.js");
include("assets/js/public/tools.js");
//include("assets/js/.js");
include("assets/js/order/logistboard.js");
include("assets/js/order/custboard.js");
include("assets/js/order/addOrder.js");
include("assets/js/order/city.js");
include("assets/js/public/iscroll.js");
function mainPanleUnLoad(){
    console.log("mainPanleUnLoad")
}
function message_panel(){
    var user = localStorage.getItem('user');
    user = JSON.parse(user);

    if(user!=null){
        $.ui.loadContent("#message", false, false, "slide");
        getMessageList(user);
    }else{
        $.ui.loadContent("#login", false, false, "slide");
    }
}
function mine_panel()
{
    $("#userpart").height($("#mine").height()/2);
    $("#mine_module").height($("#mine").height()-$("#userpart").height());
    $.ui.loadContent("#mine", false, false, "slide");
}
function main_panel()
{
    $.ui.loadContent("#main", false, false, "slide");
}

function home_panel()
{
    $.ui.loadContent("#home2", false, false, "slide");
}

function login_panel()
{
    $.ui.loadContent("#login", false, false, "slide");
}

function register_panel()
{
    $.ui.loadContent("#register", false, false, "slide");
}

function feedback_panel()
{
    $.ui.loadContent("#feedback", false, false, "slide");
}

function findPwd_panel(){
    $.ui.loadContent("#findPwd", false, false, "slide");
}

function about_panel(){
    $.ui.loadContent("#about", false, false, "slide");
}
function setup(){
    initSetup();
    $.ui.loadContent("#setup", false, false, "slide");
}

function myorders_panel(){
    $.ui.loadContent("#myorders", false, false, "slide");
}
//物流看板初始化页面
function logisticboard_panel(){

    init_orderboardheader();//初始化头部和圆形图标
    initBoardSearchPage();//初始化看板刷选页
    initLogisticBoard();

}
function ownerboard_panel(){
    init_orderboardheader();
    initBoardSearchPage();
    initLogisticBoard();
}
function custboard_panel(elm){

    if(localStorage.getItem('user')==null){
        $.ui.loadContent("#portal", false, false, "slide");
    }else
    {
        $.ui.loadContent("#custboard", false, false, "slide");
        $("#custboard_head").html(
            "<div class='row'' style='height:60px;'' id='custBoarfButtons'>" +
            "<div class='col-xs-1'></div>" +
            " <div class='col-xs-10 text-center' style='padding-top: 10px;'>" +
            "<button onclick='toggleCustTabs(this)' status='0' type='button' " +
            "class='btn btn-default selectTotalDay' style=' font-size:18px;' >未签收</button>" +
            " <button onclick='toggleCustTabs(this)' status='1'  type='button' " +
            "class='btn btn-default ' style=' font-size:18px;' >已签收</button>" +
            "</div> <div class='col-xs-1'> </div></div>");
        custTabStatus = 0;
        cust_orderlist_panel();
    }

  //  $.ui.loadContent("#custboard", false, false, "slide");
}
function driverboard_panel(){
   // $.ui.loadContent("#driverboard", false, false, "slide");


    if(localStorage.getItem('user')==null){
        $.ui.loadContent("#portal", false, false, "slide");
    }else
    {
        $.ui.loadContent("#driverboard", false, false, "slide");
        $("#taskHeader").html("<div style='float:left;width:15%;cursor:pointer;'>" +
            "<a onclick='home_panel()'>" +
            "<img src='assets/img/back.png' />" +
            "<b style='margin-left:0px;position:relative;top:4px;font-size:12px;color:#FFFFFF;'>首页</b></a></div>" +
            "<div style='float:left;width:75%;text-align:center;margin:5px auto;' " +
            " ><div class='btn-group' role='group'><button" +
            " style='width:70px;' onclick='toggleTaskTabs(this)' status='0' type='button' " +
            "class='btn btn-default tabTaskN'>当前任务</button>" +
            " <button style='width:70px;' onclick='toggleTaskTabs(this)' status='1'  type='button' " +
            "class='btn btn-default tabTaskY'  >" +
            "历史任务</button></div></div>" +
            "<div style='clear:both;width:10%'></div>");
        taskTabStatus = 0;
        taskPanelLoad();
    }
}

/*订单查询*/
function searchorder_panel(){
    init_search_panel();
    $.ui.loadContent("#search", false, false, "slide");
}

//function inittrace(elm){
//    if(loginStatus == 0) {
//        traceInfo(this);
//    }else {
//        traceInfo33(this);
//    }
//}
/*订单跟踪 未登录*/
function traceInfo(){
    /*init_search_panel();*/
  //  $(elm).attr('data-todo-detail')
    clear_orderdetailPage();
    if(elm!=null){
       // setCacheData("currentorder",JSON.parse($(elm).attr('data-order-detail')) ,1);
        initTraceInfo();
        $.ui.loadContent("#ordertrace", false, false, "slide");
    }else{
        initTraceInfo();
        $.ui.loadContent("#ordertrace", false, false, "slide");
    }
}
//订单跟踪 登录
function traceInfo33(){
//    /*init_search_panel();*/
    clear_orderdetailPage();
    var user = JSON.parse(localStorage.getItem('user'));
    if(user.obj.userType == 2){
        //$('#orderdetailBackId').attr('onclick',"$.ui.loadContent('#custboard', false, false, 'slide')");
        $('#orderdetailBackId').attr('onclick',"custboard_panel();");
    }else{
        $('#orderdetailBackId').attr('onclick',"$.ui.loadContent('#orderlist', false, false, 'slide')");
    }
    initTraceInfo2();//初始化订单详情
    $.ui.loadContent("#orderMaindetail", false, false, "slide");
}
// 登陆时 单条订单新跟踪
function traceSingleInfo33(){
    clear_orderdetailPage();
    var user = JSON.parse(localStorage.getItem('user'));
    if(user.obj.userType == 2){
        //$('#orderdetailBackId').attr('onclick',"$.ui.loadContent('#custboard', false, false, 'slide')");
        $('#orderdetailBackId').attr('onclick',"custboard_panel();");
    }else{

        if( $("#orderdetailBackId").attr('onclick') ==
            "$.ui.loadContent('#search', false, false, 'slide')"){

        }else{
            $('#orderdetailBackId').attr('onclick',"$.ui.loadContent('#orderBoard', false, false, 'slide')");
        }
    }
    initTraceInfo2();
    $.ui.loadContent("#orderMaindetail", false, false, "slide");
}

function traceSingleInfo(){
    var user = JSON.parse(localStorage.getItem('user'));
    if(user.obj.userType == 2){
        $('#orderdetailBackId').attr('onclick',"custboard_panel();");

    }else{
        $('#orderdetailBackId').attr('onclick',"$.ui.loadContent('#orderBoard', false, false, 'slide')");
    }
    $('#orderdetailBackId').attr('onclick',"$.ui.loadContent('#orderBoard', false, false, 'slide')");
    initTraceInfo();
    $.ui.loadContent("#orderMaindetail", false, false, "slide");
}



//商品详情页面
function productPanel(){
    queryDetailProduct();
    $.ui.loadContent("#orderDetailProduct", false, false, "slide");
}

//商品评价
function evalutePanel(){
    queryEvalute();

}

//订单详情（收发货人详情）
function orderDetailPanel(){
    $.ui.loadContent("#orderdetail", false, false, "slide");
}
//物流轨迹页面
function tracePanel(){
    queryDetailTrace_login();
    $.ui.loadContent("#orderDetailTrace", false, false, "slide");
}



/**/
function signorderslist_panel(){
    queryDetailList();
    //$.ui.loadContent("#signorderslist", false, false, "slide");
}
function signorderdetail_panel(){
    $.ui.loadContent("#signorderdetail", false, false, "slide");
}


function init_search_panel(){

    if(localStorage.getItem("user")!=null) {
        var user = JSON.parse(localStorage.getItem("user"));
        if(user.obj.userType=='0'){
            $('#searchText').attr("placeholder", "请输入单号/货主名称模糊查找");
        }else if(user.obj.userType=='1'){
            $('#searchText').attr("placeholder", "请输入单号/客户名称/子客户名称模糊查找");
        }else if(user.obj.userType=='2'){
            $('#searchText').attr("placeholder", "请输入单号模糊查找");
        }else if(user.obj.userType=='3'){
            $('#searchText').attr("placeholder", "请输入单号/客户名称/子客户名称模糊查找");
        }
    }else{
        $('#searchText').attr("placeholder", "请输入单号查找");
    }
}

function init_home_ad()
{
    $("#ad").height($("#home").height()*0.32);
    $("#home-module").height($("#home").height()-$("#ad").height());
    $("#home-module-total-num").height($("#home-module-total").height()-60);
    $("#home-module-buttons-button").height($("#home-module-buttons").height()-60);
    var swipeContent = '<div class="swiper-wrapper"><div class="swiper-slide">' +
        '<img src="assets/img/adtest.png" width="100%" height="100%" />' +
        '</div>' +
        '</div><!-- Add Pagination --><div class="swiper-pagination"></div>';
    $("#home_ad").empty();
    $("#home_ad").append(swipeContent);
    var swiper = new Swiper('#home_ad', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: 5000,
        parallax: true,
        autoplayDisableOnInteraction: false
    });

    init_homepage();
}


function qrcode_load()
{
    if ($.os.ios) {
        $("#shareButton").hide();
    }
}

//初始化首页看板
function initHomeModuleTable(){

    getAjax(queryIndexOrderCountUrl ,{'orderEnterpriseNo':enterpriseNo,
            'systemNo':systemNo, 'orderNo':orderNo,
            'dispatchNo':dispatchNo},
        "queryIndexOrderCountSucc(data)", "errorPopup('网络请求超时,请检查网络后再尝试..')");

    $('#home-module-table').html('');
}

function queryIndexOrderCountSucc(){
//    if( data.isSucc ){
//
//    }
    var user = JSON.parse(localStorage.getItem("user"));
    var userType = user.obj.userType;
    var result = '';
    if(userType == 0 || userType == 1) {
        result = '<tr><td style="width:20%;">'+
        '<div style="color:#ef8305;font-size:24px;">156</div>'+
        '<div style="color:#636363;font-size:18px;">今日送</div>'+
        '</td><td style="width:20%;border-left:1px solid #e6e6e6;'+
        'border-right: 1px solid #e6e6e6">'+
        '<div style="color:#ef8305;font-size:24px;">367</div>'+
        '<div style="color:#636363;font-size:18px;">在途中</div>'+
        '</td><td style="width:20%;border-right: 1px solid #e6e6e6">'+
        '<div style="color:#ef8305;font-size:24px;">4</div>'+
        '<div style="color:#636363;font-size:18px;">逾期</div>'+
        '</td><td style="width:20%;">'+
        '<div style="color:#ef8305;font-size:24px;">4</div>'+
        '<div style="color:#636363;font-size:18px;">异常</div></td></tr>';
    }  else if (userType == 2){
        result = '<tr><td style="width:33%;">'+
            '<div style="color:#ef8305;font-size:24px;">156</div>'+
            '<div style="color:#636363;font-size:18px;">今日达</div>'+
            '</td><td style="width:33%;border-left:1px solid #e6e6e6;'+
            'border-right: 1px solid #e6e6e6">'+
            '<div style="color:#ef8305;font-size:24px;">367</div>'+
            '<div style="color:#636363;font-size:18px;">在途中</div>'+
            '</td><td style="width:33%;">'+
            '<div style="color:#ef8305;font-size:24px;">4</div>'+
            '<div style="color:#636363;font-size:18px;">逾期</div>'+
            '</td></tr>';
    }
    $('#home-module-table').empty();
    $('#home-module-table').append(result);
}

//初始化首页底部panel 和 绑定事件
function initHomeFooter(userType){
    if(userType == 2 ){
//        $('#addOrderPanel').find('i').removeClass('icon-songhuo icon-kefu').addClass('icon-kefu');
//        $('#addOrderPanelText').text('客服');
        $('#addOrderPanel').unbind('click');
        $('#addOrderPanel').empty();
        $('#addOrderPanel').append('<div style="width:80px;'+
            'height:80px;border-radius:80px;background-color:#01cd88;">'+
            '<a href="tel:4001110005" >'+
            '<i class="iconfont icon-kefu "  style="color:#fff;font-size:56px;line-height:80px">'+
            '</i></a></div>'+
            '<div  id="addOrderPanelText" style="color:#4d4d4d;font-size:18px;width:100px;padding-top: 10px;">'+
            '客服</div>');
    } else {
//        $('#addOrderPanel').find('i').addClass('icon-songhuo icon-kefu').addClass('icon-songhuo');
//        $('#addOrderPanelText').text('下单');
        $('#addOrderPanel').empty();
        $('#addOrderPanel').append('<div style="width:80px;'+
            'height:80px;border-radius:80px;background-color:#01cd88;">'+

            '<i class="iconfont icon-songhuo "  style="color:#fff;font-size:56px;line-height:80px">'+
            '</i></div>'+
            '<div  id="addOrderPanelText" style="color:#4d4d4d;font-size:18px;width:100px;padding-top: 10px;">'+
            '下单</div>');
        $('#addOrderPanel').unbind('click');
        $('#addOrderPanel').bind('click',function(){
            addorder_panel();
        });
        if(userType == 1 ){

        }
    }

}

function trace_panel(elm)
{
    $.ui.loadContent("#trace", false, false, "slide");
    if(elm!=undefined)
    {
        traceLoad(elm);
    }else
    {
        traceLoad();
    }
}



//定位切换
function postion_change(){
    getLocation();
}

function idinfo_panel(flag)
{
    if(localStorage.getItem('user')==null)
    {
        $.ui.loadContent("#portal", false, false, "slide");
    }else
    {
        verify_flag = flag;
        var user = JSON.parse(localStorage.getItem('user'));
        if(user.obj.workerType == 2)
        {
            if(verify_flag == 0)
            {
                $("#selfidinfo_btn").show();
            }else
            {
                $("#selfidinfo_btn").hide();
            }
            $.ui.loadContent("#selfidinfo", false, false, "slide");
        }else
        {
            if(verify_flag == 0)
            {
                $("#orgidinfo_btn").show();
            }else
            {
                $("#orgidinfo_btn").hide();
            }
            $.ui.loadContent("#orgidinfo", false, false, "slide");
        }
        get_imgs();
    }
}

function register_panel()
{
    $.ui.loadContent("#register", false, false, "slide");
}

function addorder_panel(){
    //queryOwnerInfo();
    $.ui.loadContent("addorder",false,false,"slide");
}



function msgdetail_panel(elm){
    TDID = $(elm).attr('id');
    var t = $(elm).attr('title');
    var c = $(elm).attr('content');
   // var titles = $(this).attr('title');
    $('#msgtitle').text(t);
   // $('#msgtitle').html('<p>'+t+'</p>');
    $('#msgcontent').text(c);
    $.ui.loadContent('#messagedetail', false, false, 'slide');
}
function getArea(){
    $('#area_select').mobiscroll('show');

}
function getUserType(){
    $('#usertype_select').mobiscroll('show');
}
function getLoad(){
    $('#load_select').mobiscroll('show');
}

function orderBoard_panel() {
    $.ui.loadContent('#orderBoard', false, false, 'slide');
}


function init_chart(){
    $("#orderBoardChart").height($("#orderBoard").height()-160-60);
    $("#myChart").width($("#orderBoard").width() * 0.6);
    $("#myChart").height($("#orderBoardChart").height() * 0.8);
    var ctx = document.getElementById("myChart").getContext("2d");
    var chartdata = [
        {
            value: 0,
            color:"#2ec7c9"
        },
        {
            value : 0,
            color : "#b6a2de"
        },
        {
            value : 0,
            color : "#5ab1ef"
        },
        {
            value : 0,
            color : "#ffb980"
        },
        {
            value : 0,
            color : "#ffb980"
        }
    ];
    new Chart(ctx).Doughnut(chartdata,{});
}
function init_orderBoard(data)
{
    var count ;
    if( data == 1){
        count = JSON.parse(localStorage.getItem("allCount_1"));
    } else if( data == 7){
        count = JSON.parse(localStorage.getItem("allCount_7"));
    } else if( data == 30){
        count = JSON.parse(localStorage.getItem("allCount_30"));
    } else {
//        count = {
//            "count10":0,
//            "count40":0,
//            "count70":0,
//            "count90":0
//        }
        errorPopup('无数据');
        return ;
    }
//    "count10":count1001,
//    "count40":count4001,
//    "count70":count7001,
//    "count90":count9001
//    localStorage.setItem("allCount_1",allCount_1);
//    localStorage.setItem("allCount_7",allCount_7);
//    localStorage.setItem("allCount_30",allCount_30);
    $("#orderBoardChart").height($("#orderBoard").height()-160-60);
    $("#myChart").width($("#orderBoard").width() * 0.6);
    $("#myChart").height($("#orderBoardChart").height() * 0.8);
    var ctx = document.getElementById("myChart").getContext("2d");
    var chartdata;
    var noneData ;
    if( count.count10 == 0 && count.count40 == 0 && count.count70 == 0 && count.count90 == 0){
        noneData = 1;
    } else {
        noneData = 0;
    }
        chartdata = [
        {
            value: parseInt(count.count10),
            color:"#2ec7c9"
        },
        {
            value : parseInt(count.count40),
            color : "#b6a2de"
        },
        {
            value : parseInt(count.count70),
            color : "#5ab1ef"
        },
        {
            value : parseInt(count.count90),
            color : "#ffb980"
        },
        {
            value : noneData,
            color : "#CD3700"
        }
<<<<<<< HEAD
        ];


    new Chart(ctx).Doughnut(chartdata,{});
=======
    ]
    new Chart(ctx).Doughnut(data,{});
<<<<<<< HEAD
    $(".close").alert()
=======
>>>>>>> 80b9d2230533b93cd9f1ce3a72ce4e1220593c82
    //$(".close").alert()
>>>>>>> 814e0b68a69989f53d98f0bb7ec99b311fb56ee8
}
function init_lightbox(objectNo) {
    /*lightbox = baguetteBox.run('.baguetteBoxOne', {
    });*/
    $('.swipebox.img'+objectNo ).swipebox();
}

/*获取消息列表*/
function getMessageList(user){
        var options = {
            userNo: user.obj.userNo
        };
        getAjax(queryMsgList, options, 'getMsgListSucc(data)', 'getMsgListError(data)');
}
function getMsgListSucc(data){

    var msgliststr="";
    for(var i = 0 ;i<data.obj.length;i++){
       // data.obj[i].noticeTitle;
        var t = data.obj[i].noticeTitle;
        var c = data.obj[i].noticeContent;
        msgliststr += " <tr><td onclick='msgdetail_panel(this)' title='"+data.obj[i].noticeTitle+"' content='"+data.obj[i].noticeContent+"'>"
            +changeContent(data.obj[i].noticeTitle)+"</td><td>"+data.obj[i].noticeEndDate+"</td></tr>";
    }
    $("#msglist").empty();
    $('#msglist').append(msgliststr);
}
function getMsgListError(data){

}
function changeContent(content){
    if(content.length>10){
        return content.substring(0,10)+"......";
    }else{
        return content
    }
}


function getPullToRefresh(that){
    setCacheData("locationFilter",mergeJson(JSON.parse(localStorage.getItem("locationFilter")),{'queryType':'1'},true),true);
    jQuery.ajax({
        url: queryOrderList,
        timeout: 20000, //超时X秒
        dataType: 'jsonp',
        data:JSON.parse(localStorage.getItem("locationFilter"))
    }).done(
        function (data) {
            if(data!=null)
            {
                if (data.isSucc === false && data.msg !=null && data.msg.indexOf('E0000') != -1 ) {
                    errorSessionPopup();
                }
                else if(data.isSucc === false && data.msg !=null&& data.msg.indexOf('E0000') == -1){
                    var msgText=data.msg.split("-")
                    errorPopup(msgText[1])
                }else{
                    try{
                        if(data.obj.data.length==0){
                            $("#main_pulldown").html("<h2 style='color: #F6842B'>暂无新订单</h2>")
                        }else{
                            $("#main_pulldown").html("<h2 style='color: #F6842B'>新增"+data.obj.data.length+"笔订单</h2>")
                            updateMainPanel(data,true);
                        }
                        //eval(successFunction);
                    }catch(e){
                        //sendErrorInfo(errorInfo,true);
                    };
                }
            }
        }).fail(function () {
            try{
                //eval(failFunction);
            }catch(e){
                //sendErrorInfo(errorInfo,true);
            };
        }).always(function () {
            setTimeout(function () {
                    setCacheData("locationFilter",mergeJson(JSON.parse(localStorage.getItem("locationFilter")),{'queryType':'2'},true),true);
                    that.hideRefresh();
                }, 1000);
        });
}

function getRequestFromInfinite(self) {
    jQuery.ajax({
        url: queryOrderList,
        timeout: 20000, //超时X秒
        dataType: 'jsonp',
        data:JSON.parse(localStorage.getItem("locationFilter"))
    }).done(
        function (data) {
            if(data!=null)
            {
                if (data.isSucc === false && data.msg !=null && data.msg.indexOf('E0000') != -1 ) {
                    errorSessionPopup();
                }
                else if(data.isSucc === false && data.msg !=null&& data.msg.indexOf('E0000') == -1){
                    var msgText=data.msg.split("-")
                    errorPopup(msgText[1])
                }else{
                    try{
                        $(self.el).find("#infinite").remove();
                        self.clearInfinite();
                        updateMainPanel(data);
                    }catch(e){
                    };
                }
            }
        }).fail(function () {
            try{
                //eval(failFunction);
            }catch(e){
                //sendErrorInfo(errorInfo,true);
            };
        }).always(function () {
            ajaxFlag=true;
        });

}