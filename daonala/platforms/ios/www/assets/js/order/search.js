/**
 * Created by wyy on 2015-05-27.
 */

//function initSearchPage(){
//    var arr_v = [];
//    arr_v = JSON.parse( localStorage.getItem('routeList') );
//
//}
function search(){
    try{
    searchFlag = 0;
    scrollFlag =0;
    lastPage = 'search';
    $.ui.blockUI(.3);
    $.ui.showMask("获取查询的订单..");
    $("ul#todoList").empty();
    $("#orderlistHeaderId").attr('onclick',
        "$.ui.loadContent('#search', false, false, 'slide')");
    /*$("#orderdetailBackId").attr('onclick',
        "$.ui.loadContent('#orderlist', false, false, 'slide')");*///

    /* setCacheData("searchFilter", mergeJson(JSON.parse(localStorage.getItem("searchFilter")),
         {'start': '1', 'length':'10', 'queryDate': '', 'status': ''}, true), true);*/
    var searchText = $('#searchText').val();
    if( searchText != '' && searchText != null){
        var user = JSON.parse( localStorage.getItem("e_user") );
        if ( user==null ) {
            getAjax(searchUrl, {'start': '1', 'length':'10','orderNo':searchText,'timeType':'N','userNo':'',
            'userType':'' },
        "updateOrderlistPanel(data)", "errorPopup('网络请求超时,请检查网络后再尝试..')");
   // getAjax(searchUrl,options,searchSuc(data),searchFail(data));
            } else {
            getAjax(searchUrl, {'start': '1', 'length':'10','orderNo':searchText,
                    'timeType':'N','userNo':user.obj.userNo,
               'enterpriseText':user.obj.logisticNo, 'ownerText':user.obj.ownerNo ,'custText':user.obj.custNo,
                'userType':user.obj.userType },
            "updateOrderlistPanel(data,true)", "errorPopup('网络请求超时,请检查网络后再尝试..')");

        }
        if( user!=null ){
            setCacheData("searchFilter", mergeJson(JSON.parse(localStorage.getItem("searchFilter")),
            {'start': '1', 'length':'10','orderNo':searchText,'timeType':'N','userNo':user.obj.userNo,
                'enterpriseText':user.obj.logisticNo, 'ownerText':user.obj.ownerNo ,'custText':user.obj.custNo,
                'userType':user.obj.userType }, true), true);
        }else{
            setCacheData("searchFilter", mergeJson(JSON.parse(localStorage.getItem("searchFilter")),
            {'start': '1', 'length':'10','orderNo':searchText,'timeType':'N'}, true), true);

        }
        $('#orderlist_ul').empty();
     //   mainScroll.scrollToTop(100);
    }else{
        $.ui.unblockUI();
        $.ui.hideMask();
        errorPopup('请输入搜索条件');
    }
    }catch(e){
        errorPopup(e.mes);
    }
}

function setRounteListCache(){
    $('#searchHistory').show();
    var searchValue = $('#searchText').val();
    var arr_v = [];
    arr_v = JSON.parse( localStorage.getItem('routeList') );
    if( searchValue != null && searchValue != ''){
    if (null!=arr_v) {
        if (arr_v.contains(searchValue)) {
            ////alert("1");
            //arr_v = JSON.parse(localStorage.getItem('routeList'));
            ;
        } else {
            arr_v = JSON.parse(localStorage.getItem('routeList'));
            arr_v.push(searchValue);
            if (arr_v.length > 5) {
                arr_v.remove(0);
            }
        }
    } else {
        arr_v = new Array();
        arr_v.push(searchValue);
    }
    localStorage.setItem('routeList',JSON.stringify( arr_v ) );
    }
}


function updateOrderlistPanel(data,flag){
    var prependFlag = arguments[1] ? arguments[1] : false;
    var oldmyFilter = JSON.parse(localStorage.getItem("searchFilter"));

    var containNode = $("<div class='orderNode'></div>");
    var nullTrace = "<div align='center' style='margin: 10px;'>查无订单...</div>";
    if(data.isSucc) {
        var result = '';

        if(flag){$("#orderlist_ul").empty();}
        var traceFuc = '';
        if (data.obj.recordsTotal >= 1 ){
            if ( lastPage == 'search') {
                $("#orderlistHeaderId").attr('onclick',"$.ui.loadContent('#search', false, false, 'slide')");
            } else if ( lastPage == 'orderBoard'){
                $("#orderlistHeaderId").attr('onclick',"$.ui.loadContent('#orderBoard', false, false, 'slide')");
            } else if ( lastPage == 'home2'){
                $("#orderlistHeaderId").attr('onclick',"$.ui.loadContent('#home2', false, false, 'slide')");

            }
            setRounteListCache();
            if (data.obj.data.length > 1) {
            //   $("#orderdetailBackId").attr('onclick',"$.ui.loadContent('#orderlist', false, false, 'slide')");
            //  $("#orderlistHeaderId").attr('onclick',"$.ui.loadContent('#search', false, false, 'slide')");
                $.ui.loadContent("#orderlist", false, false, "slide");
//            if(localStorage.getItem('e_user')==null){
//                $('#orderlist').attr('data-header','home2Header');
//            }else{
//                $('#orderlist').attr('data-header','orderlistHeader');
//            }
            //for (var k in data.obj.data) {
            $.ui.showMask("我们正在拼命的加载数据...");
            var result = template('orderListTemp',data);

        } else if (data.obj.recordsTotal == 1) {
            setCacheData("currentorder", data.obj[0], 1);
            if( loginStatus==0 || loginStatus== '0' ){
                setCacheData("currentorder",data.obj.data[0] ,1);
               // JSON.stringify(data.obj.data[k])
                traceSingleInfo();
            }else{
                //$("#orderdetailBackId").attr('onclick',"$.ui.loadContent('#orderlist', false, false, 'slide')");
                setCacheData("currentorder",data.obj.data[0] ,1);
                traceSingleInfo33();
            }
        } else {
            //result = nullTrace;
        }
        if(flag){


            $("#orderlist_ul").append(result);
        }else {
            if (data.obj.data.length < (oldmyFilter.length -= 0)) {
                if($("#nullOrderListSelf").length>0){
                    $("#orderlist_ul").append(result);
                }else{
                    $("#orderlist_ul").append(result);
                  //  $("#orderlist_ul").removeChild($('#nullOrderListSelf'))
                  //  $('#nullOrderListSelf').empty();
               /* $("<div id='nullOrderListSelf' class='nullOrder'>" +
                "<p style='text-align: center;text-color:orange;'>暂无剩余订单..</p>" +
                "</div>").appendTo(orderlist_ul);*/
                }
            }else{
                $("#orderlist_ul").append(result);
            }
        }
    }else{
            if( lastPage == 'search' ){
                errorPopup('查无订单');
            }

    }
    }else{
        errorPopup(data.msg);
    }

    mainLoaded();

    if(scrollFlag == 0){
        mainScroll.scrollTo(0,0,1000);
    }
    scrollFlag =1;

    mainPullUpEl['class'] = mainPullDownEl.attr('class');
    mainPullUpEl.attr('class','').hide();
    mainPullDownEl.attr('class','').hide();
    mainScroll.refresh();
    mainLoadingStep = 0;
    $.ui.unblockUI();
    $.ui.hideMask();

}

//点击订单列表事件
function querySingleOrder(enterpriseNo,systemNo,orderNo,dispatchNo){


    //var enterpriseNo = getEnterpriseNo();
    getAjax(querySingleOrderUrl, {'orderEnterpriseNo': enterpriseNo, 'systemNo':systemNo,
            'orderNo':orderNo,'dispatchNo':dispatchNo },
        "querySingleOrderSuc(data)", "errorPopup('网络请求超时,请检查网络后再尝试..')");

}

function querySingleOrderSuc(data){
    if( lastPage == 'custboard'){
        ;
    }else{
        lastPage = 'orderlist';
    }
    localStorage.setItem("currentorder",  JSON.stringify(data.obj)  );
    if(loginStatus == 0) {
        traceSingleInfo();
    }else {
        traceSingleInfo33();
    }
}

   function showstatus(status){
       if(status=='10'){
           return '下单';
       }else if(status=='20'){
           return '调度';
       }else if(status=='30'){
           return '备货';
       }else if(status=='40'){
           return '提货';
       }else if(status=='50'){
           return '装车';
       }else if(status=='60'){
           return '发运';
       }else if(status=='70'){
           return '在途';
       }else if(status=='80'){
           return '交接';
       }else if(status=='90'){
           return '签收';
       }else {
           return status;
       }
   }
    /*setCacheData("searchFilter", mergeJson(oldmyFilter, {'start': (oldmyFilter.start -= 0) +
        data.obj.data.length, 'queryDate': data.obj.queryDate}, true), true);*/






function getOrderListPullToRefresh(that){
    setCacheData("searchFilter",mergeJson(JSON.parse(localStorage.getItem("searchFilter")),
        {'queryType':'1','enterpriseNo':getEnterpriseNo(),'start':1},true),true);
    if( searchFlag == 0){
        searchUrls = baseUrl +"order/query_suborderlist.action";
    }else if( searchFlag == 1){
        searchUrls = baseUrl + "order/queryIndexOrderList.action";
    }else{
        searchUrls = searchUrl;
    }
    jQuery.ajax({
        url: searchUrls,
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
                            updateOrderlistPanel(data,true);
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
                //that.hideRefresh();
                mainPullDownEl.attr('class','').hide();
                mainScroll.refresh();
                mainLoadingStep = 0;
            }, 1000);
        });
}


function getRequestFromOrderListinite(self) {
    var searchFilter =  JSON.parse(localStorage.getItem("searchFilter"));
    var start = '';
//    if(searchFilter.start == '1'){
//        start = parseInt(searchFilter.start) + 10;
//    } else {
//        start = parseInt(searchFilter.start) + 10;
//    }
    start = parseInt(searchFilter.start) + 10;
    setCacheData("searchFilter",mergeJson(JSON.parse(localStorage.getItem("searchFilter")),
        {'queryType':'1','enterpriseNo':getEnterpriseNo(),'start':start},true),true);
    if( searchFlag == 0){
        searchUrls = baseUrl +"order/query_suborderlist.action";
    }else if( searchFlag == 1){
        searchUrls = baseUrl + "order/queryIndexOrderList.action";
    }else{
        searchUrls = searchUrl;
    }
    jQuery.ajax({
        url: searchUrls,
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
//                        $(self.el).find("#infinite").remove();
//                        self.clearInfinite();
                        mainPullUpEl.removeClass('loading');
                     //   mainPullUpL.html("<h2 style='color: #F6842B;margin:0px;padding:0px;'>暂无新订单</h2>");
                       // mainPullUpEl.html("<h2 style='color: #F6842B;margin:0px;padding:0px;'>暂无新订单</h2>");
                        updateOrderlistPanel(data);
                    }catch(e){
                    };
                }
            }
        }).fail(function () {
        }).always(function () {
            //ajaxFlag=true;
            mainLoadingStep = 0;
            ajaxFlag = true;
        });

}


function searchOrderFromIndex(type,count){
    if(count == '0' || count == 0){
        return;
    }
    scrollFlag = 0;
    searchFlag = 1;
    $('#orderlist_ul').empty();
    $.ui.blockUI(.3);
    $.ui.showMask("获取查询的订单..");
    lastPage='home2';
    var user = JSON.parse(localStorage.getItem('e_user'));
    getAjax(searchOrderFromIndexUrl,{'start': '1', 'length':'10','type':type,'enterpriseno':user.obj.logisticNo,
        'ownerNo':user.obj.ownerNo, 'custNo':user.obj.custNo},'updateOrderlistPanel(data)','errorPopup("网络异常")');

    $("#orderlistHeaderId").attr('onclick',
        "$.ui.loadContent('#home2', false, false, 'slide')");
    $('#orderdetailBackId').attr('onclick',"$.ui.loadContent('#home2', false, false, 'slide')");
   /* $("#orderdetailBackId").attr('onclick',
        "$.ui.loadContent('#search', false, false, 'slide')");*/

    if( user!=null ){
        setCacheData("searchFilter", mergeJson(JSON.parse(localStorage.getItem("searchFilter")),
            {'start': '1', 'length':'10','type':type,'enterpriseno':user.obj.logisticNo,
                'ownerNo':user.obj.ownerNo, 'custNo':user.obj.custNo,'userNo':user.obj.userNo,
                'userType':user.obj.userType }, true), true);
    }else {
        setCacheData("searchFilter", mergeJson(JSON.parse(localStorage.getItem("searchFilter")),
            {'start': '1', 'length': '10', 'type': type, 'enterpriseno': user.obj.logisticNo,
                'ownerNo': user.obj.ownerNo, 'custNo': user.obj.custNo}, true), true);
    }

}

function updateIndexOrderlistPanel(){

}