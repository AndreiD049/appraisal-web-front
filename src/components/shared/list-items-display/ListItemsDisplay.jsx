import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  noDataText: {
    textAlign: 'center',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    color: theme.palette.text.secondary,
  },
}));

const ListItemsDisplay = ({ collection, children }) => {
  const classes = useStyles();
  if (collection.length === 0) return (<Typography className={classes.noDataText} variant="subtitle1">No data...</Typography>);
  return children;
};

ListItemsDisplay.propTypes = {
  collection: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  children: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default ListItemsDisplay;
