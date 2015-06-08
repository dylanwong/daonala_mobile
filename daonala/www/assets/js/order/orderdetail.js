/**
 * Created by 翔 on 2015/6/5.
 */
/**
 *
 */
function init_orderdetail()
{
    $("#orderdetail-buttons").delegate('button','click',function()
    {
        var target = $($("#orderdetail-buttons").find(".selectTotalDay")[0]).attr('target');
        $($("#orderdetail-buttons").find(".selectTotalDay")[0]).removeClass('selectTotalDay');
        $("#"+target).hide();
        $(this).addClass('selectTotalDay');
        $("#"+$(this).attr('target')).fadeIn(300);
    })
}