/**
 * Created by wangyay on 2015/5/22.
 */

//初始化我的界面
function init_mine(){

    var user = JSON.parse( localStorage.getItem('user') );
    if(user!=null){
        $('#user_img').attr('src','assets/img/person.png');
        $('#user_img').attr('onclick','');
   //     $('#user_img').
        $('#userAlias').text(user.obj.userName+" 用户");
    }else{
        //$('#user_img').attr('click');
        $('#user_img').attr('onclick','login_panel()');
    }

}

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
    var user = JSON.parse(localStorage.getItem('user'))
    if( user == null ){

    }else{

        $.ui.loadContent("#selfInfo",false,false,false,"slide");
        $('#s_userName').val(user.obj.userName);
        if ( user.obj.statusDesc == '1' ){
            $('#s_userstatus').val('正常');
        } else if ( user.obj.statusDesc == '0' ){
            $('#s_userstatus').val('冻结');
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
    var option = {
        userName: $('#s_userName').val(),
        status : $('#s_userstatus').val(),
        userType : $('#s_userType').val(),
        phone : $('#s_phone').val(user.obj.phone),
        email : $('#s_email').val(user.obj.email)
    }
    getAjax( updateSelfInfoUrl , option ,'updateSelfInfoSucc(data)','errorPopup("网络异常")' );
}

function updateSelfInfoSucc(data){
    if ( data.isSucc ){
        errorPopup('保存成功！');
    }
}
