function include(path){
    var a=document.createElement("script");
    a.type = "text/javascript";
    a.src=path;
    var head=document.getElementsByTagName("head")[0];
    head.appendChild(a);
}
include("assets/js/login.js");
include("assets/js/register.js");
include("assets/js/public/setup.js");
include("assets/js/order/search.js");
include("assets/js/order/orderlist.js");
include("assets/js/order/trace.js");

//include("assets/js/.js");


function mainPanleUnLoad(){
    console.log("mainPanleUnLoad")
}
function message_panel(){
    var user = localStorage.getItem('user');
    user = JSON.parse(user);
    getMessageList(user);
    if(user!=null){
        $.ui.loadContent("#message", false, false, "slide");
    }else{
        $.ui.loadContent("#login", false, false, "slide");
    }
}
function mine_panel()
{
    $.ui.loadContent("#mine", false, false, "slide");
}
function main_panel()
{
    $.ui.loadContent("#main", false, false, "slide");
}

function home_panel()
{
    $.ui.loadContent("#home", false, false, "slide");
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
function logisticboard_panel(){
    $.ui.loadContent("#logisticboard", false, false, "slide");
}
function ownerboard_panel(){
    $.ui.loadContent("#ownerboard", false, false, "slide");
}
function custboard_panel(){
    $.ui.loadContent("#custboard", false, false, "slide");
}
function driverboard_panel(){
    $.ui.loadContent("#driverboard", false, false, "slide");
}

/*订单查询*/
function searchorder_panel(){
    init_search_panel();
    $.ui.loadContent("#search", false, false, "slide");
}
/*订单跟踪 未登录*/
function traceInfo(elm){
    /*init_search_panel();*/
  //  $(elm).attr('data-todo-detail')
    if(elm!=null){
    setCacheData("currentorder",JSON.parse($(elm).attr('data-order-detail')) ,1);
    initTraceInfo();
    $.ui.loadContent("#ordertrace", false, false, "slide");
    }else{

        initTraceInfo();
        $.ui.loadContent("#ordertrace", false, false, "slide");
    }
}
/*订单跟踪 登录*/
function traceInfo2(elm){
    /*init_search_panel();*/
    setCacheData("currentorder",JSON.parse($(elm).attr('data-order-detail')) ,1);
    initTraceInfo2();
    $.ui.loadContent("#ordertrace2", false, false, "slide");
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
}


function qrcode_load()
{
    if ($.os.ios) {
        $("#shareButton").hide();
    }
}




function todo_panel() {
    if(localStorage.getItem('user')==null){
        $.ui.loadContent("#portal", false, false, "slide");
    }else
    {
        $.ui.loadContent("#todo", false, false, "slide");
        $("#todoHeader").html("<div style='float:left;width:15%;cursor:pointer;'>" +
            "<a onclick='home_panel()'>" +
            "<img src='assets/img/back.png' />" +
            "<b style='margin-left:0px;position:relative;top:4px;font-size:12px;color:#FFFFFF;'>首页</b></a></div>" +
            "<div style='float:left;width:75%;text-align:center;margin:5px auto;' " +
            " ><div class='btn-group' role='group'><button" +
            " onclick='toggleTodoTabs(this)' status='0' type='button' " +
            "class='btn btn-default tabTodoSelYes'>当前任务</button>" +
            " <button onclick='toggleTodoTabs(this)' status='1'  type='button' " +
            "class='btn btn-default tabTodoSelNo'  >" +
            "历史任务</button></div></div>" +
            "<div style='clear:both;width:10%'></div>");
        todoTabStatus = 0;
        todoPanleLoad();
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


function qrcode_panel()
{
    if(localStorage.getItem("user")!=null)
    {
        var user = JSON.parse(localStorage.getItem("user"));
        $("#myPopularizeCode").html("我的推广码："+user.obj.popularizeCode);
    }
    $.ui.loadContent("#qrcode", false, false, "slide");
}

function search_panel()
{
    var locationObj = localStorage.getItem("locationObj");
    var user = localStorage.getItem("user");

    if(locationObj != null)
    {
        locationObj = JSON.parse(locationObj);
        $("#search-departure").val(locationObj.provinceName+" "+locationObj.cityName);
    }

    user = JSON.parse(user);
    $("#search-cartype").val('');
    //1:企业2:个人
    if(user.obj.workerType == 1)
    {
        $(".destination_class").removeClass('input-bot');
        $(".destination_class").addClass('input-mid');
        $(".cartype_class").show();
    }else
    {
        $(".destination_class").removeClass('input-mid');
        $(".destination_class").addClass('input-bot');
        $(".cartype_class").hide();
    }

    $.ui.loadContent('#search', false, false, 'down');
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



/*获取消息列表*/
function getMessageList(user){
   // user = JSON.parse(user);
    var options = {
        userNo:user.obj.userNo
    };
    getAjax(queryMsgList,options,'getMsgListSucc(data)','getMsgListError(data)');
}
function getMsgListSucc(data){

    var msgliststr="";
    for(var i = 0 ;i<data.obj.length;i++){
       // data.obj[i].noticeTitle;
        var t = data.obj[i].noticeTitle;
        var c = data.obj[i].noticeContent;
        msgliststr += " <tr><td onclick='msgdetail_panel(this)' title='"+data.obj[i].noticeTitle+"' content='"+data.obj[i].noticeContent+"'>"
            +data.obj[i].noticeTitle+"</td><td>"+data.obj[i].noticeEndDate+"</td></tr>";
    }
    $("#msglist").empty();
    $('#msglist').append(msgliststr);
}
function getMsgListError(data){

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