import React from 'react';
import PropTypes from 'prop-types';
import './Option.css'

export default function Option ({ o, setSelected, selected, index }) {
  const optionStyle = {
    border: '1px solid grey',
    borderRadius: '3px',
    margin: '5px 0 5px 0',
    width: '200px',
    padding: '2px',
    breakInside: 'avoid',
    boxShadow: '2px 2px 2px grey',
    height: '50px'
  }
  const handleSelection = () => {
    const s = [...selected]
    s[index] = !selected[index]
    setSelected(s)
    const dom = document.getElementById('option' + index)
    dom.style.backgroundColor = s[index] ? 'white' : 'red'
  }
  return (
      <div className={'option'} id={'option' + index} style={optionStyle} onClick={handleSelection}>
        {o}
      </div>
  );
}
Option.propTypes = {
  o: PropTypes.string,
  setSelected: PropTypes.func,
  selected: PropTypes.array,
  index: PropTypes.number

}
