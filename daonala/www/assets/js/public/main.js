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
include("assets/js/setup/share.js");
include("assets/js/setup/map.js");
include("assets/js/order/addressScroll.js");
function mainPanleUnLoad(){
    console.log("mainPanleUnLoad")
}
function message_panel(){
    var user = localStorage.getItem('e_user');
    user = JSON.parse(user);

    if(user!=null){
        $.ui.loadContent("#message", false, false, "slide");
        getMessageList(user);
    }else{
        $.ui.loadContent("#login", false, false, "slide");
    }
}

function map_panel() {
    $.ui.loadContent("#map", false, false, "slide");
}
function mine_panel()
{
    //$("#userpart").height($("#mine").height()/2);
    //$("#mine_module").height($("#mine").height()-$("#userpart").height());

    var user = JSON.parse(localStorage.getItem('e_user'));

    if ( user == null){
        login_panel();
    }else{
        $('#userNameMine').text(user.obj.userName);
        $.ui.loadContent("#mine", false, false, "slide");
    }

}

function adDetail_panel() {
    $.ui.loadContent('#adDetail', false, false, 'slide');
}


function main_panel()
{

    if ( localStorage.getItem('e_user') == null){
        login_panel();
    }else{
        $.ui.loadContent("#main", false, false, "slide");
    }
}

function home_panel()
{
    $.ui.loadContent("#home2", false, false, "slide");
}

function login_panel()
{
    //var user = JSON.parse(localStorage.getItem('e_user'));
    //$('#userNameMine').text(user.obj.userName);
    $.ui.loadContent("#login", false, false, "slide");
}

function register_panel()
{
    $.ui.loadContent("#register", false, false, "slide");
}

//跳转个人资料页面
function selfInfo_panel(){
    initselfInfo();

}

function updatePassword_panel(){
    $('#oldPwd').val('');
    $('#newPwd').val('');
    $.ui.loadContent("#updtPwd", false, false, "slide");
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

function toconfirmownerPanel(){
    //$("#ownerswitchDiv").empty();
    //$("#ownerswitchDiv").append(switchHtml);
  /*  $.fn.bootstrapSwitch.default.onText = 'save';
    $.fn.bootstrapSwitch.default.ffText = 'no';
    $("[name='o-checkbox']").bootstrapSwitch('state', true, true);
    initOwnerOrcustSwith();*/
    clearConfirmPanelData();//清除数据
    $.ui.loadContent("#confirmowner", false, false, "slide");
}
function toconfirmcustPanel(){
    clearConfirmPanelData();
    $.ui.loadContent("#confirmcust", false, false, "slide");
}
function choiceGood(){
    clearConfirmPanelData();
    $.ui.loadContent("#confirmgood", false, false, "slide");
}

function clearConfirmPanelData(){
    $('#confirmcustContent').find('input[type=text]').val('');
    $('#confirmownerContent').find('input[type=text]').val('');
    $('#confirmgoodContent').find('input[type=text]').val('');
}
//物流看板初始化页面
function logisticboard_panel(){
    localStorage.removeItem('searchFilter');
    $(".alert").hide();
    init_orderboardheader();//初始化头部和圆形图标
    initBoardSearchPage();//初始化看板刷选页
    initLogisticBoard();

}
function ownerboard_panel(){
    $(".alert").hide();
    init_orderboardheader();
    initBoardSearchPage();
    initLogisticBoard();
}
function custboard_panel(elm){

    if(localStorage.getItem('e_user')==null){
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


    if(localStorage.getItem('e_user')==null){
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
    /*$("#orderdetailBackId").attr('onclick',
     "$.ui.loadContent('#orderlist', false, false, 'slide')");*/


 //   var user = JSON.parse(localStorage.getItem('e_user'));
//    if(user.obj.userType == 2){
//        //$('#orderdetailBackId').attr('onclick',"$.ui.loadContent('#custboard', false, false, 'slide')");
//        $('#orderdetailBackId').attr('onclick',"custboard_panel();");
//    }else{
//        $('#orderdetailBackId').attr('onclick',"$.ui.loadContent('#orderlist', false, false, 'slide')");
//    }
    initTraceInfo2();//初始化订单详情
    $.ui.loadContent("#orderMaindetail", false, false, "slide");
}
// 登陆时 单条订单新跟踪
function traceSingleInfo33(){
    clear_orderdetailPage();
    if ( lastPage == 'search' ){
        $('#orderdetailBackId').attr('onclick',"$.ui.loadContent('#search', false, false, 'slide')");
    } else if ( lastPage == 'orderlist' ) {
        $('#orderdetailBackId').attr('onclick',"$.ui.loadContent('#orderlist', false, false, 'slide')");
    } else if ( lastPage == 'home2'){
        $('#orderdetailBackId').attr('onclick',"$.ui.loadContent('#home2', false, false, 'slide')");
    } else if ( lastPage == 'orderBoard' ){
        $('#orderdetailBackId').attr('onclick',"$.ui.loadContent('#orderBoard', false, false, 'slide')");
    } else if ( lastPage == 'custboard' ){
        $('#orderdetailBackId').attr('onclick',"custboard_panel();");
    } else {
        $('#orderdetailBackId').attr('onclick',"$.ui.goBack()" );
    }
//    var user = JSON.parse(localStorage.getItem('e_user'));
//    if(user.obj.userType == 2){
//        //$('#orderdetailBackId').attr('onclick',"$.ui.loadContent('#custboard', false, false, 'slide')");
//        if ($("#orderdetailBackId").attr('onclick')=="$.ui.loadContent('#orderlist', false, false, 'slide')"){
//
//        }else{
//            $('#orderdetailBackId').attr('onclick',"custboard_panel();");
//        }
//
//    }else{
//
//        if( $("#orderdetailBackId").attr('onclick') ==
//            "$.ui.loadContent('#search', false, false, 'slide')"){
//
//        }else if( $("#orderdetailBackId").attr('onclick') ==
//            "$.ui.loadContent('#home2', false, false, 'slide')" ){
//
//        }else{
//                //detailgobackHeader
//            $('#orderdetailBackId').attr('onclick',"$.ui.loadContent('#orderBoard', false, false, 'slide')");
//        }
//    }
    initTraceInfo2();
    $.ui.loadContent("#orderMaindetail", false, false, "slide");
}

function traceSingleInfo(){
//    var user = JSON.parse(localStorage.getItem('e_user'));
//    if(user.obj.userType == 2){
//        $('#orderdetailBackId').attr('onclick',"custboard_panel();");
//
//    }else{
//        $('#orderdetailBackId').attr('onclick',"$.ui.loadContent('#orderBoard', false, false, 'slide')");
//    }
//    $('#orderdetailBackId').attr('onclick',"$.ui.loadContent('#orderBoard', false, false, 'slide')");
    clear_orderdetailPage();
    initTraceInfo2();
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

function backorderMaindetail(){

  //  traceScroll.destroy();
    $.ui.loadContent('#orderMaindetail', false, false, 'slide');

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
    localStorage.removeItem('searchFilter');
   // localStorage.removeItem('routeList');
    $('#searchText').val('');
    if(localStorage.getItem("e_user")!=null) {
        var user = JSON.parse(localStorage.getItem("e_user"));
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
//    routeList
//    navContent
    $('#navContent').empty();
    var arr_v = [];
    arr_v = JSON.parse( localStorage.getItem('routeList') );
    if( arr_v != null && arr_v.length > 0 ) {
        $('#searchHistory').show();
        var results = '';
        for ( var e = 0,len = arr_v.length; e < len; e++ ){
            var result = ' <li v ='+arr_v[e]+' onclick="searchRoute(this)" style="line-height:32px;border-bottom:1px dashed #D0D1D6;" class="clearfix">'+
             '   <div class="fl" style="color:#696969;font-size:14px;" >'+
             '' + arr_v[e] + '</div>'+
            '<div class="fr" style="color:#A1A1A1;margin-right:10px;">'+
              '  <img src="assets/img/detail-icon.png" class="">'+
               ' </div></li>';
            results +=result;

        }
        $('#navContent').append(results);

    }else{
        $('#searchHistory').hide();
    }
}


function searchRoute(elm){
    var searchText = $(elm).attr('v')
    $('#searchText').val(searchText);
    search();
}

function queryAd() {
    try{
    var os = 'android';
    if (window.OSInfo != null) {
        os = window.OSInfo.os;
    }
    var options =
    {
        version: 0,
        os: os,
        type: 1
    };

    getAjax(queryAdList, options, 'queryAdListSucc(data)');
    }catch(e){
        ifAdNull();
    }
    init_homepage();
}

/**
 * 渲染广告到页面
 */
function queryAdListSucc(data) {
    try{
    var html = '';
    if(data.isSucc){

        if (data.obj.length > 0) {
            html = '<div id="" class="swiper-wrapper">';
            var img = '';
            for (var i = 0; len = data.obj.length, i < len; i++) {
                img = smsManageUrl + data.obj[i].advertisement.photoUrl;
                html += '<div class="swiper-slide">' +
                '<img data-notice-detail=\'' + JSON.stringify(data.obj[i]) + '\'' +
                ' src="' + img + '" width="100%" height="100%" onclick="adDetailShow(this)"/>' +
                '</div>';

               /* var swipeContent = '<div class="swiper-wrapper"><div class="swiper-slide">' +
                    '<img src="assets/img/home/banner/home-banner01.png" width="100%" height="100%" />' +
                    '</div>' +
                    '</div><!-- Add Pagination --><div class="swiper-pagination"></div>';*/

                setCacheData('adVersion', data.obj[0].advertisement.vesionNo, 1);
            }
            html += '</div><div class="swiper-pagination"></div>';

        //先注释
            if(swiper==null){
                $("#home_ad").empty();
                $("#home_ad").append(html);
                swiper = new Swiper('#home_ad', {
                    pagination: '.swiper-pagination',
                    paginationClickable: true,
                    spaceBetween: 30,
                    centeredSlides: true,
                    autoplay: 5000,
                    parallax: true,
                    autoplayDisableOnInteraction: false
                });
            }

        }else{
            ifAdNull();
        }
    }else{
        ifAdNull();
    }
    }catch(e){
        ifAdNull();
    }

}

function init_home_ad()
{

    $("#ad").height($("#home2").height()*0.32);
    $("#home-module").height($("#home2").height()-$("#ad").height());
    $("#home-module-total-num").height($("#home-module-total").height()-60);
    $("#home-module-buttons-button").height($("#home-module-buttons").height()-60);

/*
    var adHeight = ($("#home2").height() / 2) - 20;
    var navHeight = adHeight + 20;
    var homeWidht = $("#home2").width();
    $("#ad").height(adHeight);
    $("#home-module").height($("#home2").height() - $("#ad").height());
*/
   // ifAdNull();
    queryAd();

}
function ifAdNull(){
    var swipeContent = '<div class="swiper-wrapper"><div class="swiper-slide">' +
        '<img src="assets/img/home/banner/home-banner01.png" width="100%" height="100%" />' +
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
}

//显示广告详情
function adDetailShow(elm) {
    var data = eval('(' + $(elm).attr('data-notice-detail') + ')');
    if (data.advertisement.hrefUrl != null && data.advertisement.hrefUrl != '') {
        src = data.advertisement.hrefUrl;
        title = data.advertisement.title;
        var frame = $('#map_frame');
        $(frame).attr('src', src);
        $("#noticeHeaderTitle").html(title);
        var height = $("#afui").height() - $("#header").height();
        $("#map_content").css('height', height);
        $.ui.loadContent('#map', false, false, 'slide');
    } else {
        $("#adTitle").html(data.advertisement.title);
        $("#adContent").html(data.advertisement.adContent);
        adDetail_panel();
    }
}


function removeFrame() {
    $('#map_frame').attr('src', null);
    $.ui.goBack();
}
function qrcode_load()
{
}
function qrcode_panel() {
    $.ui.loadContent("#qrcode", false, false, "slide");
}

//初始化首页看板
function initHomeModuleTable(){
   // userType,  userNo,enterpriseNo,ownerNo,custNo
    var user = JSON.parse(localStorage.getItem('e_user'));
    getAjax(queryIndexOrderCountUrl ,{'enterpriseno':user.obj.logisticNo,
            'ownerNo':user.obj.ownerNo, 'custNo':user.obj.custNo
           },
        "queryIndexOrderCountSucc(data)", "errorPopup('网络请求超时,请检查网络后再尝试..')");


}
function initUnloginHomeTable(){
    result =
        '<tr><td style="width:33%;">'+
        '<div style="color:#ef8305;font-size:24px;">0</div>'+
        '<div style="color:#636363;font-size:18px;">今日达</div>'+
        '</td><td  style="width:33%;border-left:1px solid #e6e6e6;'+
        'border-right: 1px solid #e6e6e6">'+
        '<div style="color:#ef8305;font-size:24px;">0</div>'+
        '<div style="color:#636363;font-size:18px;">在途中</div>'+
        '</td><td  style="width:33%;">'+
        '<div style="color:#ef8305;font-size:24px;">0</div>'+
        '<div style="color:#636363;font-size:18px;">逾期</div>'+
        '</td></tr>';
    $('#home-module-table').empty();
    $('#home-module-table').append(result);
}
function queryIndexOrderCountSucc(data){
    if( data.isSucc ){

    $('#home-module-table').html('');
    var user = JSON.parse(localStorage.getItem("e_user"));
    var userType = user.obj.userType;
    var result = '';

    if(userType == 0 || userType == 1) {
        result =
        '<tr ><td count = "'+data.obj.deliveryCount+'" ' +
            'onclick = "searchOrderFromIndex(0,'+data.obj.deliveryCount+');"style="width:20%;">'+
        '<div style="color:#ef8305;font-size:24px;">'+data.obj.deliveryCount+'</div>'+
        '<div style="color:#636363;font-size:18px;">今日送</div>'+
        '</td><td count = "'+data.obj.onwayCount+'" ' +
            'onclick = "searchOrderFromIndex(1,'+data.obj.onwayCount+');"style="width:20%;border-left:1px solid #e6e6e6;'+
        'border-right: 1px solid #e6e6e6">'+
        '<div style="color:#ef8305;font-size:24px;">'+data.obj.onwayCount+'</div>'+
        '<div style="color:#636363;font-size:18px;">在途中</div>'+
        '</td><td count = "'+data.obj.outTimeCount+'" ' +
            'onclick = "searchOrderFromIndex(4,'+data.obj.outTimeCount+');" style="width:20%;border-right: 1px solid #e6e6e6">'+
        '<div style="color:#ef8305;font-size:24px;">'+data.obj.outTimeCount+'</div>'+
        '<div style="color:#636363;font-size:18px;">逾期</div>'+
        '</td><td  count = "'+data.obj.exceptionCount+'" ' +
            'onclick = "searchOrderFromIndex(3,'+data.obj.exceptionCount+');" style="width:20%;">'+
        '<div style="color:#ef8305;font-size:24px;">'+data.obj.exceptionCount+'</div>'+
        '<div style="color:#636363;font-size:18px;">异常</div></td></tr>';
    }  else if (userType == 2){
        result =
            '<tr><td count = "'+data.obj.arriviedCount+'" ' +
                'onclick = "searchOrderFromIndex(2,'+data.obj.arriviedCount+' );"style="width:33%;">'+
            '<div style="color:#ef8305;font-size:24px;">'+data.obj.arriviedCount+'</div>'+
            '<div style="color:#636363;font-size:18px;">今日达</div>'+
            '</td><td count = "'+data.obj.onwayCount+'" ' +
                'onclick = "searchOrderFromIndex(1, '+data.obj.onwayCount+');" style="width:33%;border-left:1px solid #e6e6e6;'+
            'border-right: 1px solid #e6e6e6">'+
            '<div style="color:#ef8305;font-size:24px;">'+data.obj.onwayCount+'</div>'+
            '<div style="color:#636363;font-size:18px;">在途中</div>'+
            '</td><td count = "'+data.obj.outTimeCount+'" ' +
                'onclick = "searchOrderFromIndex(4,'+data.obj.outTimeCount+' );" style="width:33%;">'+
            '<div style="color:#ef8305;font-size:24px;">'+data.obj.outTimeCount+'</div>'+
            '<div style="color:#636363;font-size:18px;">逾期</div>'+
            '</td></tr>';
    }
    $('#home-module-table').empty();
    $('#home-module-table').append(result);

    }

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
    if(localStorage.getItem('e_user')==null)
    {
        $.ui.loadContent("#portal", false, false, "slide");
    }else
    {
        verify_flag = flag;
        var user = JSON.parse(localStorage.getItem('e_user'));
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
    clearConfirmData();
    $.ui.loadContent("addorder",false,false,"slide");
}



function msgdetail_panel(elm){
    TDID = $(elm).attr('id');
    var t = $(elm).attr('title');
    var c = $(elm).attr('content');
    var d = $(elm).attr('date');
   // var titles = $(this).attr('title');
    $('#msgtitle').text(t);
   // $('#msgtitle').html('<p>'+t+'</p>');
    $('#msgcontent').text(c);
    $('#msgDate').text(d);
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


//function init_chart(){
//    $("#orderBoardChart").height($("#orderBoard").height()-160-60);
//    $("#myChart").width($("#orderBoard").width() * 0.6);
//    $("#myChart").height($("#orderBoardChart").height() * 0.8);
//    var ctx = document.getElementById("myChart").getContext("2d");
//    var chartdata = [
//        {
//            value: 0,
//            color:"#2ec7c9"
//        },
//        {
//            value : 0,
//            color : "#b6a2de"
//        },
//        {
//            value : 0,
//            color : "#5ab1ef"
//        },
//        {
//            value : 0,
//            color : "#ffb980"
//        },
//        {
//            value : 0,
//            color : "#ffb980"
//        }
//    ];
//    new Chart(ctx).Doughnut(chartdata,{});
//}
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
    ]
    new Chart(ctx).Doughnut(chartdata,{});
    //$(".close").alert()

}
function init_lightbox(objectNo) {
    /*lightbox = baguetteBox.run('.baguetteBoxOne', {
    });*/
    $('.img'+objectNo).swipebox();
    //$('.swipebox .el').swipebox();
}

/*获取消息列表*/
function getMessageList(user){
        var options = {
            userNo: user.obj.userNo
        };
        getAjax(queryMsgList, options, 'getMsgListSucc(data)', 'getMsgListError(data)');
}
function getMsgListSucc(data){

    template.helper('changeContent', function (content) {
        if(content.length>24){
            return content.substring(0,24)+"......";
        }else{
            return content
        }
    });

    var html = template('messageContentListTemp',data);

    /*var msgliststr="";
    for(var i = 0 ;i<data.obj.length;i++){
       // data.obj[i].noticeTitle;
        var t = data.obj[i].noticeTitle;
        var c = data.obj[i].noticeContent;
        msgliststr += " <tr><td onclick='msgdetail_panel(this)' title='"+data.obj[i].noticeTitle+"' content='"+data.obj[i].noticeContent+"'>"
            +changeContent(data.obj[i].noticeTitle)+"</td><td>"+data.obj[i].noticeEndDate+"</td></tr>";
    }*/
    $("#messageContentList").empty();
    $('#messageContentList').append(html);
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