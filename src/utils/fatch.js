import Cookies from 'js-cookie'
const TokenKey = 'laravels'

export function getToken(token) {
  return Cookies.get(token)
}
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
export function removeToken() {
  return Cookies.remove(TokenKey)
}