import { Box, Button, Typography } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './style';

const TryOutStep = ({ prevStep, handleSubmit, handleGenerate }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle1">
        You can generate your report to check if everything is working.
        { ' ' }
        After, you can click &apos;Submit&apos; to save it.
      </Typography>
      <Box className={classes.buttons}>
        <Button
          onClick={prevStep}
          variant="contained"
          color="primary"
        >
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
        <Button
          onClick={handleGenerate}
          variant="contained"
          color="primary"
        >
          Generate
        </Button>
      </Box>
    </Box>
  );
};

TryOutStep.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  handleGenerate: PropTypes.func.isRequired,
};

export default TryOutStep;
