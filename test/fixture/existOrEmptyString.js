/**
 * return true if it exist or it is empty string
 * @param {Any} value target value
 * @return {Boolean}
 */
export default function existOrEmptyString(value) {
  return Boolean(value) || value === '';
}
