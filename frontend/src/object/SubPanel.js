import React, { forwardRef, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { red } from '@material-ui/core/colors';
import { BasicTextFields, MultilineTextFields, SmallTextFields } from './TextFiled';
import { Add } from './icons'
import PropTypes from 'prop-types';
import Options from './Options';
// import { FormControl } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { Paper } from '@material-ui/core';
import Draggable from 'react-draggable';
// import Paper from '@material-ui/core/Paper';
// function PaperComponent (props) {
//   return (
//         <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
//             <Paper {...props} />
//         </Draggable>
//   );
// }

const useStyles = makeStyles((theme) => ({
  root: {
    width: '50vh',
    position: 'absolute',
    top: '8.5vh',
    left: '47%',
    height: '77vh'
  },
  subPanel: {
    width: '50vh',
    position: 'absolute',
    top: '8.5vh',
    left: '47%',
    height: '77vh',
    zIndex: '2'
  },
  smallSubPanel: {
    width: '95%',
    position: 'absolute',
    top: '8.5vh',
    left: '10%',
    zIndex: '2'
  },
  editorHeader: {
    display: 'flex',
    justifyContent: 'flex-end'

  },
  media: {
    height: '30%',
    paddingTop: '0', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  header: {
    padding: '1vh'
  },
  content: {
    padding: '3px 10px 5px 10px',
  },
  contentSmall: {
    margin: '3px 0 5px 15px',
    width: '90%',
    '& div': {
      paddingLeft: '1px'
    }
  },
  closeButton: {
    color: theme.palette.grey[500],
    cursor: 'pointer'
  }
}));

const SubPanel = forwardRef((props, refValue) => {
  const { id, question, handleClose, mediaSize } = props
  console.log(handleClose)
  const classes = useStyles();
  const uniqId = id
  const controlRef = useRef()

  console.log('subPanel render!' + id)

  const addOption = () => {
    console.log('triggrt handlesave')
    controlRef.current.addOptionFromSubPanel()
  }
  const { title, duration, points, options, answers } = question

  useEffect(() => {
    console.log(refValue.current)
    refValue.current.style.display = id === 0 ? '' : 'none'
  }, [])
  return (
      <div ref={refValue}>
      <Draggable className={mediaSize === 'small' ? classes.smallSubPanel : classes.subPanel}>
            <Card >
                <div className={classes.editorHeader}>
                    <IconButton aria-label="close" className={classes.closeButton} onTouchStart={handleClose}
                                onClick={handleClose}>
                        <CloseIcon style={{ cursor: 'pointer' }}/>
                    </IconButton>
                </div>
                <div className={mediaSize === 'small' ? classes.contentSmall : classes.content}>
                    {/* <FormControl autoComplete="off" style={{ padding: '0 0 0 2vh' }}> */}

                    {/* <fieldset */}
                    {/*    style={{ */}
                    {/*      maxHeight: '30vh', */}
                    {/*      width: '84%', */}
                    {/*      margin: '0.2vh 0 0 0.7vh', */}
                    {/*      border: '1px dashed grey', */}
                    {/*      borderRadius: '10px' */}
                    {/*    }}> */}
                    {/*    <legend style={{ width: '8vh', paddingLeft: '0.7vh' }}><span>Basic</span></legend> */}
                    <Paper>
                        <form autoComplete='off'>
                    <BasicTextFields
                        label='TITLE'
                        id={uniqId + 'title'}
                        size='medium'
                        value={title}
                        // ref={inputRef}
                        // onChange={handleChange}
                    />
                    <MultilineTextFields defaultValue='Single Selection' id={uniqId + 'multi'}/>
                    <SmallTextFields label='POINTS' className='points' id={uniqId + 'points'} size='medium'
                                     defaultValue={points}/>
                    <SmallTextFields label='DURATION' id={uniqId + 'duration'} size='medium' defaultValue={duration}/>
                        </form>
                        </Paper>
                    {/* </fieldset> */}

                    {/* <fieldset style={{ */}
                    {/*  overflow: 'scroll', */}
                    {/*  maxHeight: '35vh', */}
                    {/*  width: '84%', */}
                    {/*  margin: '0.5vh 0 0 0.7vh', */}
                    {/*  border: '1px dashed grey', */}
                    {/*  borderRadius: '10px' */}
                    {/* }}> */}
                    {/*    <legend style={{ width: '8vh', paddingLeft: '0.7vh' }}> */}
                    {/*        <span>Options</span> */}
                    {/*    </legend> */}
                    <Paper>
                        <Options options={options} uniqId={uniqId} answers={answers} ref={controlRef}/>

                    {/* </fieldset> */}
                </Paper>
                    <div style={{ display: 'flex' }}>
                        <Add
                            handleClick={addOption}
                            style={{ height: '4vh', width: '4vh', margin: '1vh' }}
                        />
                    </div>
                    {/* </FormControl> */}
                </div>

            </Card>
      </Draggable>
      </div>
  );
}
)
SubPanel.propTypes = {
  props: PropTypes.object,
  mediaSize: PropTypes.string,
  game: PropTypes.object,
  dispatchStates: PropTypes.func,
  handleClose: PropTypes.func,
  index: PropTypes.number,
  dispatch: PropTypes.func,
  question: PropTypes.object,
  id: PropTypes.any,
  open: PropTypes.bool,
  refValue: PropTypes.object
}
SubPanel.displayName = 'SubPanel'
export default React.memo(SubPanel)
