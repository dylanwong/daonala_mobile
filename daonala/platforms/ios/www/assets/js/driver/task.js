/**
 * Created by wyy on 2015-06-01.
 */

var taskTabStatus = 0;
function toggleTaskTabs(elm) {
    $(".tabTaskN").addClass('tabTaskY');
    $(".tabTaskN").removeClass('tabTaskN');

    $(elm).removeClass('tabTaskY');
    $(elm).addClass('tabTaskN');
    $("#taskList").empty();
    taskTabStatus = $(elm).attr('status')
    taskPanelLoad(taskTabStatus);

}

function taskPanelLoad(taskStatus) {
    var phone = '13613085473';
    var tdStatus = "";
    taskStatus == undefined ? tdStatus = '0' : tdStatus = taskStatus;

    $.ui.blockUI(.3);
    $.ui.showMask("获取我的任务..");
    $("ul#taskList").empty();
    setCacheData("taskFilter",
        {'start': '0', 'length':'10', 'queryDate': '', 'status': tdStatus,'phone':phone}, true);
    getAjax(taskqueryUrl, JSON.parse(localStorage.getItem("taskFilter")),
        "updateTaskPanel(data)", "errorPopup('网络请求超时,请检查网络后再尝试..')");
}


function getTodoPullToRefresh(that){
    setCacheData("taskFilter",mergeJson(JSON.parse(localStorage.getItem("taskFilter")),
        {'start':0},true),true);
//    setCacheData("taskFilter",mergeJson(JSON.parse(localStorage.getItem("taskFilter")),
//        {'queryType':'1'},true),true);
    $("ul#taskList").empty();
    jQuery.ajax({
        url: taskqueryUrl,
        timeout: 20000, //超时X秒
        dataType: 'jsonp',
        data:JSON.parse(localStorage.getItem("taskFilter"))
    }).done(
        function (data) {
            if(data!=null)
            {
                if (data.isSucc === false && data.msg !=null && data.msg.indexOf('E0000') != -1 ) {
                    errorSessionPopup();
                }
                else if(data.isSucc === false && data.msg !=null){
                    var msgText=data.msg.split("-")
                    errorPopup(msgText[1])
                }else if(data.isSucc === true){
                    try{
                        if(data.obj.data.length==0){
                            $("#selfOrder_pulldown").html("<h2 style='color: #F6842B'>暂无新任务</h2>")
                        }else{
                            $("#selfOrder_pulldown").html("<h2 style='color: #F6842B'>新增"+data.obj.data.length+"个任务</h2>")
                            updateTaskPanel(data,true);
                        }
                    }catch(e){
                    };
                }
            }
        }).fail(function () {
            try{
                //eval(failFunction);
            }catch(e){
                //sendErrorInfo(errorInfo,true);
            };
        }).always(function () {
            setTimeout(function () {
                setCacheData("taskFilter",mergeJson(JSON.parse(localStorage.getItem("taskFilter")),
                    {'queryType':'2'},true),true);
                that.hideRefresh();
            }, 1000);
        });
}


function getRequestFromTaskInfinite(self) {
    var taskFilter =  JSON.parse(localStorage.getItem("taskFilter"));
    var start = parseInt(taskFilter.start) + 10;
    setCacheData("taskFilter",mergeJson(JSON.parse(localStorage.getItem("taskFilter")),
        {'start':start},true),true);
    jQuery.ajax({
        url: taskqueryUrl,
        timeout: 20000, //超时X秒
        dataType: 'jsonp',
        data:JSON.parse(localStorage.getItem("taskFilter"))
    }).done(
        function (data) {
            if(data!=null)
            {
                if (data.isSucc === false && data.msg !=null && data.msg.indexOf('E0000') != -1 ) {
                    errorSessionPopup();
                }
                else if(data.isSucc === false && data.msg !=null){
                    var msgText=data.msg.split("-")
                    errorPopup(msgText[1])
                }else if(data.isSucc === true){
                    try{
                        $(self.el).find("#infinite").remove();
                        self.clearInfinite();
                        updateTaskPanel(data);
                    }catch(e){
                        errorPopup('下拉刷新异常');
                    };
                }
            }
        }).fail(function () {
        }).always(function () {
            ajaxFlag=true;
        });

}

function updateTaskPanel(data, prepend) {
    var prependFlag = arguments[1] ? arguments[1] : false;
    var oldmyFilter = JSON.parse(localStorage.getItem("taskFilter"));
    var containNode = $("<div class='containNode'></div>");
    var obj = data.obj.data;
    var liNode = null;

    if (!data.isSucc) {
        if ($("#nullTaskSelf").length == 0) {

            $("<div id='nullTaskSelf' class='nullOrder selfNullOrder'>" +
                "<p style='text-align: center;text-color:orange;'>暂无任务信息..</p>" +
                "</div>").appendTo("#taskList");
        }
    } else {
        $("#nullTaskSelf").remove();
        var todoTriFuc = "";
        var timeline = '';
        var buttonHtml = "";

        taskTabStatus == 0 ? todoTriFuc = 'taskInfo(this);' : todoTriFuc = 'biddingsignorder(this);';
        taskTabStatus == 0 ? buttonHtml = '任务反馈' : buttonHtml = '补录';
        $(obj).each(function (index,data) {
            var statusSelStyle10 = "";
            var statusSelCss10 = "bg_black";
            var statusSelStyle70 = "";
            var statusSelCss70 = "bg_black";
            var statusSelStyle99 = "";
            var statusSelCss99 = "bg_black";
            var status = data.status;
            if(status <= 40)
            {
                statusSelStyle10 = "color:#00B2EE";
                statusSelCss10 = "bg_blue";
            }else if(status > 40 && status <= 70)
            {
                statusSelStyle70 = "color:#00B2EE";
                statusSelCss70 = "bg_blue";
            }else if(status > 70 && status <= 99)
            {
                statusSelStyle99 = "color:#00B2EE";
                statusSelCss99 = "bg_blue";
            }

            if(taskTabStatus == 0)
            {
                timeline = '<div class="fr f10"><div class="fl">' +
                    '<p class="f10 " style="'+statusSelStyle10+'">未完成</p><div style="margin: -5px auto;" ' +
                    'class="circle '+statusSelCss10+'">' +
                    '</div></div><div class="fl"><p></p><div style="margin: 10px auto; height:10px;" ' +
                    'class="">—</div></div><div class="fl">' +
                    '<p class="f10" style="'+statusSelStyle70+'">完成</p>' +
                    '<div style="margin: -5px auto;" class="circle '+statusSelCss70+'"></div></div>' +
                    /*'<div class="fl"><p></p><div style="margin: 10px auto; height:10px;">—</div>' +
                    '</div><div class="fl">' +
                    '<p class="f10" style="'+statusSelStyle99+'">交接</p><div style="margin: -5px auto;" ' +
                    'class="circle '+statusSelCss99+'"></div></div>*/'<div style="clear:both;"></div></div>';
            }else
            {
                timeline = '<div class="fr f10 yellowColor"> '+data.deliveryDate+'</div>';
            }


            liNode = $('<li id="task_' + data.sendNo + '"  onclick="'+todoTriFuc+'"  ' +
                'data-task-detail=\'' + JSON.stringify(data) + '\'><div  class="lh4 f16 f2 p0-6">' +
                '<div class="fl f18">运输单号<span' +
                ' class=""></span>' + data.sendNo + '</div>' +
                timeline+'</div>' +
                '<div class="lh7 p0-6"><div class="fl width5 lh4"><div>' +
                '<p class="lh2 order-detail-text mt0">'+'车牌号:'+'  '+data.licensePlate+'</p>' +
                '<p class="lh2 order-detail-text' +
                ' mt0">'+data.fromAdr+' -> '+data.endAdr+'</p>' +
                '<p class="lh2 order-detail-text">'+'发车时间：'+data.deliveryDate+'</p></div></div>' +
                '<div class="fr width3 lh7 text-right get-order">  <p class="lh2 mb10 order-detail-text">' +
                ' <span class="f16">'+'' +'</span> '+'' +'</span> </p>' +
                '<p class="lh5"><a class="p6 f18 order-btn" style="padding: 5px 5px">'+buttonHtml+'</a></p></div></div></li>');
            $(liNode).appendTo(containNode);
        });
        if (prependFlag) {
            $("#taskList").prepend(containNode);
        } else {
            if (obj.length < (oldmyFilter.length -= 0)) {
                $("<div id='nullTaskSelf' class='nullOrder'>" +
                    "<p style='text-align: center;text-color:orange;'>暂无剩余任务..</p>" +
                    "</div>").appendTo(containNode);
            }
            $("#taskList").prepend(containNode);
            //$(containNode).appendTo("#taskList");
        }

    }

//    setCacheData("taskFilter", mergeJson(oldmyFilter, {'start': (oldmyFilter.start -= 0) +
//        data.obj.data.length, 'queryDate': data.obj.queryDate}, true), true);
}

//任务
function taskInfo(elm)
{
//    $("#ImageFileRow").remove();
//    $("#followImageFileRow").remove();
//    $("#handoverImageFileRow").remove();

    TDID = $(elm).attr('id');
    var data = eval('(' +$(elm).attr('data-task-detail')+ ')');
    $.ui.loadContent("#operateguide", false, false, "slide");
    $('#startplace').text(data.fromAdr);
    $('#endplace').text(data.endAdr);
    $('#o_sendNo').text(data.sendNo);
    $('#o_licensePlate').text(data.licensePlate);



    localStorage.setItem("currenttask",$(elm).attr('data-task-detail'));

    $('#chocieordersTelButton').attr('href','tel:'+data.custphone);
    $('#operateguideTelButton').attr('href','tel:'+data.custphone);
    $('#deliverordersTelButton').attr('href','tel:'+data.custphone);
    $('#followorderTelButton').attr('href','tel:'+data.custphone);
    $('#handoverordersTelButton').attr('href','tel:'+data.custphone);


}



//任务
function trace_panel(elm)
{
//    $("#ImageFileRow").remove();
//    $("#followImageFileRow").remove();
//    $("#handoverImageFileRow").remove();

    TDID = $(elm).attr('id');
    var data = eval('(' +$(elm).attr('data-task-detail')+ ')');
    $.ui.loadContent("#operateguide", false, false, "slide");
    $('#startplace').text(data.fromAdr);
    $('#endplace').text(data.endAdr);
    $('#o_sendNo').text(data.sendNo);
    $('#o_licensePlate').text(data.licensePlate);

    localStorage.setItem("currenttask",$(elm).attr('data-task-detail'));

    $('#chocieordersTelButton').attr('href','tel:'+data.driverTel);
    $('#operateguideTelButton').attr('href','tel:'+data.driverTel);
    $('#deliverordersTelButton').attr('href','tel:'+data.driverTel);
    $('#followorderTelButton').attr('href','tel:'+data.driverTel);
    $('#handoverordersTelButton').attr('href','tel:'+data.driverTel);


}