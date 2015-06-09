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
    else if(pwd.trim().length<6 || pwd.trim().length>15)
    {
        errorPopup('请填写合法密码(6-15英文数字)!');
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
                deviceNo:'NOKIA',
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
        setCacheData('user',data,1);
        loginStatus = 1;
        visitor=false;

        $('#user_img').attr('src','assets/img/person.png');

        $('#userAlias').text(data.obj.userName+" 用户");
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
    var user = JSON.parse(localStorage.getItem('user'));
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
    localStorage.removeItem('user');
    sessionStorage.removeItem("mainList");
    sessionStorage.removeItem("myList");
    $('#user_img').attr('src','assets/img/user1.png');
    $('#userAlias').text('');
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

function saveUpdatePwd()
{
    var phone = $("#findPhone").val();
    var messageCode = $("#findMessageCode").val();
    var password = $("#findPassword").val();

    if(phone.trim()=='' || messageCode.trim()=='' || password.trim()=='')
    {
        errorPopup('请填写完全输入项!');
    }
    else if(password.trim().length<6 || password.trim().length>15)
    {
        errorPopup('请填写合法密码(6-15英文数字)!');
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

