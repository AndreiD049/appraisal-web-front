import React from 'react';
import PropTypes from 'prop-types';
import {
  Box, Button, TextField, Typography,
} from '@material-ui/core';
import UploadFileComponent from '../../../shared/upload-file-component';
import useStyles from './style';

const AddTemplateStep = ({
  advanceStep, prevStep, name, setName, file, setFile,
}) => {
  const classes = useStyles();

  const handleChange = (evt) => {
    setName(evt.target.value);
  };

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle1">
        Specify your template name, then attach your template file.
        { ' ' }
        (Ex: All user info, or Items per user).
      </Typography>
      <TextField
        value={name}
        onChange={handleChange}
        variant="outlined"
        color="secondary"
        label="Template Name"
        id="new-template-name"
        name="new-template-name"
        size="small"
      />
      <UploadFileComponent label="Template File" file={file} setFile={setFile} />
      <Box p={2} className={classes.buttons}>
        <Button variant="contained" color="primary" onClick={prevStep}>Back</Button>
        <Button variant="contained" color="primary" onClick={advanceStep}>Next</Button>
      </Box>
    </Box>
  );
};

AddTemplateStep.propTypes = {
  advanceStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
  file: PropTypes.shape({}).isRequired,
  setFile: PropTypes.func.isRequired,
};

export default AddTemplateStep;
