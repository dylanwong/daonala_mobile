/**
 * Created by zhouhuan on 2015-08-01.
 */

function getOwnerAddrListPullToRefresh(that){
    setCacheData("searchOwnerAddrFilter",mergeJson(JSON.parse(localStorage.getItem("searchOwnerAddrFilter")),
        {'start':1},true),true);

    jQuery.ajax({
        url: choiceOwnerAddrUrl,
        timeout: 20000, //超时X秒
        dataType: 'jsonp',
        data:JSON.parse(localStorage.getItem("searchOwnerAddrFilter"))
    }).done(
        function (data) {
            if(data!=null)
            {
                if (data.isSucc === false && data.msg !=null && data.msg.indexOf('E0000') != -1 ) {
                    errorSessionPopup();
                }
                else if(data.isSucc === false && data.msg !=null){
                    var msgText=data.msg.split("-")
                    errorPopup(msgText[1])
                }else if(data.isSucc === true){
                    try{
                        if(data.obj.data.length==0){
                            $("#selfOrder_pulldown").html("<h2 style='color: #F6842B'>暂无新任务</h2>")
                        }else{
                            $("#selfOrder_pulldown").html("<h2 style='color: #F6842B'>新增"+data.obj.data.length+"个任务</h2>")
                            showOwnerAddrList(data,true);
                        }
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
            setTimeout(function () {
                setCacheData("searchOwnerAddrFilter",mergeJson(JSON.parse(localStorage.getItem("searchOwnerAddrFilter")),
                    {'queryType':'2'},true),true);
                //that.hideRefresh();
                ownerAddrPullDownEl.attr('class','').hide();
                ownerAddrScroll.refresh();
                ownerAddrLoadingStep = 0;
            }, 1000);
        });
}


function getRequestFromOwnerAddrListinite(self) {
    var searchFilter =  JSON.parse(localStorage.getItem("searchOwnerAddrFilter"));
    var start = '';
//    if(searchFilter.start == '1'){
//        start = parseInt(searchFilter.start) + 10;
//    } else {
//        start = parseInt(searchFilter.start) + 10;
//    }
    start = parseInt(searchFilter.start) + 10;
    setCacheData("searchOwnerAddrFilter",mergeJson(JSON.parse(localStorage.getItem("searchOwnerAddrFilter")),
        {'queryType':'1','start':start},true),true);

    jQuery.ajax({
        url: choiceOwnerAddrUrl,
        timeout: 20000, //超时X秒
        dataType: 'jsonp',
        data:JSON.parse(localStorage.getItem("searchOwnerAddrFilter"))
    }).done(
        function (data) {
            if(data!=null)
            {
                if (data.isSucc === false && data.msg !=null && data.msg.indexOf('E0000') != -1 ) {
                    errorSessionPopup();
                }
                else if(data.isSucc === false && data.msg !=null){
                    var msgText=data.msg.split("-")
                    errorPopup(msgText[1])
                }else if(data.isSucc === true){
                    try{
//                        $(self.el).find("#infinite").remove();
//                        self.clearInfinite();
                        ownerAddrPullUpEl.removeClass('loading');
                        //   mainPullUpL.html("<h2 style='color: #F6842B;margin:0px;padding:0px;'>暂无新订单</h2>");
                        // mainPullUpEl.html("<h2 style='color: #F6842B;margin:0px;padding:0px;'>暂无新订单</h2>");
                        showOwnerAddrList(data);
                    }catch(e){
                    };
                }
            }
        }).fail(function () {
        }).always(function () {
            //ajaxFlag=true;
            ownerAddrLoadingStep = 0;
            ajaxFlag = true;
        });

}




/**
 * Created by zhouhuan on 2015-08-01.
 */

function getCustAddrListPullToRefresh(that){
    setCacheData("searchCustAddrFilter",mergeJson(JSON.parse(localStorage.getItem("searchCustAddrFilter")),
        {'queryType':'1','start':1},true),true);

    jQuery.ajax({
        url: choiceCustAddrUrl,
        timeout: 20000, //超时X秒
        dataType: 'jsonp',
        data:JSON.parse(localStorage.getItem("searchCustAddrFilter"))
    }).done(
        function (data) {
            if(data!=null)
            {
                if (data.isSucc === false && data.msg !=null && data.msg.indexOf('E0000') != -1 ) {
                    errorSessionPopup();
                }
                else if(data.isSucc === false && data.msg !=null){
                    var msgText=data.msg.split("-")
                    errorPopup(msgText[1])
                }else if(data.isSucc === true){
                    try{
                        if(data.obj.data.length==0){
                            $("#selfOrder_pulldown").html("<h2 style='color: #F6842B'>暂无新任务</h2>")
                        }else{
                            $("#selfOrder_pulldown").html("<h2 style='color: #F6842B'>新增"+data.obj.data.length+"个任务</h2>")
                            showCustAddrList(data,true);
                        }
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
            setTimeout(function () {
                setCacheData("searchCustAddrFilter",mergeJson(JSON.parse(localStorage.getItem("searchCustAddrFilter")),
                    {'queryType':'2'},true),true);
                //that.hideRefresh();
                mainPullDownEl.attr('class','').hide();
                mainScroll.refresh();
                mainLoadingStep = 0;
            }, 1000);
        });
}


function getRequestFromCustAddrListinite(self) {
    var searchFilter =  JSON.parse(localStorage.getItem("searchCustAddrFilter"));
    var start = '';
    start = parseInt(searchFilter.start) + 10;
    setCacheData("searchCustAddrFilter",mergeJson(JSON.parse(localStorage.getItem("searchCustAddrFilter")),
        {'queryType':'1','start':start},true),true);
   
    jQuery.ajax({
        url: choiceCustAddrUrl,
        timeout: 20000, //超时X秒
        dataType: 'jsonp',
        data:JSON.parse(localStorage.getItem("searchCustAddrFilter"))
    }).done(
        function (data) {
            if(data!=null)
            {
                if (data.isSucc === false && data.msg !=null && data.msg.indexOf('E0000') != -1 ) {
                    errorSessionPopup();
                }
                else if(data.isSucc === false && data.msg !=null){
                    var msgText=data.msg.split("-")
                    errorPopup(msgText[1])
                }else if(data.isSucc === true){
                    try{
//                        $(self.el).find("#infinite").remove();
//                        self.clearInfinite();
                        custAddrpullUpEl.removeClass('loading');
                        //   mainPullUpL.html("<h2 style='color: #F6842B;margin:0px;padding:0px;'>暂无新订单</h2>");
                        // mainPullUpEl.html("<h2 style='color: #F6842B;margin:0px;padding:0px;'>暂无新订单</h2>");
                        showCustAddrList(data);
                    }catch(e){
                    };
                }
            }
        }).fail(function () {
        }).always(function () {
            //ajaxFlag=true;
            custAddrLoadingStep = 0;
            ajaxFlag = true;
        });

}





var ownerAddrScroll,custAddrScroll;
var ownerAddrPullDownEl, ownerAddrPullDownL,custAddrPullDownEl, custAddrPullDownL;
var ownerAddrPullUpEl,ownerAddrPullUpL,custAddrPullUpEl, custAddrPullUpL;
var ownerAddrLoadingStep =0;
var custAddrLoadingStep = 0;//加载状态0默认，1显示加载状态，2执行加载数据，只有当为0时才能再次加载，这是防止过快拉动刷新

function ownerAddrLoaded(){
    //
    if(ownerAddrScroll==undefined || ownerAddrScroll == null)
    {

        ownerAddrPullDownEl = $('#pullDown.ownerAddrpullDown');
        ownerAddrPullDownL = ownerAddrPullDownEl.find('.ownerAddrPullDownLabel');
        ownerAddrPullDownEl['class'] = ownerAddrPullDownEl.attr('class');
        ownerAddrPullDownEl.attr('class','').hide();

        ownerAddrPullUpEl = $('#pullUp.ownerAddrpullUp');
        ownerAddrPullUpL = ownerAddrPullUpEl.find('.ownerAddrPullUpLabel');
        ownerAddrPullUpEl['class'] = ownerAddrPullUpEl.attr('class');
        ownerAddrPullUpEl.attr('class','').hide();

        ownerAddrScroll = new IScroll('#ownerAddrWrapper', {
            probeType: 2,//probeType：1对性能没有影响。在滚动事件被触发时，滚动轴是不是忙着做它的东西。
            // probeType：2总执行滚动，除了势头，反弹过程中的事件。这类似于原生的onscroll事件。
            // probeType：3发出的滚动事件与到的像素精度。
            // 注意，滚动被迫requestAnimationFrame（即：useTransition：假）。
            scrollbars: true,//有滚动条
            mouseWheel: true,//允许滑轮滚动
            fadeScrollbars: true,//滚动时显示滚动条，默认影藏，并且是淡出淡入效果
            bounce:true,//边界反弹
            interactiveScrollbars:true,//滚动条可以拖动
            shrinkScrollbars:'scale',// 当滚动边界之外的滚动条是由少量的收缩。'clip' or 'scale'.
            click: true ,// 允许点击事件
            keyBindings:true,//允许使用按键控制
            momentum:true// 允许有惯性滑动
        });
        //滚动时
        ownerAddrScroll.on('scroll', function(){
            if(ownerAddrLoadingStep == 0 &&
                !ownerAddrPullDownEl.attr('class').match('flip|loading') &&
                !ownerAddrPullUpEl.attr('class').match('flip|loading')){
                if (this.y > 5) {
                    //下拉刷新效果
                    ownerAddrPullDownEl.attr('class',ownerAddrPullUpEl['class'])
                    ownerAddrPullDownEl.show();
                    ownerAddrScroll.refresh();
                    ownerAddrPullDownEl.addClass('flip');
                    ownerAddrPullDownL.html('准备刷新...');
                    ownerAddrLoadingStep = 1;
                }else if (this.y < (this.maxScrollY - 5)) {
                    //上拉刷新效果
                    ownerAddrPullUpEl.attr('class',ownerAddrPullUpEl['class'])
                    ownerAddrPullUpEl.show();
                    ownerAddrScroll.refresh();
                    ownerAddrPullUpEl.addClass('flip');
                    ownerAddrPullUpL.html('准备刷新...');
                    ownerAddrLoadingStep = 1;
                }else
                {

                }
            }
        });
        //滚动完毕
        ownerAddrScroll.on('scrollEnd',function(){
            if(ownerAddrLoadingStep == 1){
                if (ownerAddrPullUpEl.attr('class').match('flip|loading')) {
                    ownerAddrPullUpEl.removeClass('flip').addClass('loading');
                    ownerAddrPullUpL.html('<img src="assets/img/preloader.gif" style="padding-right: 10px" />努力加载数据中...');
                    ownerAddrLoadingStep = 2;
                    getRequestFromOwnerAddrListinite();

                }else if(ownerAddrPullDownEl.attr('class').match('flip|loading')){
                    ownerAddrPullDownEl.removeClass('flip').addClass('loading');
                    ownerAddrPullDownL.html('<img src="assets/img/preloader.gif" style="padding-right: 10px" />努力加载数据中...');
                    ownerAddrLoadingStep = 2;
                    //getownerAddrOrderPullToRefresh();
                    getOwnerAddrListPullToRefresh();
                }
            }
        });
       // ownerAddrScroll.scrollToTop(100);
    }
}

function custAddrLoaded() {

    if(custAddrScroll==undefined || custAddrScroll == null)
    {

        custAddrPullDownEl = $('#pullDown.custAddrpullDown');
        custAddrPullDownL = custAddrPullDownEl.find('.custAddrPullDownLabel');
        custAddrPullDownEl['class'] = custAddrPullDownEl.attr('class');
        custAddrPullDownEl.attr('class','').hide();

        custAddrPullUpEl = $('#pullUp.custAddrpullUp');
        custAddrPullUpL = custAddrPullUpEl.find('.custAddrPullUpLabel');
        custAddrPullUpEl['class'] = custAddrPullUpEl.attr('class');
        custAddrPullUpEl.attr('class','').hide();

        custAddrScroll = new IScroll('#custAddrWrapper', {
            probeType: 2,//probeType：1对性能没有影响。在滚动事件被触发时，滚动轴是不是忙着做它的东西。
            // probeType：2总执行滚动，除了势头，反弹过程中的事件。这类似于原生的onscroll事件。
            // probeType：3发出的滚动事件与到的像素精度。
            // 注意，滚动被迫requestAnimationFrame（即：useTransition：假）。
            scrollbars: true,//有滚动条
            mouseWheel: true,//允许滑轮滚动
            fadeScrollbars: true,//滚动时显示滚动条，默认影藏，并且是淡出淡入效果
            bounce:true,//边界反弹
            interactiveScrollbars:true,//滚动条可以拖动
            shrinkScrollbars:'scale',// 当滚动边界之外的滚动条是由少量的收缩。'clip' or 'scale'.
            click: true ,// 允许点击事件
            keyBindings:true,//允许使用按键控制
            momentum:true// 允许有惯性滑动
        });
        //滚动时
        custAddrScroll.on('scroll', function(){
            if(custAddrLoadingStep == 0 &&
                !custAddrPullDownEl.attr('class').match('flip|loading') &&
                !custAddrPullUpEl.attr('class').match('flip|loading')){
                if (this.y > 5) {
                    //下拉刷新效果
                    custAddrPullDownEl.attr('class',custAddrPullUpEl['class'])
                    custAddrPullDownEl.show();
                    custAddrScroll.refresh();
                    custAddrPullDownEl.addClass('flip');
                    custAddrPullDownL.html('准备刷新...');
                    custAddrLoadingStep = 1;
                }else if (this.y < (this.maxScrollY - 5)) {
                    //上拉刷新效果
                    custAddrPullUpEl.attr('class',custAddrPullUpEl['class'])
                    custAddrPullUpEl.show();
                    custAddrScroll.refresh();
                    custAddrPullUpEl.addClass('flip');
                    custAddrPullUpL.html('准备刷新...');
                    custAddrLoadingStep = 1;
                }else
                {

                }
            }
        });
        //滚动完毕
        custAddrScroll.on('scrollEnd',function(){
            if(custAddrLoadingStep == 1){
                if (custAddrPullUpEl.attr('class').match('flip|loading')) {
                    custAddrPullUpEl.removeClass('flip').addClass('loading');
                    custAddrPullUpL.html('<img src="assets/img/preloader.gif" style="padding-right: 10px" />努力加载数据中...');
                    custAddrLoadingStep = 2;
                //    getRequestFromOrderListinite();
                    getRequestFromCustAddrListinite
                }else if(custAddrPullDownEl.attr('class').match('flip|loading')){
                    custAddrPullDownEl.removeClass('flip').addClass('loading');
                    custAddrPullDownL.html('<img src="assets/img/preloader.gif" style="padding-right: 10px" />努力加载数据中...');
                    custAddrLoadingStep = 2;
                    getCustAddrListPullToRefresh();
                }
            }
        });

    }
}
