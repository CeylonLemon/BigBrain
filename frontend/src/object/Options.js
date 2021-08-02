import React, { useState, createRef, useImperativeHandle, forwardRef } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { BasicTextFields } from './TextFiled';
import PropTypes from 'prop-types';
import { FormControl } from '@material-ui/core';
import { DeleteOption } from './icons';
import { uuid } from './helpers';
import Box from '@material-ui/core/Box';

const Options = forwardRef((props, ref) => {
  const { options, answers } = props
  const [option, setOptions] = useState({
    optionRefs: options.map(option => createRef()),
    uniqIds: options.map(option => uuid()),
    selectionCheckList: options.map(o => (answers.includes(o)))
  })
  useImperativeHandle(ref, () => ({
    addOptionFromSubPanel () {
      setOptions(prevOptions => {
        const newOptionRefs = [...prevOptions.optionRefs, createRef()];
        const newUniqIds = [...prevOptions.uniqIds, uuid()];
        return { ...prevOptions, optionRefs: newOptionRefs, uniqIds: newUniqIds }
      }
      )
    },

  }))

  const deleteThisOption = (index) => {
    return () => {
      setOptions(prevOptions => {
        const newOptions = prevOptions.optionRefs.filter((option, i) => {
          return i !== index
        })
        const newUniqIds = prevOptions.uniqIds.filter((option, i) => {
          return i !== index
        })
        console.log(newOptions, newUniqIds)
        return { ...prevOptions, optionRefs: newOptions, uniqIds: newUniqIds }
      }
      )
    }
  }
  return (
      <FormControl>
        {option.optionRefs
          ? option.optionRefs.map((ref, i) => (
                <Box
                    key={option.uniqIds[i]}
                    style={{
                      display: 'flex'
                    }}
                >
                  <label htmlFor={`OPTION${i}`}>
                    <BasicTextFields
                        refValue={ref}
                        label={'OPTION' + (+i + 1)}
                        value={options[i]}
                        size={'medium'}
                        id={option.uniqIds[i]}/>
                  </label>
                  <Box style={{ display: 'flex' }}>
                    <Checkbox
                        defaultChecked={option.selectionCheckList[i]}
                        id={`OPTION${i}`}
                    />
                    {i > 1
                      ? <DeleteOption
                            handleClick={deleteThisOption(i)}
                            style={{
                              width: '3vh',
                              height: '3vh',
                              marginTop: '33%'
                            }}
                        />
                      : undefined
                    }
                  </Box>
                </Box>
          ))
          : undefined
        }
      </FormControl>
  );
})
Options.propTypes = {

  answers: PropTypes.array,
  controlRef: PropTypes.object,
  options: PropTypes.array,
  uniqId: PropTypes.string
}
Options.displayName = 'Options'
export default React.memo(Options)
