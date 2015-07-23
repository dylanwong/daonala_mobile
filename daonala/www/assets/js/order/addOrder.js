/**
 * Created by wyy on 2015-06-23.
 */

//搜索地址信息
function searchOwnerAddr(){
    //$.ui.loadContent("#chocieOwner", false, false, "slide");
    var choiceOwnerAddrUrl = baseUrl + "order/queryOwnerAddr.action";
    var user = JSON.parse(localStorage.getItem("user"));
    var option ;
    if(user.obj.userType==1){
        option = {
            enterpriseno:user.obj.logisticNo,
            ownerNo:user.obj.ownerNo,
            addr:$('#searchAddrText').val()
        };
    }else if(user.obj.userType==0){
        option = {
            enterpriseno:user.obj.logisticNo,
            ownerNo:user.obj.ownerNo,
            addr:$('#searchAddrText').val()
        };
    }
    getAjax(choiceOwnerAddrUrl,option,"showOwnerAddrList(data)", "errorPopup('网络请求超时,请检查网络后再尝试..')");

}
function searchCustAddr(){
    //$.ui.loadContent("#chocieOwner", false, false, "slide");
    var choiceOwnerAddrUrl = baseUrl + "order/queryCustAddr.action";
    var user = JSON.parse(localStorage.getItem("user"));
    var option ;
    if(user.obj.userType==1){
        option = {
            enterpriseno:user.obj.logisticNo,
            ownerNo:user.obj.enterpriseNo,
            addr:$('#searchAddrText').val()
        };
    }else if(user.obj.userType==0){
        option = {
            enterpriseno:user.obj.logisticNo,
            ownerNo:$('#o_ownername').attr('o_ownerNo'),
            addr:$('#searchAddrText').val()
        };

    }
    getAjax(choiceOwnerAddrUrl,option,"showCustAddrList(data)", "errorPopup('网络请求超时,请检查网络后再尝试..')");

}
//选择发货人地址信息
function choiceOwnerAddr(){
    $('#choiceOwnerOrCust_ul').empty();
    $.ui.loadContent("#chocieOwner", false, false, "slide");
    var choiceOwnerAddrUrl = baseUrl + "order/queryOwnerAddr.action";
    var user = JSON.parse(localStorage.getItem("user"));
    var option ;
//    if(user.obj.userType==1){
//        option = {
//            enterpriseno:user.obj.logisticNo,
//            ownerNo:user.obj.ownerNo,
//            addr:$('#searchAddrText').val()
//        };
//    }else if(user.obj.userType==0){
        option = {
            enterpriseno:user.obj.logisticNo,
            ownerNo:user.obj.ownerNo,
            addr:$('#searchAddrText').val()
        };
 //   }

    getAjax(choiceOwnerAddrUrl, option,
        "showOwnerAddrList(data)", "errorPopup('网络请求超时,请检查网络后再尝试..')");



}


//选择收货人地址信息
function choiceCustAddr(){
    $('#choiceOwnerOrCust_ul').empty();

    var choiceOwnerAddrUrl = baseUrl + "order/queryCustAddr.action";
    var user = JSON.parse(localStorage.getItem("user"));
    var option ;
    var owners = JSON.parse(localStorage.getItem("ownerInfo"));
    if(user.userType==1){
        option = {
            enterpriseno:user.obj.logisticNo,
            ownerNo:user.obj.ownerNo,
            addr:$('#searchAddrText').val()
        };
        getAjax(choiceOwnerAddrUrl,option,"showCustAddrList(data)", "errorPopup('网络请求超时,请检查网络后再尝试..')");
        $.ui.loadContent("#chocieOwner", false, false, "slide");
    }else if(user.obj.userType==0){

        if( $('#ownerText').attr('o_ownerNo') != ''
            && $('#ownerText').attr('o_ownerNo') !=null ){
            option = {
                enterpriseno:user.obj.logisticNo,
                ownerNo:$('#ownerText').attr('o_ownerNo'),
                addr:$('#searchAddrText').val()
            };
            getAjax(choiceOwnerAddrUrl,option,"showCustAddrList(data)", "errorPopup('网络请求超时,请检查网络后再尝试..')");
            $.ui.loadContent("#chocieOwner", false, false, "slide");
        }else{
            errorPopup('请选择发货人信息，或填写收货人信息');
        }

    }

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

            for (var k= 0,len = data.obj.length; k < len; k++) {
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
                    '<br><span class="ownerName f12 fco p0-6"  >地址:</span>'+
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
           // errorPopup(data.msg);
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
            for ( var k= 0,len = data.obj.length; k < len; k++ ) {
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
                    '<br><span class="ownerName f12 fco p0-6"  >地址:</span>'+
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
    $('#o_ownername').attr('o_ownerNo',data.ownerNo);
    $('#o_provice').val(data.province+data.city+data.county);
    $('#o_linker').val(data.ownerContact);
    $('#o_linkPhone').val(data.ownerPhone);
    $('#o_addr').val(data.unionAddr);
    //queryOwnerInfo(data.ownerNo);
    $.ui.goBack();
    localStorage.setItem("ownerInfo",JSON.stringify(data));
    localStorage.setItem('confirmProvince',data.province);
    localStorage.setItem('confirmCity',data.city);
    localStorage.setItem('confirmZone',data.county);



}
function confirmCustAddr(elm){
    var data = eval('(' +$(elm).attr('data-order-detail')+ ')');
    $('#c_custname').val(data.custName);
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



function queryOwnerInfo(pram){
    var queryOwnerUrl = baseUrl + "order/queryOwnerInfo.action";
    var ownerNo = pram;
//    if(getUserType=='1'){
        getAjax(queryOwnerUrl,{ownerNo:ownerNo},"queryOwnerInfoSucc(data)", "errorPopup('网络请求超时,请检查网络后再尝试..')");
//    }else  if(getUserType=='0'){
//        $.ui.loadContent("addorder",false,false,"slide");
//    }
    }
function queryOwnerInfoSucc(data){
    if(data.isSucc){
        localStorage.setItem("ownerInfo",JSON.stringify(data.obj));
       // $.ui.loadContent("addorder",false,false,"slide");
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
    var ownerNo_Temp = '';
    var ownerAlias_Temp = '';
    var custer_Temp = '';
    var custerAlias_Temp = '';
    var user = JSON.parse(localStorage.getItem('user'));
    var owner = JSON.parse(localStorage.getItem('ownerInfo'));
    if( user.obj.userType == '1'){
        ownerNo_Temp == user.obj.ownerNo;
        ownerAlias_Temp == user.obj.ownerAlias;
    }else{
        if ( owner != null ) {
            ownerNo_Temp = owner.ownerNo;
            ownerAlias_Temp = owner.ownerAlias;
        }
    }

    var custer = JSON.parse(localStorage.getItem('custerInfo'));
    if ( custer != null ) {
        custer_Temp = custer.custNo;
       // custerAlias_Temp = owner.custName;
    }

    var owners = JSON.parse(localStorage.getItem("owners"));
    var ownerBo = JSON.parse(localStorage.getItem('ownerBo'));
    var custBo = JSON.parse(localStorage.getItem('custBo'));
    var goodBo = JSON.parse(localStorage.getItem('goodBo'));
    if( ownerBo == null ){
        errorPopup('请选择发货人信息');
        return;
    }
    if( custBo == null ){
        errorPopup('请选择收货人信息');
        return;
    }

    if( goodBo == null ){
        errorPopup('请填写商品信息');
        return;
    }
    var transOrderM = {
        enterpriseNo : user.obj.logisticNo,
        orderNo :$('#gOrderNo').text(),
        ownerNo : ownerNo_Temp,
        /*ownerName : $("#o_ownername").val(),
        // ownerCompany:$("#ownerCompany").val(),
        ownerAddr : $("#o_addr").val(),// owner.ownerAddr,
        ownerPhone : $("#o_linkPhone").val(),
        ownerContacts : $("#o_linker").val(),*/
        custNo : custer_Temp,

        /*custAlias : custerAlias_Temp,
        custName : $("#c_custname").val(),
        custAddr : $("#c_addr").val(),
        custContacts : $("#c_linker").val(),
        custPhone : $("#c_linkPhone").val(),*/
        /*ownerProvince : localStorage.getItem('confirmProvince'),
        ownerCity : localStorage.getItem('confirmCity'),
        ownerCounty : localStorage.getItem('confirmZone'),
        custProvince : localStorage.getItem('confirmCProvince'),
        custCity : localStorage.getItem('confirmCCity'),
        custCounty : localStorage.getItem('confirmCZone'),*/
        payType : '1',
        deliveryDateText : $("#deliveryDate").val()+':00'

    };
    $.extend(transOrderM,ownerBo);
    $.extend(transOrderM,custBo);
    var transOrderD = {
        enterpriseNo : user.obj.logisticNo,
        ownerNo : ownerNo_Temp
        /*remark : $("#c_mark").val(),
        pkqty : $("#c_quantity").val(),
        volumn : $("#c_volume").val(),
        weight : $("#c_weight").val(),
        articleName : $("#c_goodname").val()*/
    };
    $.extend(transOrderD,goodBo);
    var reg = /^\\d+$/;
//    if ( owner.enterpriseNo == "" ) {
//        //parent.art.dialog.alert("企业编码未选择！");
//        errorPopup('企业编码未选择!');
//        flag = false;
//    }
    var param;
    if ($("#deliveryDate").val() == "") {
        //parent.art.dialog.alert("发货时间未填写!");
        errorPopup('要求发货时间未填写!');
        flag = false;
    }
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
        clearConfirmData();

       // $.ui.loadContent("#home", false, false, "slide");
    }else{
        clearConfirmData();
        errorPopup('下单失败');
    }
}

function clearConfirmData(){
    $('#addOrderOwnerInfo').show();
    $('#updateOrderOwnerInfo').hide();
    $('#addOrderCustInfo').show();
    $('#updateOrderCustInfo').hide();
    $('#addOrderGoodInfo').show();
    $('#updateOrderGoodInfo').hide();

    localStorage.removeItem("ownerInfo");
    localStorage.removeItem('confirmProvince');
    localStorage.removeItem('confirmCity');
    localStorage.removeItem('confirmZone');

    localStorage.removeItem('custerInfo');
    localStorage.removeItem('confirmCProvince');
    localStorage.removeItem('confirmCCity');
    localStorage.removeItem('confirmCZone');

    localStorage.removeItem('ownerBo');
    localStorage.removeItem('custBo');
    localStorage.removeItem('goodBo');
    $('input[name=addOrderText]').val('');
    $('input[name=ownerInfoInput]').val('');
    $('input[name=custInfoInput]').val('');
    $('input[name=goodInfoInput]').val('');
}






function initOwnerOrcustSwith() {
    $('input[name="o-checkbox"]').unbind('switchChange.bootstrapSwitch');
    $('input[name="o-checkbox"]').on('switchChange.bootstrapSwitch', function (event, state) {

        var data = [];
        var id = $(this).attr('id');
        var flag = 0;
        state == true ? flag = 1 : flag = 0;
        if (id == 'ownerFlag') {
            data = [flag, ''];
        } else if (id == 'custFlag') {
            data = ['', flag];
        } else {
            data = ['', ''];
        }
        saveOrUpdateOwnerOrCuster(data);
    });
}
function saveOrUpdateOwnerOrCuster(data){
        if( data[0] == 0 ) {

        } else if (  data[1] == 0 ) {

        } else {

        }

}
function backToOwnerAddOrderPage(){
    try {
       /* if (transOrderM.ownerNo == "") {
            //parent.art.dialog.alert("请选择发货人！");
            errorPopup('请选择发货人!');
            flag = false;
        }else*/
        var reg = /^\\d+$/;
        if ( $('#o_ownername').val() == "" ) {
            //parent.art.dialog.alert("企业编码未选择！");
            errorPopup('企业编码未选择!');
            flag = false;
        }  else if ( $('#o_ownername').val() == "") {
            //parent.art.dialog.alert("发货主名称未填写！");
            errorPopup('发货主名称未填写!');
            flag = false;
        } else if ($('#o_provice').val() == "") {
            //parent.art.dialog.alert("发货公司或个人全称未填写！");
            errorPopup('发货城市未选择!');
            flag = false;
        } else if($('#o_addr').val() == "") {
            //parent.art.dialog.alert("发货详细地址未填写！");
            errorPopup('发货详细地址未填写!');
            flag = false;
        } else if ($('#o_linker').val() == "") {
            //parent.art.dialog.alert("发货联系人未填写！");
            errorPopup('发货联系人未填写!');
            flag = false;
        } else if ($('#o_linkPhone').val() == "") {
            //parent.art.dialog.alert("发货联系电话未填写！");
            errorPopup('发货联系电话未填写!');
            flag = false;
        } else {
            $('#addOrderOwnerInfo').hide();
            $('#updateOrderOwnerInfo').show();
            $('#ownerText').text($('#o_ownername').val());
            $('#ownerText').attr('o_ownerNo',
                $('#o_ownername').attr('o_ownerNo') );
            $('#ocityText').text($('#o_provice').val());
            $('#oaddrText').text($('#o_addr').val());
            $('#olinkerText').text($('#o_linker').val());
            $('#ophoneText').text($('#o_linkPhone').val());
            var ownerBo = {
             /*   o_ownername:$('#o_ownername').val(),
                o_provice:$('#o_provice').val(),
                o_addr:$('#o_addr').val(),
                o_linker:$('#o_linker').val(),
                o_linkPhone:$('#o_linkPhone').val(),*/
                ownerAlias : $("#o_ownername").val(),
                ownerName : $("#o_ownername").val(),
                ownerAddr : $("#o_addr").val(),
                ownerPhone : $("#o_linkPhone").val(),
                ownerContacts : $("#o_linker").val(),
                ownerProvince : localStorage.getItem('confirmProvince'),
                ownerCity : localStorage.getItem('confirmCity'),
                ownerCounty : localStorage.getItem('confirmZone')
            }
            localStorage.setItem('ownerBo',JSON.stringify(ownerBo) );
            $.ui.loadContent("#addorder", false, false, "slide");
        }
    } catch(e){
        errorPopup(e.name + ": " + e.message);
    }
}
function backToCustAddOrderPage(){

    //$.ui.loadContent("#chocieOwner", false, false, "slide");
    try {
        if ($('#c_custname').val() == "") {
            //parent.art.dialog.alert("收货人名称未填写！");
            errorPopup('收货人名称未填写!');
            flag = false;
        }  else if ($('#c_linker').val() == "") {
            //parent.art.dialog.alert("收货联系人名称未填写！");
            errorPopup('收货联系人名称未填写!');
            flag = false;
        } else if ($('#c_linkPhone').val() == "") {
            //parent.art.dialog.alert("收货联系电话不能为空!");
            errorPopup('收货联系电话不能为空!');
            flag = false;
        } else if ($('#c_addr').val() == "") {
            //parent.art.dialog.alert("收货详细地址未填写!");
            errorPopup('收货详细地址未填写!');
            flag = false;
        } else if ($('#c_provice').val() == "") {
            //parent.art.dialog.alert("收货省份未选择!");
            errorPopup('收货省市未选择!');
            flag = false;
        } else {
            $('#addOrderCustInfo').hide();
            $('#updateOrderCustInfo').show();
            $('#custText').text($('#c_custname').val());
            $('#ccityText').text($('#c_provice').val());
            $('#caddrText').text($('#c_addr').val());
            $('#clinkerText').text($('#c_linker').val());
            $('#cphoneText').text($('#c_linkPhone').val());
            $.ui.loadContent("#addorder", false, false, "slide");

           // var custAlias = $('#')
            var custBo = {
                custName : $("#c_custname").val(),
                custAlias : $("#c_custname").val(),
                custAddr : $("#c_addr").val(),
                custContacts : $("#c_linker").val(),
                custPhone : $("#c_linkPhone").val(),

               /* c_custname:$('#c_custname').val(),
                c_provice:$('#c_provice').val(),
                c_addr:$('#c_addr').val(),
                c_linker:$('#c_linker').val(),
                c_linkPhone:$('#c_linkPhone').val(),*/
                custProvince : localStorage.getItem('confirmCProvince'),
                custCity : localStorage.getItem('confirmCCity'),
                custCounty : localStorage.getItem('confirmCZone')
            }
            localStorage.setItem( 'custBo',JSON.stringify(custBo) );
        }
    } catch(e){
        errorPopup(e.name + ": " + e.message);
    }
}
function backToGoodOrderPage(){

    try {
        var goodName = $("#c_goodname").val();
        var qty = $("#c_quantity").val();
        var vol = $("#c_volume").val();
        var wt = $("#c_weight").val();
        if( goodName == ''){
            errorPopup('货物名不能为空！',1);
            return;
        }
        if ( qty > 0) {
            $("#c_quantity").val(qty);
        } else if ($("#c_quantity").val() == ""
            || parseInt($("#c_quantity").val()) == 0) {
            //errorPopup("总件数应为正整数！");
            errorPopup('总件数不能为空或为零！',1);
            //parent.art.dialog.alert("总件数不能为空或为零！");
            flag = false;return;
        }else if (parseInt($("#c_quantity").val()) < 0) {
            //parent.art.dialog.alert("总件数小于零！");
            errorPopup('总件数不能小于零');
            flag = false;return;
        }else if (transOrderM.articleName == "") {
            //parent.art.dialog.alert("货物总称未填写!");
            errorPopup('货物总称未填写!');
            flag = false;
        }else{
            errorPopup('总件数应为正整数！');
            flag = false;return;
        }

        if ( vol > 0) {
            $("#c_volume").val(vol);
        } else if ($("#c_volume").val() == ""
            || parseFloat($("#c_volume").val()) == 0) {
            errorPopup('总体积不能为空或为零！');
            //parent.art.dialog.alert("总体积不能为空或为零！");
            flag = false;return;
        }else if (parseFloat($("#c_volume").val()) < 0) {
            errorPopup('总体积不能小于零！！');
            //parent.art.dialog.alert("总体积小于零！");
            flag = false;return;
        }else{
            errorPopup('总体积应为正整数！');
            flag = false;return;
        }

        if (  wt > 0) {
            $("#c_weight").val(wt);
        } else if ($("#c_weight").val() == ""
            || parseFloat($("#c_weight").val()) == 0) {
            errorPopup('总重量不能为空或为零！！');
            //parent.art.dialog.alert("总重量不能为空或为零！");
            flag = false;return;
        }else if (parseFloat($("#c_weight").val()) < 0) {
            //parent.art.dialog.alert("总重量小于零！");
            errorPopup('总重量不能小于零！');
            flag = false;return;
        }else{
            errorPopup('总重量应为正整数！');
            return;
        }
        if( $('input[name=goodInfoInput]').val() == '' ) {
            errorPopup('请输入完整信息');
            return ;
        } else {
        $('#addOrderGoodInfo').hide();
        $('#updateOrderGoodInfo').show();
        $('#gName').text( $('#c_goodname').val() );
        $('#gWeigth').text( $('#c_weight').val() );
        $('#gVolume').text( $('#c_volume').val() );
        $('#gQty').text( $('#c_quantity').val() );
        $('#gMark').text( $('#c_mark').val() );
        $('#gOrderNo').text( $('#goodorderNo').val() );
        $.ui.loadContent("#addorder", false, false, "slide");

            var goodBo = {
              //  orderNo:$('#goodorderNo').val(),
                cremark : $("#c_mark").val(),
                pkqty : $("#c_quantity").val(),
                volumn : $("#c_volume").val(),
                weight : $("#c_weight").val(),
                articleName : $("#c_goodname").val()
            }
            localStorage.setItem('goodBo',JSON.stringify(goodBo) );
        }
    } catch(e){
        errorPopup(e.name + ": " + e.message);
    }
}

function updateownerPanel(){
    $('#o_ownername').attr('o_ownerNo','');
    $.ui.loadContent("#confirmowner", false, false, "slide");
}
function updatecustPanel(){

    $.ui.loadContent("#confirmcust", false, false, "slide");
}
function updategoodPanel(){
    $.ui.loadContent("#confirmgood", false, false, "slide");
}


/*

else if (transOrderM.custProvince == null
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
} */
