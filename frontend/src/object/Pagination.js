import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: '0 auto'
    },
    '& > ul': {
      justifyContent: 'center'
    }
  },
}));

export default function PaginationLink ({ handleChange, pages }) {
  const classes = useStyles();

  return (
        <div className={classes.root}>
            <Pagination
                count={pages}
                variant="outlined"
                shape="rounded"
                className={classes.root}
                size={'small'}
                onChange={handleChange}
            />
        </div>
  );
}
PaginationLink.propTypes = {
  handleChange: PropTypes.func,
  pages: PropTypes.number,
  currentPage: PropTypes.number
}
