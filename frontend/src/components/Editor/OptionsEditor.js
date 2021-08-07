import React, { forwardRef, useEffect, useImperativeHandle } from 'react'
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { DeleteOption } from '../Buttons/icons';
import { Paper, TextareaAutosize } from '@material-ui/core';
import CheckBox from '@material-ui/core/Checkbox';
import { useForm, useFieldArray, Controller } from 'react-hook-form';

const OptionsEditor = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    getOptionsInfo () {
      const optionsInfo = { options: [], answers: [] }
      fields.forEach((field, index) => {
        const option = watch(`items[${index}].option`)
        optionsInfo.options.push(option)
        if (watch(`items[${index}].isAnswer`)) { optionsInfo.answers.push(option) }
      })
      return optionsInfo
    },
    appendOption () {
      append({ option: '1', isAnswer: false })
    }
  }))

  const removeOption = (index) => {
    return () => { remove(index) }
  }
  const { options, answers } = props
  console.log('oe update', options, answers)
  const { watch, reset, control, handleSubmit } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items'
  });

  function Option ({ option, index, isAnswer }) {
    return <div style={{ display: 'flex' }}>
            <Controller
                name={`items[${index}].option`}
                control={control}
                render={({ field }) =>
                    <TextareaAutosize
                        value={option}
                        {...field}
                        rows={2}
                    />
                }
            />
            <div style={{ display: 'flex' }}>
                <Controller
                    name={`items[${index}].isAnswer`}
                    control={control}
                    render={
                        ({ field }) =>
                            <CheckBox
                                defaultChecked={isAnswer}
                                {...field}
                            />
                    }
                />
                <div style={{ padding: '9px 6px 9px 3px', display: 'inline-block', verticalAlign: 'center', marginTop: '0.5vh' }}>
                    <DeleteOption
                        style={{ height: '2.5vh', width: '2.5vh' }}
                        handleClick={removeOption(index)}
                    />
                </div>
            </div>
        </div>
  }
  Option.propTypes = {
    option: PropTypes.string,
    index: PropTypes.number,
    isAnswer: PropTypes.bool
  }

  useEffect(() => {
    reset({
      items: options.map(option => {
        return { option: option, isAnswer: answers.includes(option) }
      })
    });
  }, [options]);

  const onSubmit = data => { console.log(data); console.log(fields) }
  return <Paper style={{ display: 'flex', padding: '2vh 0 0 3vh', boxSizing: 'border-box', marginTop: '2vh', overflow: 'scroll' }}>
        <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={0.8} style={{ margin: '0 auto' }}>
                {
                    fields.map(({ id, option, isAnswer }, index) => {
                      return (<Grid item key={id}>
                            <Option option={option} isAnswer={isAnswer} index={index}/>
                        </Grid>);
                    })
                }
            </Grid>
        </form>
    </Paper>
})
OptionsEditor.propTypes = {
  options: PropTypes.array,
  answers: PropTypes.array
}
OptionsEditor.displayName = 'OptionsEditor'
export default React.memo(OptionsEditor)
