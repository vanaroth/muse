export const makeUrl = (url) => {
  return window.isLocalDevState ? window.baseURL + url + window.testAcces : url;
};
