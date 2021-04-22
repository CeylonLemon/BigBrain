import React from 'react';
import PropTypes from 'prop-types';

export function CopyButton ({ text }) {
  const copyLink = () => {
    const dummy = document.createElement('input');

    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
    alert('link copied!')
  }

  return <>

            <button onClick={copyLink}>Copy Link</button>
</>
}
CopyButton.propTypes = {
  text: PropTypes.string
}
