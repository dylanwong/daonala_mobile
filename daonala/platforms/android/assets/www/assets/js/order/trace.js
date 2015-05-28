/**
 * Created by wyy on 2015-05-28.
 */


function initTraceInfo(){
    var data = JSON.parse(localStorage.getItem("currentorder"));
    $('#trace_orderNo').html(data.orderNo);
    $('#trace_sender').html(data.ownerName);
    $('#trace_reciever').html(data.custName);


    $('#topdeliverNo').html('运输单号'+data.topsendNo);
    getAjax(searchTraceUrl, {'enterpriseNo':data.enterpriseNo,'systemNo':data.systemNo,
            'dispatchNo':data.dispatchNo,
            'sendNo':data.topsendNo},
        "updateTracePanel(data)", "errorPopup('网络请求超时,请检查网络后再尝试..')");
    //enterpriseNo, systemNo,dispatchNo,sendNo
}

function initTraceInfo2(){

}
var nullTrace = "<div align='center' style='margin: 10px;'>暂无物流跟踪信息...</div>";
function updateTracePanel(datas){
    $("#trace-timeline").empty();

    var color,alert,title,time,desc;
    var html = "",height = "";
    if(datas.isSucc){
        var result = '';
        var obj = datas.obj ;
        $('#trace_driver').html(datas.obj[0].opaName);
        $('#trace_tel').html(datas.obj[0].tel);
        $(obj).each(function (index,data) {
            var status = data.status;
            time = data.changeTimeDescri;
            desc = data.statusDesc;
            if(desc == "")
            {
                height = ";height:100px;";
            }
            if(status <= 40)
            {
                color = "#30BC7F";
                title = "提货";
            }else if(status > 40 && status <= 70)
            {
                color = "#3EA2FC";
                title = "在途";
            }else if(status > 70 && status <= 99)
            {
                color = "#F53274";
                title = "交接";
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
            html += '<div style="overflow:hidden;"><div class="fl" style="width:25%;margin:25px auto;">' +
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
   $.ui.loadContent("#orderchoice", false, false, "slide");
}

function selTraceOrder(elm)
{
    var orderNo = $(elm).attr('dataId');
    $("#traceOrderSelNo").html(orderNo);
    queryTraceDesc(traceSelNo,orderNo);
}