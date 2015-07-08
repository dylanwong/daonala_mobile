/**
 * Created by wyy on 2015-06-10.
 */
//初始化更精确查询页面（分公司初始化）
function initBoardSearchPage(){
    //initAutoData();
    $('#select_city').val('');
    $('#product_search').val('');
    if(getUserType() == 0){
        $('#product_search').attr('placeholder','请输入货主编号或名称模糊查询...');
    }else if(getUserType() == 1){
        $('#product_search').attr('placeholder','请输入客户编号或名称模糊查询...');
    }
    getAjax(searchSubCompanyUrl, {'enterpriseNo':getEnterpriseNo() ,'userType':getUserType()},
        "updateBoardSearchPage(data)", "errorPopup('网络请求超时,请检查网络后再尝试..')");//初始化分公司
    getAjax(searchOwnerOrCustUrl, {'enterpriseNo':getEnterpriseNo() ,'userType':getUserType()},
        "updateBoardSearchPage2(data)", "errorPopup('网络请求超时,请检查网络后再尝试..')");
        //linkSource();//初始化客户或货主
}

//确认精确查询条件
function confirmSearch(){
    var subcompany = $('#select_city').attr('selectid');
    var subcompanyName = $('#select_city').val();

    $('#subCompany').empty();
    $('#subCompany').append('<b class="">分公司：</b>'+subcompanyName);
    $('#subCompany').attr('value',subcompany);

    var owner = $('#product_search').attr('productid');
    var ownerName = $('#product_search').val();
    if(owner!=undefined){
    $('#boardowner').empty();
    var userType = JSON.parse(localStorage.getItem('user')).obj.userType;
    if(userType == 0) {
        $('#boardowner').append('<b>货&nbsp;&nbsp;&nbsp;主&nbsp;:</b>&nbsp;' + ownerName);
    }else if(userType == 1) {
        $('#boardowner').append('<b>客&nbsp;&nbsp;&nbsp;户&nbsp;:</b>&nbsp;' + ownerName);
    }
    $('#boardowner').attr('value',owner);
    }
    // var ownerOrCustText = $('#ownerText').val();
    initLogisticBoardAgain();
}

function updateBoardSearchPage(data){
    if(data.isSucc){
        var result = null;
        for( var i in data.obj){
            result += '<option value="'+data.obj[i].companyNo+'">'+data.obj[i].companyName+'</option>';
        }
        $('#select_city_panel').append(result);
    }
    jQuery('#select_city_panel').mobiscroll().select({
        theme: "android-ics light",     // Specify theme like: theme: 'ios' or omit setting to use default
        mode: "mixed",       // Specify scroller mode like: mode: 'mixed' or omit setting to use default
        display: "bottom", // Specify display mode like: display: 'bottom' or omit setting to use default
        lang: "zh"      ,  // Specify language like: lang: 'pl' or omit setting to use default
        onBeforeShow: function (html, inst) {
        },
        onShow: function () {
        },
        onClose: function () {
        },
        onCancel: function () {
        },
        onSelect: function (v, inst) {
            $("#select_city").val(v);
            $("#select_city").attr('selectid',inst.values);
        }
    });
}

function updateBoardSearchPage2(data){
    if(data.isSucc){
        var products = new Array();
        for( var k in data.obj ){
            var a ={
                "id": data.obj[k].enterpriseNo,
                "name": data.obj[k].enterpriseName
            };
            products.push(a);
        }
        linkSource(products);
    }

}

function init_orderboard() {
    $("#orderboard-buttons").delegate('button', 'click', function () {
        var target = $($("#orderboard-buttons").find(".selectTotalDay")[0]).attr('target');
        $($("#orderboard-buttons").find(".selectTotalDay")[0]).removeClass('selectTotalDay');
        $("#" + target).hide();
        $(this).addClass('selectTotalDay');
        $("#" + $(this).attr('target')).fadeIn(300)//show();//;

    });
}
//初始化物流/货主看板
function initLogisticBoard(){
    clearboard();
    var user =  JSON.parse( localStorage.getItem('user') );
    $('#subCompany').empty();
    $('#boardowner').empty();
    var option ={
        enterpriseNo : user.obj.enterpriseNo,
        ownerNo :'',
        subCompanyNo : '',
     //   userNo : '',
        userType : user.obj.userType
    }
    getAjax(ordercount,option,'queryLogisticCount_Result_Suc(data)');
}

function clearboard(){
    var target = $($("#orderboard-buttons").find(".selectTotalDay")[0]).attr('target');
    $($("#orderboard-buttons").find(".selectTotalDay")[0]).removeClass('selectTotalDay');
    $("#" + target).hide();
    $("#oneId").addClass('selectTotalDay');
    $("#" + $('#oneId').attr('target')).fadeIn(300);
}

function initLogisticBoardAgain(){
    var target = $($("#orderboard-buttons").find(".selectTotalDay")[0]).attr('target');
    $($("#orderboard-buttons").find(".selectTotalDay")[0]).removeClass('selectTotalDay');
    $("#" + target).hide();
    $("#oneId").addClass('selectTotalDay');
    $("#" + $('#oneId').attr('target')).fadeIn(300);

    var user =  JSON.parse( localStorage.getItem('user') );

    //$('#subCompany').attr('value',user.obj.enterpriseNo);
    //$('#subCompany').attr('value','');
    $('#boardOwner').text(user.obj.enterpriseName);
    // $('#boardOwner').text('');
    var option ={
        enterpriseNo : user.obj.enterpriseNo,
        subCompanyNo : $('#subCompany').attr('value'),
        ownerNo :$('#boardowner').attr('value'),
        userType : user.obj.userType
    }
    getAjax(ordercount,option,'queryLogisticCount_Result_Suc(data)');

}
function queryLogisticCount_Result_Suc(data) {

    if (data.isSucc) {

        var list3 = data.obj.list30;
        var list2 = data.obj.list7;
        var list1 = data.obj.list1;
        localStorage.setItem("list1", JSON.stringify(list1));
        localStorage.setItem("list7", JSON.stringify(list2));
        localStorage.setItem("list30", JSON.stringify(list3));


        var count1001 =  parseInt( list1[0].list[0].countNumber );
        var count4001 =
             parseInt(list1[1].list[0].countNumber)
            +parseInt(list1[1].list[1].countNumber)
            +parseInt(list1[1].list[2].countNumber)
            +parseInt(list1[1].list[3].countNumber)
            +parseInt(list1[1].list[4].countNumber);
        var count7001 =
             parseInt(list1[2].list[0].countNumber)
            +parseInt(list1[2].list[1].countNumber)
            +parseInt(list1[2].list[2].countNumber);
        var count9001 =  parseInt( list1[3].list[0].countNumber );

        var count1007 =  parseInt( list2[0].list[0].countNumber );
        var count4007 =
             parseInt(list2[1].list[0].countNumber)
            +parseInt(list2[1].list[1].countNumber)
            +parseInt(list2[1].list[2].countNumber)
            +parseInt(list2[1].list[3].countNumber)
            +parseInt(list2[1].list[4].countNumber);
        var count7007 =
             parseInt(list2[2].list[0].countNumber)
            +parseInt(list2[2].list[1].countNumber)
            +parseInt(list2[2].list[2].countNumber);
        var count9007 =  parseInt( list2[3].list[0].countNumber );

        var count1030 =  parseInt( list3[0].list[0].countNumber );
        var count4030 =
             parseInt(list3[1].list[0].countNumber)
            +parseInt(list3[1].list[1].countNumber)
            +parseInt(list3[1].list[2].countNumber)
            +parseInt(list3[1].list[3].countNumber)
            +parseInt(list3[1].list[4].countNumber);
        var count7030 =
             parseInt(list3[2].list[0].countNumber)
            +parseInt(list3[2].list[1].countNumber)
            +parseInt(list3[2].list[2].countNumber);
        var count9030 = parseInt( list3[3].list[0].countNumber );
        $("#count_status10_1").html(count1001);
        $("#count_status40_1").html(count4001);
        $("#count_status70_1").html(count7001);
        $("#count_status90_1").html(count9001);

        $("#count_status10_7").html(count1007);
        $("#count_status40_7").html(count4007);
        $("#count_status70_7").html(count7007);
        $("#count_status90_7").html(count9007);

        $("#count_status10_30").html(count1030);
        $("#count_status40_30").html(count4030);
        $("#count_status70_30").html(count7030);
        $("#count_status90_30").html(count9030);


        $("#allCount_1").html(count1001+count4001+count7001+count9001);
        $("#allCount_7").html(count1007+count4007+count7007+count9007);
        $("#allCount_30").html(count1030+count4030+count7030+count9030);
    } else {

    }
    $.ui.loadContent("#logisticboard", false, false, "slide");
}

function toggleBoardBtn(type) {

        var list1 ;
        if( type == '1' ){
            $('#one').addClass('selectTotalDay');
            $('#seven').removeClass('selectTotalDay');
            $('#thirty').removeClass('selectTotalDay');
            list1 = JSON.parse( localStorage.getItem('list1') );
            $("#one").fadeIn(300);
        }else if( type == '7'){
            $('#one').removeClass('selectTotalDay');
            $('#seven').addClass('selectTotalDay');
            $('#thirty').removeClass('selectTotalDay');
            list1 = JSON.parse( localStorage.getItem('list7') );
            $("#seven").fadeIn(300);
        }else if( type == '30' ){
            $('#one').removeClass('selectTotalDay');
            $('#seven').removeClass('selectTotalDay');
            $('#thirty').addClass('selectTotalDay');
            list1 = JSON.parse( localStorage.getItem('list30') );
            $("#thirty").fadeIn(300);
        }else{

        }
        $("#allCount").html(
            +parseInt(list1[0].countNumber)
            +parseInt(list1[1].countNumber)
            +parseInt(list1[2].countNumber)
            +parseInt(list1[3].countNumber));

    $("#count_status10").html( list1[0].countNumber );
    $("#count_status40").html( list1[1].countNumber );
    $("#count_status70").html( list1[2].countNumber );
    $("#count_status90").html( list1[3].countNumber );
   // $.ui.loadContent("#logisticboard", false, false, "slide");
}

function orderlist_panel(statustype){
    $.ui.blockUI(.3);
    $.ui.showMask("获取查询的订单..");
    $("ul#todoList").empty();
    var timeType = $('.selectTotalDay').val();
    if( statustype=='10' ) {
     //   timeType='0';
        status='10';
    }else if( statustype=='40' ){
     //   timeType='1';
        status='20,30,31,40,50';
    }else if( statustype=='50' ){
     //   timeType='2';
        status='60,70,80';
    }else if( statustype=='90' ){
      //  timeType='3';
        status='90';
    }else {
      //  timeType='N';
        status='';
    }
    $("#orderlistHeaderId").attr('onclick',"$.ui.loadContent('#logisticboard', false, false, 'slide')");

    /* setCacheData("searchFilter", mergeJson(JSON.parse(localStorage.getItem("searchFilter")),
     {'start': '1', 'length':'10', 'queryDate': '', 'status': ''}, true), true);*/
    var searchText = $('#searchText').val();
    if ( localStorage.getItem("user")==null ) {
        getAjax(searchUrl, {'start': '1', 'length':'10','orderNo':'','timeType':timeType,'status':status,'enterpriseText':'10001',
            'ownerText':'','custText':''},
            "updateOrderlistPanel(data)", "errorPopup('网络请求超时,请检查网络后再尝试..')");
        // getAjax(searchUrl,options,searchSuc(data),searchFail(data));
    } else {
        getAjax(searchUrl, {'start': '1', 'length':'10','orderNo':'','timeType':timeType,'status':status,'enterpriseText':'10001',
                'ownerText':'','custText':''},
            "updateOrderlistPanel(data)", "errorPopup('网络请求超时,请检查网络后再尝试..')");
    }

    setCacheData("searchFilter",mergeJson(JSON.parse(localStorage.getItem("searchFilter")),
        {'start': '1', 'length':'10','orderNo':'','timeType':timeType,'status':status,'enterpriseText':'10001',
            'ownerText':'','custText':'','userNo':getUserNo(),'userType':getUserTypeFromsession()}, true), true);
    $('#orderlist_ul').empty();
}
