/**
 * Created by 翔 on 2015/3/3.
 */
var  picUrl="";
function capturePhotoUrl_tooms() {
    navigator.camera.getPicture(onPhotoUrlSuccess_tooms, onUrlFail_tooms,
        {   quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            targetWidth:1024,  //生成的图片大小 单位像素
            targetHeight:768});
}


function onPhotoUrlSuccess_tooms(imageURI) {
    picUrl=imageURI;
    $.ui.blockUI(.3);
    $.ui.showMask("我们正在拼命上传文件...");
    uploadPhoto_tooms();
}

function onUrlFail_tooms(message) {
    if(message.indexOf('retrieve')!=-1)
    {
        alert('此图片不支持,请选择其他图片,或拍照上传!');
    }
    console.log('调用图片出错，错误信息: ' + message);

}

function getPhoto1_tooms() {
    navigator.camera.getPicture(onPhotoUrlSuccess2_tooms, onUrlFail_tooms,
        {   sourceType: Camera.PictureSourceType.PHOTOLIBRARY ,
            destinationType:Camera.DestinationType.FILE_URI,
            encodingType:Camera.EncodingType.JPEG,
            mediaType:Camera.MediaType.PICTURE,
            targetWidth:1024,//图片裁剪高度
            targetHeight:768 //图片裁剪高度
        });
}

function onPhotoUrlSuccess2_tooms(imageURI) {
    picUrl=imageURI;
    $.ui.blockUI(.3);
    $.ui.showMask("我们正在拼命上传文件...");
    uploadPhoto_tooms();
}

function uploadPhoto_tooms() {
    var options = new FileUploadOptions();
    options.fileKey="file";
    options.fileName=picUrl.substr(picUrl.lastIndexOf('/')+1);

    options.mimeType="image/jpeg";
    var user = JSON.parse(localStorage.getItem('e_user'));
    var params = new Object();
    params.fileContentType = 'DaonalaImg';
    //params.workerNo = user.obj.workerNo;
  //  params.token=user.obj.token;
    params.signCode="2a04af4be5737268a51a37849dbd4de5";
    params.systemNo= "10001";
    params.thumbnails= "[{'size':'1L'},{'size':'600X400'}]";
    params.isWateMark= "1";
    params.fileType="1";
    params.createName="admin";
    options.params = params;

   // options.chunkedMode = false;
    var ft = new FileTransfer();
    var uploadurl = omsUrl;
    ft.upload(picUrl, uploadurl, win_oms, fail_oms, options);
}

function win_oms(r) {

    $.ui.unblockUI();
    $.ui.hideMask();

    var msgRes = JSON.parse(r.response);
   // alert("http://192.168.16.84:8080/oms1.0/uploadFiles/"+msgRes.msg+"~"+msgRes.isSucc);
    if(msgRes.isSucc)
    {
    //    errorPopup(msgRes.msg);
       // imgurl=omsUrl+"uploadFiles/"+msgRes.msg+"";
        imgurl=msgRes.obj[0].url+"";

        //alert(imgurl);
        var resultimg = "<div  class='gallery-item' name='fhotoDiv'>" +
            "<a  >" +
            "<img src='" + imgurl+ "' ownlocation='feedbackimg' fileName='"+imgurl+"' style='width:33%; height:100%;float:left;margin:5px;' " +
            "name='picture'/>" +
            "</a>" +
            "</div>";
        //style='width:33%; height:100%;float:left;'
       // alert(resultimg);
       // alert(imgLocation=='0');
        if(imgLocation=='0'){
            console.info(resultimg);
            //alert(resultimg);
            $("#ImageFileRow").append(resultimg);
            $("#ImageFile").show();
        }else if(imgLocation=='1'){
            $("#followImageFileRow").append(resultimg);
            $("#followImageFile").show();
        }else if(imgLocation=='2'){
            $("#handoverImageFileRow").append(resultimg);
            $("#handoverImageFile").show();
        }else{

        }
        errorPopup("上传成功");
     //   $('.thumbs a').touchTouch();
        var pictures = $("img[name='picture']");
        $.each(pictures, function(i, obj) {
			$(obj).unbind('longTap ');
			$(obj).longTap (function() {
   //             alert(1);
 //               $(obj).remove();
                af.ui.popup({
                    title: "温馨提示",
                    message: "您要删除图片吗?",
                    cancelText: "取消",
                    cancelCallback: function () {
                    },
                    cancelClass: 'popup-btn',
                    doneText: "确定",
                    doneClass: 'popup-btn',
                    doneCallback: function () {
                        $(obj).remove();
                    },
                    cancelOnly: false
            });

            });


		});
//        $("img[name='picture']").unbind('taphold');
//        $("img[name='picture']").taphold(function(){
//            $(this).remove();
//        });
    }else
    {
        errorPopup(msgRes.msg.substring(msgRes.msg.indexOf('-')+1,msgRes.msg.length));
    }

}
function delphoto(){

        af.ui.popup({
            title: "温馨提示",
            message: "您要关闭程序吗?",
            cancelText: "取消",
            cancelCallback: function () {
            },
            cancelClass: 'popup-btn',
            doneText: "确定",
            doneClass: 'popup-btn',
            doneCallback: function () {
                if (navigator.app) {
                    navigator.app.exitApp();
                } else if (navigator.device) {
                    navigator.device.exitApp();
                }
            },
            cancelOnly: false
        });


}
function fail_oms(error) {

    /*
     FileTransferError.FILE_NOT_FOUND_ERR：1 文件未找到错误。
     •FileTransferError.INVALID_URL_ERR：2  无效的URL错误。
     •FileTransferError.CONNECTION_ERR：3  连接错误。
     FileTransferError.ABORT_ERR = 4;  程序异常
     */
    var errorcode=error.code;
    var errstr="";
    switch (errorcode)
    {
        case 1:
        {
            errstr="错误代码1：源文件路径异常，请重新选择或者拍照上传！";
            break;
        }
        case 2:
        {
            errstr="错误代码2:目标地址无效,请重试！";
            break;
        }
        case 3:
        {
            errstr="您手机或者后台服务器网络异常,请重新上传！";
            break;
        }
        default :
        {
            errstr="程序出错";
            break;
        }
    }
    errorPopup("上传失败,错误代码:"+errstr+"上传源文件:"+error.source+"目标地址:"+error.target+"请重新上传！")
}