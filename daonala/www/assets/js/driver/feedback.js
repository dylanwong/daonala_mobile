/**
 * Created by wyy on 2015-04-16.
 */
/**提取货物确认**/
function deliveryorder() {
    if ($("#deliveroperater").val() == '' || $("#deliveroperater") == undefined) {
        errorPopup('请输入交接人');
    }else if($("#deliverremarks").val() == '' || $("#deliverremarks") == undefined){
        errorPopup('请输入备注');
    }else {
            var chk_value = [];
            $("img[name=picture]").each(function () {
                var newfileName = $(this).attr("fileName");
                //var strings = newfileName.replace("/uploadFiles/temp/", "");
                chk_value.push(newfileName);

            });
            var fileList = JSON.stringify(chk_value);

            /* var ordernos = [];
             $("#signImageFile img[name=picture]").each(function() {
             var newfileName=$(this).attr("fileName");
             //var strings = newfileName.replace("/uploadFiles/temp/", "");
             ordernos.push(strings);
             });
             var fileList=JSON.stringify(ordernos);*/


            var data = JSON.parse(localStorage.getItem("currenttask"));
            var url = baseUrl + "driver/update_trace_status.action";
            var user = JSON.parse(localStorage.getItem('e_user'));
            var option = {
                operator: $("#deliveroperater").val(),
                enterpriseNo: data.enterpriseNo,
                deliveryNo: data.deliveryNo,
                orders: localStorage.getItem("chocieorders"),
                imgurls: fileList,
                substatus: '',
                location: '',
                remarks: $("#deliverremarks").val(),
                type: '0',
                plateno: user.obj.plateNo,
                tel: user.obj.phone,
                status: '40',
                userNo:user.obj.userNo,
                userName: user.obj.userName
            };
//        enterpriseNo,
//            deliverNo, orders, imgurls, remarks, operater, userName,
//            subStatus, type, userNo, status, location
            getAjax(url, option, 'addorderstatus_result_succ(data)');

    }
}

/**反馈确认**/
function confirmfolloworder(){

    if($("#followoperater").val()==''||$("#followoperater")==undefined){
        errorPopup('请输入操作人');
    }else if($("#followremarks").val() == '' || $("#followremarks") == undefined){
        errorPopup('请输入备注');
    }else {
//operator,  enterpriseno, consignno, ordernos,imgurls, status, location, remarks, type

        var substatus='40';
        if ($('#followstatus').val() == '异常反馈') {
//        <option value="在途异常">在途异常</option>
//        <option value="在途正常">在途正常</option>
            substatus = '40';
        } else if ($('#followstatus').val() == '正常反馈') {
            substatus = '10';
        }


        var chk_value = [];
        $("img[name=picture]").each(function () {

            var newfileName = $(this).attr("fileName");
            //var strings = newfileName.replace("/uploadFiles/temp/", "");
            chk_value.push(newfileName);
        });
        var fileList = JSON.stringify(chk_value);

        var data = JSON.parse(localStorage.getItem("currenttask"));
        var url = baseUrl + "driver/update_trace_status.action";
        var user = JSON.parse(localStorage.getItem('e_user'));
        var option = {
            operator: '',
            enterpriseno: data.enterpriseNo,
            deliveryNo: data.deliveryNo,
            orders: localStorage.getItem("chocieorders"),
            imgurls: fileList,
            substatus: substatus,
            location: $('#currentlocation').val(),
            remarks: $('#followremarks').val(),
            type: '1',
            status: '70',
            userName: user.obj.userName,
            userNo: user.obj.userNo
        };
        getAjax(url, option, 'addorderstatus_result_succ(data)');
        localStorage.removeItem("chocieorders");

    }
}



/**交接货物确认**/
function confirmhandoverorder(){
    if($("#handoveroperater").val()==''||$("#handoveroperater")==undefined){
        errorPopup('请输入交接人');
    }else if($("#handoverremarks").val() == '' || $("#handoverremarks") == undefined){
        errorPopup('请输入备注');
    }else{
    var chk_value = [];
    $("img[name=picture]").each(function() {
        var newfileName=$(this).attr("fileName");
        //var strings = newfileName.replace("/uploadFiles/temp/", "");
        chk_value.push(newfileName);
    });

    var fileList=JSON.stringify(chk_value);
    var data = JSON.parse(localStorage.getItem("currenttask"));
    //operator,  enterpriseno, consignno, ordernos,imgurls, status, location, remarks, type
    var url = baseUrl+"driver/update_trace_status.action";
    var user = JSON.parse( localStorage.getItem('e_user') );
    var option = {
        operator:$('#handoveroperater').val(),
        enterpriseNo:data.enterpriseNo,
        deliveryNo:data.deliveryNo,
        orders: localStorage.getItem("chocieorders"),
        imgurls:fileList,
        substatus:'',
        location:'',
        remarks:$('#handoverremarks').val(),
        type:'2',
        tel:user.obj.phone,
        status:'80',
        userName:user.obj.userName,
        userNo:user.obj.userNo
    };
    getAjax(url,option,'addorderstatus_result_succ(data)');
   /* localStorage.removeItem("chocieorders");*/
    }
}

/**签收货物确认**/
function confirmsignorder(){
    if($("#signoperater").val()==''||$("#signoperater")==undefined){
        errorPopup('请输入签收人');
    }else if($("#signremarks").val() == '' || $("#signremarks") == undefined){
        errorPopup('请输入备注');
    }else{
        var chk_value = [];
        $("img[name=picture]").each(function() {
            var newfileName=$(this).attr("fileName");
            //var strings = newfileName.replace("/uploadFiles/temp/", "");
            chk_value.push(newfileName);
        });

        var fileList=JSON.stringify(chk_value);
        var data = JSON.parse(localStorage.getItem("currenttask"));
        //operator,  enterpriseno, consignno, ordernos,imgurls, status, location, remarks, type
        var url = baseUrl+"driver/sign_order_status.action";
        var user = JSON.parse( localStorage.getItem('e_user') );
        var option = {
            operator:$('#signoperater').val(),
            enterpriseNo:data.enterpriseNo,
            deliveryNo:data.deliveryNo,
            orders: localStorage.getItem("chocieorders"),
            imgurls:fileList,
            substatus:'',
            location:'',
            remarks:$('#handoverremarks').val(),
            type:'4',
            tel:user.obj.phone,
            status:'90',
            userName:user.obj.userName,
            userNo:user.obj.userNo
        };

        getAjax(url,option,'addorderstatus_result_succ(data)');
        var signQtyurl = baseUrl+"driver/signQty.action";
        var goodslist = localStorage.getItem("signQtyItem");

        if (JSON.parse(goodslist).length>0 ){
            var qtyOptions = {
                goodslist:goodslist
            };
            getAjax(signQtyurl,qtyOptions,'saveGoodQty_result_succ(data)');
        }
        localStorage.removeItem("chocieorders");
    }
}


function saveGoodQty(){

    var goodslist = new Array();
    var qtyOption;
    $("input[name='signQty']").each(function (){
        if( $(this).attr('signQty')!=$(this).val() ){
            qtyOption = {
                enterpriseNo:$(this).attr('enterpriseNo'),
                orderNo:$(this).attr('orderNo'),
                dispatchNo:$(this).attr('dispatchNo'),
                articleNo:$(this).attr('articleNo'),
                articleBarcode:$(this).attr('articlebarcode'),
                signQty:$(this).val()
            };
            goodslist.push(qtyOption);
        }
    });
    if(goodslist.length>0){
    localStorage.setItem("signQtyItem",JSON.stringify(goodslist ));
    }
    $.ui.loadContent('#signorders', false, false, 'slide')
}
function saveGoodQty_result_succ(data){
    localStorage.removeItem("signQty");
}

function addorderstatus_result_succ(data){
    localStorage.removeItem("chocieorders");
    if(data.isSuc)
        errorPopup(data.msg);
    else{
        errorPopup(data.msg);
    }
    driverboard_panel();
    clearthispage();
}

function clearthispage(){
    $("input[name=feedback]").each(function() {
        $(this).val("");
    });
    $("img[ownlocation='feedbackimg']").remove();
}
function refreshlocation(){
    lOCATIONID = 'currentlocation';
    getCurrentPositionAddress();
}

/*订单明细选择列表*/

function queryDetailList(){
   var datas = JSON.parse(localStorage.getItem("chocieorders") );
   var detail_list = '';
   var gooddetail = '';
    $('#signorderlist').empty();
   if(datas.length>1){
   $(datas).each(function (index,data) {
       detail_list =+ '<li href="#" onclick="querygoodlist(this);"  '
           +'enterpriseno="'+data.enterpriseNo+'" dispatchno="'+data.dispatchNo+'"  class="f2" style="margin-top:4px;">'+
           '<div class="f2" style="height: 100px;margin-top:14px;">'+
           '<div class="" style="float:left;width: 90%;margin-top:14px;">'+
           '<div ><div style="float:left;width:90%;margin-top:14px;">'+
           '<span class="fontCb f1 f14  p0-6 fd" >子订单号:</span>'+
           '<span class="fontCb f1 f14  p0-6 fd" >'+data.subOrderNo+'</span>'+
           '</div><div style="clear:both;"></div></div>'+
           '<div align=""><hr style="margin-left:5px;width:85%;margin-top:0px;margin-bottom:5px;border: 0;border-top:1px solid #BFBFBF;">'+
           '</div><div><span class="ownerName f12 fco p0-6"  >货主单号:</span>'+
           '<span class="ownerName f12 fco p0-6" style="position: absolute;">'+data.orderNo+'</span><br>'+
           '</div></div><div style="float:right;">'+
           '<div class="" style="right: 20px;position:absolute;padding-top:35px;width:10%;">'+
           '<div align="center" style="">'+
           '<img style="width:16px;height: 16px;" src="assets/img/right.png" />'+
           '</div></div></div><div style="clear:both;"></div></div></li>';
   });
  // $('#signorderlist').empty();
   $('#signorderlist').append(detail_list);
   $.ui.loadContent("#signorderslist", false, false, "slide");
   } else if( datas.length=1 ){
       $(datas).each(function (index,data) {
           detail_list += '<li href="#" onclick="querygoodlist2(this);" '
               +' enterpriseno="'+data.enterpriseNo+'" dispatchno="'+data.dispatchNo+'" '+
               ' orderNo="'+data.orderNo+'" class="f2" style="margin-top:4px;">'+
               '<div class="f2" style="height: 100px;margin-top:14px;">'+
               '<div class="" style="float:left;width: 90%;margin-top:14px;">'+
               '<div ><div style="float:left;width:90%;margin-top:14px;">'+
               '<span class="fontCb f1 f14  p0-6 fd" >子订单号:</span>'+
               '<span class="fontCb f1 f14  p0-6 fd" >'+data.subOrderNo+'</span>'+
               '</div><div style="clear:both;"></div></div>'+
               '<div align=""><hr style="margin-left:5px;width:94%;margin-top:0px;margin-bottom:5px;border: 0;border-top:1px solid #BFBFBF;">'+
               '</div><div><span class="ownerName f12 fco p0-6"  >货主单号:</span>'+
               '<span class="ownerName f12 fco p0-6" style="position: absolute;">'+data.orderNo+'</span><br>'+
               '</div></div><div style="float:right;">'+
               '<div class="" style="right: 20px;position:absolute;padding-top:37px;width:10%;">'+
               '<div align="center" style="">'+
               '<img style="width:16px;height: 16px;" src="assets/img/right.png" />'+
               '</div></div></div><div style="clear:both;"></div></div></li>';
       });
       $('#signorderlist').append(detail_list);
       $.ui.loadContent("#signorderslist", false, false, "slide");
   } else {
        errorPopup( '无数据,请重新选择订单!' );
   }
}

function querygoodlist2(elm){
    var enterpriseNo = eval('(' +$(elm).attr('enterpriseno')+ ')');
    var dispatchNo = $(elm).attr('dispatchno');
    var orderNo =  $(elm).attr('orderNo');
    var detail_list = '';
    var gooddetail = '';
    $('#s_orderNo').html(orderNo);
    $('#signorderlist').empty();
    getAjax(goodSearchUrl, {'enterpriseNo':enterpriseNo,'dispatchNo':dispatchNo},
        "updategoodlistPanel(data)", "errorPopup('网络请求超时,请检查网络后再尝试..')");
}

function querygoodlist(){
//    var enterpriseNo = eval('(' +$(elm).attr('enterpriseno')+ ')');
//    var dispatchNo = $(elm).attr('dispatchno');
    var datas = JSON.parse(localStorage.getItem("chocieorders") );
    var detail_list = '';
    var gooddetail = '';
    $('#s_orderNo').html(datas[0].orderNo);
    $('#signorderlist').empty();
//    if(datas.length>1){
//        $(datas).each(function (index,data) {
//
//        });
//    }
    var enterpriseNo = datas[0].enterpriseNo;
    var dispatchNo = datas[0].dispatchNo;
        getAjax(goodSearchUrl, {'enterpriseNo':enterpriseNo,'dispatchNo':dispatchNo},
        "updategoodlistPanel(data)", "errorPopup('网络请求超时,请检查网络后再尝试..')");
}

function updategoodlistPanel(datas){
 //   var datas = JSON.parse(localStorage.getItem("chocieorders") );
    var gooddetail = '';
    var gooddetail = '';
    if(datas.isSucc){
    var list = datas.obj;

    $('#goodscontent').empty();
    if(list.length>=1){
        $(list).each(function (index,data) {
            gooddetail +=
            '<div style="margin-top:5px;"><hr style="margin-left:5px;width:90%;' +
            'margin-top:0px;margin-bottom:5px;border: 0;border-top:1px solid #06ABD4;">'+
            '</div> <div><div style="float:left;width:100%;height:45px;">'+
            '<span class="f12 fco  p0-6" >产品名称:</span>'+
            '<span class=" f12 fco" >'+data.articleName+'</span><br>'+
            '<div><div style="float:left;width:50%;">'+
            '<span class="f12 fco  p0-6">产品条码:</span>'+
            '<span class=" f12 fco" >'+data.articleBarcode+'</span>'+
            '</div><div style="float:right;width:50%;">'+
            '<span class="f12 fco  ">签收数量:</span>'+
            '<span class=" f12 fco" ><div style="line-height:0px;display:inline-block;" > ' +
            '<input style="width:50px;" type="text" enterpriseNo="'+data.enterpriseNo+'"' +
            ' orderNo="'+data.orderNo+'" ' +
            'articleNo="'+data.articleNo+'" articleBarcode="'+data.articleBarcode+'" ' +
            'dispatchNo="'+data.dispatchNo+'" signQtybak="'+data.signQty+'" name="signQty" value="'+data.signQty+'"></div>'+
            '</span></div><div style="clear:both;"></div></div></div> </div>';
        });
        // $('#signorderlist').empty();
        $('#goodscontent').append(gooddetail);
        $.ui.loadContent("#signorderdetail", false, false, "slide");
    } else {
        errorPopup( '无商品明细!' );
    }
    }else{
        errorPopup('程序异常，请检查代码');
    }
}
/**
 * Created by wyy on 2015/3/3.
 * upload img to oms
 */

var selImgId;//选中ImgId

function upload_oms(element)
{
/*   var elementSrc = $(element).find('img').attr('src');
    selImgId = $(element).find('img').attr('id');

    if(elementSrc.indexOf('no_photo.png') != -1)
    {*/
        get_photo_oms();
   /* }else
    {
        errorPopup("" +
            "<ul class='list'>" +
            "<li><a href='javascript:;' onclick='get_photo_oms()'>更换图片</a></li>" +
            *//*"<li><a href='javascript:;' onclick='show_photo(element)'>查看大图</a></li>" +*//*
            "</ul>");
    }*/
    return false;
}

function get_photo_oms()
{
    errorPopup("" +
        "<ul class='list'>" +
        "<li><a href='javascript:;' onclick='capturePhotoUrl_tooms()'>拍照</a></li>" +
        "<li><a href='javascript:;' onclick='getPhoto1_tooms()'>相册</a></li>" +
        "</ul>");
}

function show_photooms(element)
{
    errorPopup("<img src='assets/img/demo/img2.jpg' width='250px'/>");
}

function get_imgsoms()
{
    var user = JSON.parse(localStorage.getItem('e_user'));
    var workType = user.obj.workerType;
    var workerNo = user.obj.workerNo;
    get_img_ajax(workerNo,workType);
}

function get_img_ajax_oms(workerNo,type)
{
    getAjax(baseUrl+"register/query_image_info.action",{workerNo:workerNo,type:type},
        'get_img_ajax_succ(data)','get_img_ajax_fail()');
}

function get_img_ajax_succ_oms(data)
{

    if(data.isSucc)
    {
        var user = JSON.parse(localStorage.getItem('e_user'));
        var workType = user.obj.workerType;
        var baseUrlImg = fileUrl;
        var oldImgUrl = "assets/img/demo/no_photo.png";
        //如果是企业
        if(workType == 1)
        {
            if(data.obj.businessImage != "")
            {
                $("#businessImage").attr('src',baseUrlImg+data.obj.businessImage);
            }else
            {
                $("#businessImage").attr('src',oldImgUrl);
            }

            if(data.obj.operationImage != "")
            {
                $("#operationImage").attr('src',baseUrlImg+data.obj.operationImage);
            }else
            {
                $("#operationImage").attr('src',oldImgUrl);
            }
        }else
        {

        }
    }

}

function get_img_ajax_fail_oms()
{

}

function idinfo_next_oms()
{
    var user = JSON.parse(localStorage.getItem('e_user'));
    var workerType = user.obj.workerType;
    var flag = false;
    if(workerType == 1)
    {
        if($("#businessImage").attr('src') == 'assets/img/demo/no_photo.png' ||
            $("#operationImage").attr('src') == 'assets/img/demo/no_photo.png' ||
            $("#registerImage").attr('src') == 'assets/img/demo/no_photo.png' ||
            $("#roadpermitImage").attr('src') == 'assets/img/demo/no_photo.png' )
        {
            errorPopup('请上传完成,必填的图片!');
        }else
        {
            address_panel(0);
            flag = true;
        }
    }else
    {
        if($("#driveImage").attr('src') == 'assets/img/demo/no_photo.png' ||
            $("#cardImage").attr('src') == 'assets/img/demo/no_photo.png' ||
            $("#venicleImage").attr('src') == 'assets/img/demo/no_photo.png' ||
            $("#transportImage").attr('src') == 'assets/img/demo/no_photo.png' ||
            $("#insuranceImage").attr('src') == 'assets/img/demo/no_photo.png' )
        {
            errorPopup('请上传完成,必填的图片!');
        }else
        {
            address_panel(0);
            flag = true;
        }
    }

}


function updatelocation(){
    lOCATIONID = 'currentlocation';
    getCurrentPositionAddress();
}
