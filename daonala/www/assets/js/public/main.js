function include(path){
    var a=document.createElement("script");
    a.type = "text/javascript";
    a.src=path;
    var head=document.getElementsByTagName("head")[0];
    head.appendChild(a);
}
include("assets/js/.js");


function mainPanleUnLoad(){
    console.log("mainPanleUnLoad")
}
function message_panel(){
    $.ui.loadContent("#message", false, false, "slide");
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

function getArea(){
    $('#area_select').mobiscroll('show');

}
function getUserType(){
    $('#usertype_select').mobiscroll('show');
}
function getLoad(){
    $('#load_select').mobiscroll('show');
}

function biddingRecode_panel(){
    $.ui.loadContent("#biddingRecord", false, false, "slide");
    $("#biddingRecodeHeader").html("<div style='float:left;width:10%;cursor:pointer;'><a onclick='$.ui.goBack()' >" +
        "<img src='assets/img/back.png' /></a></div>" +
        "<div style='float:left;width:80%;text-align:center;margin:5px auto;' " +
        " ><div class='btn-group' role='group'><button type='button' " +
        "class='btn btn-default'>竞价成功</button> <button type='button' " +
        "class='btn btn-default'  style='background-color: #EF8305;color:#FFFFFF;'>" +
        "竞价中</button> <button type='button' class='btn btn-default' " +
        "style='background-color: #EF8305;color:#FFFFFF;'>竞价失败</button></div></div>" +
        "<div style='clear:both;width:10%'></div>");
    //$("#biddingRecodeHeader").css('text-align','center');
}


function updateMainPanel(data,prepend){
    //判断有没有传入第二个参数 没传入给false为默认值
    // 这个值是用来判断新加载的信息添加的原有信息之上还是之下
    var prependFlag = arguments[1] ? arguments[1] :false ;
    var oldLocationFilter = JSON.parse(localStorage.getItem("locationFilter"));
    var containNode = $("<div class='containNode'></div>");
    var list=data.obj.data;
    var liNode = null;
    if(list.length == 0){//如果没数据
        if($("#nullOrderHome").length == 0)
        {
            $("<div id='nullOrderHome' class='nullOrder nullOrderHome'><p style='text-align: center;text-color:orange;'>暂无剩余订单..</p></div>").appendTo("#orderList");
        }

    }else{
        //数据正常
        //如果有暂无剩余订单删除
    $('#nullOrderHome').remove();
        //绘制页面
    for (var i in list) {
        liNode = $('<li id="'+list[i].consignNo+'" data-order-detail=\''+JSON.stringify(list[i])+'\';><div  class="lh4 f16 f2 p0-6">'+
        '<div class="fl f18">'+list[i].nOriginCity +'<span class="icon-arrow-forward order-arrow-color"></span>'+list[i].nDesCity+'' +
        '</div>'+
        '<div class="fl f12"><span style="width:auto; margin-left:10px; ' +
        ' padding: 2px; border:1px solid #E3E3E3;">'+list[i].vehicleTypeDesc+'</span></div>' +
        '<div class="fr f14">距离结束  <span class="order-arrow-color">'+list[i].surplusDate+'</span></span></div></div><div  class="lh7 p0-6"><div class="fl width6 lh7"><div >'+
        '<p class="lh2 order-detail-text mt10">'+list[i].articleGroup+' '+
        list[i].goodsWt+'吨 '+list[i].goodsVol+'m³ </p>'+
        '<p class="lh2 order-detail-text">'+'接货时间：'+list[i].deliveryTimeDesc+'</p></div></div><div class="fr width3 lh7 text-right get-order">'+
        '<p class="lh2 mb10 order-detail-text">标价 <span class="f16">'+list[i].basePrice+'</span> 元</p><p class="lh5"><a class="p6 f18 order-btn" style="padding: 5px 30px">抢</a></p>'+
        '</div></div></li>');
        $(liNode).appendTo(containNode);
    }

        if(prependFlag){
            //添加新数据到列表顶上
            $("#orderList").prepend(containNode);
        }else{
            if(list.length<(oldLocationFilter.length-=0)){
                if($("#nullOrderHome").length == 0)
                {
                //如果新数据不够10条调添加暂无剩余订单
                $("<div id='nullOrderHome' class='nullOrder nullOrderHome'><p style='text-align: center;text-color:orange;'>暂无剩余订单..</p></div>").appendTo(containNode);
                }
           }
            //常规添加到底部
            $(containNode).appendTo("#orderList");


        }

    }
    //更新头部信息
    var pageTitleText
    if(oldLocationFilter.vOriginAddrCity == undefined || oldLocationFilter.vOriginAddrCity == ""){
        pageTitleText="竞价抢单"
    }else{
        pageTitleText=oldLocationFilter.vOriginAddrCity
        if(oldLocationFilter.vDesAddrCity != undefined && oldLocationFilter.vDesAddrCity != ""){
            pageTitleText+=' — '+oldLocationFilter.vDesAddrCity;
        }
    }
    $("#pageTitle").html(pageTitleText);
    //覆盖缓存
    setCacheData("locationFilter",mergeJson(oldLocationFilter,{'start':(oldLocationFilter.start-=0)+data.obj.data.length,'queryDate':data.obj.queryDate},true),true);
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