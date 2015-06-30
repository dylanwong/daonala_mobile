/**
 * Created by wyy on 2015-05-27.
 */


function search(){

    $.ui.blockUI(.3);
    $.ui.showMask("获取查询的订单..");
    $("ul#todoList").empty();
   /* setCacheData("searchFilter", mergeJson(JSON.parse(localStorage.getItem("searchFilter")),
        {'start': '1', 'length':'10', 'queryDate': '', 'status': ''}, true), true);*/
    var searchText = $('#searchText').val();
    var user = JSON.parse( localStorage.getItem("user") );
    if ( user==null ) {
        getAjax(searchUrl, {'start': '1', 'length':'10','orderNo':searchText,'timeType':'N','userNo':'',
            'userType':'' },
        "updateOrderlistPanel(data)", "errorPopup('网络请求超时,请检查网络后再尝试..')");
   // getAjax(searchUrl,options,searchSuc(data),searchFail(data));
    } else {
        getAjax(searchUrl, {'start': '1', 'length':'10','orderNo':searchText,'timeType':'N','userNo':user.obj.userNo,
                'userType':user.obj.userType },
            "updateOrderlistPanel(data)", "errorPopup('网络请求超时,请检查网络后再尝试..')");
    }
    if( user!=null ){
        setCacheData("searchFilter", mergeJson(JSON.parse(localStorage.getItem("searchFilter")),
            {'start': '1', 'length':'10','orderNo':searchText,'timeType':'N','userNo':user.obj.userNo,
                'userType':user.obj.userType }, true), true);
    }else{
        setCacheData("searchFilter", mergeJson(JSON.parse(localStorage.getItem("searchFilter")),
            {'start': '1', 'length':'10','orderNo':searchText,'timeType':'N'}, true), true);

    }


}

function updateOrderlistPanel(data){

    var containNode = $("<div class='orderNode'></div>");
    var nullTrace = "<div align='center' style='margin: 10px;'>查无订单...</div>";
    if(data.isSucc) {
        var result = '';
        $('#orderlist_ul').empty();
        var traceFuc = '';
        loginStatus == 0 ? traceFuc = 'traceInfo(this);' : traceFuc = 'traceInfo33(this);';
        if (data.obj.recordsTotal > 1) {
            $.ui.loadContent("#orderlist", false, false, "slide");
            for (var k in data.obj.data) {
                $.ui.showMask("我们正在拼命的加载数据...");
                if (data.obj.data[k].occurPlace == '') {
                    result = $('<li class="f2" style="margin-top:4px;" onclick="' + traceFuc + '" ' +
                        'data-order-detail=\'' + JSON.stringify(data.obj.data[k]) + '\'>' +
                        '<div ><div style="float:left;">' +
                        '<span class="orderNo f1 f14  p0-6 fd" >物流商单号:</span>' +
                        '<span class="orderNo f1 f14  p0-6 fd" >' + data.obj.data[k].dispatchNo + '</span>' +
                        '</div>' +
                        '<div align="center"><hr style="width:95%;margin-top:0px;margin-bottom:0px;border: 0;border-top:1px solid #BFBFBF;">' +
                        '</div> <div class="f2" style="height: 80px;"><div class="leftslide">' +
                        '<div style="width:40px;height:40px;background:white;border: 4px solid #fffff;border-radius:60px;' +
                        'font-size:16px;color:coral;font-weight:bold;text-align:center;line-height:40px;margin:0px auto;">' + showstatus(data.obj.data[k].status) + '</div>' +
                        '</div><div class="rightslide">' +
                        '<div style="float:left;width:30%;">' +
                        '<span class="orderNo  f12 fco rs"  >货主单号:</span><br>' +
                        '<span class="ownerName f12 fco rs" >发货人:</span><br>' +
                        '<span class="enterPriseNo f12 fco rs">收货人:</span><br>' +
                        '<span class="enterPriseNo f12 fco rs">预计到货时间:</span>' +
                        '</div> <div style="float:right;width:70%;">' +
                        '<span class="ownerName f12 fco p0-6" style="position: absolute;" >' + data.obj.data[k].orderNo + '</span><br>' +
                        '<span class="ownerName f12 fco p0-6" style="position: absolute;">' + data.obj.data[k].ownerName + '</span><br>' +
                        '<span class="ownerNo f12 fco p0-6" style="position: absolute;">' + data.obj.data[k].custName + '</span><br>' +
                        '<span class="wnerNo f12 fco p0-6" style="position: absolute;">' + data.obj.data[k].deliveryDate + '</span>' +
                        '</div> <div style="clear:both;"></div></div><div style="clear:both;"></div></div></li>');

                }else{
                    result = $('<li class="f2" style="margin-top:4px;" onclick="' + traceFuc + '" ' +
                        'data-order-detail=\'' + JSON.stringify(data.obj.data[k]) + '\'>' +
                        '<div ><div style="float:left;">' +
                        '<span class="orderNo f1 f14  p0-6 fd" >物流商单号:</span>' +
                        '<span class="orderNo f1 f14  p0-6 fd" >' + data.obj.data[k].dispatchNo + '</span>' +
                        '</div><div style="float:right;width:40%;">' +
                        '<span id="occurPlaceimg_' + k + '" class="orderNo"><img src="assets/img/location.png"/></span>' +
                        '<span id="occurPlace_' + k + '" class="occurPlace f12" style="color:#F6842B;">' + data.obj.data[k].occurPlace + '</span>' +
                        '</div></div>' +
                        '<div align="center"><hr style="width:95%;margin-top:0px;margin-bottom:0px;border: 0;border-top:1px solid #BFBFBF;">' +
                        '</div> <div class="f2" style="height: 80px;"><div class="leftslide">' +
                        '<div style="width:40px;height:40px;background:white;border: 4px solid #fffff;border-radius:60px;' +
                        'font-size:16px;color:coral;font-weight:bold;text-align:center;line-height:40px;margin:0px auto;">' + showstatus(data.obj.data[k].status) + '</div>' +
                        '</div><div class="rightslide">' +
                        '<div style="float:left;width:30%;">' +
                        '<span class="orderNo  f12 fco rs"  >货主单号:</span><br>' +
                        '<span class="ownerName f12 fco rs" >发货人:</span><br>' +
                        '<span class="enterPriseNo f12 fco rs">收货人:</span><br>' +
                        '<span class="enterPriseNo f12 fco rs">预计到货时间:</span>' +
                        '</div> <div style="float:right;width:70%;">' +
                        '<span class="ownerName f12 fco p0-6" style="position: absolute;" >' + data.obj.data[k].orderNo + '</span><br>' +
                        '<span class="ownerName f12 fco p0-6" style="position: absolute;">' + data.obj.data[k].ownerName + '</span><br>' +
                        '<span class="ownerNo f12 fco p0-6" style="position: absolute;">' + data.obj.data[k].custName + '</span><br>' +
                        '<span class="wnerNo f12 fco p0-6" style="position: absolute;">' + data.obj.data[k].deliveryDate + '</span>' +
                        '</div> <div style="clear:both;"></div></div><div style="clear:both;"></div></div></li>');
                }
                $.ui.hideMask();
                $(result).appendTo(containNode);
            }
        } else if (data.obj.recordsTotal == 1) {
            setCacheData("currentorder", data.obj[0], 1);
            if( loginStatus==0 || loginStatus== '0' ){
                setCacheData("currentorder",data.obj.data[0] ,1);

               // JSON.stringify(data.obj.data[k])
                traceSingleInfo();
            }else{
                setCacheData("currentorder",data.obj.data[0] ,1);
                traceSingleInfo33();
            }
        } else {
            result = nullTrace;
            errorPopup(data.msg);
        }
        $(containNode).appendTo("#orderlist_ul");

    }else{
        errorPopup(data.msg);
    }

   }


function updateOrderlistPanel_bak(data){

    var containNode = $("<div class='orderNode'></div>");
    var nullTrace = "<div align='center' style='margin: 10px;'>查无订单...</div>";
    if(data.isSucc) {
        var result = '';
        $('#orderlist_ul').empty();
        var traceFuc = '';
        loginStatus == 0 ? traceFuc = 'traceInfo(this);' : traceFuc = 'traceInfo33(this);';
        if (data.obj.recordsTotal > 1) {
            $.ui.loadContent("#orderlist", false, false, "slide");
            for (var k in data.obj.data) {

                $.ui.showMask("我们正在拼命的加载数据...");
                if (data.obj[k].occurPlace == '') {
                    result = $('<li class="f2" style="margin-top:4px;" onclick="' + traceFuc + '" ' +
                        'data-order-detail=\'' + JSON.stringify(data.obj.data[k]) + '\'>' +
                        '<div ><div style="float:left;">' +
                        '<span class="orderNo f1 f14  p0-6 fd" >物流商单号:</span>' +
                        '<span class="orderNo f1 f14  p0-6 fd" >' + data.obj.data[k].dispatchNo + '</span>' +
                        '</div>' +
                        '<div align="center"><hr style="width:95%;margin-top:0px;margin-bottom:0px;border: 0;border-top:1px solid #BFBFBF;">' +
                        '</div> <div class="f2" style="height: 80px;"><div class="leftslide">' +
                        '<div style="width:40px;height:40px;background:white;border: 4px solid #fffff;border-radius:60px;' +
                        'font-size:16px;color:coral;font-weight:bold;text-align:center;line-height:40px;margin:0px auto;">' + showstatus(data.obj.data[k].status) + '</div>' +
                        '</div><div class="rightslide">' +
                        '<div style="float:left;width:30%;">' +
                        '<span class="orderNo  f12 fco rs"  >货主单号:</span><br>' +
                        '<span class="ownerName f12 fco rs" >发货人:</span><br>' +
                        '<span class="enterPriseNo f12 fco rs">收货人:</span><br>' +
                        '<span class="enterPriseNo f12 fco rs">预计到货时间:</span>' +
                        '</div> <div style="float:right;width:70%;">' +
                        '<span class="ownerName f12 fco p0-6" style="position: absolute;" >' + data.obj.data[k].orderNo + '</span><br>' +
                        '<span class="ownerName f12 fco p0-6" style="position: absolute;">' + data.obj.data[k].ownerName + '</span><br>' +
                        '<span class="ownerNo f12 fco p0-6" style="position: absolute;">' + data.obj.data[k].custName + '</span><br>' +
                        '<span class="wnerNo f12 fco p0-6" style="position: absolute;">' + data.obj.data[k].deliveryDate + '</span>' +
                        '</div> <div style="clear:both;"></div></div><div style="clear:both;"></div></div></li>');

                }else{
                    result = $('<li class="f2" style="margin-top:4px;" onclick="' + traceFuc + '" ' +
                        'data-order-detail=\'' + JSON.stringify(data.obj.data[k]) + '\'>' +
                        '<div ><div style="float:left;">' +
                        '<span class="orderNo f1 f14  p0-6 fd" >物流商单号:</span>' +
                        '<span class="orderNo f1 f14  p0-6 fd" >' + data.obj.data[k].dispatchNo + '</span>' +
                        '</div><div style="float:right;width:40%;">' +
                        '<span id="occurPlaceimg_' + k + '" class="orderNo"><img src="assets/img/location.png"/></span>' +
                        '<span id="occurPlace_' + k + '" class="occurPlace f12" style="color:#F6842B;">' + data.obj.data[k].occurPlace + '</span>' +
                        '</div></div>' +
                        '<div align="center"><hr style="width:95%;margin-top:0px;margin-bottom:0px;border: 0;border-top:1px solid #BFBFBF;">' +
                        '</div> <div class="f2" style="height: 80px;"><div class="leftslide">' +
                        '<div style="width:40px;height:40px;background:white;border: 4px solid #fffff;border-radius:60px;' +
                        'font-size:16px;color:coral;font-weight:bold;text-align:center;line-height:40px;margin:0px auto;">' + showstatus(data.obj.data[k].status) + '</div>' +
                        '</div><div class="rightslide">' +
                        '<div style="float:left;width:30%;">' +
                        '<span class="orderNo  f12 fco rs"  >货主单号:</span><br>' +
                        '<span class="ownerName f12 fco rs" >发货人:</span><br>' +
                        '<span class="enterPriseNo f12 fco rs">收货人:</span><br>' +
                        '<span class="enterPriseNo f12 fco rs">预计到货时间:</span>' +
                        '</div> <div style="float:right;width:70%;">' +
                        '<span class="ownerName f12 fco p0-6" style="position: absolute;" >' + data.obj.data[k].orderNo + '</span><br>' +
                        '<span class="ownerName f12 fco p0-6" style="position: absolute;">' + data.obj.data[k].ownerName + '</span><br>' +
                        '<span class="ownerNo f12 fco p0-6" style="position: absolute;">' + data.obj.data[k].custName + '</span><br>' +
                        '<span class="wnerNo f12 fco p0-6" style="position: absolute;">' + data.obj.data[k].deliveryDate + '</span>' +
                        '</div> <div style="clear:both;"></div></div><div style="clear:both;"></div></div></li>');
                }
                $.ui.hideMask();
                $(result).appendTo(containNode);
            }
        } else if (data.obj.recordsTotal == 1) {
            setCacheData("currentorder", data.obj[0], 1);
            if( loginStatus==0 || loginStatus== '0' ){
                traceInfo();
            }else{
                traceInfo2();
            }
        } else {
            result = nullTrace;
            errorPopup(data.msg);
        }
        $(containNode).appendTo("#orderlist_ul");

    }else{
        errorPopup(data.msg);
    }
}


   function showstatus(status){
       if(status=='10'){
           return '下单';
       }else if(status=='30'){
           return '备货';
       }else if(status=='40'){
           return '提货';
       }else if(status=='70'){
           return '在途';
       }else if(status=='80'){
           return '交接';
       }else if(status=='90'){
           return '签收';
       }else {
           return 'error';
       }
   }
    /*setCacheData("searchFilter", mergeJson(oldmyFilter, {'start': (oldmyFilter.start -= 0) +
        data.obj.data.length, 'queryDate': data.obj.queryDate}, true), true);*/






function getOrderListPullToRefresh(that){
    setCacheData("searchFilter",mergeJson(JSON.parse(localStorage.getItem("searchFilter")),
        {'queryType':'1','enterpriseNo':getEnterpriseNo()},true),true);

    jQuery.ajax({
        url: searchUrl,
        timeout: 20000, //超时X秒
        dataType: 'jsonp',
        data:JSON.parse(localStorage.getItem("searchFilter"))
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
                            updateOrderlistPanel(data,true);
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
                setCacheData("searchFilter",mergeJson(JSON.parse(localStorage.getItem("searchFilter")),
                    {'queryType':'2'},true),true);
                that.hideRefresh();
            }, 1000);
        });
}


function getRequestFromOrderListinite(self) {
    setCacheData("searchFilter",mergeJson(JSON.parse(localStorage.getItem("searchFilter")),
        {'queryType':'1','enterpriseNo':getEnterpriseNo()},true),true);
    jQuery.ajax({
        url: searchUrl,
        timeout: 20000, //超时X秒
        dataType: 'jsonp',
        data:JSON.parse(localStorage.getItem("searchFilter"))
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
                        $(self.el).find("#infinite").remove();
                        self.clearInfinite();
                        updateOrderlistPanel(data);
                    }catch(e){
                    };
                }
            }
        }).fail(function () {
        }).always(function () {
            ajaxFlag=true;
        });

}
