// import { BasicTextFields, MultilineTextFields, SmallTextFields } from './TextFiled';
import React from 'react';
// import { SecondaryButtons, TextButtons } from './Button';

// function SubPanel2 () {
//   return <div>
//       <form autoComplete="off">
//           <BasicTextFields label='TITLE'/>
//           <div style={{ display: 'flex' }}>
//               <SmallTextFields label='DURATION'/>
//               <SmallTextFields label='POINTS'/>
//           </div>
//
//           <MultilineTextFields/>
//           {/* <BasicTextFields label='TITLE'/> */}
//           {/* <BasicTextFields label='TITLE'/> */}
//       </form>
//
//         <div style={{ display: 'flex' }} >
//             <TextButtons label={'ADD OPTIONS'}/>
//             <SecondaryButtons label={'DELETE'}/>
//         </div>
//
//     </div>
// }
import { makeStyles } from '@material-ui/core/styles';
// import { ACTIONS } from '../helper/UserContext'
// import clsx from 'clsx';
import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
// import Collapse from '@material-ui/core/Collapse';
// import Avatar from '@material-ui/core/Avatar';
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import PaginationLink from './Pagination';
// import { CardHeader } from '@material-ui/core';
import { BlankPic } from '../helper/helper';
// import { getValueById } from './helpers';
import { BasicTextFields, MultilineTextFields, SmallTextFields } from './TextFiled';
import { PrimaryButtons, SecondaryButtons } from './Button';
import PropTypes from 'prop-types';
// import { Question } from './game';
// import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckboxLabels from './CheckBoxs';
import { FormControl } from '@material-ui/core';
// import Typography from '@material-ui/core/Typography';
// import SubPanelWrapper from './subPanelWrapper';
// import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '50vh'
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
  }
}));

function SubPanel ({ game, dispatch, dispatchStates, QIndex }) {
  const classes = useStyles();
  // const [index, setIndex] = useState(0)
  // const [expanded, setExpanded] = React.useState(false);

  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };
  console.log('subPanel render!')
  const uniqId = game.id + QIndex
  // const addQuestion = () => {
  //   const newQuestion = new Question()
  //   dispatch({
  //     type: ACTIONS.MODIFY_QUESTION,
  //     payload: {
  //       gid: game.id,
  //       index: QIndex,
  //       question: newQuestion
  //     }
  //   })
  //   return newQuestion
  // }

  const modifyQuestion = () => {
    // const newQuestion = {
    //   title: getValueById(uniqId + 'title'),
    //   duration: getValueById(uniqId + 'duration'),
    //   options: getValueById(uniqId + 'options'),
    //   answers: getValueById(uniqId + 'answers'),
    //   points: getValueById(uniqId + 'points'),
    //   thumbnail: BlankPic
    // }
  }
  // const question = game.questions[QIndex] || addQuestion()
  const question = game.questions[QIndex]
  const { title, duration, points, options, answers, type } = question
  // const { title, duration, points } = { title: 'title', duration: 5, points: 5 }

  return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image={BlankPic}
                title="Paella dish"
            />

            <div className={classes.content}>

                 <FormControl autoComplete="off" style={{ padding: '0 0 0 2vh' }} >

                    <fieldset
                        style={{
                          maxHeight: '22vh',
                          width: '84%',
                          margin: '0.2vh 0 0 0.7vh',
                          border: '1px dashed grey',
                          borderRadius: '10px'
                        }}>
                        <legend style={{ width: '8vh', paddingLeft: '0.7vh' }}><span>Basic</span></legend>
                        <BasicTextFields label='TITLE' id={uniqId + 'title'} size='small' value={title}/>
                        <MultilineTextFields defaultValue={type}/>
                        <SmallTextFields label='POINTS' id={uniqId + 'points'} size='small' value={points}/>
                        <SmallTextFields label='DURATION' id={uniqId + 'duration'} size='small' value={duration}/>
                    </fieldset>

                        <fieldset style={{
                          overflow: 'scroll',
                          maxHeight: '20.5vh',
                          width: '84%',
                          margin: '0.5vh 0 0 0.7vh',
                          border: '1px dashed grey',
                          borderRadius: '10px'
                        }}>
                            <legend style={{ width: '8vh', paddingLeft: '0.7vh' }}><span>Options</span></legend>

                             <CheckboxLabels options={options} uniqId={uniqId} answers={answers}/>
                            {/* <BasicTextFields label='POINTS' id='GameTitle' size='small'/> */}
                            {/* <BasicTextFields label='DURATION' id='GameTitle' size='small'/> */}
                            {/* <BasicTextFields label='DURATION' id='GameTitle' size='small'/> */}
                            {/* <BasicTextFields label='DURATION' id='GameTitle' size='small'/> */}
                        </fieldset>

                    <div style={{ display: 'flex' }}>
                        <div>
                            <SecondaryButtons label={'DELETE'}/>
                        </div>
                        <div>
                            <PrimaryButtons label={'IMAGE'}/>
                        </div>
                        <div>
                            <PrimaryButtons label={'SAVE'} onClick={modifyQuestion}/>
                        </div>
                        <div>
                            <PrimaryButtons label={'AddQUESTION'}/>
                        </div>

                    </div>

                    {/* <Button size="small" color="primary" type={'submit'}> */}
                    {/*    Submit */}
                    {/* </Button> */}

                 </FormControl>
            </div>

            {/* <Collapse in={expanded} timeout="auto" unmountOnExit> */}
            {/*    <CardContent> */}

            {/*    </CardContent> */}
            {/* </Collapse> */}
            <PaginationLink/>
        </Card>
  );
}
SubPanel.propTypes = {
  game: PropTypes.object,
  dispatchStates: PropTypes.func,
  QIndex: PropTypes.number,
  dispatch: PropTypes.func
}
export default React.memo(SubPanel)
