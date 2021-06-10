/**
 * Make a request to `path` with `options` and parse the response as JSON.
 * @param {*} path The url to make the reques to.
 * @param {*} options Additiona options to pass to fetch.
 */

const getJSON = (path, options) =>

  fetch(path, options)
    .then(async res => {
      console.log(res)
      if (res.status >= 400 && res.status < 600) {
        await res.text().then(t => { throw new Error(t); })
        // throw new Error(res.text())
      }
      return res.json();
    })

/**
 * This is a sample class API which you may base your code on.
 * You may use this as a launch pad but do not have to.
 */
export default class API {
  /** @param {String} url */
  constructor (url) {
    this.url = url;
  }

  /** @param {String} path
   * @param Data
   * @param method
   * @param auth
   */
  makeAPIRequest (path, Data, method, auth) {
    const otherPram = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: method
    }
    console.log('i sent this request', otherPram, path)
    if (auth) { otherPram.headers.Authorization = 'Bearer ' + auth }
    if (Data) { otherPram.body = JSON.stringify(Data) }
    return getJSON(`${this.url}/${path}`, otherPram);
  }
}
export const sendRequest = (path, Data, method = 'POST', auth) => {
  const api = new API('http://localhost:5005');
  return api.makeAPIRequest(path, Data, method, auth)
}
