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
    $("#c_ownercity").text(data.fromAdr);
    $("#c_custcity").text(data.endAdr);
    $('#c_sendNo').text(data.sendNo);
    $('#c_licensePlate').text(data.licensePlate);
    $("#nextstup").attr("onclick","nextstup(1);");
    queryfollowchioceorderlist();
}
function biddinghandoverorder(){
    $('#chocieordertable').html('');
    $.ui.loadContent("#chocieorders", false, false, "slide");
    var data = JSON.parse(localStorage.getItem("currenttask"));
    $("#c_ownercity").text(data.fromAdr);
    $("#c_custcity").text(data.endAdr);
    $('#c_sendNo').text(data.sendNo);
    $('#c_licensePlate').text(data.licensePlate);
    $("#nextstup").attr("onclick","nextstup(2);");
    queryhandoverchioceorderlist();
}

function biddingaddInfoorder(elm){
    localStorage.setItem("currenttask",$(elm).attr('data-task-detail'));
    $('#chocieordertable').html('');
    $.ui.loadContent("#chocieorders", false, false, "slide");
    var data = JSON.parse(localStorage.getItem("currenttask"));
    $("#c_ownercity").text(data.fromAdr);
    $("#c_custcity").text(data.endAdr);
    $('#c_sendNo').text(data.sendNo);
    $('#c_licensePlate').text(data.licensePlate);
    $("#nextstup").attr("onclick","nextstup(3);");
    queryallchioceorderlist();
}

function biddingsignorder(){
  //  localStorage.setItem("currenttask",$(elm).attr('data-task-detail'));
    $('#chocieordertable').html('');
    $.ui.loadContent("#chocieorders", false, false, "slide");
    var data = JSON.parse(localStorage.getItem("currenttask"));
    $("#c_ownercity").text(data.fromAdr);
    $("#c_custcity").text(data.endAdr);
    $('#c_sendNo').text(data.sendNo);
    $('#c_licensePlate').text(data.licensePlate);
    $("#nextstup").attr("onclick","nextstup(3);");
    querysignchioceorderlist();
}
function querydeliverchioceorderlist(){
    $.ui.unblockUI();
    $.ui.showMask("我们正在拼命的加载数据...");
    var data = JSON.parse(localStorage.getItem("currenttask"));
    var url = baseUrl+"order/query_orderbytraceorder.action";
    var user = JSON.parse( localStorage.getItem('e_user') );
    var option = {
        enterpriseNo:data.enterpriseNo,
        /*systemNo:data.systemNo,
        dispatchNo:data.dispatchNo,*/
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
        enterpriseNo:data.enterpriseNo,
    /*    systemNo:data.systemNo,
        dispatchNo:data.dispatchNo,*/
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
        enterpriseNo:data.enterpriseNo,
      /*  systemNo:data.systemNo,
        dispatchNo:data.dispatchNo,*/
        deliveryNo:data.deliveryNo,
        status:'',
        type:'2'   //交接订单
    };
    getAjax(url,option,'queryorders_result_succ(data,2)');
}
function querysignchioceorderlist(){
    $.ui.unblockUI();
    $.ui.showMask("我们正在拼命的加载数据...");
    var url = baseUrl+"order/query_orderbytraceorder.action";
    var data = JSON.parse(localStorage.getItem("currenttask"));
    var option = {
        enterpriseNo:data.enterpriseNo,
      //  systemNo:data.systemNo,
      //  dispatchNo:data.dispatchNo,
        deliveryNo:data.deliveryNo,
        status:'',
        type:'3'   //签收订单
    };
    getAjax(url,option,'queryorders_result_succ(data,3)');
}
function queryallchioceorderlist(){
    $.ui.unblockUI();
    $.ui.showMask("我们正在拼命的加载数据...");
    var url = baseUrl+"order/query_orderbytraceorder.action";
    var data = JSON.parse(localStorage.getItem("currenttask"));
    var option = {
        enterpriseNo:data.enterpriseNo,
        //  systemNo:data.systemNo,
        //  dispatchNo:data.dispatchNo,
        deliveryNo:data.deliveryNo,
        status:'',
        type:'4'   //补录订单
    };
    getAjax(url,option,'queryorders_result_succ(data,3)');
}
function queryorders_result_succ(data,type){

    if(data.isSucc){
        if(data.msg.split('-')[0] == 'S00001'){
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
             " style='display:block;' ownerNo='"+obj[i].ownerNo+"' systemNo='"+obj[i].systemNo+"'dispatchNo='"+obj[i].dispatchNo+"' enterpriseNo='"+obj[i].enterpriseNo+"' suborderNo='"+obj[i].suborderNo+"' " +
             "transNo='"+obj[i].sendNo+"' value='"+obj[i].orderNo+"' /></th>"+
        "<th  width='25%' value='"+obj[i].deliveryNo+"' style='color:#A0A0A0;line-height:14px;'>"+obj[i].orderNo+"</th>"+
        "<th width='35%' ownercity='"+obj[i].fromAdr+"' custcity='"+obj[i].endAdr+"'" +
             " style='color:#A0A0A0;line-height:14px;'>"+obj[i].fromAdr+"->"+obj[i].endAdr+"</th>"+
        "<th width='20%' status='"+obj[i].status+"' style='color:#06ABD4;line-height:14px;'>"+changestatus(obj[i].status)+"</th>"+
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
            errorPopup(data.msg.split('-')[1]);
            if(type=='4'){
                $.ui.loadContent("#driverboard", false, false, "slide");
            }else{
                $.ui.loadContent("#operateguide", false, false, "slide");
            }
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
                //consignno:$(this).parent().next().children().val(),
                orderNo:$(this).val(),
                subOrderNo:$(this).attr('suborderNo'),
                dispatchNo:$(this).attr('dispatchNo'),
                transno:$(this).attr('transNo'),
                enterpriseNo:$(this).attr('enterpriseNo'),
                ownerCity:$(this).parent().next().next().children().attr('ownercity'),
                custCity:$(this).parent().next().next().children().attr('custcity'),
                status:$(this).parent().next().next().next().children().attr('status'),
                remarks:'',
                systemNo:$(this).attr('systemNo'),
                ownerNo:$(this).attr('ownerNo')


                }
                ordernos.push(orderno);
                //suborderno='"+obj[i].suborderno+"' transno='"+obj[i].transno+"'
            }
        );
        localStorage.setItem("chocieorders",JSON.stringify(ordernos ));
        var data = JSON.parse(localStorage.getItem("currenttask"));
        if(nexttype=='0'){
            $.ui.loadContent("#deliverorders", false, false, "slide");
            $("#deliverownercity").text(data.fromAdr);
            $("#delivercustcity").text(data.endAdr);
            $("#deliverconsignno").text(data.sendNo);
            imgLocation='0';
     //       $("#deliverarticlename").text(localStorage.getItem("articlename"));
        }else if(nexttype=='1'){
            $.ui.loadContent("#followorder", false, false, "slide");
            $("#followownercity").text(data.fromAdr);
            $("#followcustcity").text(data.endAdr);
            $("#followconsignno").text(data.sendNo);
            imgLocation='1';
            lOCATIONID = 'currentlocation';
            getCurrentPositionAddress();
           // $("#followarticlename").text(localStorage.getItem("articlename"));
        }else if(nexttype=='2'){
            $.ui.loadContent("#handoverorders", false, false, "slide");
            $("#handoverownercity").text(data.fromAdr);
            $("#handovercustcity").text(data.endAdr);
            $("#handoverconsignno").text(data.sendNo);
            imgLocation='2';
            //$("#handoverarticlename").text(localStorage.getItem("articlename"));
        }else if(nexttype=='3'){
            $.ui.loadContent("#signorders", false, false, "slide");
            $("#signownercity").text(data.fromAdr);
            $("#signcustcity").text(data.endAdr);
            $("#signconsignno").text(data.sendNo);
            imgLocation='3';
            //$("#handoverarticlename").text(localStorage.getItem("articlename"));
        }else{
            errorPopup('next stup dismiss parm ;error');
        }



      //  errorPopup(localStorage.getItem('location'));
    }else{
        errorPopup('请选择订单');
    }

}



