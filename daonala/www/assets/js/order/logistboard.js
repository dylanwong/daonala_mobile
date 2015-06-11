/**
 * Created by zhouhuan on 2015-06-10.
 */

function initLogisticBoard(){
    var option ={
        enterpriseText : $('#subCompany').attr('value'),
        ownerText : $('#boardOwner').val(),
        custText : '',
     //   userNo : '',
        userType : '0'
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

        $("#allCount_1").html(
             parseInt(list1[0].countNumber)
            +parseInt(list1[1].countNumber)
            +parseInt(list1[2].countNumber)
            +parseInt(list1[3].countNumber));
        $("#allCount_7").html(
                parseInt(list2[0].countNumber)
                +parseInt(list2[1].countNumber)
                +parseInt(list2[2].countNumber)
                +parseInt(list2[3].countNumber));
        $("#allCount_30").html(
                parseInt(list3[0].countNumber)
                +parseInt(list3[1].countNumber)
                +parseInt(list3[2].countNumber)
                +parseInt(list3[3].countNumber));

        $("#count_status10_1").html(list1[0].countNumber);
        $("#count_status40_1").html(list1[1].countNumber);
        $("#count_status70_1").html(list1[2].countNumber);
        $("#count_status90_1").html(list1[3].countNumber);

        $("#count_status10_7").html(list2[0].countNumber);
        $("#count_status40_7").html(list2[1].countNumber);
        $("#count_status70_7").html(list2[2].countNumber);
        $("#count_status90_7").html(list2[3].countNumber);

        $("#count_status10_30").html(list3[0].countNumber);
        $("#count_status40_30").html(list3[1].countNumber);
        $("#count_status70_30").html(list3[2].countNumber);
        $("#count_status90_30").html(list3[3].countNumber);

    } else {

    }
    $.ui.loadContent("#logisticboard", false, false, "slide");
}

function init_orderboard() {
    $("#orderboard-buttons").delegate('button', 'click', function () {
        var target = $($("#orderboard-buttons").find(".selectTotalDay")[0]).attr('target');
        $($("#orderboard-buttons").find(".selectTotalDay")[0]).removeClass('selectTotalDay');
        $("#" + target).hide();
        $(this).addClass('selectTotalDay');
        $("#" + $(this).attr('target')).fadeIn(300);
    });
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
            'ownerText':'','custText':'','userNo':getUserNo()}, true), true);

}
