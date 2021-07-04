import React from 'react';
// import { withStyles } from '@material-ui/core/styles';
// import { green } from '@material-ui/core/colors';
// import FormGroup from '@material-ui/core/FormGroup';
// x    import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { BasicTextFields } from './TextFiled';
import PropTypes from 'prop-types';
// import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
// import CheckBoxIcon from '@material-ui/icons/CheckBox';
// import Favorite from '@material-ui/icons/Favorite';
// import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

// const GreenCheckbox = withStyles({
//   root: {
//     color: green[400],
//     '&$checked': {
//       color: green[600],
//     },
//   },
//   checked: {},
// })((props) => <Checkbox color="default" {...props} />);

export default function CheckboxLabels ({ options, answers, uniqId }) {
  const [state, setState] = React.useState(options.map(o => (answers.includes(o))));
  const handleChange = (index) => {
    // event.target.checked = !event.target.checked
    setState(prevState => {
      prevState[index] = !prevState[index]
      return [...prevState]
    });
  };

  return (
        <div>
            {options
              ? options.map((o, i) => (
                  <div
                      key={uniqId.id + 'option' + i}
                      style={{
                        display: 'flex'
                      }}
                  >
                      <BasicTextFields label={'OPTION' + i} value={o} size={'small'}/>

                          <Checkbox defaultChecked={state[i]} onChange={() => { handleChange(i) }} />

                  </div>
                ))
              : undefined
            }
        </div>
  );
}
CheckboxLabels.propTypes = {
  answers: PropTypes.array,
  options: PropTypes.array,
  uniqId: PropTypes.string
}
