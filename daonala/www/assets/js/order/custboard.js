/**
 * Created by wangyayun on 2015-06-15.
 */

function toggleCustTabs(elm){

    //$(".tabTaskN").addClass('selectTotalDay');
    //$(".tabTaskN").removeClass('tabTaskN');
    $($("#custBoarfButtons").find(".selectTotalDay")[0]).removeClass('selectTotalDay');
    //$(elm).removeClass('tabTaskY');
    $(elm).addClass('selectTotalDay');

    custTabStatus = $(elm).attr('status')
    cust_orderlist_panel(custTabStatus);
    //cust_orderlist_panel();
}

function cust_orderlist_panel(tdStatus){
    $.ui.blockUI(.3);
    $.ui.showMask("获取查询的订单..");
    $("#cust_orderlist_ul").empty();
    $('#orderdetailBackId').attr('onclick',"custboard_panel();");
    //var statustype=elm;
    var statustype ='';
    tdStatus == undefined ? statustype = '' : statustype = tdStatus;//? tdStatus = '1' : tdStatus = tdStatus;
    if( statustype=='0' ) {
        //   timeType='0';
        status='10,20,30,31,40,50,60,70,80';
    }else if( statustype=='1' ){
        //  timeType='3';
        status='90';
    }else {
        status='10,20,30,31,40,50,60,70,80';
        //errorPopup('状态参数错误');
    }
    /* setCacheData("searchFilter", mergeJson(JSON.parse(localStorage.getItem("searchFilter")),
     {'start': '1', 'length':'10', 'queryDate': '', 'status': ''}, true), true);*/
 //   var searchText = $('#searchText').val();
    var user =  JSON.parse( localStorage.getItem("e_user") );
    if ( localStorage.getItem("e_user")==null ) {
 /*       getAjax(searchUrl, {'start': '1', 'length':'10','orderNo':'','timeType':timeType,'status':status,'enterpriseText':'10001',
                'ownerText':'','custText':''},
            "updateOrderlistPanel(data)", "errorPopup('网络请求超时,请检查网络后再尝试..')");
*/        // getAjax(searchUrl,options,searchSuc(data),searchFail(data));
    } else {
        getAjax(searchUrl, {'start': '1', 'length':'10','orderNo':'','timeType':'N',
                'status':status,'enterpriseNo':user.obj.enterpriseNo,
                'enterpriseText':user.obj.logisticNo, 'ownerText':user.obj.ownerNo,
                'custText':user.obj.custNo,
                'userNo':getUserNo(),'userType':user.obj.userType},
            "updateCustOrderlistPanel(data)", "errorPopup('网络请求超时,请检查网络后再尝试..')");
    }

    setCacheData("searchFilter",mergeJson(JSON.parse(localStorage.getItem("searchFilter")),
        {'start': '1', 'length':'10','orderNo':'','timeType':'N','status':status,
            'enterpriseNo':'10001','enterpriseText':'',
            'ownerText':'','custText':'','userNo':getUserNo(),'userType':user.obj.userType}, true), true);
    //$('#cust_orderlist_ul').empty();


}


function updateCustOrderlistPanel(data,flag){

    var prependFlag = arguments[1] ? arguments[1] : false;
    var oldmyFilter = JSON.parse(localStorage.getItem("searchFilter"));

    var containNode = $("<div class='orderNode'></div>");
    var nullTrace = "<div align='center' style='margin: 10px;'>查无订单...</div>";
    if(data.isSucc) {
        var result = '';
        var list = data.obj.data;
        lastPage = 'custboard';
        var traceFuc = '';
        if (data.obj.recordsTotal > 0) {
            //$.ui.loadContent("#custboard", false, false, "slide");
            /*for (var k in data.obj.data) {*/
                $.ui.showMask("我们正在拼命的加载数据...");
                var result = template('custorderListTemp',data);
        } else{

        }

        if(flag){
            $("#cust_orderlist_ul").append(result);
        }else {
            if (data.obj.data.length < (oldmyFilter.length -= 0)) {
                if($("#nullCustOrderSelf").length>0){
                    $("#cust_orderlist_ul").append(result);
                }else{
                    $("#cust_orderlist_ul").append(result);
                    $("<div id='nullCustOrderSelf' class='nullOrder'>" +
                        "<p style='text-align: center;text-color:orange;'>暂无剩余订单..</p>" +
                        "</div>").appendTo(cust_orderlist_ul);
                }
            }else{
                $("#cust_orderlist_ul").append(result);
            }
        }
       }else{
        errorPopup(data.msg);
    }

    custLoaded();
    custPullUpEl['class'] = custPullDownEl.attr('class');
    custPullUpEl.attr('class','').hide();
    custPullDownEl.attr('class','').hide();
    custboardScroll.refresh();
    custLoadingStep = 0;
    $.ui.unblockUI();
    $.ui.hideMask();
    
    
}


function getCustOrderPullToRefresh(that){

    setCacheData("searchFilter",mergeJson(JSON.parse(localStorage.getItem("searchFilter")),
        {'queryType':'1'},true),true);
    jQuery.ajax({
        url: searchUrl,
        timeout: 20000, //超时X秒
        dataType: 'jsonp',
        data:JSON.parse(localStorage.getItem("searchFilter"))
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
                            updateCustOrderlistPanel(data,true);
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
                setCacheData("searchFilter",mergeJson(JSON.parse(localStorage.getItem("searchFilter")),
                    {'queryType':'2'},true),true);
               // that.hideRefresh();
                custPullDownEl.attr('class','').hide();
                custboardScroll.refresh();
                custLoadingStep = 0;
            }, 1000);
        });
}


function getRequestFromCustOrderinite(self) {

    var searchFilter =  JSON.parse(localStorage.getItem("searchFilter"));
    var start = parseInt(searchFilter.start) + 10;
    setCacheData("searchFilter",mergeJson(JSON.parse(localStorage.getItem("searchFilter")),
        {'queryType':'1','enterpriseNo':getEnterpriseNo(),'start':start},true),true);
    jQuery.ajax({
        url: searchUrl,
        timeout: 20000, //超时X秒
        dataType: 'jsonp',
        data:JSON.parse(localStorage.getItem("searchFilter"))
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
                        /*$(self.el).find("#infinite").remove();
                        self.clearInfinite();*/
                        custPullUpEl.removeClass('loading');
                        updateCustOrderlistPanel(data);
                    }catch(e){
                    };
                }
            }
        }).fail(function () {
        }).always(function () {
            ajaxFlag=true;
        });

}



        var emails = [
                 { name: "Peter Pan", to: "peter@pan.de" },
                 { name: "Molly", to: "molly@yahoo.com" },
                 { name: "Forneria Marconi", to: "live@japan.jp" },
                 { name: "Master <em>Sync</em>", to: "205bw@samsung.com" },
                 { name: "Dr. <strong>Tech</strong> de Log", to: "g15@logitech.com" },
                 { name: "Don Corleone", to: "don@vegas.com" },
                 { name: "Mc Chick", to: "info@donalds.org" },
                 { name: "Donnie Darko", to: "dd@timeshift.info" },
                 { name: "Quake The Net", to: "webmaster@quakenet.org" },
                 { name: "Dr. Write", to: "write@writable.com" },
                 { name: "GG Bond", to: "Bond@qq.com" },
                 { name: "Zhuzhu Xia", to: "zhuzhu@qq.com" }
             ];
        function initAutoData(){
                    $('#keyword').autocomplete(emails, {
                        max: 12,    //列表里的条目数
                        minChars: 0,    //自动完成激活之前填入的最小字符
                        width: 400,     //提示的宽度，溢出隐藏
                        scrollHeight: 300,   //提示的高度，溢出显示滚动条
                        matchContains: true,    //包含匹配，就是data参数里的数据，是否只要包含文本框里的数据就显示
                        autoFill: false,    //自动填充
                        formatItem: function(row, i, max) {
                               return i + '/' + max + ':"' + row.name + '"[' + row.to + ']';
                          },
                        formatMatch: function(row, i, max) {
                                return row.name + row.to;
                            },
                        formatResult: function(row) {
                                 return row.to;
                             }
                     }).result(function(event, row, formatted) {
                         alert(row.to);
                     });
             };