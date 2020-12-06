import {
  Box,
  Button, Container, Divider, Grid, Paper, TextField, Typography,
} from '@material-ui/core';
import { downloadBlob } from 'download.js';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReportingService from '../../../../services/ReportingService';
import PageHeader from '../../../shared/page-header/PageHeader';
import ReportDetailsParametersEdit from '../report-details-parameters-edit/ReportDetailsParametersEdit';
import ReportDetailsParameters from '../report-details-parameters/ReportDetailsParameters';

const ReportDetails = () => {
  const [edit, setEdit] = useState(false);
  const [details, setDetails] = useState(null);
  const [updated, setUpdated] = useState({});
  const [parameters, setParameters] = useState([]);
  const params = useParams();
  const { id } = params;

  const handleUpdated = (data) => {
    setUpdated({
      name: data.name,
      description: data.description,
      parameters: data.parameters,
    });
  };

  useEffect(() => {
    let mounted = true;
    async function run() {
      const reportDetails = await ReportingService.getReport(id);
      if (mounted) {
        setDetails(reportDetails);
        handleUpdated(reportDetails);
        setParameters(reportDetails.parameters.map((p) => ({
          name: p.name,
          value: p.defaultValue,
          path: p.path,
        })));
      }
    }
    run();
    return () => {
      mounted = false;
    };
  }, [id]);

  const handleChange = (key) => (evt) => {
    const { value } = evt.currentTarget;
    setUpdated((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleGenerate = async () => {
    const reply = await ReportingService.generateReport(id, parameters);
    await downloadBlob(details.template.filename, reply);
  };

  const handleParameterUpdate = (idx) => (evt) => {
    const { value } = evt.currentTarget;
    setParameters((prev) => {
      const copy = prev.slice();
      copy[idx].value = value;
      return copy;
    });
  };

  const handleEdit = () => {
    setEdit(true);
  };

  const handleSave = async () => {
    if (edit) {
      const result = await ReportingService.updateReport(details.id, updated);
      setDetails(result);
      handleUpdated(result);
      setParameters(result.parameters.map((p) => ({
        name: p.name,
        value: p.defaultValue,
        path: p.path,
      })));
      setEdit(false);
    }
  };

  let render = null;
  if (details) {
    render = (
      <Grid container className="owl">
        <Grid item xs={12}>
          <PageHeader text={details.name} />
        </Grid>
        <Grid item xs={12} container component={Paper}>
          <Box p={2} className="flexColumn owl">
            <Typography variant="h6">General: </Typography>
            <TextField
              label="Name"
              variant="outlined"
              disabled={!edit}
              value={updated.name}
              onChange={handleChange('name')}
            />
            <TextField
              label="Description"
              variant="outlined"
              disabled={!edit}
              multiline
              value={updated.description}
              onChange={handleChange('description')}
            />
          </Box>
        </Grid>
        <Grid item xs={12} container component={Paper}>
          <Grid item xs={12} sm={6}>
            <Box p={2} width="100%" className="flexColumn owl">
              <Typography variant="h6">Parameters: </Typography>
              <Divider style={{ width: '100%' }} />
              {
                edit
                  ? (
                    <ReportDetailsParametersEdit
                      params={updated.parameters}
                      handleUpdate={setUpdated}
                      template={details.template}
                    />
                  )
                  : (
                    <ReportDetailsParameters
                      params={parameters}
                      handleUpdate={handleParameterUpdate}
                    />
                  )
              }
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box p={2}>
              <Box mb={1}>
                <Typography variant="h6">Aggregation: </Typography>
              </Box>
              <TextField
                multiline
                fullWidth
                variant="outlined"
                label="Aggregation"
                disabled
                value={JSON.stringify(JSON.parse(details.template.aggregation), null, 4)}
              />
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12} component={Paper}>
          <Box className="flexRow owlHorizontal" p={2}>
            <Button
              disabled={Boolean(edit)}
              variant="contained"
              color="secondary"
              onClick={handleGenerate}
            >
              Generate
            </Button>
            {
              edit
                ? (<Button variant="contained" color="secondary" onClick={handleSave}>Save</Button>)
                : (<Button variant="contained" color="secondary" onClick={handleEdit}>Edit</Button>)
            }
          </Box>
        </Grid>
      </Grid>
    );
  }

  return (
    <Container maxWidth="lg">
      {render}
    </Container>
  );
};

export default ReportDetails;
