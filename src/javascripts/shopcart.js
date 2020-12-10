
function save ( obj, key ) {
    key = key || "shopcart";
    localStorage.setItem( key, JSON.stringify( obj ) );
}

function get( key ) {
    key = key || "shopcart";
    var data = localStorage.getItem( key );
    if ( data ) {
        return JSON.parse( data );
    }
    return {};
}

function remove( key ) {
    key = key || "shopcart";
    localStorage.removeItem( key );
}