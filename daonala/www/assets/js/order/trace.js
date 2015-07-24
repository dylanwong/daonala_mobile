/**
 * Created by wyy on 2015-05-28.
 */


function initTraceInfo(){
    var data = JSON.parse(localStorage.getItem("currentorder"));
    $('#trace_orderNo').html(data.orderNo);
    $('#trace_sender').html(data.ownerName);
    $('#trace_reciever').html(data.custName);


    $('#topdeliverNo').html('运输单号'+data.topsendNo);
    $('#topdeliverNo').attr('delivery',data.topsendNo);
    getAjax(searchTraceUrl, {'enterpriseNo':data.enterpriseNo,'systemNo':data.systemNo,
            'dispatchNo':data.dispatchNo,
            'sendNo':data.topsendNo},
        "updateTracePanel(data)", "errorPopup('网络请求超时,请检查网络后再尝试..')");
    //enterpriseNo, systemNo,dispatchNo,sendNo
}
//选择运输单查看订单轨迹
function initTraceInfoAgain(elm){
    var sendno = $(elm).attr('sendno');
    var data = JSON.parse(localStorage.getItem("currentorder"));
    var user = JSON.parse(localStorage.getItem("e_user"));
    var todoFun ;
    if(user!=null){
        //$('#topdeliverNo_d').html(data.topsendNo);
        $('#topdeliverNo_d').attr('delivery',sendno);
        $('#topdeliverNo_d').html('运输单号:'+sendno);
        $.ui.goBack();//.goBack;
        queryDetailTraceAgain_login();
    }else {
        $('#topdeliverNo').html('运输单号   '+sendno);
        $('#topdeliverNo').attr('delivery',sendno);
        $.ui.loadContent("#ordertrace", false, false, "slide");
        $('#topdeliverNo').html('运输单号' + data.topsendNo);
        todoFun = "updateDetailPanel(data)";
        getAjax(searchTraceUrl, {'enterpriseNo': data.enterpriseNo, 'systemNo': data.systemNo,
                'dispatchNo': data.dispatchNo,
                'sendNo': sendno},
            "updateTracePanel(data)", "errorPopup('网络请求超时,请检查网络后再尝试..')");
    }

}



function initTraceInfo2forAgain(elm){
    var data = JSON.parse(localStorage.getItem("currentorder"));
    $('#trace_orderNo').html(data.orderNo);
    $('#trace_sender').html(data.ownerName);
    $('#trace_reciever').html(data.custName);

    var user = JSON.parse(localStorage.getItem("e_user"));
    var todoFun ;
    if(user!=null){
        $('#topdeliverNo_d').html(data.topsendNo);
        $('#topdeliverNo_d').attr('delivery',data.topsendNo);
        //$('#topdeliverNo').html('运输单号：'+data.topsendNo);
        $.ui.goBack();//.goBack;
        todoFun = "queryDetailTraceAgain_login()";
    }else{
        $('#topdeliverNo').html('运输单号'+data.topsendNo);
        todoFun = "updateDetailPanel(data)";
        getAjax(searchTraceUrl, {'enterpriseNo':data.enterpriseNo,'systemNo':data.systemNo,
                'dispatchNo':data.dispatchNo,
                'sendNo':data.topsendNo},
            todoFun, "errorPopup('网络请求超时,请检查网络后再尝试..')");
    }
}



function updateTracePanel(datas){
    $("#trace-timeline").empty();
    var nullTrace = "<div align='center' style='margin: 10px;'>暂无物流跟踪信息...</div>";
    var color,alert,title,time,desc;
    var html = "",height = "";
    if(datas.isSucc){
        var result = '';
        var obj = datas.obj ;
        $('#trace_driver').html(datas.obj[0].opaName);
        $('#trace_tel').html(datas.obj[0].tel);
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
            html += '<div style="overflow:hidden;"><div class="fl" style="width:25%;margin:12px auto;">' +
                '<div style="width:60px;height:60px;background:'+color+';border: 4px solid #fffff;border-radius:60px;' +
                'font-size:24px;color:#FFFFFF;font-weight:bold;text-align:center;line-height:60px;margin:0px auto;">'+title+'' +
                '</div></div><div class="fl" style="width:75%;"><div style="'+height+'" class="send"><div class="arrow"></div>' +
                '<div style="position:relative;right:5px;top:0px;float:right;">'+alert+'</div>' +
                '<div style="margin-left:10px;padding-top:10px;font-size:14px;font-weight:bold;">'+time+'</div>' +
                '<div style="font-size:12px;margin-left:10px;margin-bottom:20px;">'+desc+'</div></div></div></div>';
        });
    }else{
        html = nullTrace;
    }
    $("#trace-timeline").append(html);
    $.ui.unblockUI();
    $.ui.hideMask();
}

function changeTraceOrder()
{
    $.ui.blockUI(.3);
    $.ui.showMask("获取运输单列表..");
    $("ul#choicedeliveroders").empty();
    var data = JSON.parse(localStorage.getItem("currentorder"));

    getAjax(choicedeliverOrdersUrl, {'enterpriseNo':data.enterpriseNo,'systemNo':data.systemNo,
            'dispatchNo':data.dispatchNo},
        "updateChoicePanel(data)", "errorPopup('网络请求超时,请检查网络后再尝试..')");
}
function updateChoicePanel(datas){
    var nullTrace = "<div align='center' style='margin: 10px;'>查无多条订单...</div>";
    var result='';

    if(datas.isSucc){
        var obj = datas.obj;
        $(obj).each(function (index,data) {
            result += '  <li onclick="initTraceInfoAgain(this)" sendno="'+data.sendNo+'" class="f2" style="margin-top:4px;"> ' +
                '<div class="f2" style="height: 70px;"> ' +
                '<div class="" style="float:left;width: 90%"> ' +
                '<div> <div style="float:left;">' +
                '<span class="fontCb f1 f14  p0-6 fd" >运输单号:</span>' +
                '<span class="fontCb f1 f14  p0-6 fd" >'+data.sendNo+'</span>' +
                '</div><div style="float:right;width:40%;">' +
                '<span class="fontCb" >'+data.fromAdr+'</span>' +
                '<span class="fontCb " ><img src=""/>'+showAddr(data.endAdr)+'</span>' +
                '<span class="fontCb f12" >'+data.endAdr+'</span>' +
                '</div><div style="clear:both;"></div></div>' +
                '<div align=""><hr style="margin-left:5px;width:85%;margin-top:0px;margin-bottom:5px;border: 0;border-top:1px solid #BFBFBF;">' +
                '</div><div><span class="f12 fco p0-6"  >司机:</span>' +
                '<span class=" f12 fco" >'+data.driverName+'</span>' +
                '<span class=" f12 fco">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;车牌号:</span>' +
                '<span class=" f12 fco">'+data.licensePlate+'</span> <br>' +
                '<span class="ownerName f12 fco p0-6"  >发车:</span>' +
                '<span class="ownerName f12 fco p0-6" style="position: absolute;">'+data.deliveryDate+'</span><br>' +
                '</div> </div><div style="float:right;">' +
                '<div class="" style="right: 20px;position:absolute;padding-top:15px;width:10%;">' +
                '<div align="center" style="">' +
                '<img style="width:16px;height: 16px;" src="assets/img/right.png" />' +
                '</div> </div></div><div style="clear:both;"></div> </div></li>';
        });
    }else{
        result=nullTrace;
    }
    $("ul#choicedeliveroders").append(result);
    $.ui.loadContent("#orderchoice", false, false, "slide");
    $.ui.hideMask();
}
function showAddr(d){
    if( d=='' || d == null ){
        return  '';
    }else{
        return '->';
    }
}
function selTraceOrder(elm)
{
    var orderNo = $(elm).attr('dataId');
    $("#traceOrderSelNo").html(orderNo);
    queryTraceDesc(traceSelNo,orderNo);
}


