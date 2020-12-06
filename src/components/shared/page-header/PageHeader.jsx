import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const PageHeader = ({ text }) => {
  const classes = useStyles();
  return (
    <Typography variant="h4" align="center" className={classes.root}>{text}</Typography>
  );
};

PageHeader.propTypes = {
  text: PropTypes.string.isRequired,
};

export default PageHeader;
