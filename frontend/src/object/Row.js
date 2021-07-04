import { Delete, Edit, Play } from './icons';
import React, { useState, useContext } from 'react';
import CircularIndeterminate from './Circle';
import PropTypes from 'prop-types';
// import Popup from './Popup';
import { turn } from './Table';
import { deleteQuiz } from '../helper/request';
import { ACTIONS, UserContext, ControlContext } from '../helper/UserContext';
const token = sessionStorage.getItem('token')
function Row ({ row }) {
  // console.log(row, ' render!')
  // console.log(row[0] === 'Name')
  const [Deleting, setDeleting] = useState(false)
  const { dispatchStates } = useContext(ControlContext)
  // console.log(game)
  // console.log(game, game.id)
  // const row = game.id ? [game.id, game.name, game.questions.length, game.calcTime(), 'button'] : row

  const { dispatch } = useContext(UserContext)
  const Styles = () => {
    const rowStyle = {
      padding: '1vh',
      height: '8vh',
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'space-around',
      margin: '2vh'
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
      lastCellStyle: { ...cellStyle, width: '30%' },
      deleteIconStyle: iconStyle,
      editIconStyle: iconStyle,
      playIconStyle: { ...iconStyle, padding: '0.2vh' }

    }
  }
  const styles = Styles()

  const handleEdit = () => {
    dispatchStates({
      type: ACTIONS.OPEN_POPUP,
      payload: {
        id: row[0]
      }
    })
  }

  const handleDelete = () => {
    setDeleting(true)
    deleteQuiz(row[0], token)
      .then(dispatch({ type: ACTIONS.DELETE_GAME, payload: { id: row[0] } }))
  }

  // const handlePlay(){
  //
  // }

  return (
        <div
            id = {row[0] === 'Name' ? 'tableHeader' : 'row'}
            style={row[0] === 'Name' ? styles.headerRow : styles.row}
            className="row"
            data-selected = "off"
            onClick={(e) => {
              e.stopPropagation()
              const state = e.currentTarget.dataset.selected
              turn[state](e.currentTarget)
            }}
        >
            {row.map((ele, i) =>
              i === row.length - 1
                ? row[0] === 'ID'
                    ? <div
                            style={styles.lastCellStyle}
                            key={row[0] + i}
                        >
                            {ele}
                        </div>

                    : <div
                            style={{ ...styles.lastCellStyle, display: 'flex' }}
                            key={row[0] + i}
                        >

                            <Play
                                style={styles.playIconStyle}
                                // handlePlay ={handlePlay}
                            />
                             <Edit style={styles.editIconStyle} handleEdit={handleEdit} />
                            {Deleting
                              ? <CircularIndeterminate
                                    style={styles.deleteIconStyle}/>
                              : <Delete
                                    style={styles.deleteIconStyle}
                                    handleDelete = {handleDelete}
                                />}

                        </div>

                : <div style={styles.cell}
                             key={row[0] + i}
                        >
                            {ele}
                        </div>

            )}
        </div>
  );
}
Row.propTypes = {
  style: PropTypes.object,
  row: PropTypes.array,
  handleDelete: PropTypes.func,
  game: PropTypes.object
}

export default React.memo(Row)
