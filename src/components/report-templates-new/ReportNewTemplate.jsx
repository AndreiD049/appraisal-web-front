import React, { useState } from 'react'
import {
  Paper,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControl,
  TextField,
  Divider,
  Grid
} from '@material-ui/core';
import useStyles from './styles';
import UploadFileComponent from '../shared/upload-file-component';

const ReportNewTemplate = (props) => {
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpen = () => {
    setDialogOpen(true);
  }

  const handleClose = () => {
    setDialogOpen(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();
  }

  return (
    <Box mb={3}>
      <Paper className={classes.container}>
        <Button variant='contained' color='secondary' onClick={handleOpen}>New</Button>
      </Paper>
      <Dialog open={dialogOpen} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <form onSubmit={handleSubmit}>
          <DialogTitle id='form-dialog-title'>New Template</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Upload template file and use it in Reports.
            </DialogContentText>
            <Grid container className={classes.inputs}>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <FormControl>
                  <TextField label='Template Name' variant='outlined' size='small' />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <UploadFileComponent />
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button type='submit' color='secondary' variant='contained'>Ok</Button>
            <Button color='secondary' variant='contained' onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default ReportNewTemplate