import React, { useContext } from 'react'
import PropTypes from 'prop-types';
import SubPanel from './SubPanel';
import { ControlContext, UserContext } from '../helper/UserContext';
export default function SubPanelWrapper ({ game }) {
  const { states, dispatchStates } = useContext(ControlContext)
  const { dispatch } = useContext(UserContext)
  const QIndex = states.QIndex
  return <SubPanel
    QIndex={QIndex}
    dispatchStates={dispatchStates}
    game={game}
    dispatch={dispatch}
  />
}
SubPanelWrapper.propTypes = {
  game: PropTypes.object
}
