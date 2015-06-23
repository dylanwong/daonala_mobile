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

