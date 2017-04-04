/**
 * Merge the objects,
 * For a deep extend, set the first argument to `true`.
 * @param arguments objects to merge as arguments.
 * @returns {{}} merged object
 * @function
 */
export function extend() {

    // Variables
    let extended = {},
     deep = false,
     i = 0,
     length = arguments.length;

    function merge(obj) {
      for ( var prop in obj ) {
          if ( Object.prototype.hasOwnProperty.call( obj, prop ) ) {
              // If deep merge and property is an object, merge properties
              if ( deep && Object.prototype.toString.call(obj[prop]) === '[object Object]' ) {
                  extended[prop] = extend( true, extended[prop], obj[prop] );
              } else {
                  extended[prop] = obj[prop];
              }
          }
      }
    }

    // Check if a deep merge
    if ( Object.prototype.toString.call( arguments[0] ) === '[object Boolean]' ) {
        deep = arguments[0];
        i++;
    }

    // Loop through each object and conduct a merge
    for ( ; i < length; i++ ) {
        var obj = arguments[i];
        merge(obj);
    }

    return extended;

}
