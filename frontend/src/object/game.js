import { BlankPic } from '../helper/UserContext';
export class Game {
  constructor () {
    this.name = 'A new quiz'
    // this.id = 'newGame'
    this.thumbnail = BlankPic
    this.questions = [new Question()]
    // this.calcTime = () => {
    //   let time = 0;
    //   Array.from(this.questions).forEach((q, i) => { time = parseInt(time) + parseInt(q.limit) });
    //   return time;
    // }
    // this.calcScore = () => {
    //   let score = 0;
    //   this.questions.forEach((q, i) => {
    //     score = +parseInt(score) + +parseInt(q.points)
    //   })
    //   return score
    // }
  }

  calcTime () {
    let time = 0;
    this.questions.forEach((q, i) => { time = parseInt(time) + parseInt(q.limit) });
    // this.time = time
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
    this.qid = 0
    this.title = ''
    this.limit = 5
    this.url = ''
    this.options = ['A', 'B']
    this.answers = ['A']
    this.points = 5
    this.thumbnail = BlankPic
  }

  // function wrapQuestion () {
  //   return {
  //     "title": this.title,
  //     "options": this.options,
  //     "answers": this.answers,
  //     "timelimit": this.limit,
  //     "points": this.points,
  //   };
  // }
}

// export function initGame () {
//   return new Game({
//     name: 'A new quiz',
//     owner: '',
//     active: '',
//     createdAt: '',
//     id: 'newGame',
//     thumbnail: BlankPic,
//     oldSessions: '',
//     questions: [initQuestion()]
//   })
// }
