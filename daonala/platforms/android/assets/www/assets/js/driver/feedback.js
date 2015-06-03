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
            var url = baseUrl + "feedback/addorderstatus.action";
            var user = JSON.parse(localStorage.getItem('user'));
            var option = {
                operator: $("#deliveroperater").val(),
                enterpriseno: data.enterpriseNo,
                consignno: data.consignNo,
                ordernos: localStorage.getItem("chocieorders"),
                imgurls: fileList,
                status: '',
                location: '',
                remarks: $("#deliverremarks").val(),
                type: '0',
                plateno: user.obj.plateNo,
                tel: user.obj.phone,
                transtatus: '40',
                rgstname: user.obj.workerName
            };
            getAjax(url, option, 'addorderstatus_result_succ(data)');
            localStorage.removeItem("chocieorders");
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
        var url = baseUrl + "feedback/addorderstatus.action";
        var user = JSON.parse(localStorage.getItem('user'));
        var option = {
            operator: '',
            enterpriseno: data.enterpriseNo,
            consignno: data.consignNo,
            ordernos: localStorage.getItem("chocieorders"),
            imgurls: fileList,
            status: substatus,
            location: $('#currentlocation').val(),
            remarks: $('#followremarks').val(),
            type: '1',
            plateno: user.obj.plateNo,
            tel: user.obj.phone,
            transtatus: '70',
            rgstname: user.obj.workerName
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
    var url = baseUrl+"feedback/addorderstatus.action";
    var user = JSON.parse( localStorage.getItem('user') );
    var option = {
        operator:$('#handoveroperater').val(),
        enterpriseno:data.enterpriseNo,
        consignno:data.consignNo,
        ordernos: localStorage.getItem("chocieorders"),
        imgurls:fileList,
        status:'',
        location:'',
        remarks:$('#handoverremarks').val(),
        type:'2',
        plateno:user.obj.plateNo,
        tel:user.obj.phone,
        transtatus:'80',
        rgstname:user.obj.workerName
    };
    getAjax(url,option,'addorderstatus_result_succ(data)');
    localStorage.removeItem("chocieorders");
    }
}


function addorderstatus_result_succ(data){

    if(data.isSuc)
        errorPopup(data.msg);
    else{
        errorPopup(data.msg);
    }

    todo_panel();
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
    var user = JSON.parse(localStorage.getItem('user'));
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
        var user = JSON.parse(localStorage.getItem('user'));
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
    var user = JSON.parse(localStorage.getItem('user'));
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
