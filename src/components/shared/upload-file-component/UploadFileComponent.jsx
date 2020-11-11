import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Box, Typography,
} from '@material-ui/core';
import {
  CloudUpload,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'inline-flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
  },
  input: {
    display: 'none',
  },
  text: {
    marginLeft: theme.spacing(1),
  },
}));

const UploadFileComponent = ({ label, file, setFile }) => {
  const classes = useStyles();
  const [filename, setFilename] = useState(file ? file.name : '...');

  const handleChange = (evt) => {
    const filelist = evt.target.files;
    if (filelist.length > 0) {
      setFilename(filelist[0].name);
      setFile(filelist[0]);
    } else {
      setFilename('...');
      setFile(null);
    }
  };

  return (
    <Box className={classes.root}>
      <input
        id="upload-file-input"
        type="file"
        className={classes.input}
        onChange={handleChange}
      />
      <label htmlFor="upload-file-input">
        <Button
          variant="text"
          startIcon={<CloudUpload />}
          component="span"
        >
          {label || 'Uplaod'}
        </Button>
      </label>
      <Typography variant="caption" className={classes.text}>{filename}</Typography>
    </Box>
  );
};

UploadFileComponent.propTypes = {
  file: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  setFile: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default UploadFileComponent;
