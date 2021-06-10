import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { UserContext } from '../helper/UserContext';
import { Link } from 'react-router-dom'
import { Sugar } from './NavBar.element'
import { MenuItem } from '@material-ui/core'
import styled from 'styled-components';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const TB = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`
export default function ButtonAppBar () {
  const classes = useStyles();
  const { token, setToken } = useContext(UserContext)

  return (
        <div className={classes.root}>
            <AppBar icon="static">
                <TB>
                    <Sugar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <MenuItem component={Link} to={'/home'}>Home</MenuItem>
                    </Sugar>
                    {token
                      ? <MenuItem component={Button} onClick={() => { setToken(''); }}>Logout</MenuItem>
                      : <MenuItem component={Link} to={'/SignIn'}>Login</MenuItem>
                    }
                </TB>
            </AppBar>
        </div>
  );
}
