import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { red } from '@material-ui/core/colors';
import BasicEditor from './BasicEditor';
import PropTypes from 'prop-types';
import OptionsEditor from './OptionsEditor';
import { CardActions } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    marginTop: '3vh'
  },
  header: {
    padding: '5px 5px 0 20px'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
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

}));
const QuestionEditor = forwardRef((props, ref) => {
  useImperativeHandle(
    ref,
    () => ({
      getQuestionInfo () {
        const basicInfo = basicEditorRef.current.getBasicInfo()
        const optionsInfo = optionEditorRef.current.getOptionsInfo()
        return { ...basicInfo, ...optionsInfo }
      }

    })
  )
  const classes = useStyles();
  const { question, deleteQuestion } = props
  const basicEditorRef = useRef()
  const optionEditorRef = useRef()
  const addOption = () => {
    optionEditorRef.current.appendOption()
  }
  return (
        <Card className={classes.root}>
            <CardContent>
                <BasicEditor
                    question={question}
                    ref={basicEditorRef}
                    optionEditorRef={optionEditorRef}
                    addOption={addOption}
                    deleteQuestion={deleteQuestion}
                />
                <OptionsEditor options={question.options} answers={question.answers} ref={optionEditorRef}/>
            </CardContent>
            <CardActions>
            </CardActions>
        </Card>
  );
})
QuestionEditor.propTypes = {
  question: PropTypes.array,
  deleteQuestion: PropTypes.func,
}
QuestionEditor.displayName = 'QuestionEditor'
export default React.memo(QuestionEditor)
