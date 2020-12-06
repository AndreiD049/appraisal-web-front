import React, { useState, useEffect } from 'react';
import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import ReportingService from '../../services/ReportingService';
import PageHeader from '../shared/page-header/PageHeader';
import useStyles from './styles';

const ReportTemplateDetails = () => {
  const { id } = useParams();
  const [template, setTemplate] = useState(null);
  const classes = useStyles();
  const [edit, setEdit] = useState(false);
  const [updated, setUpdated] = useState({});

  const handleUpdated = (data) => {
    setUpdated({
      name: data.name,
      filename: data.filename,
      aggregation: data.aggregation,
    });
  };

  const handleEditButton = () => {
    setEdit(true);
  };

  const handleChange = (key) => (evt) => {
    const val = evt.currentTarget.value;
    setUpdated((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const handleSave = async () => {
    const updateResult = await ReportingService.updateTemplate(template.id, updated);
    setTemplate(updateResult);
    setEdit(false);
    handleUpdated(updateResult);
  };

  useEffect(() => {
    let mounted = true;
    async function run() {
      const data = await ReportingService.getTemplate(id);
      if (mounted) {
        setTemplate(data);
        handleUpdated(data);
      }
    }
    run();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (!template) return null;

  const render = (
    <Grid container className={classes.paddedContainer}>
      <Grid item xs={12}>
        <PageHeader text={`Details - ${template.name}`} />
      </Grid>
      <Grid item xs={12}>
        <Paper title="Meta" className={classes.paddedContainer}>
          <Typography variant="caption" className={classes.row}>
            <strong>Created user:</strong>
            { ' ' }
            { (template.createdUser && template.createdUser.username) || '' }
          </Typography>
          <Typography variant="caption" className={classes.row}>
            <strong>Created date:</strong>
            { ' ' }
            { (template.createdDate && new Date(template.createdDate).toLocaleString()) || '' }
          </Typography>
          {
            template.modifiedUser
            && (
              <Typography variant="caption" className={classes.row}>
                <strong>Modified user:</strong>
                { ' ' }
                { (template.modifiedUser && template.modifiedUser.username) || '' }
              </Typography>
            )
          }
          {
            template.modifiedUser
            && (
              <Typography variant="caption" className={classes.row}>
                <strong>Modified date:</strong>
                { ' ' }
                { (template.modifiedDate && new Date(template.modifiedDate).toLocaleString()) || '' }
              </Typography>
            )
          }
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper title="General" className={classes.paddedContainer}>
          <TextField
            variant="outlined"
            label="Name"
            disabled={!edit}
            value={updated.name || ''}
            className={classes.row}
            onChange={handleChange('name')}
          />
          <TextField
            variant="outlined"
            label="Original Filename"
            disabled={!edit}
            value={updated.filename || ''}
            className={classes.row}
            onChange={handleChange('filename')}
          />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper title="Aggregation" className={classes.paddedContainer}>
          <TextField
            variant="outlined"
            multiline
            label="Aggregation"
            disabled={!edit}
            value={updated.aggregation}
            className={classes.textarea}
            onChange={handleChange('aggregation')}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} className={classes.ceneteredItems}>
        {
          edit
            ? (
              <Button variant="contained" color="secondary" onClick={handleSave}>Save</Button>
            )
            : (
              <Button variant="contained" color="secondary" onClick={handleEditButton}>Edit</Button>
            )
        }
      </Grid>
    </Grid>
  );

  return (
    <Container maxWidth="lg">
      {render}
    </Container>
  );
};

export default ReportTemplateDetails;
