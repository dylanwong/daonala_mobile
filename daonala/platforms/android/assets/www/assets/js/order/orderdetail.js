/**
 * Created by 翔 on 2015/6/5.
 */
/**
 *
 */
function init_orderdetail()
{
    $("#orderdetail-buttons").delegate('button','click',function()
    {
        var target = $($("#orderdetail-buttons").find(".selectTotalDay")[0]).attr('target');
        $($("#orderdetail-buttons").find(".selectTotalDay")[0]).removeClass('selectTotalDay');
        $("#"+target).hide();
        $(this).addClass('selectTotalDay');
        $("#"+$(this).attr('target')).fadeIn(300);

    })
}

function queryDetailInfo(){
    var data = JSON.parse(localStorage.getItem("currentorder"));
    $('#shipPhone_d').html(data.orderNo);
    $('#shipNo_d').html(data.ownerName);

    $('#custAddr_d').html(data.custAddr);
    $('#custName_d').html(data.custName);
    $('#custContacts_d').html(data.custContacts+'  '+data.custPhone);
    $('#addrName_d').html(data.addrName);
    $('#ownerPhone_d').attr('href','tel:'+data.custPhone);

    $('#ownerName_d').html(data.ownerName);
    $('#ownerAddr_d').html(data.ownerAddr);
    $('#ownerContacts_d').html(data.orderNo);

    $('#status_d').html(data.status);
    $('#transNo_d').html(data.transNo);
    $('#ownerNo_d').html(data.ownerNo);
    $('#custNo_d').html(data.custNo);
    $('#orderDate_d').html(data.orderDate);

    $('#topdeliverNo_d').html(data.topsendNo);
    queryDetailProduct();
    queryDetailTrace_login();
    queryEvalute();
}

function queryDetailProduct(){
    //$.ui.blockUI(.3);
    $("#orderDetailProduct").empty();
    var data = JSON.parse(localStorage.getItem("currentorder"));
    getAjax(searchProductUrl, {'enterpriseNo':data.enterpriseNo,'systemNo':data.systemNo,
            'dispatchNo':data.dispatchNo},
        "updataDetailPanel(data)", "errorPopup('网络请求超时,请检查网络后再尝试..')");
//    updataDetailPanel(data);
}


function updataDetailPanel(data){
    var products = "";
    if(data.isSucc) {
       // var productNode = $("<div class='productNode'></div>");
        for (var i in data.obj) {
             products +=
                    '<div style="border-top: 10px solid #EFEFEF;"><ul><li>' +
                    '<div class="fl width30" align="right" style="color:#26B6D9;font-size:16px;" id="articleName"> '+ data.obj[i].articleName +' </div>' +
                    '</li><li style="height: 80px;padding-top: 10px;">' +
                    '<div class="fl width33 overflowHidden percent80"' +
                    'style="line-height:60px;" align="center">' +
                    '<b class="fl" style="padding-left:10px;padding-top:5px;padding-right:5px;">要货</b>' +
                    '<span class="fl fs32" style="color: #06ABD4" id="orderQty_d" >' + data.obj[i].orderQty + '</span>' +
                    '</div><div class="fl width33 overflowHidden percent80" ' +
                    'style="border-left: 1px solid #E3E3E3; ' +
                    'border-right: 1px solid #E3E3E3;line-height:60px;" align="center"> ' +
                    '<b class="fl" style="padding-left:10px;padding-top:5px;padding-right:5px;">送货</b> ' +
                    '<span class="fl fs32" style="color: #06ABD4" id="deliverQty_d" >' + data.obj[i].deliverQty + '</span> ' +
                    '</div><div class="fl width33 overflowHidden percent80" ' +
                    'style="line-height:60px;" align="center"> ' +
                    '<b class="fl" style="padding-left:10px;padding-top:5px;padding-right:5px;">签收</b> ' +
                    '<span class="fl fs32" style="color: #06ABD4" id="signQty_d" >' + data.obj[i].signQty + '</span></div></li></ul></div>'
            ;
          //  $(products).appendTo(productNode);
        }
        $("#orderDetailProduct").html(products);
      //  productNode.appendTo("#Productproducts");
    }else{
        productNode=$("<div class='productNode'>暂无产品信息</div>");
        productNode.appendTo("#Productproducts");
    }
    //$.ui.unblockUI();
}



function queryDetailTrace_login(){
    $("#orderDetailTrace").empty();
    var data = JSON.parse(localStorage.getItem("currentorder"));
    $.ui.blockUI(.3);
    getAjax(searchTraceUrl, {'enterpriseNo':data.enterpriseNo,'systemNo':data.systemNo,
            'dispatchNo':data.dispatchNo,
            'sendNo':data.topsendNo},
        "updateTracePanel2(data)", "errorPopup('网络请求超时,请检查网络后再尝试..')");

}

function updateTracePanel2(datas){
    $("#trace-timeline").empty();

    var color,alert,title,time,desc;
    var html = "",height = "";
    if(datas.isSucc){
        var result = '';
        var obj = datas.obj ;
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
    $("#orderDetailTrace").append(html);
    $.ui.unblockUI();
    $.ui.hideMask();
}


function queryEvalute(){
    //order/view_evaluate.action
    var data = JSON.parse(localStorage.getItem("currentorder"));
//    getAjax(evaluteUrl, {'ownerNo':data.ownerNo,'systemNo':data.systemNo,
//            'dispatchNo':data.dispatchNo },
//        "updateEvalute(data)", "errorPopup('网络请求超时,请检查网络后再尝试..')");
    getAjax(evaluteUrl, {'ownerNo':data.ownerNo,'systemNo':data.systemNo,
            'dispatchNo':data.dispatchNo },
        "updateEvalute(data)", "errorPopup('网络请求超时,请检查网络后再尝试..')");
}

function updateEvalute(datas){
    var evaluteResult = '';
    if(datas.isSucc){
        if(datas.obj.length == 0){
            $('#orderDetailEvaluate').empty();
            evaluteResult = '<div><p>无评论信息</p></div>';
            $('#orderDetailEvaluate').append(evaluteResult);
        }else{
            evaluteResult = '';
        }
    } else {
        //errorPopup(data.msg);

    }
}


