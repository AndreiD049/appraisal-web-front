import {
  Box, Button, OutlinedInput, Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import useStyles from './style';
import JsonEditorComponent from '../../../shared/json-editor-component';

const AggregationStep = ({ advanceStep }) => {
  const classes = useStyles();
  // const [aggregation, setAggregation] = useState('');

  // const handleChange = (evt) => {
  //   evt.persist();
  //   let result = evt.target.value;
  //   if (result.slice(-1) === '{') {
  //     result += '}';
  //   // setTimeout(() => { evt.target.selectionStart = evt.target.selectionEnd = 0; }, 0);
  //   }
  //   setAggregation(result);
  // };

  // const handleEnterKey = (evt) => {
  //   if (evt.key === 'Enter') {
  //     console.log(evt.target);
  //   }
  // };

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle1">
        Create a valid MongoDB aggregation.
        Test and verify if it returns valid info below.
        For more info, refer to MongoDB
        {' '}
        <a href="https://docs.mongodb.com/manual/aggregation/" target="_blank" rel="noopener noreferrer">documentation</a>
        .
      </Typography>
      <JsonEditorComponent className={classes.multilineInput} />
      <Button variant="contained" color="primary" onClick={advanceStep}>Next</Button>
    </Box>
  );
};

AggregationStep.propTypes = {
  advanceStep: PropTypes.func.isRequired,
};

export default AggregationStep;
