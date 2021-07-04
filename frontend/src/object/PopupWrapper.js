import React, { useContext } from 'react';
import { UserContext, ControlContext, AlertContext } from '../helper/UserContext';
import Popup from './Popup';

function PopupWrapper () {
  const { games, dispatch } = useContext(UserContext)
  const { states, dispatchStates } = useContext(ControlContext)
  const { dispatchAlert } = useContext(AlertContext)
  console.log('popupwrapper render')
  const game = (() => {
    for (const g of games) {
      if (g.id === states.editing) { return g }
    }
  })()
  return <>
        <Popup
            game={game}
            open={states.open}
            dispatchStates={dispatchStates}
            dispatch={dispatch}
            dispatchAlert = {dispatchAlert}
        />
    </>
}
export default PopupWrapper
