/**
 * Created by wangyay on 2015/5/22.
 */

//初始化我的界面
//function init_mine(){
//
//    var user = JSON.parse( localStorage.getItem('e_user') );
//    if(user!=null){
//        $('#user_img').attr('src','assets/img/person.png');
//        $('#user_img').attr('onclick','');
//   //     $('#user_img').
//        $('#userAlias').text(user.obj.userName+" 用户");
//    }else{
//        //$('#user_img').attr('click');
//        $('#user_img').attr('onclick','login_panel()');
//    }
//
//}

function showQrDiv() {
    $("#transparentBg").fadeIn(200);
    $("#qrImg").fadeIn(400);
    var height = $("#mine").height();
    var width = $("#mine").width();
    var imgHeight = $("#qrcodeImg").height();
    var imgWidth = $("#qrcodeImg").width();
    $("#qrImg").css('top', (height - imgHeight) / 2).css('left', (width - imgWidth) / 2);
}
function hideQrDiv() {
    $("#qrImg").fadeOut(200);
    $("#transparentBg").fadeOut(400);
}


function initselfInfo(){
    var user = JSON.parse(localStorage.getItem('e_user'))
    if( user == null ){

    }else{

        $.ui.loadContent("#selfInfo",false,false,false,"slide");
        $('#s_userCName').val(user.obj.userCName);
        if ( user.obj.statusDesc == '1' ){
            $('#s_userstatus').val('正常');
        } else if ( user.obj.statusDesc == '0' ){
            $('#s_userstatus').val('禁用');
        } else {
        }

       /* $('#s_sex').val(user.obj);*/
        if ( user.obj.userType == '0' ){
            $('#s_userType').val('物流商');
        } else if ( user.obj.userType == '1' ) {
            $('#s_userType').val('货主');
        } else if ( user.obj.userType == '2') {
            $('#s_userType').val('货主客户');
        }

        $('#s_phone').val(user.obj.phone);
        $('#s_email').val(user.obj.email);


    }
}


function updateSelfInfo(){
    var user = JSON.parse(localStorage.getItem('e_user'));

    if ( $("#s_phone").val()!='' && !$("#s_phone").val().match(/^(((13[0-9]{1})|159|153)+\d{8})$/)) {
        errorPopup("手机号码格式不正确！");
        return;
    }
    if ( $("#s_email").val()!='' && !$("#s_email").val().match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/)) {
        errorPopup("邮箱格式不正确");
        return;
    }
    var option = {
        userNo:user.obj.userNo,
        userCName: $('#s_userCName').val(),
        phone : $('#s_phone').val(),
        email : $('#s_email').val()
    }
    getAjax( updateSelfInfoUrl , option ,'updateSelfInfoSucc(data)','errorPopup("网络异常")' );
}

function updateSelfInfoSucc(data){
    if ( data.isSucc ){
        toastrTip('','修改个人信息成功！','success');
        var user = JSON.parse(localStorage.getItem('e_user'));
        user.obj.userCName = $('#s_userCName').val();
        user.obj.phone = $('#s_phone').val();
        user.obj.email = $('#s_email').val();
        localStorage.setItem('e_user', JSON.stringify(user) );
        $.ui.goBack();
    }
}

function initMine(){

    var height = $("#mine").height();
    $("#mineContent").css('height', height);

    var headDivHeihgt = ($("#mineContent").height() * 0.4);
    var headContentDivTop = headDivHeihgt - 37;
    var headLogoImageDivTop = (headContentDivTop - 120) / 2 ;
    $("#headContentDiv").css('top',headContentDivTop);
    $("#headLogoImageDiv").css('top',headLogoImageDivTop);
}