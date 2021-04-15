import { useHistory } from 'react-router-dom';
import React from 'react'
export const EditButton = () => {
  console.log(111)
  const history = useHistory();
  const handleClick = () => {
    history.push('/editGame');
  }
  return (
        <button type="button" onClick={handleClick}>
            Add new game
        </button>
  );
}
