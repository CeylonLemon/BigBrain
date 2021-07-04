import React from 'react'
import PropTypes from 'prop-types';
function BoilerPlate ({ prop }) {
  console.log('render!')
  return <></>
}
BoilerPlate.propTypes = {
  prop: PropTypes.any
}
export default React.memo(BoilerPlate)
