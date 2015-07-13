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

