/**
 * Created by xiaoF on 15/2/19.
 */


/* This code is used to run as soon as intel.xdk activates */
var onIntelDeviceReady = function () {
    intel.xdk.device.setRotateOrientation("portrait");
    intel.xdk.device.setAutoRotate(false);
    webRoot = intel.xdk.webRoot + "";
    //hide splash screen
    intel.xdk.device.hideSplashScreen();
    $.ui.blockPageScroll(); //block the page from scrolling at the header/footer
};
document.addEventListener("intel.xdk.device.ready", onIntelDeviceReady, false);

$(document).ready(function(){

    if ($.os.ios) {
        $("#afui").addClass("overlayStatusbar");
    }


    if(localStorage.getItem("user")){
        setCacheData("myFilter",mergeJson(JSON.parse(localStorage.getItem("myFilter")),{'start':'1'},true),true);
        getAjax(queryMyOrderList,JSON.parse(localStorage.getItem("myFilter")),"setCacheData('myList',data,false)");
    }else{
        var myOption= {
            'queryDate':'',
            'queryType':'2',
            'start':'1',
            'length':'10',
            "workerNo":""
        }
        localStorage.setItem("myFilter",JSON.stringify(myOption))
    }

    //queryOrderList
    var localStorageVersion= parseFloat(localStorage.getItem("localStorageVersion"));


    if(localStorageVersion<currentVersion|| isNaN(localStorageVersion) ){
    //if(1==1){
        //需要设置currentVersion
        $("#splashscreen").removeClass().empty();
        var swiperDiv = $.create("div", {
            className: "swiper-container",
            id:"screenWrapper",
            html: '<div class="swiper-wrapper">' +
            '<div class="swiper-slide"><div class="slide1"></div></div>' +
            '<div class="swiper-slide"><div class="slide2"></div></div>' +
            '<div class="swiper-slide"><div class="slide3 text-center" ><div class="lh2"></div><a onclick="goMainFormSlider()" class="btn  btn-lg" style="padding: 10px 40px;background: #fff;"><span class="icon-local-shipping" style="font-size: 40px"></span><P class="f32">立即抢单</P></a></div></div></div>' +
            '<div class="pagination"></div>'
        });
        $(swiperDiv.get(0)).appendTo("#splashscreen");
        var mySwiper = new Swiper('#screenWrapper',{
            pagination: '.pagination',
            paginationClickable: true
        })
    }else{
        $.ui.launch();
        alertLocationPopup = true;
    }
});

function launchUI(data){
    setCacheData('mainList',data,false)
    $.ui.launch();
}
function errorlaunchUI(){
    //setCacheData('mainList',data,false)
    $.ui.launch();
}

$.ui.ready(function(){

    init_dom();

    //Date
    var currYear = new Date().getFullYear();
    $('#search-start-pay').mobiscroll().date({
        theme: 'android-ics light',
        lang: 'zh',
        display: 'bottom',
        dateOrder: 'yyyy mm dd',//弹出显示日期格式
        dateFormat: 'yyyy-mm-dd',//选中后的值格式
        defaultValue: new Date(new Date().setFullYear(currYear)),
        maxDate: new Date(),
        minDate: new Date(new Date().setFullYear(currYear - 10))
    });
    $('#showStartPaySearchDate').click(function(){
        $('#search-start-pay').mobiscroll('show');
        return false;
    });
    $('#search-end-pay').mobiscroll().date({
        theme: 'android-ics light',
        lang: 'zh',
        display: 'bottom',
        dateOrder: 'yyyy mm dd',//弹出显示日期格式
        dateFormat: 'yyyy-mm-dd',//选中后的值格式
        defaultValue: new Date(new Date().setFullYear(currYear)),
        maxDate: new Date(),
        minDate: new Date(new Date().setFullYear(currYear - 10))
    });
    $('#showEndPaySearchDate').click(function(){
        $('#search-end-pay').mobiscroll('show');
        return false;
    });



    jQuery('#usertype_select').mobiscroll().select({
        theme: "android-ics light",     // Specify theme like: theme: 'ios' or omit setting to use default
        mode: "mixed",       // Specify scroller mode like: mode: 'mixed' or omit setting to use default
        display: "bottom", // Specify display mode like: display: 'bottom' or omit setting to use default
        lang: "zh"      ,  // Specify language like: lang: 'pl' or omit setting to use default
        onBeforeShow: function (html, inst) {
        },
        onShow: function () {

        },
        onClose: function () {

        },
        onCancel: function () {

        },
        onSelect: function (v, inst) {
            $("#usertypeCode").val(v);
        }
    });



    jQuery('#deliverremark_select').mobiscroll().select({
        theme: "android-ics light",     // Specify theme like: theme: 'ios' or omit setting to use default
        mode: "mixed",       // Specify scroller mode like: mode: 'mixed' or omit setting to use default
        display: "bottom", // Specify display mode like: display: 'bottom' or omit setting to use default
        lang: "zh"      ,  // Specify language like: lang: 'pl' or omit setting to use default
        onBeforeShow: function (html, inst) {
        },
        onShow: function () {

        },
        onClose: function () {

        },
        onCancel: function () {

        },
        onSelect: function (v, inst) {
            $("#deliverremarks").val(v);
        }
    });
    jQuery('#followremark_select').mobiscroll().select({
        theme: "android-ics light",     // Specify theme like: theme: 'ios' or omit setting to use default
        mode: "mixed",       // Specify scroller mode like: mode: 'mixed' or omit setting to use default
        display: "bottom", // Specify display mode like: display: 'bottom' or omit setting to use default
        lang: "zh"      ,  // Specify language like: lang: 'pl' or omit setting to use default
        onBeforeShow: function (html, inst) {
        },
        onShow: function () {

        },
        onClose: function () {

        },
        onCancel: function () {

        },
        onSelect: function (v, inst) {
            $("#followremarks").val(v);
        }
    });
    jQuery('#followstatus_select').mobiscroll().select({
        theme: "android-ics light",     // Specify theme like: theme: 'ios' or omit setting to use default
        mode: "mixed",       // Specify scroller mode like: mode: 'mixed' or omit setting to use default
        display: "bottom", // Specify display mode like: display: 'bottom' or omit setting to use default
        lang: "zh"      ,  // Specify language like: lang: 'pl' or omit setting to use default
        onBeforeShow: function (html, inst) {
        },
        onShow: function () {

        },
        onClose: function () {

        },
        onCancel: function () {

        },
        onSelect: function (v, inst) {

            $("#followstatus").val(v);
            if(v=='正常反馈'){
                $("#followremarks").val('正常反馈');
                //$("#followremark_select option[value='3']").remove();
                // followremark_select
                $("#followremark_select1").css('display','none');

            }else if(v=='异常反馈'){
                $("#followremarks").val('');
                $("#followremark_select1").show();
            }

        }
    });jQuery('#handoverremark_select').mobiscroll().select({
        theme: "android-ics light",     // Specify theme like: theme: 'ios' or omit setting to use default
        mode: "mixed",       // Specify scroller mode like: mode: 'mixed' or omit setting to use default
        display: "bottom", // Specify display mode like: display: 'bottom' or omit setting to use default
        lang: "zh"      ,  // Specify language like: lang: 'pl' or omit setting to use default
        onBeforeShow: function (html, inst) {
        },
        onShow: function () {

        },
        onClose: function () {

        },
        onCancel: function () {

        },
        onSelect: function (v, inst) {
            $("#handoverremarks").val(v);
        }
    });










    $("#myOrderList").delegate("li","click",function(){
        event.stopPropagation()
        event.preventDefault()
        ETID=this.id;
        $.ui.loadContent('#selfOrderOffer', false, false, 'slide')
        return false;
    });



    $("#search-btn").click(function(){


        var departure = $("#search-departure").val()
        var destination = $("#search-destination").val()
        var cartype = $("#search-cartype").val()

        var Filter={};
        if(departure.trim()=='' && destination.trim()=='' && cartype.trim()=='') {
            Filter = {'start':'1','queryDate':''}
        }else{
        departure = departure.split(" ")
        destination =destination.split(" ");
            Filter = {'vOriginAddrProvince':departure[0],'vOriginAddrCity':departure[1],'vDesAddrProvince':destination[0],'vDesAddrCity':destination[1],'vehicleType':cartype,'start':'1','queryDate':''}
        }
        setCacheData("locationFilter",mergeJson(JSON.parse(localStorage.getItem("locationFilter")),Filter,true),true);
        getNewMainList();
        $.ui.goBack()
    })

    $("#reset-btn").click(function(){
        $("#search-departure").val(null);
        $("#search-destination").val(null);
        $("#search-cartype").val(null);

        var Filter={};
        Filter = {'vOriginAddrProvince':'','vOriginAddrCity':'','vDesAddrProvince':'','vDesAddrCity':'',
            'vehicleType':'','start':'1','queryDate':''};
        setCacheData("locationFilter",
            mergeJson(JSON.parse(localStorage.getItem("locationFilter")),Filter,true),true);

    })




    $("#afui").delegate(".arrow","click",function(event){
        event.stopPropagation()
        event.preventDefault()
        $('#'+$(this).data('selete')).mobiscroll('show');
        ETID=$(this).prev()[0].id;
        return false;
    });

    //#pics
    var gallery = $("#lightGallery").lightGallery({

        mode      : 'slide',  // Type of transition between images. Either 'slide' or 'fade'.
        useCSS    : true,     // Whether to always use jQuery animation for transitions or as a fallback.
        cssEasing : 'ease',   // Value for CSS "transition-timing-function".
        easing    : 'linear', //'for jquery animation',//
        speed     : 600,      // Transition duration (in ms).
        addClass  : '',       // Add custom class for gallery.

        preload         : 1,    //number of preload slides. will exicute only after the current slide is fully loaded. ex:// you clicked on 4th image and if preload = 1 then 3rd slide and 5th slide will be loaded in the background after the 4th slide is fully loaded.. if preload is 2 then 2nd 3rd 5th 6th slides will be preloaded.. ... ...
        showAfterLoad   : true,  // Show Content once it is fully loaded.
        selector        : null,  // Custom selector property insted of just child.
        index           : false, // Allows to set which image/video should load when using dynamicEl.

        dynamic   : false, // Set to true to build a gallery based on the data from "dynamicEl" opt.
        dynamicEl : [],    // Array of objects (src, thumb, caption, desc, mobileSrc) for gallery els.

        thumbnail            : true,     // Whether to display a button to show thumbnails.
        showThumbByDefault   : false,    // Whether to display thumbnails by default..
        exThumbImage         : false,    // Name of a "data-" attribute containing the paths to thumbnails.
        animateThumb         : true,     // Enable thumbnail animation.
        currentPagerPosition : 'middle', // Position of selected thumbnail.
        thumbWidth           : 100,      // Width of each thumbnails
        thumbMargin          : 5,        // Spacing between each thumbnails

        controls         : true,  // Whether to display prev/next buttons.
        hideControlOnEnd : false, // If true, prev/next button will be hidden on first/last image.
        loop             : false, // Allows to go to the other end of the gallery at first/last img.
        auto             : false, // Enables slideshow mode.
        pause            : 4000,  // Delay (in ms) between transitions in slideshow mode.
        escKey           : true,  // Whether lightGallery should be closed when user presses "Esc".
        closable         : true,  //allows clicks on dimmer to close gallery

        counter      : false, // Shows total number of images and index number of current image.
        lang         : { allPhotos: '所有图片' }, // Text of labels.

        mobileSrc         : false, // If "data-responsive-src" attr. should be used for mobiles.
        mobileSrcMaxWidth : 640,   // Max screen resolution for alternative images to be loaded for.
        swipeThreshold    : 50,    // How far user must swipe for the next/prev image (in px).
        enableTouch       : true,  // Enables touch support
        enableDrag        : true,  // Enables desktop mouse drag support

        vimeoColor    : 'CCCCCC', // Vimeo video player theme color (hex color code).
        videoAutoplay : true,     // Set to false to disable video autoplay option.
        videoMaxWidth : '855px',  // Limits video maximal width (in px).

        // Callbacks el = current plugin object
        onOpen        : function(el) {}, // Executes immediately after the gallery is loaded.
        onSlideBefore : function(el) {}, // Executes immediately before each transition.
        onSlideAfter  : function(el) {}, // Executes immediately after each transition.
        onSlideNext   : function(el) {}, // Executes immediately before each "Next" transition.
        onSlidePrev   : function(el) {}, // Executes immediately before each "Prev" transition.
        onBeforeClose : function(el) {}, // Executes immediately before the start of the close process.
        onCloseAfter  : function(el) {}// Executes immediately once lightGallery is closed.

    });




    mainScroller = $("#main").scroller(); //Fetch the scroller from cache
    //Since this is a App Framework UI scroller, we could also do
    // mainScroller=$.ui.scrollingDivs['webslider'];
    mainScroller.addInfinite();
    mainScroller.addPullToRefresh();
    mainScroller.runCB=true;
    $.bind(mainScroller, 'scrollend', function () {
        console.log("scroll end");
    });

    $.bind(mainScroller, 'scrollstart', function () {
        console.log("scroll start");
    });
    $.bind(mainScroller,"scroll",function(position){

    })
    $.bind(mainScroller, "refresh-trigger", function () {
        console.log("Refresh trigger");
    });
    var hideClose;
    $.bind(mainScroller, "refresh-release", function () {
        var that = this;
        if(!visitor){
            getPullToRefresh(that);
        }else{
            setTimeout(function () {
                that.hideRefresh();
                goToPortalPanelPopup();
            }, 1000);


        }

        return false; //tells it to not auto-cancel the refresh
    });

    $.bind(mainScroller, "refresh-cancel", function () {
        //requestFlag=false;
        //clearTimeout(hideClose);
        //console.log("cancelled");
    });
    mainScroller.enable();

    $.bind(mainScroller, "infinite-scroll", function () {
        var self = this;
        if(!visitor){
        if($("#nullOrderHome").length) {
            self.clearInfinite();
        }else{
            if($("#infinite").length == 0){
                $(this.el).append("<div id='infinite' style='margin-top:10px;width:100%;" +
                    "height:40px;font-size: 20px;text-align: center'>获取订单中 ...</div>");
            }

            $.bind(mainScroller, "infinite-scroll-end", function () {
                $.unbind(mainScroller, "infinite-scroll-end");

                if (ajaxFlag) {
                    ajaxFlag = false
                    getRequestFromInfinite(self)

                }
            });
        }
        }else{
            if($("#nullOrderHome").length > 0){
                $("#nullOrderHome").html("<p style='text-align: center;text-color:orange;'>游客只能查看当前订单,请登录查看全部..</p>");
            }else{
                $("<div id='nullOrderHome' class='nullOrder'><p style='text-align: center;text-color:orange;'>游客只能查看当前订单,请登录查看全部..</p></div>").appendTo("#orderList");
            }
            $(self.el).find("#infinite").remove();
            self.clearInfinite();
        }
    });


    myScroller = $("#selfOrder").scroller(); //Fetch the scroller from cache
//Since this is a App Framework UI scroller, we could also do
// myScroller=$.ui.scrollingDivs['webslider'];
    myScroller.addInfinite();
    myScroller.addPullToRefresh();
    myScroller.runCB=true;
    $.bind(myScroller, 'scrollend', function () {
        console.log("scroll end");
    });

    $.bind(myScroller, 'scrollstart', function () {
        console.log("scroll start");
    });
    $.bind(myScroller,"scroll",function(position){

    })
    $.bind(myScroller, "refresh-trigger", function () {
        console.log("Refresh trigger");
    });
    var hideClose;
    $.bind(myScroller, "refresh-release", function () {
        var that = this;
        getMyPullToRefresh(that);
        return false; //tells it to not auto-cancel the refresh
    });

    $.bind(myScroller, "refresh-cancel", function () {
        //requestFlag=false;
        //clearTimeout(hideClose);
        //console.log("cancelled");
    });
    myScroller.enable();

    $.bind(myScroller, "infinite-scroll", function () {
        var self = this;
        if($("#nullOrderSelf").length) {
            self.clearInfinite();
        }else{
            console.log("infinite triggered");

            if($("#infinite").length == 0)
            {
                $(this.el).append("<div id='infinite' style='margin-top:10px;width:100%;" +
                    "height:40px;font-size: 20px;text-align: center'>获取订单中 ...</div>");
            }

            $.bind(myScroller, "infinite-scroll-end", function () {
                $.unbind(myScroller, "infinite-scroll-end");

                if (ajaxFlag) {
                    ajaxFlag = false
                    getRequestFromMyInfinite(self)
                }
            });
        }
    });


    todoScroller = $("#todo").scroller(); //Fetch the scroller from cache
    todoScroller.addInfinite();
    todoScroller.addPullToRefresh();
    todoScroller.runCB=true;
    $.bind(todoScroller, 'scrollend', function () {
        console.log("scroll end");
    });

    $.bind(todoScroller, 'scrollstart', function () {
        console.log("scroll start");
    });
    $.bind(todoScroller,"scroll",function(position){

    })
    $.bind(todoScroller, "refresh-trigger", function () {
        console.log("Refresh trigger");
    });
    var hideClose;
    $.bind(todoScroller, "refresh-release", function () {
        var that = this;
        getTodoPullToRefresh(that);
        return false; //tells it to not auto-cancel the refresh
    });

    $.bind(todoScroller, "refresh-cancel", function () {
    });
    todoScroller.enable();

    $.bind(todoScroller, "infinite-scroll", function () {
        var self = this;
        if($("#nullTodoSelf").length) {
            self.clearInfinite();
        }else{
            console.log("infinite triggered");

            if($("#infinite").length == 0)
            {
                $(this.el).append("<div id='infinite' style='margin-top:10px;width:100%;" +
                    "height:40px;font-size: 20px;text-align: center'>获取任务中 ...</div>");
            }

            $.bind(todoScroller, "infinite-scroll-end", function () {
                $.unbind(todoScroller, "infinite-scroll-end");

                if (ajaxFlag) {
                    ajaxFlag = false
                    getRequestFromTodoInfinite(self)
                }
            });
        }
    });


    /*paySheetMoreScroller = $("#paySheetMore").scroller(); //Fetch the scroller from cache
    paySheetMoreScroller.addInfinite();
    paySheetMoreScroller.addPullToRefresh();
    paySheetMoreScroller.runCB=true;
    $.bind(paySheetMoreScroller, 'scrollend', function () {
        console.log("scroll end");
    });
    $.bind(paySheetMoreScroller, 'scrollstart', function () {
        console.log("scroll start");
    });
    $.bind(paySheetMoreScroller,"scroll",function(position){
    })
    $.bind(paySheetMoreScroller, "refresh-trigger", function () {
        console.log("Refresh trigger");
    });
    $.bind(paySheetMoreScroller, "refresh-release", function () {
        var that = this;
        getPaySheetMorePullToRefresh(that);
        return false; //tells it to not auto-cancel the refresh
    });
    $.bind(paySheetMoreScroller, "refresh-cancel", function () {
    });
    paySheetMoreScroller.enable();
    $.bind(paySheetMoreScroller, "infinite-scroll", function () {
        var self = this;
        if($("#nullPaySheetMoreSelf").length) {
            self.clearInfinite();
        }else{
            if($("#infinite").length == 0)
            {
                $(this.el).append("<div id='paySheetMoreInfinite' style='margin-top:10px;width:100%;" +
                    "height:40px;font-size: 20px;text-align: center'>获取账单中 ...</div>");
            }
            $.bind(paySheetMoreScroller, "infinite-scroll-end", function () {
                $.unbind(paySheetMoreScroller, "infinite-scroll-end");
                if (ajaxFlag) {
                    ajaxFlag = false;
                    getRequestFromPaySheetMoreInfinite(self)
                }
            });
        }
    });*/

    $("#todo").css("overflow", "auto");
    $("#selfOrder").css("overflow", "auto");
    //$("#paySheetMore").css("overflow", "auto");
    $("#main").css("overflow", "auto");
});

//
function verify_query_succ(data)
{

    if(data.isSucc)
    {
        $.ui.loadContent('#offer', false, false, 'slide')
    }else
    {
        var error_msg_array = data.msg.split('-');
        var error_msg = error_msg_array[1];
        //跳转ID 1：身份认证未完善 2：车辆资料未完善 3：银行账号信息未完善 4：您的资料未完善
        var forward_id = error_msg_array[2];
        //错误ID 1：资料未完善 2：用户不符合竞价 3：已经竞价  4：该订单需要箱车接单 5：货主撤单
        var error_id = error_msg_array[3];

        errorPopup(error_msg);

        if(error_id == 1)
        {
            loginStatus = 2;
            var user = JSON.parse(localStorage.getItem('user'));
            var workerType = user.obj.workerType;
            switch(Number(forward_id))
            {
                case 1:
                    idinfo_panel(0);
                    break;
                case 2:
                    carinfo_panel(0);
                    break;
                case 3:
                    bank_panel(0);
                    break;
                case 4:
                    address_panel(0);
                    break;
            }
        }
    }

}

//tools.js

function getAjax(ajaxURL,option,successFunction,failFunction){
    console.log("getAjax")

    var user = localStorage.getItem('user');
    var args = option ;
    if(user!=null)
    {
        user = JSON.parse(user);
        args = mergeJson(option,{lastTime:user.obj.lastTime,workerNo:user.obj.workerNo},true);
        args = JSON.parse(args);
    }

    jQuery.ajax({
        url: ajaxURL,
        timeout: 20000, //超时X秒
        dataType: 'jsonp',
        data:args
    }).done(
        function (data) {
            //alert(data);
            console.log("getAjaxdone")
            if(data!=null)
            {
                if (data.isSucc === false && data.msg !=null && data.msg.indexOf('E0000') != -1 ) {
                    errorSessionPopup();
                }
                else if(data.isSucc === false && data.msg !=null && data.msg.indexOf('-') == -1){
                    var msgText=data.msg.split("-")
                    errorPopup(msgText[1])
                }
                else if(data.isSucc === false && data.msg !=null && data.msg.indexOf('E20001') != -1){
                    var msgText=data.msg.split("-")
                    loginTimeoutPopup(msgText[1]);
                }
                else if(data.isSucc === true ||  data.msg.indexOf('-') != -1){
                    try{
                        eval(successFunction);
                    }catch(e){
                        //sendErrorInfo(errorInfo,true);
                    };
                }
            }
        }).fail(function () {
            try{
                eval(failFunction);
            }catch(e){
                //sendErrorInfo(errorInfo,true);
            };
        }).always(function () {
            $.ui.unblockUI();
            $.ui.hideMask();
        });

}

function getLocation(){

    if(alertLocationPopup ||  myLocationFlag ){
        if(ajaxFlag){
            //获取gps定位
            navigator.geolocation.getCurrentPosition(mainPanellocationOnSuccess,null);
        }else{
        }
    }
}

function mainPanellocationOnSuccess(position){
    ajaxFlag = false;
    //获取GPS以后换取中文地址
    queryAddressFunc(position);
    ajaxFlag = true;
}

function queryAddressFunc(position)
{
    //如果是IOS的设备 device全部改为cloudId
    var deviceNo = device.uuid;
    if(window.OSInfo.os.toLocaleUpperCase()=="IOS")
    {
        deviceNo = window.OSInfo.push;
    }
    getAjax(queryAddress,{appId:window.OSInfo.push,deviceNo:deviceNo,
        os:window.OSInfo.os,latitude:position.coords.latitude,
        longitude:position.coords.longitude,timestamp:"2015-03-07 12:01:01"},
        "updateLocationData(data)");
}

function updateLocationData(data){
    $.ui.unblockUI();
    $.ui.hideMask();

    if(JSON.parse(localStorage.getItem("locationFilter")).vOriginAddrCity != data.obj.cityName){
        changeLocationPopup(data.obj.provinceName,data.obj.cityName)
    }else if(myLocationFlag
        && JSON.parse(localStorage.getItem("locationFilter")).vOriginAddrCity == data.obj.cityName )
    {
        var province = data.obj.provinceName;
        var city = data.obj.cityName;
        errorPopup('您当前定位的城市是:'+city);

        setCacheData("locationFilter",mergeJson(
            JSON.parse(localStorage.getItem("locationFilter")),
            {'vOriginAddrProvince':province,'vOriginAddrCity':city,
                'start':'1','queryDate':'','vehicleType':'','vDesAddrProvince':'',
                'vDesAddrCity':''},true),true);
        getNewMainList();
        mainPanleLoad();

        myLocationFlag = false;
    }

    var locationObj = {
        provinceName:data.obj.provinceName,
        cityName:data.obj.cityName
    };
    setCacheData('locationObj',locationObj , 1);
}


function getCurrentPositionAddress()
{
    navigator.geolocation.getCurrentPosition(getCurrentPositionAddressSuccess,null);
}
function getCurrentPositionAddressSuccess(position)
{
    $.ui.unblockUI();
    $.ui.showMask("我们正在定位...");
    var url = baseUrl + "register/query_address_info.action";
    var option =
    {
        latitude:position.coords.latitude,
        longitude:position.coords.longitude
    };

    //alert(position.coords.latitude);
    getAjax(url,option,'getCurrentPositionAddressSuccessSucc(data)'
        ,'getCurrentPositionAddressSuccessError()');
}
function getCurrentPositionAddressSuccessSucc(data)
{
    setCacheData('location',data.obj.address,1);
    $("#"+lOCATIONID).val(data.obj.address);
    $.ui.hideMask();
}
function getCurrentPositionAddressSuccessError()
{

}

function errorSessionPopup() {
    setTimeout(function(){$.ui.blockUI(.5);},10);
    $.ui.popup({
        title: "温馨提示",
        message: "用户未登入",
        cancelText: "登入",
        cancelClass: 'popup-btn',
        cancelCallback: function () {
            $.ui.loadContent("#portal", false, false, "slide");
        },
        cancelOnly: true
    });
}


function goToPortalPanelPopup() {
    setTimeout(function(){$.ui.blockUI(.5);},10);
    $.ui.popup({
        title: "温馨提示",
        message: "亲,您需要登录才能查看完整功能.",
        cancelText: "登入",
        cancelClass: 'popup-btn',
        cancelCallback: function () {
            $.ui.loadContent("#portal", false, false, "slide");
        },
        cancelOnly: true
    });
}


function uiBackPopup(msg) {
    setTimeout(function(){$.ui.blockUI(.5);},10);
    $.ui.popup({
        title: "温馨提示",
        message: msg,
        cancelText: "返回",
        cancelClass: 'popup-btn',
        cancelCallback: function () {
            $.ui.goBack()
        },
        cancelOnly: true
    });
}
function errorPopup(msg) {
    setTimeout(function(){$.ui.blockUI(.5);},10);
    $.ui.popup({
        title: "温馨提示",
        message: msg,
        cancelText: "关闭",
        cancelOnly: true,
        cancelClass: 'popup-btn'
    });
}
function loginTimeoutPopup(msg) {
    setTimeout(function(){$.ui.blockUI(.5);},10);
    $.ui.popup({
        title: "温馨提示",
        message: msg,
        cancelText: "登陆",
        cancelClass: 'popup-btn',
        cancelCallback: function () {
            logoutSucc();
            loginPanel();
        },
        cancelOnly: true
    });
}
function changeLocationPopup(province,city) {
    setTimeout(function(){$.ui.blockUI(.5);},10);
    $.ui.popup({
        title: "当前城市"+city,
        message: "切换查询始发地为"+city,
        cancelText: "取消",
        cancelCallback: function () { alertLocationPopup =false},
        cancelClass:"popup-btn",
        doneText: "切换",
        doneClass:"popup-btn",
        doneCallback: function () {
            setCacheData("locationFilter",mergeJson(JSON.parse(localStorage.getItem("locationFilter")),{'vOriginAddrProvince':province,'vOriginAddrCity':city,'start':'1','queryDate':'','vehicleType':'','vDesAddrProvince':'','vDesAddrCity':''},true),true);
            getNewMainList();
            if($.ui.activeDiv.id=="main"){
                mainPanleLoad();
            }else{
                $.ui.loadContent('#main', false, false, 'slide');
            }
        },
        cancelOnly: false
    });
}

//msg内容 msgType类型
function pushMsg(message,method)
{
    $.ui.popup({
        title: "您有一条新消息",
        message: message,
        cancelText: "忽略",
        cancelCallback: function () {},
        cancelClass:"popup-btn",
        doneText: "立即查看",
        doneClass:"popup-btn",
        doneCallback: function () {
            eval(method);
        },
        cancelOnly: false
    });
}
//确定 or  取消

function delImg(message,method){
    $.ui.popup({
        title: "",
        message: message,
        cancelText: "取消",
        cancelCallback: function () {},
        cancelClass:"popup-btn",
        doneText: "立即删除",
        doneClass:"popup-btn",
        doneCallback: function () {
            eval(method);
        },
        cancelOnly: false
    });
}




function orderBuySuccPopup(msg) {
    setTimeout(function(){$.ui.blockUI(.5);},10);
    $.ui.popup({
        title: "温馨提示",
        message: msg,
        cancelText: "立即查看",
        cancelClass: 'popup-btn',
        cancelCallback: function () {
            $.ui.loadContent('#selfOrder', false, false, 'slide');
        },
        cancelOnly: true
    });
}

function pushPopup(msg) {
    setTimeout(function(){$.ui.blockUI(.5);},10);
    $.ui.popup({
        title: "有新订单",
        message: msg,
        cancelText: "取消",
        cancelCallback: function () {},
        cancelClass:"popup-btn",
        doneText: "抢单",
        doneClass:"popup-btn",
        doneCallback: function () {
            setCacheData("locationFilter",mergeJson(JSON.parse(localStorage.getItem("locationFilter")),{'start':'1'},true),true);
            getNewMainList();
            if($.ui.activeDiv.id=="main"){
                mainPanleLoad();
            }else{
                $.ui.loadContent('#main', false, false, 'slide');
            }

        },
        cancelOnly: false
    });
}

function checkMobile(elementId){
    var number = $("#"+elementId).val();
    if(!(/^1\d{10}$/.test(number))){
        errorPopup("请输入正确的手机号");
        return false;
    }
    return true;
}

//flag   sessionStorage or localStorage
function setCacheData(key,value,ever){
    var tempValue = (typeof value === "object") ? JSON.stringify(value) : value;
    if(ever){
        localStorage.setItem( key, tempValue)
    }else {
        sessionStorage.setItem(key, tempValue)
    }
}

function getWorkerNo(){
    return JSON.parse(localStorage.getItem("user")).obj.workerNo ;
}

function mergeJson(jsonbject1, jsonbject2,needString)
{
    var needStringFlag = arguments[2] ? arguments[2] :false ;
    var tempJB1 = (typeof jsonbject1 === "object") ? jsonbject1 : (JSON.parse(jsonbject1));
    var tempJB2 = (typeof jsonbject2 === "object") ? jsonbject2 : (JSON.parse(jsonbject2));

    var resultJsonObject={};
    for(var attr in tempJB1){
        resultJsonObject[attr]=tempJB1[attr];
    }
    for(var attr in tempJB2){
        resultJsonObject[attr]=tempJB2[attr];
    }
    if(needStringFlag){
        return JSON.stringify(resultJsonObject);
    }else{
        return resultJsonObject;
    }
};
//设置为绘画完成,清除列表，清除session缓存，请求数据，返回数据放到缓存
function getNewMainList(){
$("ul#orderList").data("launch",false);
$("ul#orderList").empty();
sessionStorage.removeItem("mainList");
getAjax(queryOrderList,JSON.parse(localStorage.getItem("locationFilter")),"setCacheData('mainList',data,false)","errorPopup('网络请求超时,请检查网络后再尝试..')");
}

function offerDone(data,consignNo){
    var msgText=data.msg.split("-")
    if(msgText[0]=="S0000"){
        $("#orderList li#"+consignNo).remove()
        uiBackPopup(msgText[1]);

    }else if(!data.isSucc)
    {
        errorPopup(msgText[1])
    }
}


function goMainFormSlider(){
    localStorage.setItem("localStorageVersion",currentVersion);
    $.ui.launch()
    alertLocationPopup = true;
}

function checkVersion() {
    if ($.os.ios) {
        if(iOSInHouse){
            iosUpdatePlugin();
        }
    } else if ($.os.android) {
        androidUpdatePlugin();
    }
}

//flag 1：后台发起获取版本
function iosUpdatePlugin(flag) {
    $.ajax({
        type: "GET",
        url: queryVersion,
        timeout: 8000, //超时8秒
        data: {
            version: currentVersion,
            os: "ios"
        },
        dataType: "jsonp",
        success: function (data) {
            if (data.isSucc) {
                $.ui.hideMask();
                $.ui.popup({
                    title: "温馨提示",
                    message: "您的应用版本过低,立即更新吗?",
                    cancelText: "稍后",
                    cancelClass: 'popup-btn',
                    cancelCallback: function () {},
                    doneText: "是的",
                    doneClass: 'popup-btn',
                    doneCallback: function () {
                        $.ui.unblockUI();
                        //ios更新URL
                        updateApp(data.obj.versionUrl);
                    },
                    cancelOnly: false
                });
            } else {
                if(flag!=undefined && flag == 1)
                {
                    errorPopup("您现在的版本是最新的!");
                }
            }
        },
        error: function () {

        }
    });
}

//竞价抢单成功回调
function saveOfferDonSucc(data)
{
    if(data.isSucc)
    {
        $("#"+ETID).remove();
    }
    offerDone(data);
}

function updateApp(appUpdateUrl) {
    var _url ="itms-services://?action=download-manifest&url="+appUpdateUrl;
    window.open(_url, '_system');
}

function androidUpdatePlugin() {
    //发起请求android 更新
    cordova.exec(androidUpdatePluginResultHandler,
        androidUpdatePluginErrorHandler, "CheckUpdatePlugin",
        "checkVersion", []);
}

/**
 * [androidUpdatePluginResultHandler description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function androidUpdatePluginResultHandler(data) {

}
/**
 * [androidUpdatePluginErrorHandler description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function androidUpdatePluginErrorHandler(data) {
}

function imvisitor(){
    visitor=true;
    $.ui.loadContent("#main", false, false, "slide");
}

//切换我的位置
function changeMyLocation()
{
    myLocationFlag = true;

    $.ui.blockUI(.3);
    $.ui.showMask("获取定位中...");

    getLocation();


}

function myLocationOnSuccess(position)
{

}


function init_dom()
{
    var height = $("#mine2").height();
    $("#mine2Content").css('height',height);

    $("#home-content-panel").css('height',$("#home").height());
    $("#home-module").height($("#home").height()-$("#ad").height());

}
