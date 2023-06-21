

export function setCookie(cookieName, cookieValue) {
  window.localStorage.setItem(cookieName, JSON.stringify(cookieValue));
}
export function getCookie(cookieName) {
  const result = window.localStorage.getItem(cookieName);
  return JSON.parse(result);
}
export function deleteCookie(cookieName) {
  window.localStorage.removeItem(cookieName);
  return true;
}
