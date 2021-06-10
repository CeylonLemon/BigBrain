import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Media from 'react-media';
import { FormPropsTextFields } from './QuizEditor';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { TextField } from '@material-ui/core';
import { PrimaryButton, UploadButton } from './Button';
import { Question, Game } from './game';
import { sendRequest } from '../helper/api';
import { UserContext } from '../helper/UserContext';
import Pagination from '@material-ui/lab/Pagination';
import Divider from '@material-ui/core/Divider';

const emails = ['username@gmail.com', 'user02@gmail.com'];

export default function SimpleDialogDemo ({ props }) {
  const history = useHistory()
  const game = props.game
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);
  // const [game, setGame] = React.useState(props.game);
  const [title, setTitle] = React.useState(game.name);
  const [pic, setPic] = React.useState(game.thumbnail);
  const [questions, setQuestions] = React.useState(game.questions);
  const { token } = React.useContext(UserContext)
  console.log(props.questions)
  console.log(game)

  const styleSmall = {
    padding: '0 5px 15px 25px',
    maxWidth: '450px'
  }
  const styleMedium = {
    padding: '0 28px 20px 30px',
    maxWidth: '480px'
  }
  const styleLarge = {
    marginTop: '25px',
    padding: '0 25px 20px 25px',
    maxWidth: '475px'
  }

  function FormProps (index) {
    return {
      questions: questions,
      setQs: setQuestions,
      index: index
    }
  }

  const mainContainerStyle = {
    display: 'flex',
    margin: '10px 10px 5px 5px',
    justifyContent: 'center'
  }

  const addQuestion = () => {
    const qs = [...questions]
    qs.push(new Question())
    setQuestions(qs)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const saveChange = () => {
    const g = new Game()

    Object.assign(g, game)
    Object.assign(g, {
      name: title,
      thumbnail: pic,
      questions: questions
    })
    const gs = [...props.games]
    gs[props.index] = g
    props.setGames(gs)
    UploadGame(g)
  }

  const toQuestion = (event, value) => {
    history.push('/home/question' + value)
  }

  const UploadGame = (game) => {
    // if it is a new game, apply for an empty game
    // if not a new game, upload it directly
    const Data = (({ questions, name, thumbnail }) =>
      ({ questions, name, thumbnail }))(game)
    // const Data = Object.assign({}, {game.questions,game.name,game.thumbnail})
    console.log(Data)
    sendRequest('admin/quiz/' + game.id, Data,
      'PUT', token)
      .then(() => {
        history.push('/home');
      })
      // .catch(e => {
      //   alert(e);
      // })
  }

  return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Create Quiz
            </Button>
            <Dialog onClose={() => { handleClose(selectedValue) }}
                    aria-labelledby="simple-dialog-title"
                    onClick={(e) => { e.stopPropagation() }}
                    open={open}>
                <div style={{
                  marginTop: '5px',
                  fontSize: '30px',
                  fontWeight: 'bold',
                  fontFamily: 'Times New Roman',
                  textAlign: 'center'
                }}>Customize Your Game</div>

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                    <Divider variant="middle" style={{ width: '400px' }}/>
                </div>

                <div style={mainContainerStyle}>
                    <div style={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'column' }}>
                        <div style={{ marginLeft: '0', width: '150px' }}>
                            <div style={{ height: '50px', width: '140px', margin: '5px 25px 0 0' }}>
                                <TextField
                                    id="outlined-basic"
                                    label="Game Title"
                                    variant="outlined"
                                    onChange={(e) => {
                                      setTitle(e.target.value)
                                    }}
                                    value={title}
                                    size={'small'}
                                />
                            </div>
                        </div>
                        <UploadButton onChange={(e) => { setPic(e.target.files[0]) }}/>
                        <div style={{ display: 'flex', marginTop: '10px' }}>
                            <div style={ { marginRight: '12px' }}>
                                <PrimaryButton
                                    onClick={saveChange}
                                    size={'small'}
                                    text={'Save'}
                                    style={{ marginRight: '10px' }}/>
                            </div>
                            <div>
                                <PrimaryButton text={'Add'} size={'small'} onClick={addQuestion}/>
                            </div>
                        </div>

                    </div>
                    <img src={pic} style={{ width: '150px', height: '150px', padding: '10px' }}/>

                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
                    <Divider variant="middle" style={{ width: '330px' }}/>
                </div>
                <div style={{
                  fontSize: '25px',
                  fontFamily: 'Times New Roman',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  margin: '5px 0 0 5px'
                }}>
                    Customize Questions
                </div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Pagination
                        count={questions.length}
                        color="primary"
                        style={{ margin: '10px 0 10px 0' }}
                        onChange={toQuestion}
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Divider variant="middle" style={{
                      width: '330px',
                    }}/>
                </div>

                <Switch>
                    {questions.map((q, i) =>

                        <Route key={i} path={'/home/question' + (i + +1)}>
                            <Media queries = {{
                              small: '(max-width: 375px)',
                              medium: '(min-width: 376px) and (max-width: 1025px)',
                              large: '(min-width: 1026px)'
                            }}>
                                {matches => (
                                    <Fragment>
                                        {matches.small && <FormPropsTextFields style={styleSmall} props={FormProps(i)}/>}
                                        {matches.medium && <FormPropsTextFields style={styleMedium} props={FormProps(i)}/>}
                                        {matches.large && <FormPropsTextFields style={styleLarge} props={FormProps(i)}/>}
                                    </Fragment>
                                )}
                            </Media>
                        </Route>
                    )}

                </Switch>
                <Redirect to='/home/question1'/>

            </Dialog>
        </div>
  );
}
SimpleDialogDemo.propTypes = {
  props: PropTypes.object,
  style: PropTypes.object,
  game: PropTypes.object,
  games: PropTypes.object,
  index: PropTypes.number,
  questions: PropTypes.array,
  setGames: PropTypes.func
}
