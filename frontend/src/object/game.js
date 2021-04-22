import { BlankPic } from '../helper/UserContext';
export class Game {
  constructor (props) {
    this.name = props.name;
    this.owner = props.owner;
    this.active = props.active;
    this.createdAt = props.createdAt;
    this.id = props.id;
    this.thumbnail = props.thumbnail;
    this.oldSessions = props.oldSessions;
    this.questions = props.questions;
    this.time = this.calcTime();
    this.score = this.calcScore();
  }

  calcTime () {
    let time = 0;
    this.questions.forEach((q, i) => { time = parseInt(time) + parseInt(q.limit) });
    return time;
  }

  calcScore () {
    let score = 0;
    this.questions.forEach((q, i) => {
      score = parseInt(score) + parseInt(q.points)
    })
    return score
  }
}
export class Question {
  constructor (props) {
    this.gameid = props.gameid;
    this.qid = props.qid;
    this.title = props.title;
    this.limit = props.limit;
    this.url = props.thumbnail;
    this.options = props.options;
    this.answers = props.answers;
    this.points = props.points;
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

export function initGame () {
  return new Game({
    name: 'A new quiz',
    owner: '',
    active: '',
    createdAt: '',
    id: 'newGame',
    thumbnail: BlankPic,
    oldSessions: '',
    questions: [initQuestion()]
  })
}
export function initQuestion () {
  return new Question({
    qid: 0,
    title: '',
    limit: 5,
    url: '',
    options: ['A', 'B'],
    answers: ['A'],
    points: 5,
    thumbnail: BlankPic
  })
}
