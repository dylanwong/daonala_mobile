/**
 * Created by 翔 on 2015/6/28.
 */

var mainScroll,historyScroll,custboardScroll;
var mainPullDownEl, mainPullDownL,historyPullDownEl, historyPullDownL,custPullDownL,custPullDownEl;
var mainPullUpEl, mainPullUpL,historyPullUpEl, historyPullUpL,custPullUpEl, custPullUpL;
var mainLoadingStep,historyLoadingStep,custLoadingStep = 0;//加载状态0默认，1显示加载状态，2执行加载数据，只有当为0时才能再次加载，这是防止过快拉动刷新

function custLoaded(){
   //
    if(custboardScroll==undefined || custboardScroll == null)
    {

        custPullDownEl = $('#pullDown.custpullDown');
        custPullDownL = custPullDownEl.find('.custPullDownLabel');
        custPullDownEl['class'] = custPullDownEl.attr('class');
        custPullDownEl.attr('class','').hide();

        custPullUpEl = $('#pullUp.custpullUp');
        custPullUpL = custPullUpEl.find('.custPullUpLabel');
        custPullUpEl['class'] = custPullUpEl.attr('class');
        custPullUpEl.attr('class','').hide();

        custboardScroll = new IScroll('#custWrapper', {
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
        custboardScroll.on('scroll', function(){
            if(custLoadingStep == 0 &&
                !custPullDownEl.attr('class').match('flip|loading') &&
                !custPullUpEl.attr('class').match('flip|loading')){
                if (this.y > 5) {
                    //下拉刷新效果
                    custPullDownEl.attr('class',custPullUpEl['class'])
                    custPullDownEl.show();
                    custboardScroll.refresh();
                    custPullDownEl.addClass('flip');
                    custPullDownL.html('准备刷新...');
                    custLoadingStep = 1;
                }else if (this.y < (this.maxScrollY - 5)) {
                    //上拉刷新效果
                    custPullUpEl.attr('class',custPullUpEl['class'])
                    custPullUpEl.show();
                    custboardScroll.refresh();
                    custPullUpEl.addClass('flip');
                    custPullUpL.html('准备刷新...');
                    custLoadingStep = 1;
                }else
                {

                }
            }
        });
        //滚动完毕
        custboardScroll.on('scrollEnd',function(){
            if(custLoadingStep == 1){
                if (custPullUpEl.attr('class').match('flip|loading')) {
                    custPullUpEl.removeClass('flip').addClass('loading');
                    custPullUpL.html('<img src="assets/img/preloader.gif" style="padding-right: 10px" />努力加载数据中...');
                    custLoadingStep = 2;
                    getRequestFromCustOrderinite();

                }else if(custPullDownEl.attr('class').match('flip|loading')){
                    custPullDownEl.removeClass('flip').addClass('loading');
                    custPullDownL.html('<img src="assets/img/preloader.gif" style="padding-right: 10px" />努力加载数据中...');
                    custLoadingStep = 2;
                    getCustOrderPullToRefresh();
                }
            }
        });
       // custboardScroll.scrollToTop(100);
    }
}

function mainLoaded() {

    if(mainScroll==undefined || mainScroll == null)
    {

        mainPullDownEl = $('#pullDown');
        mainPullDownL = mainPullDownEl.find('.mainPullDownLabel');
        mainPullDownEl['class'] = mainPullDownEl.attr('class');
        mainPullDownEl.attr('class','').hide();

        mainPullUpEl = $('#pullUp');
        mainPullUpL = mainPullUpEl.find('.mainPullUpLabel');
        mainPullUpEl['class'] = mainPullUpEl.attr('class');
        mainPullUpEl.attr('class','').hide();

        mainScroll = new IScroll('#mainWrapper', {
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
        mainScroll.on('scroll', function(){
            if(mainLoadingStep == 0 &&
                !mainPullDownEl.attr('class').match('flip|loading') &&
                !mainPullUpEl.attr('class').match('flip|loading')){
                if (this.y > 5) {
                    //下拉刷新效果
                    mainPullDownEl.attr('class',mainPullUpEl['class'])
                    mainPullDownEl.show();
                    mainScroll.refresh();
                    mainPullDownEl.addClass('flip');
                    mainPullDownL.html('准备刷新...');
                    mainLoadingStep = 1;
                }else if (this.y < (this.maxScrollY - 5)) {
                    //上拉刷新效果
                    mainPullUpEl.attr('class',mainPullUpEl['class'])
                    mainPullUpEl.show();
                    mainScroll.refresh();
                    mainPullUpEl.addClass('flip');
                    mainPullUpL.html('准备刷新...');
                    mainLoadingStep = 1;
                }else
                {

                }
            }
        });
        //滚动完毕
        mainScroll.on('scrollEnd',function(){
            if(mainLoadingStep == 1){
                if (mainPullUpEl.attr('class').match('flip|loading')) {
                    mainPullUpEl.removeClass('flip').addClass('loading');
                    mainPullUpL.html('<img src="assets/img/preloader.gif" style="padding-right: 10px" />努力加载数据中...');
                    mainLoadingStep = 2;
                    getRequestFromOrderListinite();

                }else if(mainPullDownEl.attr('class').match('flip|loading')){
                    mainPullDownEl.removeClass('flip').addClass('loading');
                    mainPullDownL.html('<img src="assets/img/preloader.gif" style="padding-right: 10px" />努力加载数据中...');
                    mainLoadingStep = 2;
                    getOrderListPullToRefresh();
                }
            }
        });

    }
}
function historyLoaded() {
    if(historyScroll==undefined || historyScroll == null)
    {
        historyPullDownEl = $('#historyPullDown');
        historyPullDownL = historyPullDownEl.find('.historyPullDownLabel');
        historyPullDownEl['class'] = historyPullDownEl.attr('class');
        historyPullDownEl.attr('class','').hide();

        historyPullUpEl = $('#historyPullUp');
        historyPullUpL = historyPullUpEl.find('.historyPullUpLabel');
        historyPullUpEl['class'] = historyPullUpEl.attr('class');
        historyPullUpEl.attr('class','').hide();

        historyScroll = new IScroll('#historyWrapper', {
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
        historyScroll.on('scroll', function(){
            if(historyLoadingStep == 0 && !historyPullDownEl.attr('class').match('flip|loading') &&
                !historyPullUpEl.attr('class').match('flip|loading')){
                if (this.y > 5) {
                    //下拉刷新效果

                }else if (this.y < (this.maxScrollY - 5)) {
                    //上拉刷新效果
                    historyPullUpEl.attr('class',historyPullUpEl['class'])
                    historyPullUpEl.show();
                    historyScroll.refresh();
                    historyPullUpEl.addClass('flip');
                    historyPullUpL.html('准备刷新...');
                    historyLoadingStep = 1;
                }
            }
        });
        //滚动完毕
        historyScroll.on('scrollEnd',function(){
            if(historyLoadingStep == 1){
                if (historyPullUpEl.attr('class').match('flip|loading')) {
                    historyPullUpEl.removeClass('flip').addClass('loading');
                    historyPullUpL.html('<img src="assets/img/preloader.gif" ' +
                        'style="padding-right: 10px" />努力加载数据中...');
                    historyLoadingStep = 2;
                    getRequestFromOrderListinite();
                }else if(historyPullDownEl.attr('class').match('flip|loading')){

                }
            }
        });
    }
}

//document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);


var traceScroll;
function inittraceScroll(){
    if(traceScroll==undefined || traceScroll == null) {

         traceScroll = new IScroll('#tracewrapper', {
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
   }else{
        traceScroll.destroy();
        traceScroll = new IScroll('#tracewrapper', {
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
    }
}


