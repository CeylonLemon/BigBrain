import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { getComparator, stableSort } from '../helper/table';
import { EnhancedTableHead } from './EnhancedTableHead'
import { EnhancedTableToolbar } from './EnhancedTableToolbar'
import { sendRequest } from '../helper/api';
import { initGame } from './game';
import { getAllQuizzes, getQuiz } from '../helper/request';
import { UserContext } from '../helper/UserContext';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { TF } from './GameTable.element'
import { Link } from 'react-router-dom';
import { PrimaryButton, PlayButton } from './Button';
const useStyles = makeStyles((theme) => ({
  root: {
    margin: '5% 0 0 5%',
    width: '100%',
  },
  paper: {

    width: '90%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function GameTable () {
  const classes = useStyles();
  const { token } = useContext(UserContext);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const [games, setGames] = React.useState([initGame()])

  console.log(games)
  function createData (Id, Title, questions) {
    let Time = 0;
    questions.forEach((q) => { Time += q.limit })
    const Questions = questions.length
    return { Id, Title, Questions, Time };
  }

  useEffect(() => {
    getAllGames();
  }, [])

  useEffect(() => {
    const r = [];
    games.map(g => {
      console.log(g)
      r.push(createData(g.id, g.name, g.questions))
      return g;
    })
    setRows(r);
  }, [games])

  // delete game when button triggered
  function deleteGame (id, idx) {
    // send request
    sendRequest('admin/quiz/' + id, false, 'DELETE', token)
    // update game list
      .then(() => {
        const gs = [...games];
        gs.splice(idx, 1)
        setGames(gs);
      })
  }

  async function getAllGames () {
    const gs = []
    getAllQuizzes(token)
    // get further info of each quiz
      .then(async (data) => {
        console.log(data.quizzes)
        const ps = [];
        data.quizzes.forEach((q, i) => {
          ps.push(getQuiz(q.id, token)
            .then(data => {
              q.questions = data.questions;
              q.owner = data.owner;
              gs.push(q);
            }))
        })
        return Promise.all(ps)
      }).then(() => {
        setGames(gs);
      })
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                              .map((row, index) => {
                                console.log(row)
                                const isItemSelected = isSelected(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.id)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.Id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </TableCell>
                                            <TableCell align="left" component="th" id={labelId} scope="row" padding="none">
                                                {row.Id}
                                            </TableCell>
                                            <TableCell align="left" padding={'5px'}>{row.Title}</TableCell>
                                            <TableCell align="left">{row.Questions}</TableCell>
                                            <TableCell align="left">{row.Time}</TableCell>
                                            <TableCell align="left">
                                                <IconButton aria-label="play"
                                                            className={classes.margin}>
                                                    <PlayButton id={row.Id} game={games[index]}/>
                                                </IconButton>
                                                <IconButton onClick={() => deleteGame(row.Id, index)}
                                                                                aria-label="delete"
                                                                                className={classes.margin}
                                                                                type='deleteButton'>
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                                <Link to={{
                                                  pathname: '/editGames/newGame',
                                                  state: { game: games[index] }
                                                }}>
                                                    <IconButton aria-label="edit"
                                                                className={classes.margin}>
                                                        <EditIcon fontSize="small" />
                                                    </IconButton>
                                                </Link>

                                            </TableCell>
                                        </TableRow>
                                );
                              })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            <TF>
                <FormControlLabel
                    control={<Switch checked={dense} onChange={handleChangeDense} />}
                    label="Dense padding"
                />
                <Link to={{
                  pathname: '/editGames/newGame',
                  state: { game: initGame() }
                }}>
                    <PrimaryButton text={'✛'} type={'addGame'}/>
                </Link>

            </TF>

        </div>
  );
}
GameTable.propTypes = {
  games: PropTypes.array
};
