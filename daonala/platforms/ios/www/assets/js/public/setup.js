/**
 * Created by wyy on 2015/5/25.
 */
function getMySetup()
{
   var user =  localStorage.getItem('e_user');
   if(user!=null)
   {
       //如果是IOS的设备 device全部改为cloudId
       var deviceNo = 'nokia';//device.uuid;
       if(window.OSInfo!= null && window.OSInfo.os.toLocaleUpperCase()=="IOS")
       {
           deviceNo = window.OSInfo.push;
       }

       user = JSON.parse(user);
       var options = {
           userNo:user.obj.userNo,
           deviceNo:deviceNo,
           enterpriseNo:user.obj.enterpriseNo
       };
       getAjax(queryMySet,options,'getMySetupSucc(data)','getMySetupError(data)');
   }
}
function getMySetupSucc(data)
{
//    if(data.isSucc)
//    {
        var soundFlagCheck = '';
        var vibrateFlagCheck = '';
        var movementFlagCheck = '';



        /*data.obj.soundFlag==1?$("#soundFlag").attr('checked',true)
            :$("#soundFlag").removeAttr('checked');
        data.obj.vibrateFlag==1?$("#vibrateFlag").attr('checked',true)
            :$("#vibrateFlag").removeAttr('checked');
        data.obj.movementFlag==1?$("#movementFlag").attr('checked',true)
            :$("#movementFlag").removeAttr('checked');*/

        if(data.obj.soundFlag==1)
        {
            soundFlagCheck = 'checked';
        }
        if(data.obj.vibrateFlag==1)
        {
            vibrateFlagCheck = 'checked';
        }
        if(data.obj.movementFlag==1)
        {
            movementFlagCheck = 'checked';
        }

        var switchHtml = '<div style="width:90%;border-bottom:1px solid #EEEEEE;overflow:hidden;' +
            'line-height:55px;height:55px; margin:0px 10px;"><div class="fl" ' +
            'style="color:#696969;font-size:16px;font-weight:bold;">语音提示</div>' +
            '<div class="fr" style="margin-top:10px;margin-right:0px;margin-top:-5px;">' +
            '<input id="soundFlag" type="checkbox" name="my-checkbox" '+soundFlagCheck+' ></div>' +
            '</div><div style="width:90%;border-bottom:1px solid #EEEEEE;overflow:hidden;' +
            'line-height:55px;height:55px; margin:0px 10px;"><div class="fl" ' +
            'style="color:#696969;font-size:16px;font-weight:bold;">震动推送</div>' +
            '<div class="fr" style="margin-top:10px;margin-right:0px;margin-top:-5px;">' +
            '<input id="vibrateFlag" type="checkbox" name="my-checkbox" '+vibrateFlagCheck+' >' +
            '</div></div><div style="width:90%;border-bottom:1px solid #EEEEEE;' +
            'overflow:hidden;line-height:55px;height:55px; margin:0px 10px;">' +
            '<div class="fl" style="color:#696969;font-size:16px;font-weight:bold;">接收消息自动提示' +
            '<span style="font-size:12px;color:#A1A1A1;">&nbsp;&nbsp;</span></div>' +
            '<div class="fr" style="margin-top:10px;margin-right:0px;margin-top:-5px;">' +
            '<input id="movementFlag" type="checkbox" name="my-checkbox" '+movementFlagCheck+' ></div></div>';

        $("#switchDiv").empty();
        $("#switchDiv").append(switchHtml);
        $("[name='my-checkbox']").bootstrapSwitch();
        initSwitch();
 //   }

}
function getMySetupError(data){

    var switchHtml = '<div style="width:90%;border-bottom:1px solid #EEEEEE;overflow:hidden;' +
        'line-height:55px;height:55px; margin:0px 10px;"><div class="fl" ' +
        'style="color:#696969;font-size:16px;font-weight:bold;">语音提示</div>' +
        '<div class="fr" style="margin-top:10px;margin-right:0px;margin-top:-5px;">' +
        '<input id="soundFlag" type="checkbox" name="my-checkbox" ></div>' +
        '</div><div style="width:90%;border-bottom:1px solid #EEEEEE;overflow:hidden;' +
        'line-height:55px;height:55px; margin:0px 10px;"><div class="fl" ' +
        'style="color:#696969;font-size:16px;font-weight:bold;">震动推送</div>' +
        '<div class="fr" style="margin-top:10px;margin-right:0px;margin-top:-5px;">' +
        '<input id="vibrateFlag" type="checkbox" name="my-checkbox"  >' +
        '</div></div><div style="width:90%;border-bottom:1px solid #EEEEEE;' +
        'overflow:hidden;line-height:55px;height:55px; margin:0px 10px;">' +
        '<div class="fl" style="color:#696969;font-size:16px;font-weight:bold;">接收消息自动提示' +
        '<span style="font-size:12px;color:#A1A1A1;">&nbsp;&nbsp;</span></div>' +
        '<div class="fr" style="margin-top:10px;margin-right:0px;margin-top:-5px;">' +
        '<input id="movementFlag" type="checkbox" name="my-checkbox"  ></div></div>';
    $("#switchDiv").empty();
    $("#switchDiv").append(switchHtml);
    $("[name='my-checkbox']").bootstrapSwitch('state', true, true);
    initSwitch();
}

/**
 * 更新我的设置
 */
function updateMySetup(data)
{
    var user =  localStorage.getItem('e_user');
    if(user!=null)
    {
        //如果是IOS的设备 device全部改为cloudId
        var deviceNo = device.uuid;
        if(window.OSInfo!= null && window.OSInfo.os.toLocaleUpperCase()=="IOS")
        {
            deviceNo = window.OSInfo.push;
        }

        user = JSON.parse(user);
        var options = {
            userNo:user.obj.userNo,
            deviceNo:deviceNo,
            soundFlag:data[0],
            vibrateFlag:data[1],
            movementFlag:data[2],
            enterpriseNo:user.obj.enterpriseNo
        };
        getAjax(updateOrUpdateMySet,options,'updateMySetupSucc(data)','updateMySetupError(data)');
    }
}
function updateMySetupSucc(data)
{
}
function updateMySetupError(data){}

/**
 * 初始化
 */
function initSetup()
{
    getMySetup();
    if(localStorage.getItem('e_user')==null){
        $('#logoutBtn').hide();
    }else{

    }
    $("#versionNo").html(currentVersion+".1");//默认加.1
}

/**
 * 保存反馈建议
 */
function saveFeedBack ()
{
    var content = $("#feedbackContent").val();
    if($.trim(content)=="")
    {
        toastrTip('','请输入评论内容...','error');
    }else
    {
        var user =  localStorage.getItem('e_user');
        if(user!=null)
        {

            user = JSON.parse(user);
            var options = {
                feedbackName:user.obj.userNo,
                phone:user.obj.phone,
                email:'',
                content:content,
                enterpriseNo:user.obj.enterpriseNo
            };

        }else{
            var feedbacker = $('#feedbacker').val();
            var reyx= /^([a-za-z0-9_-])+@([a-za-z0-9_-])+(.[a-za-z0-9_-])+/;//使用正则
          //  return(reyx.test(yx));
            if((/^1\d{10}$/.test(feedbacker))){
                //feedbacker
                var options = {
                    feedbackName: '',
                    phone: feedbacker,
                    email: '',
                    content: content
                  //  enterpriseNo: ''
                };
            }else if(reyx.test(feedbacker) ){
                var options = {
                    feedbackName: '',
                    phone: '',
                    email: feedbacker,
                    content: content
                  //  enterpriseNo: ''
                };
            }else{
                var options = {
                    feedbackName: feedbacker,
                    phone: '',
                    email: '',
                    content: content
                };
                  //  enterpriseNo: ''
            }
//            var options = {
//                feedbackName: $('#feedbacker').val(),
//                phone: $('#feedbacker').val(),
//                email: $('#feedbacker').val(),
//                content: content,
//                enterpriseNo: ''
//            };
        }
        getAjax(saveFeedbackUrl,options,'saveFeedBackSucc(data)','saveFeedBackError(data)');
    }
}

function saveFeedBackSucc(data){
    if(data.isSucc)
    {
        toastrTip('','反馈成功,感谢您的意见!','success');
        $.ui.goBack();
        $("#feedbackContent").val('');
        $('#feedbacker').val('');
    }else
    {
        toastrTip('',data.msg.substring(data.msg.indexOf('-')+1,data.msg.length),'error');
    }
}
function saveFeedBackError(data){}

function initSwitch()
{
    $('input[name="my-checkbox"]').unbind('switchChange.bootstrapSwitch');
    $('input[name="my-checkbox"]').on('switchChange.bootstrapSwitch', function(event, state) {

        //console.log(this); // DOM element
        //console.log(event); // jQuery event
        //console.log(state); // true | false

        var data = [];
        var id = $(this).attr('id');
        var flag = 0;
        state == true?flag=1:flag=0;
        if(id == 'soundFlag')
        {
            data = [flag,'',''];
        }else if(id == 'vibrateFlag')
        {
            data = ['',flag,''];
        }else
        {
            data = ['','',flag];
        }

        updateMySetup(data);
    });

}