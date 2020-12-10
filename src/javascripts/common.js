function setCookie ( key, value, options ) {
      options = options || {};
      if ( options.expires ) { 
            var d = new Date();
            d.setDate( d.getDate() + options.expires );
      }
      var cookie_string = [
            key + "=" + value,
            options.path ? ";path=" + options.path : "",
            options.expires ? ";expires=" + options.expires : "",
            options.domain ? ";domain=" + options.domian : ""
            
      ].join( "" );
      document.cookie = cookie_string;
}
function removeCookie ( key, options ) { 
      setCookie( key, null, { ...options, expires: - 1 } );
}
function getCookie (key) { 
      var cookie_array = document.cookie.split( "; " );
      for ( var i = 0; i < cookie_array.length; i++ ) { 
            var cookie_item_array = cookie_array[ i ].split( "=" );
            if ( key === cookie_item_array[ 0 ] ) { 
                  return ( cookie_item_array[ 1 ] );
            }
      }
      return "";
}
function jsonp ( url, callback_felid, callback ) { 
      var script = document.createElement( "script" );
      script.src = url;
      var fn_name = "_" + Date.now();
      url += ( /\?/.test( url ) ? "&" : "?" ) + callback_felid + "=" + fn_name;
      script.src = url;
      document.body.appendChild( script );
      script.onload = function () { 
            document.body.removeChild( script );
      }
      window[ fn_name ] = function ( res ) { 
            callback( res );
      }
}
function ajax ( url, options ) { 
      return new Promise( function ( resolve ) { 
            options = Object.assign( {
                  type: "GET"
            }, options );
            var xhr = new XMLHttpRequest();
            xhr.open( options.type, url );
            if ( options.type.toUpperCase === "POST" ) {
                  xhr.setRequestHeader( "content-type", "application/x-www-form-urlencoded" );
            }
            xhr.send( options.data ? options.data : null );
            xhr.onreadystatechange = function () {
                  if ( xhr.readyState === 4 && /^2\d{2}$/.test( xhr.status ) ) {
                        typeof options.callback === "function" ? options.callback( xhr.responseText ) : "";
                        resolve( xhr.responseText );
                  }
            }
      })
}