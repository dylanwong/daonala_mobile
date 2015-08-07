/**
 * Created by 翔 on 2015/6/5.
 */
/**
 *
 */
function init_orderdetail()
{
//    $("#orderdetail-buttons").delegate('button','click',function()
//    {
//        var target = $($("#orderdetail-buttons").find(".selectTotalDay")[0]).attr('target');
//        $($("#orderdetail-buttons").find(".selectTotalDay")[0]).removeClass('selectTotalDay');
//        $("#"+target).hide();
//        $(this).addClass('selectTotalDay');
//        $("#"+$(this).attr('target')).show();//fadeIn(1000);
//
//    })

    $(".star li").tap(function(){
        $(".star li img").attr("src","assets/img/bluestar.png");
        $(".star li img").attr("evalutegrade","1");
        $(this).find('img').attr("src","assets/img/bluestar.png");
        $(this).nextAll().find('img').attr("src","assets/img/star.png");
        $(this).nextAll().find('img').attr("evalutegrade","0");
    });
    $(".star2 li").tap(function(){
        $(".star2 li img").attr("src","assets/img/bluestar.png");
        $(".star2 li img").attr("evalutegrade","1");
        $(this).find('img').attr("src","assets/img/bluestar.png");
        $(this).nextAll().find('img').attr("src","assets/img/star.png");
        $(this).nextAll().find('img').attr("evalutegrade","0");
    });
    $(".star3 li").tap(function(){
        $(".star3 li img").attr("src","assets/img/bluestar.png");
        $(".star3 li img").attr("evalutegrade","1");
        $(this).find('img').attr("src","assets/img/bluestar.png");
        $(this).nextAll().find('img').attr("src","assets/img/star.png");
        $(this).nextAll().find('img').attr("evalutegrade","0");
    })
}
function clear_orderdetailPage(){
  //  var target = $($("#orderdetail-buttons").find(".selectTotalDay")[0]).attr('target');
//    $($("#orderdetail-buttons").find(".selectTotalDay")[0]).removeClass('selectTotalDay');
//    $("#"+target).hide();
//    $("#orderDetailInfoId").addClass('selectTotalDay');
//    $("#"+$('#orderDetailInfoId').attr('target')).fadeIn(300);
    $('#shipPhone_d').html('');
    $('#shipNo_d').html('');

    $('#custAddr_d').html('');
    $('#custName_d').html('');
    $('#custContacts_d').html('');
    $('#addrName_d').html('');
    $('#ownerPhone_d').attr('');

    $('#ownerName_d').html('');
    $('#ownerAddr_d').html('');
    $('#ownerContacts_d').html('');


    $('#status_d').html( '' );
    $('#transNo_d').html('');
    $('#ownerNo_d').html('');
    $('#custNo_d').html('');
    $('#orderDate_d').html('');


    $('#topdeliverNo_d').html('');
    $('#topdeliverNo_d').attr('delivery','');

    $('#orderDetailEvaluate').empty();
}
/*货主客户订单详情页面*/
function initTraceInfo2(){


    var data = JSON.parse(localStorage.getItem("currentorder"));
    $('#shipPhone_d').html(data.shipperPhone);
    $('#shipNo_d').html(data.shipperNoText);

    $('#custAddr_d').html(data.custAddr);
    $('#custName_d').html(data.custName);
    $('#custContacts_d').html(data.custContacts+'  '+data.custPhone);
   // $('#addrName_d').html(data.addrName);
    $('#ownerPhone_d').attr('href',"tel:'"+data.ownerPhone+"'");
    $('#custPhone_d').attr('href',"tel:'"+data.custPhone+"'");
   // $('#custPhone_d').html("<a href='tel:"+data.custPhone+"'></a>");
    $('#ownerName_d').html(data.ownerName);
    $('#ownerAddr_d').html(data.ownerAddr);
    $('#ownerContacts_d').html(data.ownerContacts+'  '+data.ownerPhone);


    $('#status_d').html( showstatus(data.status) );
    if( data.status == '90' ){
        evalutePanel();

        $('#evalutePanelBtn').unbind('click');
    }else{
        $('#evalute_ifNull').text('无');
        $('#evalutePanelBtn').unbind('click');
    }
    queryDetailProduct();
    $('#productPanelBtn').unbind();
    //onclick="productPanel();"

    $('#transNo_d').html(data.transNo);
    $('#ownerNo_d').html(data.subOrderNo);
    $('#custNo_d').html(data.custOrderNo);
    $('#orderDate_d').html(data.orderDate);
    queryDeliverordertraceList(data.enterpriseNo,data.systemNo,data.orderNo,data.dispatchNo);

//    $('#topdeliverNo_d').html('运输单号:'+data.topsendNo);
//    $('#topdeliverNo_d').attr('delivery',data.topsendNo);

//    $.ui.blockUI(.3);
//    getAjax(searchTraceUrl, {'enterpriseNo':data.enterpriseNo,'systemNo':data.systemNo,
//            'dispatchNo':data.dispatchNo,
//            'sendNo':data.topsendNo},
//        "updateDetailPanel(data)", "errorPopup('网络请求超时,请检查网络后再尝试..')");
}



//查询最新运输单跟踪记录列表
function queryDeliverordertraceList(enterpriseNo,systemNo,orderNo,dispatchNo){
    $('#detailTraceListContent').empty();
    getAjax(queryDeliverordertraceListUrl ,{'orderEnterpriseNo':enterpriseNo,
            'systemNo':systemNo, 'orderNo':orderNo,
        'dispatchNo':dispatchNo},
        "queryDeliverordertraceListUrlSuc(data)", "errorPopup('网络请求超时,请检查网络后再尝试..')");
}
function queryDeliverordertraceListUrlSuc(data){
    if(data.isSucc){
        $.ui.showMask("我们正在拼命的加载数据...");
        var result = '';
        if ( data.msg.split('-')[0] == 'S0001' ) {
            result = template('traceListTemp',data);
            $('#detailTraceListContent').html(result);
        } else {
            result = template('traceListTemp2',data);
            $('#detailTraceListContent').html(result);

            var len = data.obj.length;
            var sendinfo = JSON.parse(localStorage.getItem('currentSendInfo') );
            //init_LogisticMap(sendinfo.deliveryNo,data.sendNo);
            for(var i = 0; i < len; i++ ) {
                if( data.obj[i].fileNo != undefined && data.obj[i].fileNo != null && data.obj[i].fileNo != ''){
                    console.log(i+' '+data.obj[i].fileNo);
                    setSmallImgList2( data.obj[i].fileNo );
                }
            };
        }
        $.ui.hideMask();
    } else {
        $('#detailTraceListContent').html( data.msg );
    }
}
//订单跟踪信息
function querySingleTraceInfo(deliveryNo,sendNo,status){
 //   $("#orderDetailTraceContent").empty();
    var data = JSON.parse(localStorage.getItem("currentorder"));
    $.ui.blockUI(.3);
    $("#trace_list_div").empty();
    $('#tracestatus').html(showstatus(status));
    localStorage.removeItem('currentSendInfo');
    localStorage.setItem( 'currentSendInfo',
        JSON.stringify( {'deliveryNo':deliveryNo,'sendNo':sendNo,
    'status':status} ) )
    getAjax(searchTraceUrl, {'orderEnterpriseNo':data.enterpriseNo,'systemNo':data.systemNo,
            'dispatchNo':data.dispatchNo,
            'sendNo':sendNo},
        "updateTracePanel2(data)", "errorPopup('网络请求超时,请检查网络后再尝试..')");


}

function queryOrderDoc(){
    $.ui.loadContent("#orderdetail", false, false, "slide");
}
function queryDetailProduct(){
    //$.ui.blockUI(.3);
    $("#orderDetailProduct").empty();
    var data = JSON.parse(localStorage.getItem("currentorder"));
    getAjax(searchProductUrl, {'orderEnterpriseNo':data.enterpriseNo,'systemNo':data.systemNo,
            'dispatchNo':data.dispatchNo},
        "updataDetailPanel(data)", "errorPopup('网络请求超时,请检查网络后再尝试..')");
//    updataDetailPanel(data);
}


function updataDetailPanel(data){
    var products = "";
    if(data.isSucc) {
       // var productNode = $("<div class='productNode'></div>");
        var len = data.obj.length;
        if ( len > 0 ){
            $('#good_ifNull').text(len);
            $('#productPanelBtn').bind('click',function(){
                $.ui.loadContent("#orderDetailProduct", false, false, "slide");
            });
        }else{
            $('#good_ifNull').text('无');
        }
        for (var i = 0; i < len; i++) {
             products +=
                    '<div style="padding-top:10px;"><ul><li style="border-bottom:1px solid #ededed;list-style-type:none;  height: 30px;">' +
                    '<div class="fl " align="" style="padding-left:30px;color:#ef8305;font-size:16px;" id="articleName"> '+ data.obj[i].articleName +' </div>' +
                    '</li><li style="height: 80px;padding-top: 10px;">' +
                    '<div class="fl width33 overflowHidden percent80"' +
                    'style="line-height:60px;" align="center">' +
                    '<b class="fl" style="font-size: 16px;padding-left:10px;padding-top:5px;padding-right:5px;">要货</b>' +
                    '<span class="fl fs24" style="color: #ef8305" id="orderQty_d" >' + ifNull(data.obj[i].orderQty) + '</span>' +
                    '</div><div class="fl width33 overflowHidden percent80" ' +
                    'style="border-left: 1px solid #E3E3E3; ' +
                    'border-right: 1px solid #E3E3E3;line-height:60px;" align="center"> ' +
                    '<b class="fl" style="font-size: 16px;padding-left:10px;padding-top:5px;padding-right:5px;">送货</b> ' +
                    '<span class="fl fs24" style="color: #ef8305" id="deliverQty_d" >' + ifNull(data.obj[i].deliveryQty) + '</span> ' +
                    '</div><div class="fl width33 overflowHidden percent80" ' +
                    'style="line-height:60px;" align="center"> ' +
                    '<b class="fl" style="font-size: 16px;padding-left:10px;padding-top:5px;padding-right:5px;">签收</b> ' +
                    '<span class="fl fs24" style="color: #ef8305" id="signQty_d" >' + ifNull(data.obj[i].signQty) + '</span></div></li></ul></div>'
            ;
          //  $(products).appendTo(productNode);
        }

        $("#orderDetailProduct").html(products);
      //  productNode.appendTo("#Productproducts");
    }else{
        $('#good_ifNull').text('无');
     /*   productNode=$("<div class='productNode'>暂无产品信息</div>");
        productNode.appendTo("#Productproducts");*/
        $("#orderDetailProduct").html("<div class='productNode'>暂无产品信息</div>");
    }
    //$.ui.unblockUI();
}





function updateTracePanel2(data){
    if( traceScroll !=undefined){
       // traceScroll.destroy();
       // traceScroll.refresh();
    }else{
        ;
    }

    $("#trace-timeline").empty();
    var result = '';
    var color,alert,title,time,desc,file;
    var html = "",height = "";
    if(data.isSucc){
        var obj = data.obj ;
        $.ui.loadContent("#orderDetailTrace", false, false, "slide");

        result = template('orderTraceListTemp',data);

        $("#trace_list_div").append(result);
        var len = obj.length;
        var sendinfo = JSON.parse(localStorage.getItem('currentSendInfo') );
        //init_LogisticMap(sendinfo.deliveryNo,data.sendNo);

        IMG_COUNT=0;
        for(var i = 0; i < len; i++ ) {
            if (obj[i].fileNo != undefined && obj[i].fileNo != null && obj[i].fileNo != '') {
                IMG_COUNT++;
            }
        }
        if(IMG_COUNT == 0){
            inittraceScroll();
        }
        $.when
        (
            showImg(obj,sendinfo.deliveryNo)
        ).done(function(data){
            console.log('success');
        //    traceScroll();
        }).fail(function(){
            console.log('something went wrong!');
        });
    }else{
        $("#trace_list_div").empty();
        $("#trace_list_div").html("暂无跟踪信息");

    }
    $('.gj_cn:first').addClass('juhong12');
    $.ui.unblockUI();
    $.ui.hideMask();
}
function showImg(obj,deliveryNo){
    var len = obj.length;
    for(var i = 0; i < len; i++ ) {
        if (obj[i].fileNo != undefined && obj[i].fileNo != null && obj[i].fileNo != '') {
                setSmallImgList(obj[i].fileNo, deliveryNo);
        }
    }
}



function toTrace(){
   // $('#orderDetailTraceContent').show();
   // $('#tracecontainerMap').hide();
    $('#toTrace').removeClass('bbc');
    $('#toMap').addClass('bbc');//border-bottom: 25px solid #ef8305


}

function toMap(){
    var sendinfo = JSON.parse(localStorage.getItem('currentSendInfo') );
    init_LogisticMap(sendinfo.deliveryNo,sendinfo.sendNo);
//    $('#toMap').removeClass('bbc');
//    $('#toTrace').addClass('bbc');
//    $('#orderDetailTraceContent').hide();
//    $('#tracecontainerMap').show();


    //init_tracemap();
}

function init_LogisticMap(deliveryNo,sendNo){
    var order = JSON.parse( localStorage.getItem('currentorder') );
   // var enterpriseNo =
//    var pram = {
//        systemNo : order.systemNo,
//        enterpriseNo : order.enterpriseNo,
//        dispatchNo : order.dispatchNo,
//        sendNo:order.sendNo
//    };
    try{
    getAjax(searchTraceLongitudeUrl, {'systemNo':order.systemNo,'enterpriseno':order.enterpriseNo,
            'dispatchNo':order.dispatchNo,
            'sendNo':sendNo },
        "inittracemapsSucc(data)", "errorPopup('网络请求超时,请检查网络后再尝试..')");

    }catch(e){
        errorPopup(' 2 '+e.message);
        errorPopup(e.description);
    }
}

function inittracemapsSucc(data){
    try{
    if(data.isSucc){
        $.ui.loadContent("#traceMap", false, false, "slide");
        var jindu = [];
        var weidu = [];
        for ( var i = 0; i < data.obj.length; i++) {
            jindu[i] = data.obj[i].longitude;
            weidu[i] = data.obj[i].latitude;
        }
        init_tracemap(jindu,weidu);
    }else{
        errorPopup('未上传经纬度信息');
    }

    }catch(e){
        errorPopup(' 2 '+e.message);
        errorPopup(e.description);
    }
}
// 百度地图API功能
function init_tracemap(longitudes,latitudes) {
    try{
    var points = [];
    var len = longitudes.length;
   // alert(len);
    for ( var i = 0; i < longitudes.length; i++) {
        points[i] = new BMap.Point(longitudes[i],latitudes[i]);
    //    alert(longitudes[i]+'   '+latitudes[i]);
    }
    $("#tracecontainerMap").height($("#traceMap").height()
        -$('#header').height());
    $("#tracecontainerMap").width($("#traceMap").width());
    var map = new BMap.Map("tracecontainerMap");
    map.centerAndZoom(new BMap.Point(118.454, 32.955), 11);
    map.enableScrollWheelZoom();
    var beijingPosition=new BMap.Point(116.432045,39.910683),
        hangzhouPosition=new BMap.Point(120.129721,30.314429),
        xianPosition=new BMap.Point(114.3162,30.581084),
        taiwanPosition=new BMap.Point(113.950723,22.558888);
  //  var points = [beijingPosition,hangzhouPosition,xianPosition,taiwanPosition];

    var curve = new BMapLib.CurveLine(points,
        {strokeColor:"red", strokeWeight:3, strokeOpacity:0.5,strokeStyle:'solid'}); //创建弧线对象
    map.addOverlay(curve); //添加到地图中
    curve.enableEditing(); //开启编辑功能

    map.setViewport(points);//自动适应缩放级别

    var myIcon = new BMap.Icon("assets/img/car.png",
        new BMap.Size(56,34));
    var marker = new BMap.Marker(new BMap.Point(longitudes[len-1],latitudes[len-1]),{icon:myIcon});  // 创建标注
    map.addOverlay(marker);               // 将标注添加到地图中
    marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
    }catch(e){
        errorPopup(e.message);
        errorPopup(e.description);
    }
}


function setSmallImgList2(fileNo){
    var objectNo = fileNo;
    var deliveryNo = deliveryNo;
    var data = JSON.parse(localStorage.getItem("currentorder"));
    var url = baseUrl + "order/queryImgUrl.action";

    getAjax(url, {'orderNo':data.orderNo,'deliveryNo':'0',
            'dispatchNo':data.dispatchNo,'systemNo':data.systemNo,'objectNo':objectNo},
            "setSmallImgListSuc2(data,"+objectNo+")", "errorPopup('网络请求超时,请检查网络后再尝试..')");

}

function setSmallImgListSuc2(data,objectNo){
    if(data.isSucc){
        jqueryResult = data.obj;
        var len = jqueryResult.length;
        if(len>0){
            var count = 0;
            var result = '';
            var containHead = '';
            var containContent = '';
            var containEnd = '';
            result += containHead;
            for( var i = 0; i < len; i++ ){
                // for ( var k = 0; k < 3; k++ ){
                if( jqueryResult[i].filePath!=undefined && jqueryResult[i].filePath!=''&&jqueryResult[i].filePath!=null){
                    count++;
                    var fileUrl = jqueryResult[i].filePath;
                    var fileName = jqueryResult[i].fileName;
                    containContent = ' <div style="float:left;width:30%;"><a target="_blank" ' +
                        'href="'+fileUrl+'" class="swipebox img'+objectNo+'" >'+
                        '<img name="realImg" style="margin:5px 0px;width:80px;height:70px;"  '+
                        ' src="'+fileUrl+'" '+
                        ' fileno="" id=""></a> '+
                        '</div> ';
                    result += containContent;
                }
            }

            result += containEnd;
            $('#'+objectNo).empty();
            $('#'+objectNo).html(result);
            // }
            init_lightbox(objectNo);
        }
    }

}


function setSmallImgList(fileNo,deliveryNo)
{
    var objectNo = fileNo;
    var deliveryNo = deliveryNo;
    var data = JSON.parse(localStorage.getItem("currentorder"));
    var url = baseUrl + "order/queryImgUrl.action";
    getAjax(url, {'orderNo':data.orderNo,'deliveryNo':deliveryNo,
            'dispatchNo':data.dispatchNo,'systemNo':data.systemNo,'objectNo':objectNo},
        "setSmallImgListSuc(data,"+objectNo+")", "errorPopup('网络请求超时,请检查网络后再尝试..')");

}

function setSmallImgListSuc(data,objectNo){
    if(data.isSucc){
        jqueryResult = data.obj;
        var len = jqueryResult.length;
        if(len>0){
            var count = 0;
            var result = '';
            var containHead = '';
            var containContent = '';
            var containEnd = '';
            result += containHead;
            for( var i = 0; i < len; i++ ){
               // for ( var k = 0; k < 3; k++ ){
                if( jqueryResult[i].filePath!=undefined && jqueryResult[i].filePath!=''&&jqueryResult[i].filePath!=null){
                count++;
                var fileUrl = jqueryResult[i].filePath;
                var fileName = jqueryResult[i].fileName;
                containContent = ' <div style="float:left;width:30%;"><a target="_blank" ' +
                    'href="'+fileUrl+'" class="swipebox img'+objectNo+'" >'+
                    '<img name="realImg" style="margin:5px 0px;width:80px;height:70px;"  '+
                    ' src="'+fileUrl+'" '+
                    ' fileno="" id=""></a> '+
                    '</div> ';
                result += containContent;
                }
            }
            result += containEnd;
            $('#'+objectNo).empty();
            $('#'+objectNo).html(result);
               // }
            init_lightbox(objectNo);

            }

        IMG_COUNT = IMG_COUNT-1;
        if(IMG_COUNT == 0){
            inittraceScroll();
        }
    }


}




function queryEvalute(){
    //order/view_evaluate.action   $.ui.loadContent("#orderDetailEvalute", false, false, "slide");
    var data = JSON.parse(localStorage.getItem("currentorder"));
//    getAjax(evaluteUrl, {'ownerNo':data.ownerNo,'systemNo':data.systemNo,
//            'dispatchNo':data.dispatchNo },
//        "updateEvalute(data)", "errorPopup('网络请求超时,请检查网络后再尝试..')");
    if(data.status=='90'){
        getAjax(evaluteUrl, {'ownerNo':data.ownerNo,'systemNo':data.systemNo,
            'dispatchNo':data.dispatchNo },
        "updateEvalute(data)", "errorPopup('网络请求超时,请检查网络后再尝试..')");
        $('#orderDetailEvaluate').empty();

    }else{
//        $('evalutePanelId').unbind()

      //  errorPopup('该单未签收，暂无评价信息');
//        $('#orderDetailEvaluate').empty();
//        $('#orderDetailEvaluate').html('<div><p>无评论信息</p></div>');
    }
}

function updateEvalute(datas){
    var evaluteResult = '';
    var cuser = JSON.parse(localStorage.getItem("e_user"));
    $('#reviewsItem1').empty();
    $('#reviewsItem2').empty();
    $('#reviewsItem3').empty();
    if(datas.isSucc){


        var info = '<div class="width95"><ul><li style="">'+
            '<div class="fl " align=""'+
            'style="width:100%;border-bottom:1px solid #ededed;color:#5b5b5b;font-size:16px;' +
            'padding-top:15px;padding-left:10px;padding-bottom: 10px;">' +
            '<span >评价</span></div>'+
            '<div class="fr width20" align="right"'+
            'style="color:#5b5b5b;font-size:16px;"> <a href="#evaluate" >'+
            '<button type="button" id="evaluteBtn" class="btn btn-primary"'+
            'style="width:60px;height:24px;font-size:14px;'+
            'text-align:center;line-height:24px;padding:0px 12px;">去评价</button>'+
            '</a></div></li></ul>' +
            '<div align="left" style="padding-left:10px;padding-top: 50px;" id="evaluteInfo">'+
            '  <p id="evaluteName"></p><p style="color:#06ABD4" id="reviewsDemo"></p>'+
            ' <div><div class="overflowHidden"><p class="fl width30" align="right">商品完好度：</p>'+
            ' <p class="fl" id="reviewsItem1"></p></div><div class="overflowHidden">'+
            ' <p class="fl width30" align="right" >回单及时性：</p>'+
            '     <p class="fl" id="reviewsItem2"></p> </div>'+
            ' <div class="overflowHidden"><p class="fl width30" align="right">送货人态度：</p>'+
            ' <p class="fl"  id="reviewsItem3"></p></div></div>'+
            '</div><ul><li style="" >'+
            '    <div class="fl " align="" '+
            '  style="padding-top: 30px;padding-left: 10px;padding-bottom: 10px;width:100%;border-bottom: 1px solid #ededed;color:#5b5b5b;font-size:16px;padding-top: 5px;" ><span id="replyspan">回复</span></div>'+
            '  <div class="fr width20" align="right"'+
            ' style="color:#5b5b5b;font-size:16px;">'+
            ' <a href="#reply"> <button type="button" id="replyBtn"'+
            '    class="btn btn-primary"'+
            '   style="border-bottom:1px solid #ededed;width:60px;height:24px;font-size:14px;'+
            '            text-align:center;line-height:24px;padding:0px 12px;">回复</button>'+
            '</a></div></li></ul>'+
            '<div align="left" style="padding-top: 30px;padding-left:10px;" id="replyInfo"></div>';
        if(datas.obj.length == 0){
            if(cuser.obj.userType==2){
                $('#orderDetailEvaluate').empty();
                evaluteResult = '<div class=" width20" align="center" style="color:#5b5b5b;font-size:16px;">'+
               '<a href="#evaluate" ><button type="button" id="evaluteBtn" class="btn btn-primary" '+
               'style="width:60px;height:24px;font-size:14px; '+
               'text-align:center;line-height:24px;padding:0px 12px;">去评价</button> '+
                                '</a></div>';
              //  evaluteResult = '<div><p>无评论信息</p></div>';
                $(".star li img").attr("src","assets/img/star.png");
                $(".star2 li img").attr("src","assets/img/star.png");
                $(".star3 li img").attr("src","assets/img/star.png");
                $("#evaluteContent").val('');
                $('#evalute_ifNull').text('有');
                $('#evalutePanelBtn').bind('click',function(){
                 //   $.ui.loadContent("#orderDetailEvalute", false, false, "slide");//绑定物流看板
                    $.ui.loadContent("#evaluate", false, false, "slide");
                });
              //  $.ui.loadContent("#evaluate", false, false, "slide");
            }else{
                $('#evalute_ifNull').text('无');
               // errorPopup('暂无评价信息');
//                $('#orderDetailEvaluate').empty();
//                evaluteResult = '<div><p>无评论信息</p></div>';
            }
            $('#orderDetailEvaluate').append(evaluteResult);
        }else{
            $('#evalute_ifNull').text('有');
            $('#evalutePanelBtn').bind('click',function(){
                $.ui.loadContent("#orderDetailEvalute", false, false, "slide");//绑定物流看板
            });
            if(datas.obj[0].bodmEvaluate != null){
                $('#orderDetailEvaluate').empty();
                $('#orderDetailEvaluate').append(info);
                $('#evaluteBtn').hide();
                $('#replyBtn').hide();
                $('#orderDetailEvaluate').val(datas.obj[0].bodmEvaluate.reviewsNo);
                $('#evaluteName').html(datas.obj[0].bodmEvaluate.reviewsUserNo
                    +'【'+datas.obj[0].bodmEvaluate.reviewsDate+'】');
                $('#reviewsDemo').html(datas.obj[0].bodmEvaluate.reviewsDemo);
                $('#reviewsItem1').append(showStar( datas.obj[0].bodmEvaluate.reviewsItem1) );
                $('#reviewsItem2').append(showStar( datas.obj[0].bodmEvaluate.reviewsItem2) );
                $('#reviewsItem3').append(showStar( datas.obj[0].bodmEvaluate.reviewsItem3) );
                if(datas.obj[0].bodmEvaluateAnswer !=null ){
                    $('#replyBtn').hide();
                    $('#replyInfo').append('<p>'+datas.obj[0].bodmEvaluateAnswer.replyUserNo+'['+datas.obj[0].bodmEvaluateAnswer.replyDate+']</p>'+
                        '<p style="color:#06ABD4">'+datas.obj[0].bodmEvaluateAnswer.replyDemo+'</p>');
                }else{

                    $('#replyspan').hide();
                    $('#replyInfo').empty();
                }
            }else{
                $('#orderDetailEvaluate').empty();
                evaluteResult = '<div><p>无评论信息</p></div>';
                //$('#orderDetailEvaluate').append(evaluteResult);
                $('#orderDetailEvaluate').append('<div><a href="#evaluate" >'+
                    '<button type="button" id="evaluteBtn" class="btn btn-primary" '+
                    'style="width:60px;height:24px;font-size:14px; '+
                    'text-align:center;line-height:24px;padding:0px 12px;">去评价</button> '+
                    '</a></div>');
            }
            if(cuser.obj.userType==0  && datas.obj[0].bodmEvaluateAnswer == null ){
                $('#replyBtn').show();
                $('#evaluteBtn').hide();
            } else if(cuser.obj.userType==1){
                $('#evaluteBtn').hide();
                $('#replyBtn').hide();
            } else if( cuser.obj.userType == 2 && datas.obj[0].bodmEvaluate == null ){
                $('#evaluteBtn').show();
                $('#replyBtn').hide();
            } else {

            }
            evaluteResult = '';
        }
    } else {
        //errorPopup(data.msg);
    }
}

function showStar(star){
    if(star == 0){
       return '<ul class="star1" style="padding-top:0px;">'+
        '<li ><img src="assets/img/star.png"/></li>'+
        '<li ><img src="assets/img/star.png"/></li>'+
        '<li ><img src="assets/img/star.png"/></li>'+
        '<li ><img src="assets/img/star.png"/></li>'+
        '<li ><img src="assets/img/star.png"/></li>'+
        '</ul> ';
    }else if(star == 1){
        return '<ul class="star1" style="padding-top:0px;">'+
            '<li ><img src="assets/img/bluestar.png"/></li>'+
            '<li ><img src="assets/img/star.png"/></li>'+
            '<li ><img src="assets/img/star.png"/></li>'+
            '<li ><img src="assets/img/star.png"/></li>'+
            '<li ><img src="assets/img/star.png"/></li>'+
            '</ul> ';
    }else if( star == 2 ){
        return '<ul class="star1" style="padding-top:0px;">'+
            '<li ><img src="assets/img/bluestar.png"/></li>'+
            '<li ><img src="assets/img/bluestar.png"/></li>'+
            '<li ><img src="assets/img/star.png"/></li>'+
            '<li ><img src="assets/img/star.png"/></li>'+
            '<li ><img src="assets/img/star.png"/></li>'+
            '</ul> ';
    }else if( star == 3 ){
        return '<ul class="star1" style="padding-top:0px;">'+
            '<li ><img src="assets/img/bluestar.png"/></li>'+
            '<li ><img src="assets/img/bluestar.png"/></li>'+
            '<li ><img src="assets/img/bluestar.png"/></li>'+
            '<li ><img src="assets/img/star.png"/></li>'+
            '<li><img src="assets/img/star.png"/></li>'+
            '</ul> ';
    }else if( star == 4 ){
        return '<ul class="star1" style="padding-top:0px;">'+
            '<li ><img src="assets/img/bluestar.png"/></li>'+
            '<li ><img src="assets/img/bluestar.png"/></li>'+
            '<li ><img src="assets/img/bluestar.png"/></li>'+
            '<li ><img src="assets/img/bluestar.png"/></li>'+
            '<li ><img src="assets/img/star.png"/></li>'+
            '</ul> ';
    }else if( star == 5 ){
        return '<ul class="star1" style="padding-top:0px;">'+
            '<li ><img src="assets/img/bluestar.png"/></li>'+
            '<li ><img src="assets/img/bluestar.png"/></li>'+
            '<li ><img src="assets/img/bluestar.png"/></li>'+
            '<li ><img src="assets/img/bluestar.png"/></li>'+
            '<li ><img src="assets/img/bluestar.png"/></li>'+
            '</ul> ';
    }
}


function saveReply(){
    var data = JSON.parse(localStorage.getItem("currentorder"));
    var cuser = JSON.parse(localStorage.getItem("e_user"));
    var savereplyUrl = baseUrl + 'order/submit_evaluate_reply.action';
    if( $('#reply_Info').val() !='' && $('#reply_Info').val() != undefined ){
        getAjax(savereplyUrl, {'enterpriseNo':data.enterpriseNo, 'systemNo':data.systemNo,
            'dispatchNo':data.dispatchNo, 'ownerNo':data.ownerNo,
        'reviewsDemo':$('#reply_Info').val(), 'replyParentId':$('#orderDetailEvaluate').val(),
            'userName':cuser.obj.userName },
        "saveReplySucc(data)", "errorPopup('网络请求超时,请检查网络后再尝试..')");
    } else {
        errorPopup('请完成回复内容');
    }
}

function saveEvalute(){
    var saveevaluteUrl = baseUrl + 'order/submit_evaluate.action';
    var data = JSON.parse(localStorage.getItem("currentorder"));
    var cuser = JSON.parse(localStorage.getItem("e_user"));
    var savereplyUrl = 'order/submit_evaluate_reply.action';
  /*  enterpriseNo, systemNo,
        dispatchNo, ownerNo, reviewsItem1, reviewsItem2,
        reviewsItem3, reviewsDemo, userName*/
    //evalutegrade
    var reviewsItem1 = 0 ;
    var reviewsItem2 = 0 ;
    var reviewsItem3 = 0 ;
    $('img[name="wanhao"]').each(
        function() {
            if( $(this).attr('evalutegrade') == 1 ){
                reviewsItem1 += 1;
            };
        });
    $('img[name="huidan"]').each(
        function() {
            if( $(this).attr('evalutegrade') == 1 ){
                reviewsItem2 += 1;
            };
        });
    $('img[name="attitude"]').each(
        function() {
            if( $(this).attr('evalutegrade') == 1 ){
                reviewsItem3 += 1;
            };
        });
    if( reviewsItem2===0 || reviewsItem2===0 || reviewsItem3 === 0){
        errorPopup('请完成所有评分');
    }else{
    var options = {
        'enterpriseNo':data.enterpriseNo,
        'systemNo':data.systemNo,
        'dispatchNo':data.dispatchNo,
        'ownerNo':data.ownerNo,
        'reviewsDemo':$('#evaluteContent').val(),
        'reviewsItem1':reviewsItem1,
        'reviewsItem2':reviewsItem2,
        'reviewsItem3':reviewsItem3,
        'userName':cuser.obj.userName
    }
    getAjax(saveevaluteUrl, options,
        "saveEvaluteSucc(data)", "errorPopup('网络请求超时,请检查网络后再尝试..')");
    }

}

function saveReplySucc(data){
    debugger
    if(data.isSucc){
        errorPopup('回复成功！');
        traceSingleInfo33();
    }else{
        errorPopup(data.msg);
    }

}

function saveEvaluteSucc(data){
    debugger
    if(data.isSucc){
        errorPopup('评论成功！');
        traceSingleInfo33();
    }else{
        errorPopup(data.msg);
    }

}


/**
 * 设置图片幻灯Url
 */
function setImgList(elm)
{
    var objectNo = $(elm).attr('objectno');
    var deliveryNo = $(elm).attr('deliveryNo');
    var data = JSON.parse(localStorage.getItem("currentorder"));
    var url = baseUrl + "order/queryImgUrl.action";
    getAjax(url, {'orderNo':data.orderNo,'deliveryNo':deliveryNo,
            'dispatchNo':data.dispatchNo,'systemNo':data.systemNo,'objectNo':objectNo},
        "setImgListSuc(data)", "errorPopup('网络请求超时,请检查网络后再尝试..')");

}
function setImgListSuc(data){
    if(data.isSucc){
        var jqueryResult = data.obj;
        $.ui.loadContent("#searchImg", false, false, "slide");
    /*var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 30,
        hashnav: true
    });*/
        var html = '';
        var imgLi = "";
        html = '<div class="swiper-wrapper" style="height:100%;"> ';
        for ( var i in jqueryResult )
        {
            var fileUrl = jqueryResult[i].filePath;
            var fileName = jqueryResult[i].fileName;
//            newSlide = swiper.appendSlide("<div class='swiper-slide'  data-hash='slide1'>" +
//                "<a href='"+fileUrl+"' target='_blank'>" +
//                "<img src='"+fileUrl+"' " +
//                "thumb='' alt='"+fileName+"' text='"+fileName+"' />" +
//                "</a>" +
//                "</div>");
            html += '<div class="swiper-slide" >' +
                    '<img ' +
                    ' src="'+fileUrl+'" width="100%"  />' +
                    '</div>';
             }
        html += '</div><div class="swiper-button-prev"></div><div class="swiper-button-next"></div>' ;
        $("#traceimgs").empty();
        $("#traceimgs").append(html);

        $("#traceimgs").height($("#searchImg").height()*(17/20));
        $("#imgTop").height($("#searchImg").height()*(1/20));
        $("#imgFooter").height($("#searchImg").height()*(1/10));
        var swiper = new Swiper('#traceimgs', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            spaceBetween: 30,
            centeredSlides: true,
            effect : 'coverflow',
            prevButton:'.swiper-button-prev',
            nextButton:'.swiper-button-next',
            parallax: true,
            autoplayDisableOnInteraction: false
        });
    }



}
/*  $('#orderDetailTraceContent').show();
 $(obj).each(function (index,data) {
 var status = data.status;
 var dispatchStatus = data.dispatchStatus;
 time = data.changeTimeDescri;
 desc = data.statusDesc;

 if(desc == "")
 {
 height = ";height:100px;";
 }
 if( dispatchStatus <= 10 ){
 color = "#3EA2FC";
 title = "下单";
 }else if( dispatchStatus > 10 && dispatchStatus <= 40)
 {
 color = "#30BC7F";
 title = "提货";
 }else if(dispatchStatus > 40 && dispatchStatus <= 80)
 {
 color = "#3EA2FC";
 title = "运输中";
 }else if(status > 80 && status <= 99)
 {
 color = "#F53274";
 title = "签收";
 }

 if(index == 0)
 {
 alert = '<div style="height:20px;width:30px;' +
 'background-color:#1EA389;border-radius:5px;color:#ffffff;font-size:12px;' +
 'text-align:center;line-height:20px;">最新</div>';
 }else
 {
 alert = "";
 }

 if(data.fileNo !=null && data.fileNo !=''){
 file = '<div style="height:20px;width:30px;' +
 'background-color:#1EA389;border-radius:5px;color:#ffffff;font-size:12px;' +
 'text-align:center;line-height:20px;" deliveryNo="'+data.deliveryNo+'" ' +
 'objectNo="'+data.fileNo+'" onclick="setImgList(this)">附件</div>';
 }else{
 file = "";
 }
 html += '<div style="overflow:hidden;"><div class="fl" style="width:25%;margin:12px auto;">' +
 '<div style="width:60px;height:60px;background:'+color+';border: 4px solid #fffff;border-radius:60px;' +
 'font-size:24px;color:#FFFFFF;font-weight:bold;text-align:center;line-height:60px;margin:0px auto;">'+title+'' +
 '</div></div><div class="fl" style="width:75%;"><div style="'+height+'" class="send"><div class="arrow"></div>' +
 '<div style="position:relative;right:5px;top:0px;float:right;">'+alert+'</div>' +
 '<div style="margin-left:10px;padding-top:10px;font-size:14px;font-weight:bold;">'+time+'</div>' +
 '<div style="font-size:12px;margin-left:10px;margin-bottom:20px;">'+desc+'</div>'+
 '<div style="position:relative;right:5px;top:-15px;float:right;">'+file+'</div>' +
 '</div></div></div>';

 //
 });*/