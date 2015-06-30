/**
 * Created by 翔 on 2015/3/1.
 */
var register_flag;
var selPhoneElementId;//选中的手机号元素
var selGetCodeElementId;//选中的获取验证码元素

function register() {

    var phone = $("#phone").val();
    var messageCode = $("#messageCode").val();
    var password = $("#password").val();
    //var invitePopularizeCode = $("#popularizeCode").val();
    var  roleType = $("#role").val();
    if(roleType=='物流商'){
        roleType='0';
    }else if(roleType=='货主'){
        roleType='1';
    }else if(roleType=='货主客户'){
        roleType='2';
    }else if(roleType=='司机'){
        roleType='3';
    }else{
        errorPopup('请填写正确的角色!');
    }
    if(phone.trim()=='' || messageCode.trim()=='' || password.trim()=='')
    {
        errorPopup('请填写完全输入项!');
    }else if(password.trim().length<6 || password.trim().length>15)
    {
        errorPopup('请填写合法密码(6-15英文数字)!');
    }else
    {
        if(checkMobile('phone'))
        {
            var data = "?phone="+phone+"&pwd="+password+"&checkNum="+messageCode+
                "&roleType="+roleType;
            $.jsonP({
                url: baseUrl+"account/save_user.action"+data,
                success: function (data) {
                    if(data.isSucc)
                    {
                     errorPopup("恭喜，注册成功!");
                     register_forword(2,phone,password);
                        /*af.ui.popup({
                        $.ui.popup({
                            title: "温馨提示",
                            message: "<h3 align='center'>注册成功</h3>" +
                                "<p align='center'>您已经注册成功，还可以完善资料和车辆信息，" +
                                "以便获得更加匹配的优质货源，" +
                                "赶快去搜索货源吧!</p>",
                            cancelText: "以后再说",
                            cancelClass: 'popup-btn',
                            cancelCallback: function () {
                                register_forword(0,phone,password);
                            },
                            doneText: "更多设置",
                            doneClass: 'popup-btn',
                            doneCallback: function () {
                                register_forword(1,phone,password);
                            }
                        });*/
                        loginStatus = 2;
                        login_panel();
                    }else
                    {
                        errorPopup(data.msg.substring(data.msg.indexOf('-')+1,data.msg.length));
                    }
                },
                error: function () {
                }
            });
        }
    }
}

function register_forword(flag,workerNo,pwd)
{
    var deviceNo = getDeviceNo();
    var os = getOs();
    register_flag = flag;
    getAjax(baseUrl+"account/login.action",{workerNo:workerNo,pwd:pwd,loginType:os,deviceNo:deviceNo},
        'login_succ_forregister(data)','login_fari_forregister()');
}

function login_succ_forregister(data)
{
    var filter = {"workerNo":data.obj.workerNo,"start":"1"}
    setCacheData("myFilter",mergeJson(JSON.parse(localStorage.getItem("myFilter")),filter,true),true);
    setCacheData("locationFilter",mergeJson(JSON.parse(localStorage.getItem("locationFilter")),filter,true),true);
    isLogin = true;
    setCacheData('user',data,1);
    loginStatus = 2;
    visitor=false;
    getNewMainList();

    clear_register_form();

    if(register_flag==0)
    {
        $("#username").val($("#phone").val());
        $("#pwd").val($("#password").val());
        af.ui.loadContent("#main", false, false, "slide");
    }
    else if(register_flag==1){
        home_panel();
        //$.ui.loadContent("#main", false, false, "slide");
    }/*else
     {
     if(ISSELROLE == 1){
     clear_carinfo_form();
     $.ui.loadContent("#carinfo", false, false, "slide");
     }
     else
     {
     address_panel();
     }
     }*/else
    {
        home_panel();
         //$.ui.loadContent("#main", false, false, "slide");
    }
}
function login_fari_forregister()
{
}

/**
 * 验证手机号是否存在
 */
function verify_phone(elementId,callback,flag) {
    var phone = $("#"+elementId).val();
    if (phone.length == 0) {
        return false;
    } else {
        if (checkMobile(elementId)) {

            $.jsonP({
                url: baseUrl+"account/verify_phone.action?phone=" + phone,
                success: function (data) {
                    if(flag == 1)
                    {
                        if(!data.isSucc)
                        {
                            errorPopup(data.msg.substring(data.msg.indexOf('-')+1,data.msg.length));
                            return false;
                        }else
                        {
                            if(callback!=undefined)
                            {
                                eval(callback);
                            }
                            return true;
                        }
                    }else if(flag == 2)
                    {
                        if(data.isSucc)
                        {
                            errorPopup('该手机号不存在!');
                            return false;
                        }else
                        {
                            if(callback!=undefined)
                            {
                                eval(callback);
                            }
                            return true;
                        }
                    }



                },
                error: function () {
                }
            });
        }else
        {
            return false;
        }
    }
}


/**
 * 验证手机是否存在回调函数
 * @param data
 */
function verify_phone_callback(data) {
    console.log(data);
}

/**
 * 发送短信
 * elementId
 * elementId2
 * flag 1：注册2：忘记密码
 */
function send_msg(elementId,elementId2,flag) {
    //debugger
    selPhoneElementId = elementId;
    selGetCodeElementId = elementId2;

    if (checkMobile(selPhoneElementId))
    {
       verify_phone(selPhoneElementId, "send(selPhoneElementId,selGetCodeElementId)",flag);
    }
}

function send()
{
    var phone = $("#"+selPhoneElementId).val();
    settime(selGetCodeElementId);
    $.jsonP({
        url: baseUrl+"msg/send_msg.action?phone="+phone,
        success: function (data) {
            console.log(data);
        },
        error: function () {
        }
    });
}

var countdown = 60;
function timeFunc(elementId)
{
    setTimeout(function () {
        settime(elementId)
    }, 1000);
}
function settime(elementId) {

    if (countdown == 0) {
        $("#" + elementId).html("获取验证码");
        $("#" + elementId).attr('disabled',false);
        countdown = 60;
    } else {
        $("#" + elementId).attr('disabled','disabled');
        $("#" + elementId).html("重新发送(" + countdown + ")");
        countdown--;
        timeFunc(elementId);
    }

}

function check_input()
{
    if($("#phone").val().trim()!="" &&
        $("#messageCode").val().trim()!="" && $("#password").val().trim()!="" &&
        ($("#password").val().length>6 && $("#password").val().length<15))
    {
        $("#submitRegister").attr('disabled',false)
    }else
    {
        $("#submitRegister").attr('disabled','disabled')
    }
}

function clear_register_form()
{
    $("#phone").val("");
    $("#messageCode").val("");
    $("#password").val("");
}