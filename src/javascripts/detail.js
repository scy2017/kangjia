$( function () { 
    //放大镜

    $( ".manify" ).on( "mouseenter", function () {
        $( this ).children( "img" ).css( {
            width: 1112,
            height: 940,
            position: "absolute",
            top: -179.015,
            left: -92.2222
        } );
        $( ".manify" ).on( "mousemove", function ( e ) {
            var x = e.pageX - $( this ).offset().left;
            var y = e.pageY - $( this ).offset().top;
            $( this ).children( "img" ).css( {
                left: -x,
                top: -y
            } )
        } )
    } )
    $( ".manify" ).on( "mouseleave", function () {
        $( ".manify img" ).css( {
            width: 540,
            height: 540,
            position: "static"
        } )
    } )
    $( ".list-inline li" ).on( "mouseenter", function () {
        $( this ).addClass( "current" ).siblings().removeClass( "current" );
        $( ".manify img" ).attr( {
            src: $( ".zoomImg" ).eq( $( this ).index() ).attr( "src" )
        } )
    } );

    //省市区四级联动
    // $( '#target' ).citypicker( {
    //     province: '北京市',
    //     city: '昌平区',
    //     district: '沙河镇'
    // } );

    //详情信息tab切换

    $( "#pp_tabs li" ).on( "click", function () {
        var current = $( ".in" ).eq( $( this ).index() ).offset().top;
        $( "html,body" ).stop().animate( {
            scrollTop: current
        } )
    } )

    //吸顶菜单
    $( window ).on( "scroll", function () { 
        if ( $( document ).scrollTop() >= $( ".long-figure" ).offset().top ) {
            $( ".nav-top" ).hide();
            $( ".suspension" ).show().css( {
                position: "fixed",
                top: 0
            } );
        } else { 
            $( ".nav-top" ).show();
            $( ".suspension" ).hide();
        }
    } )
    

    $( "#pp_tabsSUS li" ).on( "click", function () { 
        $( this ).addClass( "active" ).siblings().removeClass( "active" );
        var current = $( ".in" ).eq( $( this ).index() ).offset().top;
        $( "body,html" ).stop().animate( {
            scrollTop: current
        })
    })

    //购物车
    var num = $( ".num-ipt" ).val();
    $( ".de-btn" ).on( "click", function () { 
        if ( num === 1 ) {
            num = 1;
        } else { 
            num--;
        }
        $( ".num-ipt" ).val( num );
    } )
    $( ".in-btn" ).on( "click", function () { 
        num++;
        $( ".num-ipt" ).val( num );
    } )
    var pic = $( ".pruchase img" ).attr( "src" );
    var price = $( ".price strong" ).html();
    var desc = $( ".pruchase-name" ).html();
    var first = $.cookie( "goods" ) ? true : false;
    $( ".btn-warning" ).on( "click", function () { 
        success();
        if ( !first ) {
            $cookie( "goods", desc + ":" + pic + ":" + num + ":" + {
                expires: 7,
                path: "/"
            } );
        } else { 
            var cookieStr = $.cookie( "goods" );
            var arr = cookieStr.split( ":" );
            var isYes = false;
            for ( var i = 0; i < arr.length; ) { 
                if ( arr[ i ] == desc ) { 
                    arr[ i + 3 ] = Number( arr[ i + 3 ] ) + Number( num );
                    cookieStr = arr.join( ":" );
                    isYes = true;
                    break;
                }
                i += 5;
            }
            if ( !isYes ) { 
                cookieStr += ":" + desc + ":" + pic + ":" + price + ":" + num ;
            }
            $.cookie( "goods", cookieStr, {
                expires: 7,
                path: "/"
            } );
        }
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