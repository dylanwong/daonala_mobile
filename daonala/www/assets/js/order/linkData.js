function linkData(elm){

    var arry = new Array();
    arry[0] = "a1";// {"name":"h1","value":"1000000"};
    arry[1] ="b1";// {"name":"a1","value":"1000000"};
    arry[2] = "c1";//{"name":"b1","value":"1000000"};
    arry[3] = "add1";//{"name":"天1","value":"1000000"};
    arry[4] ="azz1";// {"name":"地1","value":"1000000"};
    arry[5] = "azff1";//{"name":"会1","value":"1000000"};

    $('#linkSelect').empty();
    var options = '';
    var inputText = $('#linkDataName').val();
    if (inputText != "" && inputText != null) {
        for (var k = 0; k < arry.length; k++) {
            if (arry[k].toLowerCase().indexOf(inputText) >= 0) {
                options+='<option value="'+arry[k]+'">'+arry[k]+'</option>';
            }

        }
    }
    $('#linkSelect').append(options);
    //$("#linkSelect").children("option").show();
  //  $("#linkSelect").click();
    $("#linkSelect").children("option").each(function(){
        $(this).css("display","block");
    });
}
function linkSource(products){
    $.fn.typeahead.Constructor.prototype.blur = function() {
        var that = this;
        setTimeout(function () { that.hide() }, 250);
    };

//    $('#product_search').typeahead({
//        source: function(query, process) {
//        return ["货主无1", "货主无1", "货主大无1"];
//    }
//    });
    var that = this;
    $('#product_search').typeahead({

        source: function (query, process) {
            $('#product').hide();
            var results = _.map(products, function (product) {
                return product.id+"";
            });
            process(results);
        },
        highlighter: function (id) {
            var product = _.find(products, function (p) {
                //$('#product_search').attr('productid',p.id);
                return p.id == id;
            });

            return product.name;

//            $('#product_search').attr('productid',item.split('|')[1]);
//            return product.name;
        },
        updater: function (id) {
//            console.log("----" + item.split('|')[0] + "-----");
//            return item.split('|')[0];
            var product = _.find(products, function (p) {
                return p.id == id;
            });
            that.setSelectedProduct(product);
            return product.name;
        }

    });
    $('#product').hide();
    this.setSelectedProduct = function (product) {
        $('#product_search').attr('productid',product.id);
        $('#product').html("Purchase: <strong>" + product.name +"</strong>").show();
    }
}
