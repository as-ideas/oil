/**
 * Get the value of a string parameter in searchString if exists
 * @param searchString
 * @param paramName
 * @returns {*}
 */
export function getStringParam(searchString, paramName) {
  let i, val, params = searchString.split('&');

  for (i = 0; i < params.length; i++) {
    val = params[i].split('=');
    if (val[0] === paramName) {
      return val[1];
    }
  }
  return null;
}
