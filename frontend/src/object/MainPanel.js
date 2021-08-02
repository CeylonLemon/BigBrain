import React, { forwardRef, useContext, useImperativeHandle, useRef, useState } from 'react'
import { MediumTextFields } from './TextFiled';
import { FileInput, TextButtons } from './Button';
import { ACTIONS, AlertContext } from '../helper/UserContext';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { getValueById } from './helpers';
// import SubPanelController from './SubPanelController';
import { fileToDataUrl } from '../helper/helper';
import { EditIcon } from './icons';
import { CardActions } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: '40vh',
    height: '77vh'
  },
  media: {
    height: 175,
  },
  form: {
    marginLeft: '1vh',
    height: '10vh'
  },
  title: {
    marginLeft: '2vh'
  },
  content: {
    margin: '2vh 0 0 1.3vh',
    padding: 0
  }
});
const MainPanel = forwardRef((props, ref) => {
  useImperativeHandle(
    ref,
    () => ({
      getGame () {
        const name = titleRef.current.getElementsByTagName('input')[0].value
        const thumbnail = imageRef.current.style.backgroundImage.split('"')[1]
        return { name, thumbnail, questions: subPanelRef.current.getQuestions(), id: game.id }
      }

    })
  )
  console.log('mainPanel render!')
  const classes = useStyles();
  const { game, dispatchGames, title, thumbnail, mediaSize, editorSwitch } = props
  const { dispatchAlert } = useContext(AlertContext)
  console.log(mediaSize)
  const [subPanelRef, titleRef, imageRef, uploadRef] = [useRef(), useRef(), useRef(), useRef()]
  const [pic, setPic] = useState(thumbnail)
  const ModifyGame = (e) => {
    e.preventDefault();
    const newTitle = getValueById('GameTitle')
    dispatchGames({
      type: ACTIONS.MODIFY_GAME,
      payload: {
        id: game.id,
        newGame: { ...game, name: newTitle }
      }
    })
    dispatchAlert({
      type: ACTIONS.OPEN_ALERT,
      payload: {
        type: 'success',
        message: 'Successfully Modified!'
      }

    })
  }
  const uploadPhoto = (e) => {
    // const file = uploadRef.current.files[0]
    console.log('upload')
    const file = e.target.files[0]
    console.log(file)
    // imageRef.current.style.backgroundImage = `url:("${file}")`
    // console.log(`url:("${file}")`)
    fileToDataUrl(file)
      .then(url => {
        // imageRef.current.style.backgroundSize = '25px'
        // imageRef.current.style['background-image'] = 'url:("' + url + '")'
        // console.log(imageRef.current.style['background-image'])
        setPic(url)
        // imageRef.current.style.backgroundColor = 'blue'
        // imageRef.current.style.backgroundImage = `url:(${url})`
      })
  }
  return (
      <Card className={classes.root}>
          <CardMedia
              className={classes.media}
              image={pic}
              title="Contemplative Reptile"
              ref={imageRef}
          />
          <CardContent className={classes.content}>
            {/* <button onClick={() => { subPanelRef.current.getData() }}>showData</button> */}
            <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
            </Typography>
              <form autoComplete="off" onSubmit = {ModifyGame} className={classes.form} >
                {/* <BasicTextFields label='TITLE' id='GameTitle' value={title} refValue={titleRef}/> */}
                <MediumTextFields label='TITLE' id='GameTitle' defaultValue={title} refValue={titleRef}/>

                <TextButtons/>
              </form>
            <CardActions>
              <FileInput
                  style={{ height: '5vh', width: '5vh', padding: '1.5vh 0 0 1vh' }}
                  handleChange={uploadPhoto}
                  uploadRef={uploadRef}
                  id='mainPanelFile'
              />
              <EditIcon
                  style={{ height: '5vh', width: '5vh', padding: '1vh 0 0 1vh' }}
                  handleClick={editorSwitch}
              />
            </CardActions>

          </CardContent >
        {/* <SubPanelController */}
        {/*    ref={subPanelRef} */}
        {/*    id={game.id} */}
        {/*    questions={game.questions} */}
        {/*    dispatchGames={dispatchGames} */}
        {/*    mediaSize={mediaSize} */}
        {/* /> */}
      </Card>
  );
})
MainPanel.propTypes = {
  id: PropTypes.number,
  index: PropTypes.number,
  game: PropTypes.object,
  dispatchGames: PropTypes.func,
  dispatchAlert: PropTypes.func,
  editorSwitch: PropTypes.func,
  setAlert: PropTypes.func,
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  mediaSize: PropTypes.string,
}
MainPanel.displayName = 'MainPanel'
export default React.memo(MainPanel)
