/**
 * Created by 翔 on 2015/6/8.
 */
function shareFunc()
{
    if ($.os.ios) {
        $.ui.popup({
            title: "请选择要分享社交平台",
            message: "<div>" +
                "<div class=''>" +
                "<a href='javascript:;' onclick=shareSession(1) " +
                "class='poupShareTypeDiv' title='A1' >微信好友</a>" +
                "</div>" +
                "<div class=''>" +
                "<a href='javascript:;' onclick=shareSession(0) " +
                "class='poupShareTypeDiv' title='A1' >微信朋友圈</a>" +
                "</div>" +
                "</div>",
            cancelCallback: function () {
            },
            cancelText: '取消',
            cancelOnly: true,
            cancelClass: "popup-btn"
        });
    }else
    {
        window.plugins.socialsharing.share('共速达货源通,货源就是那么简单. 立即加入吧!',
            null,null,'http://www.gongsuda.com:8050/sms_mobile/m.html');
    }
}


function shareSession(flag)
{
    var shares = ['TIMELINE','SESSION'];
    Wechat.share({
        message: {
            title: "共速达货源通",
            description: "货源就是那么简单,立即加入吧!",
            mediaTagName:'货源通',
            media: {
                title: "共速达货源通",
                description: "抢单就是那么简单!",
                type: Wechat.Type.LINK,
                webpageUrl: "http://www.gongsuda.com:8050/sms_mobile/m.html"
            }
        },
        scene: Wechat.Scene[shares[flag]]  // share to Timeline
    }, function () {
        toastrTip('',"您成功分享了!",'success');
    }, function (reason) {
        toastrTip('',"您取消了分享!",'error');
    });
}
