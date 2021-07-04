import { BlankPic } from '../helper/UserContext';
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
    // this.time = time
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
    this.title = 'question'
    this.duration = 5
    this.options = ['A', 'B']
    this.answers = ['A']
    this.points = 5
    this.thumbnail = BlankPic
    this.type = 'Single Selection'
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
