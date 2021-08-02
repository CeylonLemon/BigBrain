import React, { forwardRef, useContext, useImperativeHandle, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { FileInput } from './Button';
import { CardActions, TextareaAutosize } from '@material-ui/core';
import { AddQuestion, EditIcon, SubmitIcon } from './icons';
import { fileToDataUrl } from '../helper/helper';
import PropTypes from 'prop-types';
import PaginationLink from './Pagination';
import Typography from '@material-ui/core/Typography';
import { MediaContext } from '../helper/UserContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '25vh'
  },
  deviceRoot: {
    display: 'flex',
    flexDirection: 'column-reverse',
    height: '50vh'
  },
  form: {
    height: '8vh',
    padding: '1vh',
    flex: '1 0 auto',
    overflow: 'scroll'
  },
  deviceForm: {
    maxHeight: '5vh',
    padding: '1vh',
    overflow: 'scroll'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 0 auto',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 0 0 0',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    '& div': {
      paddingBottom: '0'
    }
  },
  cover: {
    flex: '2 0 auto',
    width: '50%'
  },
  deviceCover: {
    flex: '2 0 auto',
    width: '100%'
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '0',
    height: '5vh',
    marginBottom: '1vh'
  }
}));

const GameEditor = forwardRef((props, ref) => {
  useImperativeHandle(
    ref,
    () => ({
      getGameInfo () {
        console.log('get this title', name)
        return { name, thumbnail }
      },
      // changePage (page) {
      //   console.log('setPage', page)
      //   setCurrentPage(page)
      // }
    }),

  )
  const classes = useStyles();
  const {
    mediaSize,
    editorSwitch,
    gameThumbnail,
    gameName,
    numberOfQuestions,
    addQuestion,
  } = props
  console.log(mediaSize)
  const [thumbnail, setThumbnail] = useState(gameThumbnail)
  const [name, setName] = useState(gameName)
  const [editing, setEditing] = useState(false)
  const { isDevice } = useContext(MediaContext)
  console.log(isDevice)
  // const [currentPage, setCurrentPage] = useState(0)
  console.log(numberOfQuestions)
  const uploadPhoto = (e) => {
    const file = e.target.files[0]
    if (file) {
      fileToDataUrl(file)
        .then(url => {
          setThumbnail(url)
        })
    }
  }

  const openEditor = () => {
    setEditing(prevState => !prevState)
  }

  return (
        <Card className={isDevice ? classes.deviceRoot : classes.root}>
            <div className={classes.details}>
                <div className={classes.content}>
                    {/* <button onClick={() => { subPanelRef.current.getData() }}>showData</button> */}
                    <form autoComplete="off" className={isDevice ? classes.deviceForm : classes.form} >
                        {/* <BasicTextFields label='TITLE' id='GameTitle' value={title} refValue={titleRef}/> */}
                        {/* <MediumTextFields label='TITLE' id='GameTitle' defaultValue={title} refValue={titleRef}/> */}

                        {/* <TextButtons/> */}
                      <div className={classes.title}>
                        {editing
                          ? <div style={{ paddingTop: '10px' }}>
                              <TextareaAutosize
                                  minRows={2}
                                  maxRows={4}
                                  style={{ width: '28vh', margin: 0 }}
                                  defaultValue={name}
                                  onChange={(e) => { setName(e.target.value); console.log(name) }}
                              />

                              <SubmitIcon
                                  handleClick={openEditor}
                                  style={{
                                    width: '3vh',
                                    height: '3vh',
                                    paddingLeft: '2px'
                                  }}/>
                            </div>
                          : <Typography variant="h5" color="textSecondary">
                              {name}
                              <span style={{ }}>
                                  <EditIcon
                                      style={{
                                        width: '3vh',
                                        height: '3vh',
                                        position: 'relative',
                                        top: '0.5vh',
                                        paddingLeft: '2px'
                                      }}
                                      handleClick={openEditor}
                                  />

                              </span>
                            </Typography>

                        }
                      </div>

                    </form>

                    <PaginationLink
                        pages={numberOfQuestions}
                        handleChange={editorSwitch}
                    />
                  <CardActions className={classes.actions}>
                    <AddQuestion
                        style={{ height: '30px', width: '30px', margin: '10px 5px 0 0' }}
                        handleClick={addQuestion}
                    />

                    <FileInput
                        style={{ height: '32px', width: '32px', margin: '15px 10px 0 0' }}
                        handleChange={uploadPhoto}
                        id='mainPanelFile'
                    />
                  </CardActions>
                </div >
            </div>
            <CardMedia
                className={isDevice ? classes.deviceCover : classes.cover}
                image={thumbnail}
                title="Live from space album cover"
            />
        </Card>
  );
})
GameEditor.propTypes = {
  editorSwitch: PropTypes.func,
  addQuestion: PropTypes.func,
  deleteQuestion: PropTypes.func,
  gameName: PropTypes.string,
  gameThumbnail: PropTypes.string,
  mediaSize: PropTypes.string,
  numberOfQuestions: PropTypes.array,
}
GameEditor.displayName = 'MainPanel'
export default React.memo(GameEditor)
