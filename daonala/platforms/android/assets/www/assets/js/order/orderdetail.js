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

    $('#status_d').html(showstatus(data.status));
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
    var cuser = JSON.parse(localStorage.getItem("user"));
    $('#reviewsItem1').empty();
    $('#reviewsItem2').empty();
    $('#reviewsItem3').empty();
    if(datas.isSucc){
        if(datas.obj.length == 0){
            if(cuser.obj.userType==2){
                $('#orderDetailEvaluate').empty();
                evaluteResult = '<div class=" width20" align="center" style="color:#26B6D9;font-size:16px;">'+
               '<a href="#evaluate" ><button type="button" id="evaluteBtn" class="btn btn-primary" '+
               'style="width:60px;height:24px;font-size:14px; '+
               'text-align:center;line-height:24px;padding:0px 12px;">去评价</button> '+
                                '</a></div>';
              //  evaluteResult = '<div><p>无评论信息</p></div>';
            }else{
                $('#orderDetailEvaluate').empty();
            evaluteResult = '<div><p>无评论信息</p></div>';
            }
            $('#orderDetailEvaluate').append(evaluteResult);
        }else{
            if(cuser.obj.userType==0){

                $('#evaluteBtn').hide();
            } else if(cuser.obj.userType==1){
                $('#evaluteBtn').hide();
                $('#replyBtn').hide();
            } else if(cuser.obj.userType==2){
                $('#evaluteBtn').show();
                $('#replyBtn').hide();
            } else {

            }
            if(datas.obj[0].bodmEvaluate != null){
                $('#orderDetailEvaluate').val(datas.obj[0].bodmEvaluate.reviewsNo);
                //$('#evaluteInfo').append('');
//                $('#evaluteInfo').html(datas.obj[0].bodmEvaluate.reviewsUserNo);
//                evaluteResult = '';
                $('#evaluteName').html(datas.obj[0].bodmEvaluate.reviewsUserNo
                    +'【'+datas.obj[0].bodmEvaluate.reviewsDate+'】');
                $('#reviewsDemo').html(datas.obj[0].bodmEvaluate.reviewsDemo);
                $('#reviewsItem1').append(showStar( datas.obj[0].bodmEvaluate.reviewsItem1) );
                $('#reviewsItem2').append(showStar( datas.obj[0].bodmEvaluate.reviewsItem2) );
                $('#reviewsItem3').append(showStar( datas.obj[0].bodmEvaluate.reviewsItem3) );
                $('#replyBtn').hide();
                if(datas.obj[0].bodmEvaluateAnswer !=null ){
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
            evaluteResult = '';
        }
    } else {
        //errorPopup(data.msg);

    }
}

function showStar(star){
    if(star == 1){
       return '<ul class="star1">'+
        '<li><img src="assets/img/bluestar.png"/></li>'+
        '<li><img src="assets/img/star.png"/></li>'+
        '<li><img src="assets/img/star.png"/></li>'+
        '<li><img src="assets/img/star.png"/></li>'+
        '<li><img src="assets/img/star.png"/></li>'+
        '</ul> ';
    }else if( star == 2 ){
        return '<ul class="star1">'+
            '<li><img src="assets/img/bluestar.png"/></li>'+
            '<li><img src="assets/img/bluestar.png"/></li>'+
            '<li><img src="assets/img/star.png"/></li>'+
            '<li><img src="assets/img/star.png"/></li>'+
            '<li><img src="assets/img/star.png"/></li>'+
            '</ul> ';
    }else if( star == 3 ){
        return '<ul class="star1">'+
            '<li><img src="assets/img/bluestar.png"/></li>'+
            '<li><img src="assets/img/bluestar.png"/></li>'+
            '<li><img src="assets/img/bluestar.png"/></li>'+
            '<li><img src="assets/img/star.png"/></li>'+
            '<li><img src="assets/img/star.png"/></li>'+
            '</ul> ';
    }else if( star == 4 ){
        return '<ul class="star1">'+
            '<li><img src="assets/img/bluestar.png"/></li>'+
            '<li><img src="assets/img/bluestar.png"/></li>'+
            '<li><img src="assets/img/bluestar.png"/></li>'+
            '<li><img src="assets/img/bluestar.png"/></li>'+
            '<li><img src="assets/img/star.png"/></li>'+
            '</ul> ';
    }else if( star == 5 ){
        return '<ul class="star1">'+
            '<li><img src="assets/img/bluestar.png"/></li>'+
            '<li><img src="assets/img/bluestar.png"/></li>'+
            '<li><img src="assets/img/bluestar.png"/></li>'+
            '<li><img src="assets/img/bluestar.png"/></li>'+
            '<li><img src="assets/img/bluestar.png"/></li>'+
            '</ul> ';
    }
}

$(function(){
    $(".star li").mouseenter(function(){
        $(".star li img").attr("src","assets/img/bluestar.png");
        $(".star li img").attr("evalutegrade","1");
        $(this).find('img').attr("src","assets/img/bluestar.png");
        $(this).nextAll().find('img').attr("src","assets/img/star.png");
        $(this).nextAll().find('img').attr("evalutegrade","0");
    })
});

function saveReply(){
    var data = JSON.parse(localStorage.getItem("currentorder"));
    var cuser = JSON.parse(localStorage.getItem("user"));
    var savereplyUrl = baseUrl + 'order/submit_evaluate_reply.action';

    getAjax(savereplyUrl, {'enterpriseNo':data.enterpriseNo, 'systemNo':data.systemNo,
            'dispatchNo':data.dispatchNo, 'ownerNo':data.ownerNo,
        'reviewsDemo':$('#reply_Info').val(), 'replyParentId':$('#orderDetailEvaluate').val(),
            'userName':cuser.obj.userName },
        "saveReplySucc(data)", "errorPopup('网络请求超时,请检查网络后再尝试..')");

}

function saveEvalute(){
    var saveevaluteUrl = baseUrl + 'order/submit_evaluate.action';
    var data = JSON.parse(localStorage.getItem("currentorder"));
    var cuser = JSON.parse(localStorage.getItem("user"));
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
                reviewsItem1 + 1;
            };
        });
    $('img[name="huidan"]').each(
        function() {
            if( $(this).attr('evalutegrade') == 1 ){
                reviewsItem2 + 1;
            };
        });
    $('img[name="attitude"]').each(
        function() {
            if( $(this).attr('evalutegrade') == 1 ){
                reviewsItem3 + 1;
            };
        });
    var options = {
        'enterpriseNo':data.enterpriseNo,
        'systemNo':data.systemNo,
        'dispatchNo':data.dispatchNo,
        'ownerNo':data.ownerNo,
        'reviewsDemo':$('#evaluteInfo').val(),
        'reviewsItem1':reviewsItem1,
        'reviewsItem2':reviewsItem2,
        'reviewsItem3':reviewsItem3,
        'userName':cuser.obj.userName
    }
    getAjax(saveevaluteUrl, options,
        "saveEvaluteSucc(data)", "errorPopup('网络请求超时,请检查网络后再尝试..')");


}

function saveReplySucc(data){
    if(data.isSucc){
        errorPopup.msg('回复成功！');
        traceSingleInfo33();
    }else{
        errorPopup(data.msg);
    }

}

function saveEvaluteSucc(data){
    if(data.isSucc){
        errorPopup.msg('评论成功！');
        traceSingleInfo33();
    }else{
        errorPopup(data.msg);
    }

}