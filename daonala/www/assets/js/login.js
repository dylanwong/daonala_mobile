/**
 * Created by wangyay on 2015/5/22.
 */
function login()
{
    var userNo = $("#username").val();
    var pwd = $("#pwd").val();

    if(userNo.trim()=='' || pwd.trim()=='')
    {
        errorPopup('请填写完全!');
    }
    else if(pwd.trim().length<1 || pwd.trim().length>15)
    {
        errorPopup('请填写合法密码(1-15英文数字)!');
    }else
    {
            var deviceNo = getDeviceNo();
            var os = getOs();
            var locationObj = localStorage.getItem('locationObj');
            var currentAddr ="";
            if(locationObj!=null)
            {
                locationObj = JSON.parse(locationObj);
                currentAddr = locationObj.provinceName+"-"+locationObj.cityName;
            }

            var url = baseUrl+"account/login.action";
            var options =
            {
                username:userNo,
                pwd:pwd,
                loginType:os,
                deviceNo:deviceNo,
                currentAddr:currentAddr,
                longitude:'',
                latitude:''
            };
            getAjax(url,options,'save_login_succ(data)','save_login_fail');
    }
}

function save_login_succ(data)
{
    if(data.isSucc)
    {
        var filter = {"userNo":data.obj.userNo,"start":"1"}
        setCacheData("myFilter",mergeJson(JSON.parse(localStorage.getItem("myFilter")),filter,true),true);
        setCacheData("locationFilter",mergeJson(JSON.parse(localStorage.getItem("locationFilter")),filter,true),true);
        isLogin = true;
        setCacheData('e_user',data,1);
        loginStatus = 1;
        roleID = data.obj.userType;
        visitor=false;

        $('#user_img').attr('src','assets/img/person.png');
        $('#userAlias').text(data.obj.userName+" 用户");
        $('#userNameMine').text(data.obj.userName);

        init_homepage();
        home_panel();
        //$.ui.loadContent("#main", false, false, "slide");
    }else
    {
        errorPopup(data.msg.substring(data.msg.indexOf('-')+1,data.msg.length));
    }
}
function save_login_fail(data){}

function bing_login_dom_data()
{
    $("#username").val("");
    $("#pwd").val("");
}

function logout()
{
    roleID = '';
    $.ui.popup({
        title: "温馨提示",
        message: "您确定注销登陆!",
        cancelText: "取消",
        cancelClass: 'popup-btn',
        cancelCallback: function () {
        },
        doneText: "确定",
        doneClass: 'popup-btn',
        doneCallback: function () {
            logoutSucc();
            loginPanel();
        }
    });
}

function logoutSucc()
{
    var url = baseUrl + "account/logout.action";
    loginStatus = 0;
    var user = JSON.parse(localStorage.getItem('e_user'));
    var userNo = user.obj.userNo;
    var deviceNo = getDeviceNo();
    var os = getOs();
    var option = {
        userNo:userNo,
        deviceNo:deviceNo,
        loginType:os
    };
    getAjax(url,option);
    bing_login_dom_data();
    localStorage.removeItem('e_user');
    sessionStorage.removeItem("mainList");
    sessionStorage.removeItem("myList");
    localStorage.removeItem("searchFilter");
    localStorage.removeItem("locationFilter");
    localStorage.removeItem("myFilter");
    localStorage.removeItem("list1");
    localStorage.removeItem("list7");
    localStorage.removeItem("list30");
    localStorage.removeItem("allCount_1");
    localStorage.removeItem("allCount_7");
    localStorage.removeItem("allCount_30");
    $('#user_img').attr('src','assets/img/user1.png');
    $('#user_img').attr('onclick','login_panel()');
    $('#userAlias').text('');
    init_homepage();
}


function getOs()
{
    var os = "";
    if($.os.ios)
    {
        os = 'ios';
    }else if($.os.android)
    {
        os = 'android';
    }
    return os;
}

function getDeviceNo()
{
    //如果是IOS的设备 device全部改为cloudId
    var deviceNo = "";
    if(window.OSInfo!= null && window.OSInfo.os.toLocaleUpperCase()=="IOS")
    {
        deviceNo = window.OSInfo.push;
    }else if(typeof(device) != 'undefined')
    {
        deviceNo =  device.uuid;
    }
    return deviceNo;
}

function loginPanel()
{
    $.ui.loadContent("#login", false, false, "slide");
    $.ui.clearHistory();
}

function resetPwd()
{
    errorPopup("" +
        "<a href='tel:4001110005'  style='width: 90%' class='btn btn-warning'>呼叫客服找回密码</a>");
}

/**
 * Created by wyy on 2015/5/25.
 */
function findPwdPanel()
{
    $.ui.loadContent("#findPwd", false, false, "slide");
}
/*忘记密码*/
function saveUpdatePwd()
{
    var phone = $("#findPhone").val();
    var messageCode = $("#findMessageCode").val();
    var password = $("#findPassword").val();

    if(phone.trim()=='' || messageCode.trim()=='' || password.trim()=='')
    {
        errorPopup('请填写完全输入项!');
    }
    else if(password.trim().length<1 || password.trim().length>15)
    {
        errorPopup('请填写合法密码(1-15英文数字)!');
    }
    else
    {
        if (checkMobile('findPhone'))
        {

            var url = baseUrl + "account/updatePwd.action";
            var option =
            {
                phone:phone,
                pwd:password,
                checkNum:messageCode
            };
            getAjax(url,option,'updatePwdsucc(data)');
        }
    }
}

/**
 *
 */
function updatePwdsucc(data)
{
    var msgText=data.msg.split("-")
    if(data.isSucc)
    {
        errorPopup(msgText[1]);
        login_panel();
        $("#findPhone").val("");
        $("#findMessageCode").val("");
        $("#findPassword").val("");
        countdown=0;
        $("#findGetVerifyCode").attr('disabled','false');
    }else
    {
        errorPopup(msgText[1]);
    }
}
/*修改密码*/
function updatePwd(){
    var oldPwd = $('#oldPwd').val();
    var newPwd = $('#newPwd').val();
    if(oldPwd.trim().length<6 || oldPwd.trim().length>15)
    {
        errorPopup('请填写合法的原密码(6-15英文数字)!');
        return;
    }
    if(newPwd.trim().length<6 || newPwd.trim().length>15)
    {
        errorPopup('请填写合法的原密码(6-15英文数字)!');
        return;
    }
    var url = baseUrl + "account/updatePwdLogin.action";
    var user = JSON.parse(localStorage.getItem('e_user'));
    var option =
    {
        userNo:user.obj.userNo,
        oldPwd:oldPwd,
        newPwd:newPwd
    };

    getAjax(url,option,'updatePwdLoginsucc(data)');
}

function updatePwdLoginsucc(data){
    if( data.isSucc ){
        if( data.msg.split("-")[0] == 'S0001' ){
            errorPopup(data.msg.split("-")[1]);
            localStorage.removeItem('e_user');
            login_panel();
            $('#oldPwd').val('');
            $('#newPwd').val('');
        }
        else{
            errorPopup(data.msg.split("-")[1]);
        }
    }else{
        errorPopup(data.msg);
    }

}

