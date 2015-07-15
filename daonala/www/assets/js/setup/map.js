/**
 * Created by 翔 on 2015/7/14.
 */
// 百度地图API功能
function init_map() {

    $("#containerMap").height($("#map").height());
    $("#containerMap").width($("#map").width());
    var map = new BMap.Map("containerMap");
    map.centerAndZoom(new BMap.Point(118.454, 32.955), 11);
    map.enableScrollWheelZoom();
    var beijingPosition=new BMap.Point(116.432045,39.910683),
        hangzhouPosition=new BMap.Point(120.129721,30.314429),
        xianPosition=new BMap.Point(114.3162,30.581084),
        taiwanPosition=new BMap.Point(113.950723,22.558888);
    var points = [beijingPosition,hangzhouPosition,xianPosition,taiwanPosition];

    var curve = new BMapLib.CurveLine(points,
        {strokeColor:"red", strokeWeight:3, strokeOpacity:0.5,strokeStyle:'solid'}); //创建弧线对象
    map.addOverlay(curve); //添加到地图中
    curve.enableEditing(); //开启编辑功能

    map.setViewport(points);//自动适应缩放级别

    var myIcon = new BMap.Icon("assets/img/car.png",
        new BMap.Size(56,34));
    var marker = new BMap.Marker(new BMap.Point(113.950723,22.558888),{icon:myIcon});  // 创建标注
    map.addOverlay(marker);               // 将标注添加到地图中
    marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
}