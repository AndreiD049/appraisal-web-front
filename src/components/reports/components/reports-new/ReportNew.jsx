import {
  Button,
  MenuItem, Select, Table, TableBody, TableCell, TableRow, TextField, Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import ReportingService from '../../../../services/ReportingService';
import NotificationService from '../../../../services/NotificationService';

const ReportNew = () => {
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
        if (selectedParameters.indexOf(parameter) === -1) {
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
    <>
      <Typography variant="h6" align="center">Create report</Typography>
      <form
        style={{
          display: 'flex',
          flexFlow: 'column nowrap',
          alignItems: 'center',
        }}
        onSubmit={handleSubmit}
      >
        <TextField label="Name" variant="outlined" required onChange={handleChange(setName)} />
        <TextField label="Description" variant="outlined" multiline required onChange={handleChange(setDescription)} />
        <Select
          label="Template"
          variant="outlined"
          value={template}
          onChange={handleChangeTempalte}
          required
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {templates.map((t) => (
            <MenuItem value={t.id}>{t.name}</MenuItem>
          ))}
        </Select>
        <Typography variant="h6" align="center">
          Parameters:
        </Typography>
        <Select
          placeholder="Template"
          variant="outlined"
          onChange={handleChangeParameter}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {parameters.map((param) => param.paths.map((p) => (
            <MenuItem value={`${param.name}.${p}`}>{`${param.name}.${p}`}</MenuItem>
          )))}
        </Select>
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
        <Button type="submit" variant="contained" color="secondary">
          Create
        </Button>
      </form>
    </>
  );
};

export default ReportNew;
