/**
 * Created by wangyayun on 2015-06-15.
 */

function toggleCustTabs(elm){

    $(".tabTaskN").addClass('tabTaskY');
    $(".tabTaskN").removeClass('tabTaskN');

    $(elm).removeClass('tabTaskY');
    $(elm).addClass('tabTaskN');

    custTabStatus = $(elm).attr('status')
    cust_orderlist_panel(custTabStatus);
    //cust_orderlist_panel();
}

function cust_orderlist_panel(tdStatus){
    $.ui.blockUI(.3);
    $.ui.showMask("获取查询的订单..");
    $("ul#cust_orderlist_ul").empty();
    //var statustype=elm;
    var statustype ='';
    tdStatus == undefined ? statustype = '' : statustype = tdStatus;//? tdStatus = '1' : tdStatus = tdStatus;
    if( statustype=='0' ) {
        //   timeType='0';
        status='10,20,30,31,40,50,60,70,80';
    }else if( statustype=='1' ){
        //  timeType='3';
        status='90';
    }else {
        status='10,20,30,31,40,50,60,70,80';
        //errorPopup('状态参数错误');
    }
    /* setCacheData("searchFilter", mergeJson(JSON.parse(localStorage.getItem("searchFilter")),
     {'start': '1', 'length':'10', 'queryDate': '', 'status': ''}, true), true);*/
 //   var searchText = $('#searchText').val();
    var user =  JSON.parse( localStorage.getItem("user") );
    if ( localStorage.getItem("user")==null ) {
 /*       getAjax(searchUrl, {'start': '1', 'length':'10','orderNo':'','timeType':timeType,'status':status,'enterpriseText':'10001',
                'ownerText':'','custText':''},
            "updateOrderlistPanel(data)", "errorPopup('网络请求超时,请检查网络后再尝试..')");
*/        // getAjax(searchUrl,options,searchSuc(data),searchFail(data));
    } else {
        getAjax(searchUrl, {'start': '1', 'length':'10','orderNo':'','timeType':'N',
                'status':status,'enterpriseNo':'10001','enterpriseText':'',
                'ownerText':'','custText':'','userNo':getUserNo(),'userType':user.obj.userType},
            "updateCustOrderlistPanel(data)", "errorPopup('网络请求超时,请检查网络后再尝试..')");
    }

    setCacheData("searchFilter",mergeJson(JSON.parse(localStorage.getItem("searchFilter")),
        {'start': '1', 'length':'10','orderNo':'','timeType':'N','status':status,
            'enterpriseNo':'10001','enterpriseText':'',
            'ownerText':'','custText':'','userNo':getUserNo(),'userType':user.obj.userType}, true), true);

}


function updateCustOrderlistPanel(data,flag){

    var prependFlag = arguments[1] ? arguments[1] : false;
    var oldmyFilter = JSON.parse(localStorage.getItem("searchFilter"));

    var containNode = $("<div class='orderNode'></div>");
    var nullTrace = "<div align='center' style='margin: 10px;'>查无订单...</div>";
    if(data.isSucc) {
        var result = '';
        var list = data.obj.data;
        $('#cust_orderlist_ul').empty();
        var traceFuc = '';
        loginStatus == 0 ? traceFuc = 'traceInfo(this);' : traceFuc = 'traceInfo33(this);';
        if (data.obj.recordsTotal > 0) {
            $.ui.loadContent("#custboard", false, false, "slide");
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

                $(result).appendTo(containNode);
            }
        } else{
           // result = ''
        }
        $.ui.hideMask();
        if(flag){
            $("#cust_orderlist_ul").prepend(containNode);
        }else {
            if (list.length < (oldmyFilter.length -= 0)) {
                $("<div id='nullTodoSelf' class='nullOrder'>" +
                    "<p style='text-align: center;text-color:orange;'>暂无剩余任务..</p>" +
                    "</div>").appendTo(containNode);
            }
            $(containNode).appendTo("#cust_orderlist_ul");
//            result = nullTrace;
//            $(result).appendTo(containNode);
        }
        //$(containNode).appendTo("#cust_orderlist_ul");

    }else{
        errorPopup(data.msg);
    }

    
    
    
}


function getCustOrderPullToRefresh(that){

    setCacheData("searchFilter",mergeJson(JSON.parse(localStorage.getItem("searchFilter")),
        {'queryType':'1'},true),true);
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
                            updateCustOrderlistPanel(data,true);
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


function getRequestFromCustOrderinite(self) {
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
                        updateCustOrderlistPanel(data);
                    }catch(e){
                    };
                }
            }
        }).fail(function () {
        }).always(function () {
            ajaxFlag=true;
        });

}



        var emails = [
                 { name: "Peter Pan", to: "peter@pan.de" },
                 { name: "Molly", to: "molly@yahoo.com" },
                 { name: "Forneria Marconi", to: "live@japan.jp" },
                 { name: "Master <em>Sync</em>", to: "205bw@samsung.com" },
                 { name: "Dr. <strong>Tech</strong> de Log", to: "g15@logitech.com" },
                 { name: "Don Corleone", to: "don@vegas.com" },
                 { name: "Mc Chick", to: "info@donalds.org" },
                 { name: "Donnie Darko", to: "dd@timeshift.info" },
                 { name: "Quake The Net", to: "webmaster@quakenet.org" },
                 { name: "Dr. Write", to: "write@writable.com" },
                 { name: "GG Bond", to: "Bond@qq.com" },
                 { name: "Zhuzhu Xia", to: "zhuzhu@qq.com" }
             ];
        function initAutoData(){
                    $('#keyword').autocomplete(emails, {
                        max: 12,    //列表里的条目数
                        minChars: 0,    //自动完成激活之前填入的最小字符
                        width: 400,     //提示的宽度，溢出隐藏
                        scrollHeight: 300,   //提示的高度，溢出显示滚动条
                        matchContains: true,    //包含匹配，就是data参数里的数据，是否只要包含文本框里的数据就显示
                        autoFill: false,    //自动填充
                        formatItem: function(row, i, max) {
                               return i + '/' + max + ':"' + row.name + '"[' + row.to + ']';
                          },
                        formatMatch: function(row, i, max) {
                                return row.name + row.to;
                            },
                        formatResult: function(row) {
                                 return row.to;
                             }
                     }).result(function(event, row, formatted) {
                         alert(row.to);
                     });
             };