import React from 'react'
import { BasicTextFields } from './TextFiled';
// import { BlankPic } from '../helper/helper';
import { TextButtons } from './Button';
import { BlankPic } from '../helper/helper';
import { ACTIONS } from '../helper/UserContext';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { getValueById } from './helpers';
// export default function MainPanel (props) {
//   const { game, dispatch } = props
//   const ModifyGame = (e) => {
//     e.preventDefault();
//     const newTitle = getValueById('GameTile')
//     dispatch({
//       type: ACTIONS.MODIFY_GAME,
//       payload: {
//         id: game.id,
//         newGame: { ...game, name: newTitle }
//       }
//     })
//   }
//   return <form autoComplete="off" onSubmit = {ModifyGame}>
//         <BasicTextFields label='TITLE' id='GameTitle' value={game.name}/>
//         <img src={BlankPic} alt={'no img'}/>
//         <TextButtons/>
//     </form>
// }
// MainPanel.propTypes = {
//   id: PropTypes.number,
//   game: PropTypes.object,
//   dispatch: PropTypes.func
// }

const useStyles = makeStyles({
  root: {
    width: '40vh'
  },
  media: {
    height: 140,
  },
});
function MainPanel (props) {
  console.log('mainPanel render!')
  const classes = useStyles();
  const { game, dispatch, dispatchAlert } = props
  const ModifyGame = (e) => {
    e.preventDefault();
    const newTitle = getValueById('GameTitle')
    console.log('MainPanel render')
    dispatch({
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
  return (
      <Card className={classes.root}>
        {/* <CardActionArea> */}
          <CardMedia
              className={classes.media}
              image={BlankPic}
              title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {'ID: ' + game.id}
            </Typography>
              <form autoComplete="off" onSubmit = {ModifyGame}>
                <BasicTextFields label='TITLE' id='GameTitle' value={game.name}/>

                <TextButtons/>
                <Button size="small" color="primary" type={'submit'}>
                  Submit
                </Button>
              </form>
          </CardContent>
        {/* </CardActionArea> */}
        <CardActions>

          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
  );
}
MainPanel.propTypes = {
  id: PropTypes.number,
  game: PropTypes.object,
  dispatch: PropTypes.func,
  dispatchAlert: PropTypes.func,
  setAlert: PropTypes.func
}
export default React.memo(MainPanel)
