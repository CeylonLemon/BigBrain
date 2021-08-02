import React, { forwardRef, useContext, useImperativeHandle, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { BlankPic } from '../helper/helper';
import { CardActions, TextareaAutosize } from '@material-ui/core';
import { EditIcon, SubmitIcon, AddQuestion, DeleteQuestion } from './icons';
import PropTypes from 'prop-types';
import { DenseTextFields, MultilineTextFields } from './TextFiled';
import { useForm, Controller } from 'react-hook-form';
import { FileInput } from './Button';
import { MediaContext } from '../helper/UserContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '95%',
    margin: '0 auto'
  },
  deviceRoot: {
    display: 'flex',
    margin: '0 auto',
    flexDirection: 'column-reverse'
  },
  title: {
    marginLeft: '1vh',
    maxHeight: '15vh',
    overflow: 'scroll'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: '60%',
    flex: '1 0 auto',
  },
  deviceDetails: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 0 auto',
  },
  content: {

    padding: '2px'
  },
  cover: {
    width: 200,
    flex: '2.5 0 auto',
  },
  deviceCover: {
    height: 150,
    flex: '2.5 0 auto',
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
  editIcon: {
    width: '3vh',
    height: '3vh',
    position: 'relative',
    top: '0.5vh'
  }
}));
const BasicEditor = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    getBasicInfo () {
      return {
        duration: watch('Duration'),
        points: watch('Points'),
        type: watch('Type'),
        title: watch('Title')
      }
    }
  }

  ))
  const classes = useStyles();
  const { question, addOption, deleteQuestion } = props
  const defaultValues = {
    Duration: question.duration,
    Points: question.points,
    Type: question.type,
    Title: question.title
  }
  const [editing, setEditing] = useState(false)
  const { isDevice } = useContext(MediaContext)
  const openEditor = () => {
    setEditing(prevState => !prevState)
  }
  const { watch, control, handleSubmit } = useForm({
    defaultValues
  })
  const onSubmit = (data) => {
    alert(data)
  };
  return (
        <Card className={isDevice ? classes.deviceRoot : classes.root}>
            <div className={isDevice ? classes.deviceDetails : classes.details}>
                <CardContent className={classes.content}>
                    <form
                        autoComplete='off'
                        style={{ padding: '1vh 0 1vh 0' }}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Controller
                            name="Duration"
                            control={control}
                            render={
                                ({ field }) =>
                                    <DenseTextFields
                                        label='时长'
                                        {...field}
                                    />
                            }
                        />
                        <Controller
                            name="Points"
                            control={control}
                            render={
                                ({ field }) =>
                                    <DenseTextFields
                                        label='分数'
                                        {...field}
                                    />
                            }
                        />
                        <Controller
                            name="Type"
                            control={control}
                            render={
                                ({ field }) =>
                                    <MultilineTextFields
                                        value='单选'
                                        field={{ ...field }}
                                    />
                            }
                        />
                        <div className={classes.title}>
                            {editing
                              ? <div style={{ paddingTop: '10px' }}>
                                    <Controller
                                        name="Title"
                                        control={control}
                                        render={
                                            ({ field }) =>
                                                <TextareaAutosize
                                                    minRows={2}
                                                    maxRows={4}
                                                    style={{ width: '28vh', margin: 0 }}
                                                    {...field}
                                                />
                                        }
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
                                    {watch('Title')}
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

                </CardContent>
                <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <AddQuestion
                        style={{ height: '25px', width: '25px' }}
                        handleClick={addOption}
                    />
                    <FileInput style={{ height: '25px', width: '25px', marginTop: '5px' }}/>
                    <DeleteQuestion
                        style={{ height: '25px', width: '25px' }}
                        handleClick={deleteQuestion}
                    />
                </CardActions>
            </div>
            <CardMedia
                className={isDevice ? classes.deviceCover : classes.cover}
                image={BlankPic}
                title="Live from space album cover"
            />
        </Card>
  );
})
BasicEditor.propTypes = {
  editorSwitch: PropTypes.func,
  addOption: PropTypes.func,
  deleteQuestion: PropTypes.func,
  question: PropTypes.object,

}
BasicEditor.displayName = 'QuestionEditor'
export default React.memo(BasicEditor)
