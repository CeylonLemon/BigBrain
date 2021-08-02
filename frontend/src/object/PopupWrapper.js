import React, { useContext } from 'react';
import { UserContext } from '../helper/UserContext';
import Popup from './Popup';
import MediaQuery from 'react-responsive/src';
import {
  CacheRoute, CacheSwitch,
} from 'react-router-cache-route';

function PopupWrapper () {
  const { gamesState, gamesIsLoading } = useContext(UserContext)
  console.log('popupwrapper render', gamesState.games)

  return <>
    {
      gamesIsLoading
        ? undefined
        : <CacheSwitch>
            <CacheRoute path="/home/editGames" when="always" multiple>
              <MediaQuery minWidth={451}>
                <Popup mediaSize='large'/>
              </MediaQuery>
              <MediaQuery maxWidth={450}>
                <Popup mediaSize='small'/>
              </MediaQuery>
            </CacheRoute>
          </CacheSwitch>
    }
  </>
}
export default React.memo(PopupWrapper)
