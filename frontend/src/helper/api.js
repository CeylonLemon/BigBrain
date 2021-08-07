
/**
 * Make a request to `path` with `options` and parse the response as JSON.
 * @param {*} path The url to make the reques to.
 * @param {*} options Additiona options to pass to fetch.
 */
export const ADDRESS = 'http://localhost:5005'
export const PRODUCTION_ADDRESS = 'http://localhost:3000'
// export const ADDRESS = 'http://47.102.108.110'
// export const PRODUCTION_ADDRESS = 'http://47.102.108.110'
const getToken = () => {
  console.log('this is token', sessionStorage.getItem('token'))
  return sessionStorage.getItem('token')
}

const getJSON = (path, options) =>
  fetch(path, options)
    .then(async res => {
      if (res.status >= 400 && res.status < 600) {
        await res.text().then(t => { throw new Error(t); })
      }
      return res.json();
    })

const makeAPIRequest = (path, method, auth, Data) => {
  const otherPram = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: method
  }
  console.log('i sent this request', otherPram, path)
  if (auth) { otherPram.headers.Authorization = 'Bearer ' + auth }
  if (Data) { otherPram.body = JSON.stringify(Data) }
  return getJSON(`${ADDRESS}/${path}`, otherPram);
}

/**
 * This is a sample class API which you may base your code on.
 * You may use this as a launch pad but do not have to.
 */
export function signUpRequest (email, password, name) {
  return makeAPIRequest('admin/auth/register', 'POST', false,
    { email, password, name })
}

export function signInRequest (email, password) {
  return makeAPIRequest('admin/auth/login', 'POST', false, { email, password })
}

export function getStatus (pid) {
  return makeAPIRequest('play/' + pid + '/status', 'GET', false)
    .then(data => { return data.started })
}

export function getQuestion (pid) {
  return makeAPIRequest('play/' + pid + '/question', 'GET', false)
}

export function getResult (pid) {
  return makeAPIRequest('play/' + pid + '/results', 'GET', false)
}

export function putAnswers (pid, Data) {
  return makeAPIRequest('play/' + pid + '/answer', 'PUT', false, Data)
}

export function getAllQuizzes () {
  return makeAPIRequest('admin/quiz', 'GET', getToken())
}

export function getQuiz (id) {
  return makeAPIRequest('admin/quiz/' + id, 'GET', getToken())
}

export function getCorrect (id) {
  return makeAPIRequest('play/' + id + '/answer', 'GET', false)
}

export function addNewQuiz (name) {
  return makeAPIRequest('admin/quiz/new', 'POST', getToken(), { name: name })
}

export function updateQuiz (id, Data) {
  return makeAPIRequest('admin/quiz/' + id, 'PUT', getToken(), Data)
}
export function deleteQuiz (id) {
  return makeAPIRequest('admin/quiz/' + id, 'DELETE', getToken())
}
export function endGame (id) {
  return makeAPIRequest(`admin/quiz/${id}/end`, 'POST', getToken())
}
export function startGame (id) {
  return makeAPIRequest(`admin/quiz/${id}/start`, 'POST', getToken()).catch(err => { throw err })
}
export function advanceGame (id) {
  return makeAPIRequest(`admin/quiz/${id}/advance`, 'POST', getToken())
}
export function getCurrentQuestion (pid) {
  return makeAPIRequest(`play/${pid}/question`, 'GET', false)
}
export function getAnswers (pid) {
  return makeAPIRequest(`play/${pid}/answer`, 'GET', false)
}
export function joinGame (sessionId, name) {
  return makeAPIRequest(`play/join/${sessionId}`, 'POST', false, { name })
}
