import React, { useState } from 'react'
import PropTypes from 'prop-types';
function BoilerPlate ({ prop }) {
  const [count, setCount] = useState(0)
  console.log('render!')
  return <>
    <span>{count}</span>
    <button onClick={() => {
      setCount(prev => prev + 1)
    }
    }>add</button>
    </>
}
BoilerPlate.propTypes = {
  prop: PropTypes.any
}
export default React.memo(BoilerPlate)
