import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(0),

    },
    '& > ul': {
      justifyContent: 'center'
    }
  },
}));

export default function PaginationLink () {
  const classes = useStyles();

  return (
        <div className={classes.root}>
            <Pagination count={10} variant="outlined" shape="rounded" className={classes.root} size={'small'} />
        </div>
  );
}
