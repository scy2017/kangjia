$( function () {
    $( ".site-advertising" ).show();
    //轮播图
    var now_index = 0;
    $( ".arrow-r" ).on( "click", arrow_r );
    function arrow_r () {
        var effect = "normal";
        if ( now_index === $( ".item" ).length - 1 ) {
            now_index = 0;
            effect = "change";
        } else {
            now_index++;
        }
        bannerChange( effect, "arrow-r" );
        
    }
    $( ".banner-cont" ).on( "mouseenter", function () {
        clearInterval( t );
    } );
    $( ".banner-cont" ).on( "mouseleave", function () {
        t = setInterval( function () {
            arrow_r();
        }, 4000 );
    } );
    $( ".arrow-l" ).on( "click", function () {
        var effect = "normal";
        if ( now_index == 0 ) {
            now_index = $( ".item" ).length - 1;
            effect = "change";
        } else {
            now_index--;
        }
        bannerChange( effect, "arrow-l" );
    } );
    function bannerChange ( effect, type ) {
        $( ".circle li" ).each( function ( i, ele ) {
            $( ele ).removeClass( "active" );
        } );
        if ( effect == "change" ) {
            clearInterval( $( ".slide-inner" ).t );
            $( ".slide-inner" ).css( {
                left: -now_index * $( ".banner-cont" ).width()
            } );
            if ( type == "arrow-r" ) {
                now_index++;
            } else {
                now_index--;
            }
            bannerChange( "normal" );
        } else {
            $( ".slide-inner" ).stop( true );
            $( ".slide-inner" ).animate( {
                left: -now_index * $( ".banner-cont" ).width()
            } );
        }
        $( ".circle li" ).eq( now_index ).addClass( "active" );
        if ( now_index === 5 ) {
            $( ".circle li" ).eq( 0 ).addClass( "active" );
        }
    }
    for ( var i = 0; i < $( ".item" ).length; i++ ) {
        var $li = '<li></li>';
        $( ".circle" ).append( $li );
        $( ".circle li" ).eq( 0 ).addClass( "active" );
        $( ".circle li" ).on( "click", function () {
            var n = $( this ).index();
            $( this ).addClass( "active" ).siblings( "li" ).removeClass( "active" );
            $( ".slide-inner" ).stop().animate( {
                left: -n * $( ".banner-cont" ).width()
            } );
        } );
    }
    //  console.log( $( ".item" ).eq( 0 ).width() );
    $( ".slide-inner" ).append( $( ".item" ).eq( 0 ).clone( true ) );
    $( ".slide-inner" ).css( {
        width: $( ".item" ).length * $( ".banner-cont" ).width()
        
    } );
    var t = setInterval( function () {
        arrow_r();
    }, 4000 );
   
   

    //渲染数据
    var list;
    var shopcart = get();
        
    let arr = [ ".television-box", ".fridge-box", ".washer-box", ".electric-box", ".kitchen-box", ".hardware-box", ".house-box", ".mini-box" ];
    for ( let i = 0; i < 8; i++ ) {
        $.ajax( "./data.json", {
            dataType: "json"
        } ).then( function ( res ) {
            list = res;
            render( list, arr[ i ], i );
        } );
    }
    eventBind( ".list-inner" );
    //点击加入购物车
    
    function render ( list, ele, type ) {
        // console.log(type);
        var html = list.dataList[ type ].columnList.map( function ( item, index ) {
            return `
                <div class="list-render" >
                    <div class = "star-products1"></div>
                    <div class = "figure" >
                        <a><img class="lazyload"
                        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604557023811&di=324efac318e92598584c4f8aafc42e25&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fc89c082a7a5d667bc1539e47ffbea891e5fe15814ecf3-0AnT4F_fw658"
                        data-src="${ item.img_url }">
                        </a>
                    </div> 
                    <h4 class = "text-uppercase ellipsis"> ${ item.title }</h4> 
                    <div class = "figure-title ellipsis"> ${ item.name } </div> 
                    <p class = "price">${ item.new_price } <span class = "del">&nbsp;${ item.last_price } </span></p>
                    <div class = "setIn-car">
                        <a class = "setIn-car-btn" data-type=${ type } data-index=${ index } data-id=${ item.id }>加入购物车</a>
                    </div>
                </div>`;
        } ).join( "" );
        // console.log(html);
        $( ele ).append( html );

        lazyload();
    }

    function eventBind ( ele ) {
        $( ele ).children( ".list-box" ).on( "click", ".setIn-car-btn", function () {
            var id = $( this ).attr( "data-id" );
            var index = $( this ).attr( "data-index" );
            var type = $( this ).attr( "data-type" );
            // console.log(type);
            if ( shopcart[ id ] ) {
                list.dataList[ type ].columnList[ index ].count++;
            } else {
                list.dataList[ type ].columnList[ index ].count = 1;
                shopcart[ id ] = list.dataList[ type ].columnList[ index ];
            }
            save( shopcart );
            // console.log( shopcart );
            numCart();
        } );
    }
    remove( shopcart );
    //侧边二级导航
    $( ".categroy-item" ).on( "mouseenter", function () {
        $( this ).addClass( "current" ).siblings().removeClass( "current" );
        $( this ).children( ".children" ).show().parents( ".categroy-item" ).siblings().children( ".children" ).hide();
    } );
    $( ".categroy-item" ).on( "mouseleave", function () {
        $( ".categroy-item" ).removeClass( "current" );
        $( ".children" ).hide();
    } );

    //顶部二级导航
    $( ".col-xs-1" ).on( "mouseenter", function () {
        $( this ).children( ".item-children" ).show().parents( ".col-xs-1" ).siblings().children( ".item-children" ).hide();
    } );
    $( ".col-xs-1" ).on( "mouseleave", function () {
        $( ".item-children" ).hide();
    } );

    //楼梯
    var flag = true;
    var toolTop = $( ".list-inner" ).eq( 0 ).offset().top;
    toggleTool();
    function toggleTool () {
        if ( $( document ).scrollTop() >= toolTop ) {
            $( ".floor" ).fadeIn();
        } else {
            $( ".floor" ).fadeOut();
        }
    }
    $( window ).scroll( function () {
        toggleTool();
    } );
    $( ".floor  li" ).click( function () {
        flag = false;
        $( this ).children( "a" ).addClass( "bg-color" ).parents( "li" ).siblings().children( "a" ).removeClass( "bg-color" );
        var current = $( ".list-inner" ).eq( $( this ).index() ).offset().top;
        $( "body,html" ).stop().animate( {
            scrollTop: current
        }, function () {
            flag = true;
        } );
    } );

    //吸顶菜单
    $( window ).on( "scroll", function () {
        if ( $( document ).scrollTop() >= 170 ) {
            $( ".nav-top" ).css( {
                "position": "fixed",
                "top": "0"
            } );
        } else {
            $( ".nav-top" ).css( {
                position: "absolute",
                top: 40
            } );
        }
    } );
    
    //活动页
    $( ".site-advertising li" ).on( "click", function () {
        $( ".site-advertising" ).hide();
    } );
    

    //回到顶部
    $( window ).scroll( function () {
        if ( $( document ).scrollTop() >= 300 ) {
            $( "#the-top" ).css( {
                display: "inline-block"
            } );
        } else {
            $( "#the-top" ).css( {
                display: "none"
            } );
        }
    } );
    $( ".back-inner li" ).on( "mouseenter", function () {
        $( this ).children().children( ".icon" ).hide();
        $( this ).children().children( ".backShow" ).show();
        $( this ).children().children( ".backShow" ).css( {
            display: "inline-block"
        } );
    } );
    // console.log( $( ".back-inner li" ).length );
    $( ".back-inner li" ).on( "mouseleave", function () {
        $( ".icon" ).show();
        $( ".backShow" ).hide();
    } );
    
    $( "#the-top" ).on( "click", function () {
        $( "body,html" ).animate( {
            scrollTop: 0
        } );
    } );
    
    //cookie
    var username_cookie = $.cookie( "username" );
    if ( username_cookie ) {
        $( ".login" ).hide();
        $( ".logined" ).show();
        $( ".logined a" ).text( $.cookie( "username" ) );
    } else {
        $( ".login" ).show();
    }
    
    $( ".logined" ).on( "click", function () {
        $( ".unlogined" ).show();
    } );
    
    $( ".unlogined li" ).eq( 2 ).on( "click", function () {
        $( ".logined" ).hide();
        $.cookie( "username", "" );
        $( ".login" ).show();
    } );

    //小轮播
    $( ".arr-right" ).on( "click", function () {
        $( ".star-row" ).stop().animate( {
            left: -1140
        } );
    } );
    $( ".arr-left" ).on( "click", function () {
        $( ".star-row" ).stop().animate( {
            left: 0
        } );
    } );

    //首页购物车件数显示
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


      