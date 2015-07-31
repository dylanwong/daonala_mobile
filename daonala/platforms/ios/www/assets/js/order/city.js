/**
 * Created by 翔 on 2015/3/4.
 */

var sel_city_province;
var sel_city_city;
var sel_city_element_id;
//var confirmProvinceCode;
//var confirmCityCode;
//var confirmZoneCode;
var sel_addr;
//var ownerAddr = '';
var queryAddrUrl = baseUrl + 'order/queryAddr.action';

function select_city_panel(elementId)
{
    sel_city_element_id = elementId;
    init_provices();
    $.ui.loadContent("#provinces", false, false, "slide");
}
function select_Ccity_panel(elementId)
{
    sel_city_element_id = elementId;
    init_Cprovices();
    $.ui.loadContent("#provinces", false, false, "slide");
}
function init_provices(){
    sel_addr='';
    var option = {
        parentId : '',
        type :'0'
    };
    var province = JSON.parse( localStorage.getItem("provice") );
    if( province == null ){
        getAjax(queryAddrUrl,option,"init_provices_suc(data)", "errorPopup('网络请求超时,请检查网络后再尝试..')");
    }else{
        init_provices_suc(province);
    }
}
function init_city(elm){
    localStorage.setItem('confirmProvince',$(elm).attr('provinceName') );
    var provinceName = $(elm).attr('provinceName');
    sel_addr=provinceName;
    var option = {
        parentId : $(elm).attr('province'),
        type :'1'
    };
    getAjax(queryAddrUrl,option,"init_city_suc(data)", "errorPopup('网络请求超时,请检查网络后再尝试..')");
}
function init_zone(elm){
    localStorage.setItem('confirmCity',$(elm).attr('cityName') );
    var cityName = $(elm).attr('cityName');
    sel_addr += cityName;
    var option = {
        parentId : $(elm).attr('city'),
        type :'2'
    };
    getAjax(queryAddrUrl,option,"init_zone_suc(data)", "errorPopup('网络请求超时,请检查网络后再尝试..')");
}

function init_provices_suc(datas){
    if( datas.isSucc ){

        $('#provice_list').empty();
        var data = datas.obj;
        var city_list = '';
        for( var i = 0,len = datas.obj.length; i < len; i++  ){
            city_list += "<li><a href='javascript:;' city='' " +
            "province='"+datas.obj[i].codeId+"'  provinceName='"+datas.obj[i].cityName+"'" +
            " onclick='init_city(this)' >" +
            "<span class='icon-head'>&nbsp;</span>"+datas.obj[i].cityName+"</a>"
        }
        $('#provice_list').html(city_list);
    }else{
        $('#provice_list').html('数据错误！');
    }
}
function init_city_suc(datas){
    if( datas.isSucc ){
        $.ui.loadContent("#citys", false, false, "slide");
        $('#city_list').empty();
        var data = datas.obj;
        var city_list = '';
        for( var i = 0,len = datas.obj.length; i < len; i++  ){
            city_list += "<li><a href='javascript:;' city='"+datas.obj[i].codeId+"' " +
                "cityName='"+datas.obj[i].cityName+"'  province='' onclick='init_zone(this)' >" +
                "<span class='icon-head'>&nbsp;</span>"+datas.obj[i].cityName+"</a>"
        }
        $('#city_list').html(city_list);
    }else{
        $('#city_list').html('数据错误！');
    }
}
function init_zone_suc(datas){
    if(datas.isSucc){
        $.ui.loadContent("#zones", false, false, "slide");
        $('#zone_list').empty();
        var data = datas.obj;
        var city_list = '';
        for( var i = 0,len = datas.obj.length; i < len; i++   ){
            city_list += "<li><a href='javascript:;' zone='"+datas.obj[i].codeId+"' city='' " +
                "zoneName='"+datas.obj[i].cityName+"' province='' onclick='confirm_addr(this)' >" +
                "<span class='icon-head'>&nbsp;</span>"+datas.obj[i].cityName+"</a>"
        }
        $('#zone_list').html(city_list);
    }else{
        $('#zone_list').html('数据错误！');
    }
}

function confirm_addr(elm){
    localStorage.setItem('confirmZone',$(elm).attr('zoneName') );
    var zoneName = $(elm).attr('zoneName');
    sel_addr +=zoneName;
    $('#o_provice').val(sel_addr);
    $.ui.goBack(-3);
}



//**********************


function init_Cprovices(){
    sel_Caddr='';
    var option = {
        parentId : '',
        type :'0'
    };
    var province = JSON.parse( localStorage.getItem("provice") );
    if( province == null ){
        getAjax(queryAddrUrl,option,"init_Cprovices_suc(data)", "errorPopup('网络请求超时,请检查网络后再尝试..')");
    }else{
        init_provices_suc(province);
    }
}
function init_Cprovices_suc(datas){
    if( datas.isSucc ){

        $('#provice_list').empty();
        var data = datas.obj;
        var city_list = '';
        for( var i = 0,len = datas.obj.length; i < len; i++   ){
            city_list += "<li><a href='javascript:;' Ccity='' " +
                "Cprovince='"+datas.obj[i].codeId+"'  CprovinceName='"+datas.obj[i].cityName+"'" +
                " onclick='init_Ccity(this)' >" +
                "<span class='icon-head'>&nbsp;</span>"+datas.obj[i].cityName+"</a>"
        }
        $('#provice_list').html(city_list);
    }else{
        $('#provice_list').html('数据错误！');
    }
}
function init_Ccity(elm){
    localStorage.setItem('confirmCProvince',$(elm).attr('CprovinceName') );
    var provinceName = $(elm).attr('CprovinceName');
    sel_Caddr=provinceName;
    var option = {
        parentId : $(elm).attr('Cprovince'),
        type :'1'
    };
    getAjax(queryAddrUrl,option,"init_Ccity_suc(data)", "errorPopup('网络请求超时,请检查网络后再尝试..')");
}
function init_Ccity_suc(datas){
    if( datas.isSucc ){
        $.ui.loadContent("#citys", false, false, "slide");
        $('#city_list').empty();
        var data = datas.obj;
        var city_list = '';
        for( var i = 0,len = datas.obj.length; i < len; i++   ){
            city_list += "<li><a href='javascript:;' Ccity='"+datas.obj[i].codeId+"' " +
                "CcityName='"+datas.obj[i].cityName+"'  Cprovince='' onclick='init_Czone(this)' >" +
                "<span class='icon-head'>&nbsp;</span>"+datas.obj[i].cityName+"</a>"
        }
        $('#city_list').html(city_list);
    }else{
        $('#city_list').html('数据错误！');
    }
}
function init_Czone(elm){
    localStorage.setItem('confirmCCity',$(elm).attr('CcityName') );
    var cityName = $(elm).attr('CcityName');
    sel_Caddr += cityName;
    var option = {
        parentId : $(elm).attr('Ccity'),
        type :'2'
    };
    getAjax(queryAddrUrl,option,"init_Czone_suc(data)", "errorPopup('网络请求超时,请检查网络后再尝试..')");
}
function init_Czone_suc(datas){
    if(datas.isSucc){
        $.ui.loadContent("#zones", false, false, "slide");
        $('#zone_list').empty();
        var data = datas.obj;
        var city_list = '';
        for( var i = 0,len = datas.obj.length; i < len; i++   ){
            city_list += "<li><a href='javascript:;' Czone='"+datas.obj[i].codeId+"' Ccity='' " +
                "CzoneName='"+datas.obj[i].cityName+"' Cprovince='' onclick='confirm_Caddr(this)' >" +
                "<span class='icon-head'>&nbsp;</span>"+datas.obj[i].cityName+"</a>"
        }
        $('#zone_list').html(city_list);
    }else{
        $('#zone_list').html('数据错误！');
    }
}

function confirm_Caddr(elm){
    localStorage.setItem('confirmCZone',$(elm).attr('CzoneName') );
    var zoneName = $(elm).attr('CzoneName');
    sel_Caddr +=zoneName;
    $('#c_provice').val(sel_Caddr);
    $.ui.goBack(-3);
}
function select_provinces(element)
{
//    sel_city_province = $(element).attr('title');
//    citys = $(element).attr('citys').split(",");
//    var city_list = "";
//    for(var i = 0 ; i < citys.length ; i++)
//    {
//        city_list += "<li><a href='javascript:;' city='"+citys[i]+"' " +
//            "province='"+sel_city_province+"' onclick='select_city(this)' >" +
//            "<span class='icon-head'>&nbsp;</span>"+citys[i]+"</a>"
//    }
//    $("#city_list").html(city_list);
//    $.ui.loadContent("#citys", false, false, "slide");

    sel_city_province = $(element).attr('title');
    citys = $(element).attr('citys').split(",");
    var city_list = "";
    for(var i = 0 ; i < citys.length ; i++)
    {
        city_list += "<li><a href='javascript:;' city='"+citys[i]+"' " +
            "province='"+sel_city_province+"' onclick='select_city(this)' >" +
            "<span class='icon-head'>&nbsp;</span>"+citys[i]+"</a>"
    }
    $("#city_list").html(city_list);
    $.ui.loadContent("#citys", false, false, "slide");
}

function select_city(element)
{
    sel_city_province = $(element).attr('province');
    sel_city_city = $(element).attr('city');

    if($("#"+sel_city_element_id)[0].tagName == 'SPAN')
    {
        $("#"+sel_city_element_id).html(sel_city_province.trim() + " " + sel_city_city.trim());
    }else
    {
        $("#"+sel_city_element_id).val(sel_city_province.trim() + " " + sel_city_city.trim());
    }
    $.ui.goBack(-2);
}