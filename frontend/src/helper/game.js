import { BlankPic } from './UserContext';
import { uuid } from './helper';
export class Game {
  constructor () {
    this.name = 'A new quiz'
    this.id = 1
    this.thumbnail = BlankPic
    this.questions = [new Question()]
  }

  calcTime () {
    let time = 0;
    if (!this.questions.length) { return 0 }
    this.questions.forEach((q, i) => { time = parseInt(time) + parseInt(q.limit) });
    console.log('calc!', time)
    return time;
  }

  calcScore () {
    let score = 0;
    this.questions.forEach((q, i) => {
      score = +parseInt(score) + +parseInt(q.points)
    })
    return score
  }
}
export class Question {
  constructor () {
    this.id = uuid()
    this.title = 'question'
    this.duration = 5
    this.options = ['A', 'B']
    this.answers = ['A']
    this.points = 5
    this.thumbnail = BlankPic
    this.type = 'Single'
  }
}
