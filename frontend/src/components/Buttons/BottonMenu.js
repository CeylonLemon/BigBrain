import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    '& button': {
      padding: '0',
      position: 'relative',
      right: '25px'
    }
  },
  paper: {
  },
}));

export default function ButtonMenu ({ handleClickLists }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = (event) => {
    event.stopPropagation()
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    event.stopPropagation()
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown (event) {
    event.stopPropagation()
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
        <div className={classes.root}>
            {/* <Paper className={classes.paper}> */}
            {/*    <MenuList> */}
            {/*        <MenuItem>Profile</MenuItem> */}
            {/*        <MenuItem>My account</MenuItem> */}
            {/*        <MenuItem>Logout</MenuItem> */}
            {/*    </MenuList> */}
            {/* </Paper> */}
            <div>
                <Button
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                    style={{ fontWeight: 'bold', fontSize: '3em' }}
                >
                    ⋮
                </Button>
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal style={{ zIndex: '1' }}>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList
                                        style={{ position: 'relative', top: '0', left: '0' }}
                                        autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                        {Object.keys(handleClickLists).map(key => (
                                            <MenuItem key={key} onClick={handleClickLists[key]}>{key}</MenuItem>
                                        ))}
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        </div>
  );
}
ButtonMenu.propTypes = {
  handleClickLists: PropTypes.array,
}
