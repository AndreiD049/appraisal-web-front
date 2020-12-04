import {
  Box, Button, Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import useStyles from './style';
import JsonEditorComponent from '../../../shared/json-editor-component';
import ReportingService from '../../../../services/ReportingService';

const AggregationStep = ({ value, setValue, advanceStep }) => {
  const classes = useStyles();
  const [sample, setSample] = useState('');

  const handleSample = async () => {
    const data = await ReportingService.getSample(value);
    setSample(data);
  };

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
      <JsonEditorComponent
        value={value}
        setValue={setValue}
        className={classes.multilineInput}
      />
      <div>
        {
          sample
            ? (
              <JsonEditorComponent
                value={JSON.stringify(sample, null, 2)}
                setValue={setSample}
                readOnly
                className={classes.multilineInput}
              />
            )
            : null
        }
      </div>
      <Button variant="contained" color="primary" onClick={handleSample}>Get sample</Button>
      <Button variant="contained" color="primary" onClick={advanceStep}>Next</Button>
    </Box>
  );
};

AggregationStep.propTypes = {
  advanceStep: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
};

export default AggregationStep;
