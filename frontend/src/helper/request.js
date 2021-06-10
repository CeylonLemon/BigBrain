import { sendRequest } from './api';
import { Game } from '../object/game';

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

export function addNewQuiz (name, token) {
  return sendRequest('admin/quiz/new', { name: name }, 'POST', token)
}

export function updateQuiz (id, Data, name, token) {
  return sendRequest('admin/quiz/' + id, Data, 'PUT', token)
}

export async function getNewQuizId (name, token) {
  const ids = []
  let id;
  const Data = new Game();
  await getAllQuizzes(token)
    .then(data => {
      data.quizzes.forEach((q, i) => {
        ids.push(i)
      })
    })
  await addNewQuiz(name, token)
  await getAllQuizzes(token)
    .then(data => {
      const qzs = data.quizzes;
      for (let i = 0; i < qzs.length; i++) {
        if (!ids.includes(qzs[i].id)) { id = qzs[i].id }
      }
    })
  await updateQuiz(id, Data, name, token)
  return id
}
