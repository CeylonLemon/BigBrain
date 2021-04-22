import { sendRequest } from './api';
// import { useContext } from 'react';
// import { UserContext } from './UserContext';
// const { token } = useContext(UserContext)
export function getStatus (pid) {
  return sendRequest('play/' + pid + '/status', false, 'GET', false)
    .then(data => { return data.started })
}

export function getQuestion (pid) {
  return sendRequest('play/' + pid + '/question', false, 'GET', false)
}

export function getResult (pid) {
  return sendRequest('play/' + pid + '/results', false, 'GET', false)
}

export function putAnswers (pid, ans) {
  const Data = {
    answerIds: ans
  }
  return sendRequest('play/' + pid + '/answer', Data, 'PUT', false)
}

export function getAllQuizzes (token) {
  return sendRequest('admin/quiz', false, 'GET', token)
}

export function getQuiz (id, token) {
  return sendRequest('admin/quiz/' + id, false, 'GET', token)
}

export function getCorrect (id) {
  return sendRequest('play/' + id + '/answer', false, 'GET', false)
}
