/**
 * Created by wyy on 2015-06-23.
 */

//选择发货人信息
function choiceOwnerAddr(){
    var choiceOwnerAddrUrl = baseUrl + "order/queryOwnerAddr.action";
    var user = JSON.parse(localStorage.getItem("user"));
    var option = {
        enterpriseno:'10001',
        ownerNo:user.obj.enterpriseNo
    };
    $.ui.loadContent("#chocieOwner", false, false, "slide");
    getAjax(choiceOwnerAddrUrl, option,
        "showOwnerAddrList(data)", "errorPopup('网络请求超时,请检查网络后再尝试..')");



}


//选择收货人信息
function choiceCustAddr(){
    $.ui.loadContent("#chocieOwner", false, false, "slide");
    var choiceOwnerAddrUrl = baseUrl + "order/queryCustAddr.action";
    var user = JSON.parse(localStorage.getItem("user"));
    var option = {
        enterpriseno:'10001',
        ownerNo:user.obj.enterpriseNo
    };
    getAjax(choiceOwnerAddrUrl,option,"showCustAddrList(data)", "errorPopup('网络请求超时,请检查网络后再尝试..')");

}

function showOwnerAddrList(data){

    var containNode = $("<div class='ownerNode'></div>");
    var nullTrace = "<div align='center' style='margin: 10px;'>查无发货地信息...</div>";
    if(data.isSucc) {
        var result = '';
        $('#choiceOwnerOrCust_ul').empty();
        var nextFuc = 'confirmOwnerAddr(this);';
        if (data.obj.length > 0) {
            $.ui.showMask("我们正在拼命的加载数据...");
            $.ui.loadContent("#chocieOwner", false, false, "slide");
            for (var k in data.obj) {
                result = $('<li href="#" class="f2" style="margin-top:4px;" onclick="'+nextFuc+'"' +
                    ' data-order-detail=\'' + JSON.stringify(data.obj[k]) + '\'>'+
                    '<div class="f2" style="height: 80px;"><div class="" style="float:left;width: 90%">'+
                    '<div ><div style="float:left;">'+
                    '<span class="fontCb f1 f14  p0-6 fd" >发货公司名称:</span>'+
                    '<span class="fontCb f1 f14  p0-6 fd" >'+data.obj[k].ownerName+'</span>'+
                    '</div><div style="float:right;width:40%;"></div>'+
                    '<div style="clear:both;"></div></div>'+
                    '<div align=""><hr style="margin-left:5px;width:85%;margin-top:0px;margin-bottom:5px;border: 0;border-top:1px solid #BFBFBF;">'+
                    '</div><div><span class="f12 fco p0-6"  >联系人:</span>'+
                    '<span class=" f12 fco" >'+data.obj[k].ownerContact+'</span>'+
                    '<span class=" f12 fco">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;联系电话:</span>'+
                    '<span class=" f12 fco">'+data.obj[k].ownerPhone+'</span>'+
                    '<br><span class="ownerName f12 fco p0-6"  >发货地详细地址:</span>'+
                    '<span class="ownerName f12 fco p0-6" style="position: absolute;">'+data.obj[k].unionAddr+'</span><br>'+
                    '</div></div><div style="float:right;">'+
                    '<div class="" style="right: 20px;position:absolute;padding-top:15px;width:10%;">'+
                    '<div align="center" style="">'+
                    '<img style="width:16px;height: 16px;" src="assets/img/right.png" />'+
                    '</div></div></div><div style="clear:both;"></div></div></li>');
                $(result).appendTo(containNode);
            }
            $.ui.hideMask();
        } else {
            result = nullTrace;
            errorPopup(data.msg);
        }
        $(containNode).appendTo("#choiceOwnerOrCust_ul");

    }else{
        errorPopup(data.msg);
    }
}



function showCustAddrList(data){

    var containNode = $("<div class='ownerNode'></div>");
    var nullTrace = "<div align='center' style='margin: 10px;'>查无收货地信息...</div>";
    if(data.isSucc) {
        var result = '';
        $('#choiceOwnerOrCust_ul').empty();
        var nextFuc = 'confirmCustAddr(this);';
        if (data.obj.length > 0) {
            $.ui.showMask("我们正在拼命的加载数据...");
            $.ui.loadContent("#chocieOwner", false, false, "slide");
            for (var k in data.obj) {
                result = $('<li href="#" class="f2" style="margin-top:4px;" onclick="'+nextFuc+'"' +
                    ' data-order-detail=\'' + JSON.stringify(data.obj[k]) + '\'>'+
                    '<div class="f2" style="height: 80px;"><div class="" style="float:left;width: 90%">'+
                    '<div ><div style="float:left;">'+
                    '<span class="fontCb f1 f14  p0-6 fd" >发货公司名称:</span>'+
                    '<span class="fontCb f1 f14  p0-6 fd" >'+data.obj[k].custName+'</span>'+
                    '</div><div style="float:right;width:40%;"></div>'+
                    '<div style="clear:both;"></div></div>'+
                    '<div align=""><hr style="margin-left:5px;width:85%;margin-top:0px;margin-bottom:5px;border: 0;border-top:1px solid #BFBFBF;">'+
                    '</div><div><span class="f12 fco p0-6"  >联系人:</span>'+
                    '<span class=" f12 fco" >'+data.obj[k].custContact+'</span>'+
                    '<span class=" f12 fco">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;联系电话:</span>'+
                    '<span class=" f12 fco">'+data.obj[k].custPhone+'</span>'+
                    '<br><span class="ownerName f12 fco p0-6"  >发货地详细地址:</span>'+
                    '<span class="ownerName f12 fco p0-6" style="position: absolute;">'+data.obj[k].unionAddr+'</span><br>'+
                    '</div></div><div style="float:right;">'+
                    '<div class="" style="right: 20px;position:absolute;padding-top:15px;width:10%;">'+
                    '<div align="center" style="">'+
                    '<img style="width:16px;height: 16px;" src="assets/img/right.png" />'+
                    '</div></div></div><div style="clear:both;"></div></div></li>');
                $(result).appendTo(containNode);
            }
            $.ui.hideMask();
        } else {
            result = nullTrace;
            errorPopup(data.msg);
        }
        $(containNode).appendTo("#choiceOwnerOrCust_ul");

    }else{
        errorPopup(data.msg);
    }
}

function confirmOwnerAddr(elm){
    //o_ownername  o_addr o_linker o_linkPhone
    var data = eval('(' +$(elm).attr('data-order-detail')+ ')');
    $('#o_ownername').val(data.ownerName);
    $('#o_provice').val(data.province+data.city+data.county);
    $('#o_linker').val(data.ownerContact);
    $('#o_linkPhone').val(data.ownerPhone);
    $('#o_addr').val(data.unionAddr);
    $.ui.goBack();

    localStorage.setItem('confirmProvince',data.province);
    localStorage.setItem('confirmCity',data.city);
    localStorage.setItem('confirmZone',data.county);

}
function confirmCustAddr(elm){
    var data = eval('(' +$(elm).attr('data-order-detail')+ ')');
    $('#c_custname').val(data.ownerName);
    $('#c_provice').val(data.province+data.city+data.county);
    $('#c_linker').val(data.custContact);
    $('#c_linkPhone').val(data.custPhone);
    $('#c_addr').val(data.unionAddr);
    $.ui.goBack();
    localStorage.setItem('custerInfo',JSON.stringify(data));
    localStorage.setItem('confirmCProvince',data.province);
    localStorage.setItem('confirmCCity',data.city);
    localStorage.setItem('confirmCZone',data.county);
}

function submitOrderInfo(){
   // c_goodname c_weight c_volume c_quantity c_mark

//    $('#o_ownername').val();
//    $('#o_city').val();
//    $('#o_linker').val();
//    $('#o_linkPhone').val();
//    $('#o_addr').val();
//
//    $('#c_custname').val();
//    $('#c_city').val();
//    $('#c_linker').val();
//    $('#c_linkPhone').val();
//    $('#c_addr').val();
    $('#c_goodname').val();
    $('#c_weight').val();
    $('#c_volume').val();
    $('#c_quantity').val();
    $('#c_mark').val();

    
    
    

}


function queryOwnerInfo(){
    var queryOwnerUrl = baseUrl + "order/queryOwnerInfo.action";
    var ownerNo = getEnterpriseNo();
    getAjax(queryOwnerUrl,{ownerNo:ownerNo},"queryOwnerInfoSucc(data)", "errorPopup('网络请求超时,请检查网络后再尝试..')");
}
function queryOwnerInfoSucc(data){
    if(data.isSucc){
        localStorage.setItem("ownerInfo",JSON.stringify(data.obj));
        $.ui.loadContent("addorder",false,false,"slide");
    }
}
/**
 * 保存或更新
 */
function saveOrUpdate() {

    var saveOrUpdateFlag=0;
    var transOrderDList = new Array();
    // var trs = $("input[name=articleName]");
    var trs = $("input[name=orderNo]");
    var qty = 0;
    var vol = 0;
    var wt = 0;
    var flag = true;
    var owner = JSON.parse(localStorage.getItem('ownerInfo'));
    var custer = JSON.parse(localStorage.getItem('custerInfo'));
    var user = JSON.parse(localStorage.getItem('user'));
    var owners = JSON.parse(localStorage.getItem("owners"));
    var transOrderM = {
        enterpriseNo : owner.enterpriseNo,
        ownerAlias : owner.ownerAlias,
        ownerNo : owner.ownerNo,
        ownerName : owner.ownerName,
        // ownerCompany:$("#ownerCompany").val(),
        ownerAddr : $("#o_addr").val(),// owner.ownerAddr,
        ownerPhone : $("#o_linkPhone").val(),
        ownerContacts : $("#o_linker").val(),
        custNo : custer.custNo,
        custAlias : custer.custAlias,
        custName : custer.custName,
        custAddr : $("#c_addr").val(),
        custContacts : $("#c_linker").val(),
        custPhone : $("#c_linkPhone").val(),
        ownerProvince : localStorage.getItem('confirmProvince'),
        ownerCity : localStorage.getItem('confirmCity'),
        ownerCounty : localStorage.getItem('confirmZone'),
        custProvince : localStorage.getItem('confirmCProvince'),
        custCity : localStorage.getItem('confirmCCity'),
        custCounty : localStorage.getItem('confirmCZone'),
        payType : '1',
        deliveryDateText : $("#deliveryDate").val()+':00'

    };
    var transOrderD = {
        enterpriseNo : owner.enterpriseNo,
        ownerNo : owner.ownerNo,
        remark : $("#c_mark").val(),
        pkqty : $("#c_quantity").val(),
        volumn : $("#c_volume").val(),
        weight : $("#c_weight").val(),
        articleName : $("#c_goodname").val()
    };

    if (transOrderM.ownerNo == "") {
        //parent.art.dialog.alert("请选择发货人！");
        errorPopup('请选择发货人!');
        flag = false;
    }else if (transOrderM.enterpriseNo == "") {
        //parent.art.dialog.alert("企业编码未选择！");
        errorPopup('企业编码未选择!');
        flag = false;
    }  else if (transOrderM.ownerAlias == "") {
        //parent.art.dialog.alert("发货主名称未填写！");
        errorPopup('发货主名称未填写!');
        flag = false;
    } else if (transOrderM.ownerName == "") {
        //parent.art.dialog.alert("发货公司或个人全称未填写！");
        errorPopup('发货公司或个人全称未填写!');
        flag = false;
    } else if (transOrderM.ownerAddr == "") {
        //parent.art.dialog.alert("发货详细地址未填写！");
        errorPopup('发货详细地址未填写!');
        flag = false;
    } else if (transOrderM.ownerContacts == "") {
        //parent.art.dialog.alert("发货联系人未填写！");
        errorPopup('发货联系人未填写!');
        flag = false;
    } else if (transOrderM.ownerPhone == "") {
        //parent.art.dialog.alert("发货联系电话未填写！");
        errorPopup('发货联系电话未填写!');
        flag = false;
    } else if (transOrderM.custNo == "") {
        //parent.art.dialog.alert("请选择收货人！");
        errorPopup('请选择收货人!');
        flag = false;
    } else if (transOrderM.custAlias == "") {
        //parent.art.dialog.alert("收货人名称未填写！");
        errorPopup('收货人名称未填写!');
        flag = false;
    } else if (transOrderM.custName == "") {
        //parent.art.dialog.alert("收货公司或个人全称未填写！");
        errorPopup('收货公司或个人全称未填写!');
        flag = false;
    } else if (transOrderM.custContacts == "") {
        //parent.art.dialog.alert("收货联系人名称未填写！");
        errorPopup('收货联系人名称未填写!');
        flag = false;
    } else if (transOrderM.custPhone == "") {
        //parent.art.dialog.alert("收货联系电话不能为空!");
        errorPopup('收货联系电话不能为空!');
        flag = false;
    } else if (transOrderM.custAddr == "") {
        //parent.art.dialog.alert("收货详细地址未填写!");
        errorPopup('收货详细地址未填写!');
        flag = false;
    } else if (transOrderM.ownerProvince == null
        || transOrderM.ownerProvince == "") {
        //parent.art.dialog.alert("发货省份未选择!");
        errorPopup('发货省份未选择!');
        flag = false;
    } else if (transOrderM.ownerCity == null || transOrderM.ownerCity == "") {
        //parent.art.dialog.alert("发货城市未选择!");
        errorPopup('发货城市未选择!');
        flag = false;
    } else if ((transOrderM.ownerCounty == null || transOrderM.ownerCounty == "")
        && $('#locZone option').length > 0) {
        //parent.art.dialog.alert("发货区域未选择!");
        errorPopup('发货区域未选择!');
        flag = false;
    } else if (transOrderM.custProvince == null
        || transOrderM.custProvince == "") {
        //parent.art.dialog.alert("收货省份未选择!");
        errorPopup('收货省份未选择!');
        flag = false;
    } else if (transOrderM.custCity == null || transOrderM.custCity == "") {
        //parent.art.dialog.alert("收货城市未选择!");
        errorPopup('收货城市未选择!');
        flag = false;
    } else if (transOrderM.custCounty == null
        || transOrderM.custCounty == "") {
        //parent.art.dialog.alert("收货区域未选择!");
        errorPopup('收货区域未选择!');
        flag = false;
    } else if (transOrderM.orderDate == "" || transOrderM.orderDate == "") {
        //parent.art.dialog.alert("发货时间未填写!");
        errorPopup('要求发货时间未填写!');
        flag = false;
    } else if (transOrderM.articleName == "") {
        //parent.art.dialog.alert("货物总称未填写!");
        errorPopup('货物总称未填写!');
        flag = false;
    }
    if (qty > 0) {
        $("#c_quantity").val(qty);
    } else if ($("#c_quantity").val() == ""
        || parseInt($("#c_quantity").val()) == 0) {
        errorPopup("总件数不能为空或为零");
        // errorPopup('总件数不能为空或为零！',1);
        //parent.art.dialog.alert("总件数不能为空或为零！");
        flag = false;
    }
    else if (parseInt($("#c_quantity").val()) < 0) {
        //parent.art.dialog.alert("总件数小于零！");
        errorPopup('总件数小于零！');
        flag = false;
    }

    if (vol > 0) {
        $("#c_volume").val(vol);
    } else if ($("#c_volume").val() == ""
        || parseFloat($("#c_volume").val()) == 0) {
        errorPopup('总体积不能为空或为零！');
        //parent.art.dialog.alert("总体积不能为空或为零！");
        flag = false;
    }
    else if (parseFloat($("#c_volume").val()) < 0) {
        errorPopup('总体积小于零！');
        //parent.art.dialog.alert("总体积小于零！");
        flag = false;
    }

    if (wt > 0) {
        $("#c_weight").val(wt);
    } else if ($("#c_weight").val() == ""
        || parseFloat($("#c_weight").val()) == 0) {
        errorPopup('总重量不能为空或为零！');
        //parent.art.dialog.alert("总重量不能为空或为零！");
        flag = false;
    }
    else if (parseFloat($("#c_weight").val()) < 0) {
        //parent.art.dialog.alert("总重量小于零！");
        errorPopup('总重量小于零！');
        flag = false;
    }
    var param;
    // 保存
    if (saveOrUpdateFlag == 0 && flag ==true ) {
        param = {
            transOrderM : JSON.stringify(transOrderM),
            transOrderD : JSON.stringify(transOrderD),
            status : saveOrUpdateFlag,
            userName :JSON.parse(localStorage.getItem('user')).obj.userName
        };
        saveOrder(param);
        // 修改
    } else if (saveOrUpdateFlag == 1) {

    }
    
    
}

function saveOrder(param){
    var saveUrl = baseUrl + "order/save_or_update.action";
    getAjax(saveUrl,param,"saveOrderFromPhoneSucc(data)","errorPopup('网络请求超时,请检查网络后再尝试..')");
}
function saveOrderFromPhoneSucc(data){
    if(data.isSucc){
        errorPopup('下单成功');
        //    $('#o_ownername').val();
        $('#o_city').val('');
        $('#o_linker').val('');
        $('#o_linkPhone').val('');
        $('#o_addr').val('');

        $('#c_custname').val('');
        $('#c_city').val('');
        $('#c_linker').val('');
        $('#c_linkPhone').val('');
        $('#c_addr').val('');
        $('#c_goodname').val('');
        $('#c_weight').val('');
        $('#c_volume').val('');
        $('#c_quantity').val('');
        $('#c_mark').val('');
        $.ui.loadContent("#home", false, false, "slide");
    }else{
        errorPopup('下单失败');
    }
}