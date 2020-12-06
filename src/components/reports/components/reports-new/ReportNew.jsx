import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import ReportingService from '../../../../services/ReportingService';
import NotificationService from '../../../../services/NotificationService';
import PageHeader from '../../../shared/page-header/PageHeader';
import useStyles from './styles';

const ReportNew = () => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [template, setTemplate] = useState('');
  const [parameter, setParameter] = useState('');
  const [templates, setTemplates] = useState([]);
  const [parameters, setParameters] = useState([]);
  const [selectedParameters, setSelectedParameters] = useState([]);
  const history = useHistory();

  const handleChange = (set) => (e) => {
    set(e.target.value);
  };

  const handleChangeTempalte = (e) => {
    setTemplate(e.target.value);
  };

  const handleChangeParameter = (e) => {
    setParameter(e.target.value);
  };

  const handleAddParameter = (e) => {
    if (parameter !== '') {
      setSelectedParameters((prev) => {
        if (selectedParameters.map((p) => p.name).indexOf(parameter) === -1) {
          return prev.concat({
            name: parameter,
            defaultValue: '',
            path: parameter,
          });
        }
        setParameter('');
        return prev;
      });
    }
  };

  const handleChangeParameterName = (idx) => (e) => {
    e.persist();
    setSelectedParameters((prev) => {
      const copy = prev.slice();
      copy[idx].name = e.target.value;
      return copy;
    });
  };

  const handleChangeParameterValue = (idx) => (e) => {
    e.persist();
    setSelectedParameters((prev) => {
      const copy = prev.slice();
      copy[idx].defaultValue = e.target.value;
      return copy;
    });
  };

  const handleSubmit = async (e) => {
    e.persist();
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('template', template);
    formData.append('parameters', JSON.stringify(selectedParameters));
    const result = await ReportingService.addReport(formData);
    if (result) {
      history.push('/reporting/reports');
      NotificationService.notify({
        type: 'success',
        header: 'Report created',
        content: 'Report successfully created',
      });
    }
  };

  useEffect(() => {
    let mounted = true;
    async function run() {
      const t = await ReportingService.getTemplates();
      if (mounted) {
        setTemplates(t);
      }
    }
    run();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    async function run() {
      if (template !== '') {
        const params = await ReportingService.getTempalteParameters(template);
        if (params.length && mounted) {
          setParameters(params);
        }
      } else {
        setParameters([]);
      }
      setSelectedParameters([]);
    }
    run();
    return () => {
      mounted = false;
    };
  }, [template]);

  return (
    <Container maxWidth="lg">
      <form
        onSubmit={handleSubmit}
      >
        <Grid container className="owl">
          <Grid item xs={12}>
            <PageHeader text="Create Report" />
          </Grid>
          <Grid item xs={12}>
            <Paper>
              <Box
                p={2}
                className="centerFlexColumn owl"
              >
                <Typography variant="h6" align="center">
                  General:
                </Typography>
                <TextField
                  className={classes.textField}
                  label="Name"
                  variant="outlined"
                  required
                  onChange={handleChange(setName)}
                />
                <TextField
                  className={classes.textField}
                  label="Description"
                  variant="outlined"
                  multiline
                  required
                  onChange={handleChange(setDescription)}
                />
                <TextField
                  className={classes.textField}
                  label="Template"
                  variant="outlined"
                  value={template}
                  onChange={handleChangeTempalte}
                  required
                  select
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {templates.map((t) => (
                    <MenuItem value={t.id}>{t.name}</MenuItem>
                  ))}
                </TextField>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper>
              <Box p={2} className="centerFlexColumn owl">
                <Typography variant="h6" align="center">
                  Parameters:
                </Typography>
                <TextField
                  label="Parameter"
                  className={classes.textField}
                  variant="outlined"
                  onChange={handleChangeParameter}
                  select
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {parameters.map((param) => param.paths.map((p) => (
                    <MenuItem value={`${param.name}.${p}`}>{`${param.name}.${p}`}</MenuItem>
                  )))}
                </TextField>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleAddParameter}
                >
                  Add Parameter
                </Button>
                {
          selectedParameters.length
            ? (
              <Table>
                <TableBody>
                  {selectedParameters.map((sp, idx) => (
                    <TableRow key={sp.path}>
                      <TableCell style={{
                        display: 'flex',
                        flexFlow: 'column nowrap',
                        alignItems: 'center',
                      }}
                      >
                        <TextField
                          label="Name"
                          value={sp.name}
                          onChange={handleChangeParameterName(idx)}
                        />
                        <TextField
                          label="Default value"
                          value={sp.defaultValue}
                          onChange={handleChangeParameterValue(idx)}
                        />
                        <TextField
                          label="Path"
                          disabled
                          value={sp.path}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )
            : null
        }
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} className="centerFlexColumn">
            <Button type="submit" variant="contained" color="secondary">
              Create
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default ReportNew;
