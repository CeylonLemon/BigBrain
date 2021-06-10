import React, { Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { PrimaryButton } from './PrimaryButton';
import { fileToDataUrl } from '../helper/helper.js';
import PropTypes from 'prop-types';
// import DialogTitle from '@material-ui/core/DialogTitle';
import Media from 'react-media';
import { Clearicon, UploadButton } from './Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export function QEditor () {
  const styleSmall = {
    padding: '0 5px 15px 25px',
    maxWidth: '450px'
  }
  const styleMedium = {
    padding: '0 28px 20px 30px',
    maxWidth: '480px'
  }
  const styleLarge = {
    padding: '0 25px 20px 25px',
    maxWidth: '475px'
  }
  return <Media queries = {{
    small: '(max-width: 375px)',
    medium: '(min-width: 376px) and (max-width: 1025px)',
    large: '(min-width: 1026px)'
  }}>
        {matches => (
            <Fragment>
                {matches.small && <FormPropsTextFields style={styleSmall}/>}
                {matches.medium && <FormPropsTextFields style={styleMedium}/>}
                {matches.large && <FormPropsTextFields style={styleLarge}/>}
            </Fragment>
        )}

    </Media>
}

export const FormPropsTextFields = ({ style, props }) => {
  const classes = useStyles();
  const question = props.questions[props.index]
  // const [img, setImg] = React.useState(BlankPic);
  const [title, setTitle] = React.useState(question.title);
  const [limit, setLimit] = React.useState(question.limit);
  const [points, setPoints] = React.useState(question.points);
  const [options, setOptions] = React.useState(question.options)
  const [answers, setAnswers] = React.useState(question.answers);
  const [picture, setPicture] = React.useState(question.thumbnail);
  console.log(question)
  // update question when editing
  React.useEffect(() => {
    console.log('change')
    Object.assign(question, {
      title: title,
      limit: limit,
      points: points,
      options: options,
      answers: answers,
      thumbnail: picture
    })

    const qs = [...props.questions];
    qs[props.index] = question;
    console.log(qs[props.index])
    props.setQs(qs);
  }, [title, limit, points, options, answers])

  // function modifyOption (idx, value) {
  //   const ops = [...options];
  //   ops[idx] = value;
  //   setOptions(ops);
  // }

  // function addOption () {
  //     const ops = [...options];
  //     ops.push('');
  //     setOptions(ops);
  // }
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

  // function uploadPicture (e) {
  //   const file = e.target.files[0];
  //   fileToDataUrl(file).then(data => { setPicture(data) })
  // }
  const currencies = [
    {
      value: 'Multiple Choice',
      label: '$',
    },
    {
      value: 'Single Choice',
      label: '€',
    }
  ];

  const addOption = () => {
    console.log(1)
    const os = [...options];
    os.push('Option' + (os.length + 1).toString());
    setOptions(os)
  }

  return (
        <form className={classes.root}
              noValidate autoComplete="off"
              style={style}
              onClick={(e) => { e.stopPropagation() }}
        >

            <div style={{ }}>
                {/* <TextField */}
                {/*    id="filled-number" */}
                {/*    label="Picture" */}
                {/*    type="file" */}
                {/*    style={uploadStyle} */}
                {/*    onChange={e => { */}
                {/*      fileToDataUrl(e.target.files[0]) */}
                {/*        .then(u => { */}
                {/*          setImg(u); */}
                {/*          console.log(u) */}
                {/*        }) */}
                {/*    }} */}
                {/*    InputLabelProps={{ */}
                {/*      shrink: true, */}
                {/*    }} */}

                {/* /> */}
                <div style={{ display: 'flex' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>

                        <TextField
                            id="outlined-basic"
                            label="Quiz name"
                            variant="outlined"
                            onChange={(e) => {
                              setTitle(e.target.value)
                            }}
                            value={title}
                            size={'small'}
                        />

                        <TextField
                            id="standard-select-currency"
                            select
                            label="Type of Question"
                            helperText="Please select your currency"
                        >
                            {currencies.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.value}
                                </MenuItem>
                            ))}
                        </TextField>

                        <div style={{
                          margin: '5px 0 0 10px'
                        }}>
                            <UploadButton
                                onChange={(e) => {
                                  fileToDataUrl(e.target.files[0])
                                    .then(u => {
                                      setPicture(u);
                                    })
                                }}/>
                        </div>
                        {/* <TextField */}
                        {/*    id="standard-required" */}
                        {/*    label="Quiz name" */}
                        {/*    defaultValue={title} */}
                        {/*    onChange={(e) => { */}
                        {/*      setTitle(e.target.value) */}
                        {/*    }} */}
                        {/* /> */}

                    </div>
                    <img style={{ height: '180px', width: '190px', margin: '5px 0 0 10px' }} src={picture}/>
                </div>

            </div>
            <div>
                <TextField
                    id="filled-number"
                    label="Points"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    defaultValue={points}
                    variant="filled"
                    onChange={(e) => {
                      setPoints(e.target.value)
                    }}
                />

                <TextField
                    id="standard-number"
                    label="Duration"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    defaultValue={limit}
                    variant="filled"
                    onChange={(e) => {
                      setLimit(e.target.value)
                    }}
                />

            </div>
            <div>
                {options.map((o, i) =>
                    <div key={i}>
                        <TextField required key={i} id="standard-required" label={o} defaultValue={o} size={'small'}/>

                        {(answers.includes(o))
                          ? <input type='checkbox' id={i} onClick={() => {
                            modifyAnswers(i);
                          }} defaultChecked={true}/>
                          : <input type='checkbox' id={i} onClick={() => {
                            modifyAnswers(i);
                          }}/>}
                        <Clearicon clickFunc={deleteOption} idx={i} ifDisplay={(i > 1)}/>
                    </div>

                )}

            </div>
            <PrimaryButton name={'Add Option'} onClick={addOption}/>
        </form>
  );
}

FormPropsTextFields.propTypes = {
  style: PropTypes.object,
  props: PropTypes.object,
  addQ: PropTypes.func,
  deleteQ: PropTypes.func,
  setQs: PropTypes.func,
  questions: PropTypes.array,
  question: PropTypes.object,
  idx: PropTypes.number,
  index: PropTypes.number
}
