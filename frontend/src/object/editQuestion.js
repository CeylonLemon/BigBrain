import React from 'react';
import PropTypes from 'prop-types';
import { QuestionEditor, Buttons, Options, Option } from './editQuestion.element'
import { AddButton, DeleteButton, Clearicon, UploadButton } from './Button';
import { fileToDataUrl } from '../helper/helper';
import { Container } from '@material-ui/core';

export function EditQuestion ({ questions, question, setQs, idx, addQ }) {
  const [title, setTitle] = React.useState(question.title);
  const [limit, setLimit] = React.useState(question.limit);
  const [points, setPoints] = React.useState(question.points);
  const [options, setOptions] = React.useState(question.options);
  const [answers, setAnswers] = React.useState(question.answers);
  const [picture, setPicture] = React.useState(question.thumbnail);

  // update question when editing
  React.useEffect(() => {
    question.title = title;
    question.limit = limit;
    question.points = points;
    question.options = options;
    question.answers = answers;
    question.thumbnail = picture;
    const qs = [...questions];
    qs[idx] = question;
    setQs(qs);
  }, [title, limit, points, options, answers])

  function modifyOption (idx, value) {
    const ops = [...options];
    ops[idx] = value;
    setOptions(ops);
  }

  function deleteQuestion (idx, value) {
    const qs = [...questions];
    qs.splice(idx, 1);
    setQs(qs);
  }

  function addOption () {
    const ops = [...options];
    ops.push('');
    setOptions(ops);
  }
  function deleteOption (idx) {
    const ops = [...options];
    ops.splice(idx, 1);
    setOptions(ops);
  }

  function modifyAnswers (idx) {
    const ans = [...answers];
    (ans.includes(options[idx]))
      ? ans.splice(idx, 1)
      : ans.push(options[idx]);
    setAnswers(ans);
  }

  function uploadPicture (e) {
    const file = e.target.files[0];
    fileToDataUrl(file).then(data => { setPicture(data) })
  }

  const stylesheet = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around'
  }

  return <QuestionEditor>

    <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around'

    }}>Question<input type='text' value={title} placeholder='describe question...' onChange={(e) => {
      setTitle(e.target.value);
    }
    }/>
      <UploadButton clickFunc={uploadPicture}/>
    </div>
      <Container>

        <img style={{ width: '200px', height: '200px' }} src={picture}/>
      </Container>

    <Options style={stylesheet}>
      {options.map((o, i) =>
        <Option key={i}>
          option{i}<input type='text' value={o} onChange={
            (e) => { modifyOption(i, e.target.value) }}/>
          {(answers.includes(o))
            ? <input type='checkbox' id={i} onClick={() => {
              modifyAnswers(i);
            }} defaultChecked={true}/>
            : <input type='checkbox' id={i} onClick={() => {
              modifyAnswers(i);
            }}/>}
          <Clearicon clickFunc={deleteOption} idx={i} ifDisplay={(i > 1)}/>

        </Option>
      )}
    </Options>
    <div style={{ width: '50%', fontSize: '1px' }}>

    </div>
    <div>
      Time Limit<input value={limit} type='number' name='setLimit' onChange={(e) => {
      setLimit(e.target.value);
    }}/>
    </div>
    <div>
      Points<input type='number' value={points} onChange={(e) => {
      setPoints(e.target.value);
    }}/>
    </div>
    <Buttons>
    <DeleteButton clickFunc={deleteQuestion}/>
      <AddButton clickFunc={addQ} style={{ width: '100px', height: '35px', marginTop: '8px', fontSize: '5px', marginRight: '5px' }} text={'Question'} />
      <AddButton clickFunc={addOption} text={'Option'} style={{ width: '100px', height: '35px', marginTop: '8px', fontSize: '5px' }} />
    </Buttons>
    </QuestionEditor>
}
EditQuestion.propTypes = {
  addQ: PropTypes.func,
  setQs: PropTypes.func,
  questions: PropTypes.array,
  question: PropTypes.object,
  idx: PropTypes.number
};
