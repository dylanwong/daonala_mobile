/**
 * Created by wyy on 2015-04-15.
 */


//function biddingchocieorder(){
//    $.ui.loadContent("#chocieorders", false, false, "slide");
//
//    $("#ownercity").text(localStorage.getItem("ownercity"));
//    $("#custcity").text(localStorage.getItem("custcity"));
//    $("#articleweight").text(localStorage.getItem("articleweight"));
//    $("#articlename").text(localStorage.getItem("articlename"));
//    querydeliverchioceorderlist();
//}
//$('#startplace').text(data.nDesProvince+data.nDesCounty);
//$('#endplace').text(data.nOriginProvince+data.nOriginCity);
//$('#goods').text(data.articleGroup);
//$('#goodspty').text(data.carryVol+"立方米 "+data.carryWt+"吨");


function biddingdeliveryorder(){

    $('#chocieordertable').html('');
    $.ui.loadContent("#chocieorders", false, false, "slide");
    var data = JSON.parse(localStorage.getItem("currenttask"));
    $("#c_ownercity").text(data.fromAdr);
    $("#c_custcity").text(data.endAdr);
    $('#c_sendNo').text(data.sendNo);
    $('#c_licensePlate').text(data.licensePlate);
    $("#nextstup").attr("onclick","nextstup(0);");
    querydeliverchioceorderlist();
}
function biddingfolloworder(){
    $('#chocieordertable').html('');
    $.ui.loadContent("#chocieorders", false, false, "slide");
    var data = JSON.parse(localStorage.getItem("currenttask"));
    $("#ownercity").text(data.nOriginProvince+data.nOriginCity);
    $("#custcity").text(data.nDesProvince+data.nDesCity);
    $("#articleweight").text(data.goodsVol+"立方米 "+data.goodsWt+"吨");
    $("#articlename").text(data.articleGroup);
    $("#nextstup").attr("onclick","nextstup(1);");
    queryfollowchioceorderlist();
}
function biddinghandoverorder(){
    $('#chocieordertable').html('');
    $.ui.loadContent("#chocieorders", false, false, "slide");
    var data = JSON.parse(localStorage.getItem("currenttask"));
    $("#ownercity").text(data.nOriginProvince+data.nOriginCity);
    $("#custcity").text(data.nDesProvince+data.nDesCity);
    $("#articleweight").text(data.goodsVol+"立方米 "+data.goodsWt+"吨");
    $("#articlename").text(data.articleGroup);
    $("#nextstup").attr("onclick","nextstup(2);");
    queryhandoverchioceorderlist();
}

function querydeliverchioceorderlist(){
    $.ui.unblockUI();
    $.ui.showMask("我们正在拼命的加载数据...");
    var data = JSON.parse(localStorage.getItem("currenttask"));
    var url = baseUrl+"order/query_orderbytraceorder.action";
    var user = JSON.parse( localStorage.getItem('user') );
    var option = {
        enterpriseno:data.enterpriseNo,
        systemNo:data.systemNo,
        dispatchNo:data.dispatchNo,
        deliveryNo:data.deliveryNo,
        status:'',
        type:'0'   //提取订单
    };
    getAjax(url,option,'queryorders_result_succ(data,0)');
}

function queryfollowchioceorderlist(){
    $.ui.unblockUI();
    $.ui.showMask("我们正在拼命的加载数据...");
    var url = baseUrl+"order/query_orderbytraceorder.action";
    var data = JSON.parse(localStorage.getItem("currenttask"));
    var option = {
        enterpriseno:data.enterpriseNo,
        systemNo:data.systemNo,
        dispatchNo:data.dispatchNo,
        deliveryNo:data.deliveryNo,
        status:'',
        type:'1'   //在途订单
    };
    getAjax(url,option,'queryorders_result_succ(data,1)');
}

function queryhandoverchioceorderlist(){
    $.ui.unblockUI();
    $.ui.showMask("我们正在拼命的加载数据...");
    var url = baseUrl+"order/query_orderbytraceorder.action";
    var data = JSON.parse(localStorage.getItem("currenttask"));
    var option = {
        enterpriseno:data.enterpriseNo,
        systemNo:data.systemNo,
        dispatchNo:data.dispatchNo,
        deliveryNo:data.deliveryNo,
        status:'',
        type:'2'   //交接订单
    };
    getAjax(url,option,'queryorders_result_succ(data,2)');
}
function queryhandoverchioceorderlist(){
    $.ui.unblockUI();
    $.ui.showMask("我们正在拼命的加载数据...");
    var url = baseUrl+"order/query_orderbytraceorder.action";
    var data = JSON.parse(localStorage.getItem("currenttask"));
    var option = {
        enterpriseno:data.enterpriseNo,
        systemNo:data.systemNo,
        dispatchNo:data.dispatchNo,
        deliveryNo:data.deliveryNo,
        status:'',
        type:'4'   //签收订单
    };
    getAjax(url,option,'queryorders_result_succ(data,2)');
}

function queryorders_result_succ(data,type){

    if(data.isSucc){
        var obj = data.obj;
        var trs ='';
        if(obj.length==0&&type=='0'){
            errorPopup('暂无可提取订单!');//trs = "<tr><font style='text-align: center;' >无数据！</font></tr>"
            $.ui.loadContent("#operateguide", false, false, "slide");
        }else if(obj.length==0&&type=='1'){
            errorPopup('暂无运输中订单!');//trs = "<tr><font style='text-align: center;' >无数据！</font></tr>"
            $.ui.loadContent("#operateguide", false, false, "slide");
        }else if(obj.length==0&&type=='2'){
            errorPopup('订单已全部交接!');//trs = "<tr><font style='text-align: center;' >无数据！</font></tr>"
            $.ui.loadContent("#operateguide", false, false, "slide");
        }
        else{
        for(var i=0;i<obj.length;i++)
         trs += "<tr><th width='20%'><input type='checkbox' name='checkbox' checked='true' " +
             " style='display:block;' ownerNo='"+obj[i].ownerno+"' systemNo='"+obj[i].systemno+"' enterpriseNo='"+obj[i].enterpriseno+"' suborderNo='"+obj[i].suborderno+"' " +
             "transNo='"+obj[i].transno+"' value='"+obj[i].orderno+"' /></th>"+
        "<th  width='25%' value='"+obj[i].consignno+"' style='color:#A0A0A0;line-height:14px;'>"+obj[i].orderno+"</th>"+
        "<th width='35%' ownercity='"+obj[i].owneraddr+"' custcity='"+obj[i].custaddr+"'" +
             " style='color:#A0A0A0;line-height:14px;'>"+obj[i].owneraddr+"->"+obj[i].custaddr+"</th>"+
        "<th width='20%' status='"+obj[i].status+"' style='color:#EF8407;line-height:14px;'>"+changestatus(obj[i].status)+"</th>"+
        "</tr>";
            $.ui.hideMask();
            $('#chocieordertable').html(trs);
          //  $("#chocieordertable tr").unbind('click');
            $("#chocieordertable tr").click(function(){
               // alert($(this).children('th').find("input[type='checkbox']").prop('checked'));
                if ($(this).children('th').find("input[type='checkbox']").prop('checked')==true
                    ||$(this).children('th').find("input[type='checkbox']").prop('checked')=='checked') {
                    $(this).children('th').find("input[type='checkbox']").prop('checked',false);
                }else{
                    $(this).children('th').find("input[type='checkbox']").prop('checked',true);
                }
            });
        }
    }else{
        errorPopup('获取数据失败');
    }


}

function changestatus(status){
    if(status=='10'){
        return '待提货';
    }else if(status=='40'){
        return '已提货';
    }else if(status=='70'){
        return '运输中';
    }else if(status=='80'){
        return '已交接';
    }else if(status=='90'){
        return '已签收';
    }
    else if(status=='FF'){
        return '作废';
    }else {
        return status;
    }
}
function biddingcheckbox(){
$("#selectAllBtn").click(function() {
    if (this.checked) {
        $("input[name='checkbox']").attr('checked', true);
    } else {
        $("input[name='checkbox']").attr('checked', false);
    }
});
}
/**跳转到confirm订单页面**/
function nextstup(nexttype){
    $("input[name=feedback]").each(function() {
        $(this).val("");
        $(this).text("");
    });
    $("img[ownlocation='feedbackimg']").remove();

    if( $("input[name=checkbox]:checked").length>0)  {
        var ordernos = new Array();
        $("input[name='checkbox']:checkbox:checked")
            .each(
            function() {
                var orderno={
                consignno:$(this).parent().next().children().val(),
                orderno:$(this).val(),
                suborderno:$(this).attr('suborderNo'),
                transno:$(this).attr('transNo'),
                enterpriseno:$(this).attr('enterpriseNo'),
                ownercity:$(this).parent().next().next().children().attr('ownercity'),
                custcity:$(this).parent().next().next().children().attr('custcity'),
                status:$(this).parent().next().next().next().children().attr('status'),
                remarks:'',
                systemno:$(this).attr('systemNo'),
                ownerno:$(this).attr('ownerNo')


                }
                ordernos.push(orderno);
                //suborderno='"+obj[i].suborderno+"' transno='"+obj[i].transno+"'
            }
        );
        localStorage.setItem("chocieorders",JSON.stringify(ordernos ));
        var data = JSON.parse(localStorage.getItem("currenttask"));
        if(nexttype=='0'){
            $.ui.loadContent("#deliverorders", false, false, "slide");
            $("#deliverownercity").text(data.nOriginCity);
            $("#delivercustcity").text(data.nDesCity);
            $("#deliverconsignno").text(data.consignNo);
            imgLocation='0';
     //       $("#deliverarticlename").text(localStorage.getItem("articlename"));
        }else if(nexttype=='1'){
            $.ui.loadContent("#followorder", false, false, "slide");
            $("#followownercity").text(data.nOriginCity);
            $("#followcustcity").text(data.nDesCity);
            $("#followconsignno").text(data.consignNo);
            imgLocation='1';
            lOCATIONID = 'currentlocation';
            getCurrentPositionAddress();
           // $("#followarticlename").text(localStorage.getItem("articlename"));
        }else if(nexttype=='2'){
            $.ui.loadContent("#handoverorders", false, false, "slide");
            $("#handoverownercity").text(data.nOriginCity);
            $("#handovercustcity").text(data.nDesCity);
            $("#handoverconsignno").text(data.consignNo);
            imgLocation='2';
            //$("#handoverarticlename").text(localStorage.getItem("articlename"));
        }else{
            errorPopup('next stup dismiss parm ;error');
        }



      //  errorPopup(localStorage.getItem('location'));
    }else{
        errorPopup('请选择订单');
    }

}



