import React from 'react';
import PropTypes from 'prop-types';
// import { initQuestion } from './game';
export function EditQuestion ({ questions, question, setGame, setQs }) {
  // const { questions } = this.props.location.state;
  // const[games, editGames] = useState([''])
  // const question = props.question;
  // const question = props.question;
  // const [quest, setQuestion] = React.useState(props.question);
  const [title, setTitle] = React.useState(question.title);
  const [limit, setLimit] = React.useState(question.limit);
  const [points, setPoints] = React.useState(question.points);
  const [options, setOptions] = React.useState(question.options);
  function modifyQuestion () {
    question.title = title;
    question.limit = limit;
    question.points = points;
    question.options = options;
    setQs(question);
  }

  return <><h2>editGame</h2>
    <div>Question<input type='text' value={title} placeholder='describe question...' onChange={(e) => {
      setTitle(e.target.value);
    }
    }/></div>
    <div>Add image/vedio</div>
    <div>
      <input type='checkbox' value='1'/>
      <label> single choice</label>
      <input type='checkbox' value='1'/>
      <label> multiple choice</label>
    </div>
    <div>
      optionA<input type='text' value={options[0]} placeholder='describe option...' onChange={(e) => {
      setOptions([e.target.value, options[1]]);
    }}/>
    </div>
    <div>
      optionB<input type='text' value={options[1]} placeholder='describe option...' onChange={(e) => {
      setOptions([options[0], e.target.value]);
    }}/>
    </div>
    <button>Add option(up to 6)</button>
    <div>
      Time Limit<input value={limit} type='number' onChange={(e) => {
      setLimit(e.target.value);
    }}/>
    </div>
    <div>
      Points<input type='number' value={points} onChange={(e) => {
      setPoints(e.target.value);
    }}/>
    </div>
    <button onClick={() => { modifyQuestion() }}>Save</button>

    </>
}
EditQuestion.propTypes = {
  setQs: PropTypes.func,
  questions: PropTypes.array,
  game: PropTypes.object,
  question: PropTypes.object,
  setGame: PropTypes.func,
  idx: PropTypes.number
};
