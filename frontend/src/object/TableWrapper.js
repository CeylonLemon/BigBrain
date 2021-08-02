import React, { useContext, Fragment } from 'react';
import { UserContext } from '../helper/UserContext';
import Table from './Table'
import PropTypes from 'prop-types';
import { makeStyles, Box } from '@material-ui/core';
import MediaQuery from 'react-responsive/src';

const useStyles = makeStyles((theme) => ({
  table: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%,-45%)',
    boxShadow: '1px 1px 5px black',
    minHeight: '300px',
    minWidth: '350px',
    width: '80%'
  },
  smallTable: {
    fontSize: '1em'
  },
  largeTable: {
    fontSize: '2em'
  }
}))

function TableWrapper ({ bodyRef }) {
  console.log('tablewrapper render')
  const { gamesState, gamesIsLoading } = useContext(UserContext);
  const classes = useStyles()
  const calcTime = (g) => {
    let time = 0;
    if (!g.questions.length) { return 0 }
    g.questions.forEach((q, i) => { time = parseInt(time) + parseInt(q.duration) });
    // this.time = time
    return time;
  }
  // gamesState.then(data => console.log(data))
  console.log(gamesState.prototype)
  const rows = gamesState.games.map(g => {
    return [g.id, g.name, g.questions.length, calcTime(g), 'button']
  })
  console.log(rows)
  // rows.unshift(['ID', 'NAME', 'QUESTIONS', 'DURATION', 'BUTTON'])
  return <Fragment>
    {
    gamesIsLoading
      ? <p>Loading...</p>
      : <Fragment>
          <MediaQuery minWidth={691}>
            <Box className={classes.table} style={{ fontSize: '1.25em' }}>
            <Table rows={rows} mediaSize='large'/>
            </Box>
          </MediaQuery>
          <MediaQuery maxWidth={690}>
        <Box className={classes.table} style={{ fontSize: '0.4em' }}>
            <Table rows={rows} mediaSize='small'/>
      </Box>
          </MediaQuery>
        </Fragment>
  }
  </Fragment>
}
TableWrapper.propTypes = {
  bodyRef: PropTypes.object
}
export default React.memo(TableWrapper)
