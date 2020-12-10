
$( function () { 
    function load() {
        var data = get();
        $.each( data, function ( index, item ) {
            $( ".car-body" ).append( `
            <div class="cart-item clear_fix" id="${item.id}">
                <div class="col-xs-1 c-ci-check">
                <label class="control-label">
                    <input type="checkbox"  class="j-checkbox">&nbsp;&nbsp;&nbsp;&nbsp; 
                </label> 
            </div>
            <div class="col-xs-5 c-ci-title">
                <div class="col-xs-3">
                    <img class="img-thumbnail" src="${item.img_url}">
                </div>
                <div class="col-xs-9">
                    <h5><a href="#">${item.title}</a></h5>
                    <p class="brief" style="margin-bottom:0;">${item.name}</p> 
                </div> 
            </div>
            <div class="col-xs-1 c-ci-price">${item.new_price}</div>
            <div class="col-xs-2 c-ci-quantity clear_fix">
                <div class="product-quantity input-group">
                    <div class="spinner-buttons">
                        <button type="button" class="de-btn">-</button> 
                    </div> 
                    <input type="text" class="spinner-input" value = "1" readonly="readonly">
                    <div class="spinner-buttons">
                        <button  class="in-btn">+</button> 
                    </div> 
                </div> 
            </div> 
            <div class="col-xs-1 c-ci-amount">
                <strong >${item.new_price}</strong> 
            </div> 
            <div class="col-xs-2 c-ci-opt">
                <ul class="list-incar">
                    <li><a href="javascript:;" class="btn btn-link btn-xs">删除</a></li>
                    <li><a href="javascript:;" class="btn btn-link btn-xs">移到收藏夹</a></li>
                </ul> 
            </div> 
        </div>` )
        } )
        // $( ".car-body" ).append( html );
    }
    load();
    //全选
    $( ".checkall" ).change( function () { 
        $( ".j-checkbox,.checkall" ).prop( "checked", $( this ).prop( "checked" ) );
        // if ( $( this ).prop( "checked" ) ) { 
        //     $(this).pa
        // }
        getSum();
    } )
    //单选反选
    $( ".j-checkbox" ).change( function () { 
        if ( $( ".j-checkbox:checked" ).length === $( ".j-checkbox" ).length ) {
            $( ".checkall" ).prop( "checked", true );
        } else { 
            $( ".checkall" ).prop( "checked", false );
        }
        getSum();
    } )
    //加按钮功能
    $( ".in-btn" ).on( "click", function () { 
        var count = $( this ).parents( ".spinner-buttons" ).siblings( ".spinner-input" ).val();
        count++;
        $( this ).parents( ".spinner-buttons" ).siblings( ".spinner-input" ).val( count );
        var item_sum = ( $( this ).parents( ".c-ci-quantity" ).siblings( ".c-ci-price" ).html() ).substr( 1 ) * count;
        $( this ).parents( ".c-ci-quantity" ).siblings( ".c-ci-amount" ).children( "strong" ).text( "￥"+item_sum.toFixed( 2 ) );
        if ( $( this ).parents( ".c-ci-quantity" ).siblings( ".c-ci-check" ).children( ".j-checkbox:checked" ) ) { 
            getSum();
        }

    } )
    //减按钮功能
    $( ".de-btn" ).on( "click", function () { 
        var count = $( this ).parents( ".spinner-buttons" ).siblings( ".spinner-input" ).val();
        if ( count <= 1 ) {
            return;
        } else { 
            count--;
            $( this ).parents( ".spinner-buttons" ).siblings( ".spinner-input" ).val( count );
            var item_sum = ( $( this ).parents( ".c-ci-quantity" ).siblings( ".c-ci-price" ).html() ).substr( 1 ) * count;
            $( this ).parents( ".c-ci-quantity" ).siblings( ".c-ci-amount" ).children( "strong" ).text("￥"+item_sum.toFixed( 2 ) );
        }
        if ( $( this ).parents( ".c-ci-quantity" ).siblings( ".c-ci-check" ).children( ".j-checkbox:checked" ) ) {
            getSum();
        }
    } )
    if ( $( this ).parents( ".c-ci-quantity" ).siblings( ".c-ci-check" ).children( ".j-checkbox:checked" ) ) {
        getSum();
    }
    //件数和钱数求和
    function getSum () { 
        var count = 0;
        var money = 0;
        $( ".j-checkbox:checked" ).parents( ".c-ci-check" ).siblings( ".c-ci-quantity" ).children( ".product-quantity" ).children( ".spinner-input" ).each( function ( i, ele ) {
            count += parseInt( $( ele ).val() );
        } );
        $( ".goods_count" ).text( count );

        $( ".j-checkbox:checked" ).parents( ".c-ci-check" ).siblings( ".c-ci-amount" ).children( "strong" ).each( function ( i, ele ) {
            money += parseFloat( $( ele ).text().substr(1));
        } );
        $( ".text-danger" ).text( "￥" + money.toFixed( 2 ) );
    }
getSum()
    //删除单条商品
    $( ".btn-xs" ).on( "click", function () {      
        var data = get();
        var index = $( this ).parents( ".cart-item" ).attr( "id" );
        console.log( index );
        delete ( data[ index ] );
        save( data );
        console.log( data );
        $( this ).parents( ".cart-item" ).remove();
        getSum();  
        numCart();
    } )

    //删除选中商品
    $( ".btn-link" ).on( "click", function () { 
        var data = get();
        $( ".j-checkbox:checked" ).parents( ".cart-item" ).each( function ( index, item ) {
            console.log( index );
            var i = $( item ).attr( "id" );
            delete (data[i])
            save( data );
        })
        $( ".j-checkbox:checked" ).parents( ".cart-item" ).remove();
        getSum();
        numCart()
    } )

    //清空购物车
    $( ".btn-clear" ).on( "click", function () { 
        localStorage.clear();
        $( ".cart-item" ).remove();
        numCart();
    } )

    function numCart() {
        var data = get();
        var data_list = [];
        for ( attr in data ) {
            data_list.push( attr );
        }
        $( ".iconImg span" ).text( data_list.length );
    }
    numCart();
})