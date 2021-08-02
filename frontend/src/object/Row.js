import { Delete, Edit, Play } from './icons';
import React, { useState, Fragment } from 'react';
import CircularIndeterminate from './Circle';
import PropTypes from 'prop-types';
import { turn } from './Table';
import { deleteQuiz, endGame, getQuiz, startGame } from '../helper/api';
import { ACTIONS } from '../helper/UserContext';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import ButtonMenu from './BottonMenu';
const token = sessionStorage.getItem('token')
const useStyles = makeStyles((theme) => ({
  row: {
    transition: '0.5s',
  },
  '& :not(:first-child):hover': {
    backgroundColor: 'lightcyan'
  },
  lastCell: {
    transition: '0.2s',
    '& > *:hover': {
      transform: 'scale(1.2)'
    }
  },
  buttonMenu: {
    width: '10px'
  }

}))
function Row ({ row, dispatchGames, index, mediaSize }) {
  const [Deleting, setDeleting] = useState(false)
  const history = useHistory()
  const classes = useStyles()
  const Styles = () => {
    const rowStyle = {
      padding: '1vh',
      height: '8vh',
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'space-around',
      margin: '2vh 2vh 0 2vh'
    }
    const cellStyle = {
      verticalAlign: 'center',
      width: '30%',
      textAlign: 'left'
    }
    const iconStyle = {
      height: '3vh',
      width: '3vh',
      margin: '1vh'
    }

    return {
      row: rowStyle,
      headerRow: { ...rowStyle, fontWeight: 'bold', fontSize: '1.5em' },
      cell: cellStyle,
      numberCell: { ...cellStyle, textAlign: 'center' },
      lastCellStyle: { ...cellStyle, width: '30%' },
      deleteIconStyle: iconStyle,
      editIconStyle: iconStyle,
      playIconStyle: { ...iconStyle, padding: '0.2vh' }

    }
  }
  const styles = Styles()
  const handleControl = (index, id) => {
    return (e) => {
      e.stopPropagation()
      history.push({
        pathname: '/home/editGames',
        search: `?id=${id}`,
        state: {
          index: index
        }
      })
    }
  }

  const handlePlay = () => {
    startGame(row[0])
      .then(data => { return getQuiz(row[0]) })
      .then(data => {
        history.push({
          pathname: '/waitForPlayers',
          search: `?gid=${row[0]}&pin=${data.active}`,
          state: {
            index: index
          }
        })
      })
      .catch(e => {
        alert(e);
        endGame(row[0])
          .then(handlePlay)
      })

    // const returnData = await getQuiz(row[0]).catch(e => alert(e))
    // history.push({
    //   pathname: '/waitForPlayers',
    //   search: `?gid=${row[0]}&pin=${returnData.active}`,
    //   state: {
    //     index: index
    //   }
    // })
  }

  const handleDelete = () => {
    setDeleting(true)
    deleteQuiz(row[0], token)
      .then(dispatchGames({ type: ACTIONS.DELETE_GAME, payload: { id: row[0] } }))
  }

  return (
      <div
          id = {row[0] === 'Name' ? 'tableHeader' : 'row'}
          style={row[0] === 'Name' ? styles.headerRow : styles.row}
          className={classes.row}
          data-selected = "off"
          onClick={(e) => {
            e.stopPropagation()
            const state = e.currentTarget.dataset.selected
            turn[state](e.currentTarget)
          }}
      >
        <Fragment>
          {row[0] === 'ID'
            ? <Fragment>
                <div style={styles.cell} >
                  {row[0]}
                </div>
                <div style={styles.cell} >
                  {row[1]}
                </div>
                <div style={styles.numberCell}>
                  {row[2]}
                </div>
                <div style={styles.numberCell}>
                  {row[3]}
                </div>
                {mediaSize === 'small'
                  ? <div>&nbsp;</div>
                  : <div style={styles.cell}>
                      {row[4]}
                    </div>}
              </Fragment>
            : <Fragment>
                <div style={styles.cell} >
                  {row[0]}
                </div>
                <div style={styles.cell} >
                  {row[1]}
                </div>
                <div style={styles.numberCell}>
                  {row[2]}
                </div>
                <div style={styles.numberCell} >
                  {row[3]}
                </div>
                {mediaSize === 'small'
                  ? <span className={classes.buttonMenu}>
                      <ButtonMenu
                          handleClickLists={{
                            Play: handlePlay,
                            Edit: handleControl(index, row[0]),
                            Delete: handleDelete
                          }}
                      />
                    </span>
                  : <Box
                        className={classes.lastCell}
                        style={{ ...styles.lastCellStyle, display: 'flex' }}
                        key={row[4] + 4}
                    >
                      <Play style={styles.playIconStyle} handlePlay={handlePlay}/>
                      <Edit style={styles.editIconStyle} handleEdit={handleControl(index, row[0])} />
                      {Deleting
                        ? <CircularIndeterminate
                              style={styles.deleteIconStyle}/>
                        : <Delete
                              style={styles.deleteIconStyle}
                              handleDelete = {handleDelete}
                          />}
                    </Box>}
              </Fragment>
          }
        </Fragment>
      </div>
  );
}
Row.propTypes = {
  mediaSize: PropTypes.string,
  style: PropTypes.object,
  row: PropTypes.array,
  handleDelete: PropTypes.func,
  game: PropTypes.object,
  handleControl: PropTypes.func,
  dispatchGames: PropTypes.func,
  index: PropTypes.any
}

export default React.memo(Row)
