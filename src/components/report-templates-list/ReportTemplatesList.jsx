import React, { useState, useEffect } from 'react';
import { useHistory, useRouteMatch, Link } from 'react-router-dom';
import {
  Button,
  Container, Paper,
} from '@material-ui/core';
import MaterialTable from 'material-table';
import materialTableUtils from '../../utils/material-table-utils';
import useStyles from './styles';
import ReportingService from '../../services/ReportingService';
import PageHeader from '../shared/page-header/PageHeader';

const ReportTemplatesList = () => {
  const classes = useStyles();
  const history = useHistory();
  const [templates, setTemplates] = useState([]);
  const { path } = useRouteMatch();

  useEffect(() => {
    let mounted = true;
    async function run() {
      const result = await ReportingService.getTemplates();
      if (mounted) {
        setTemplates(result);
      }
    }
    run();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Container maxWidth="lg">
      <PageHeader text="Templates" />
      <Paper className={classes.container}>
        <Link
          to={`${path}/new`}
          className="textDecorationOff"
        >
          <Button
            color="secondary"
            variant="contained"
          >
            Create Template
          </Button>
        </Link>
      </Paper>
      <MaterialTable
        icons={materialTableUtils.tableIcons}
        title=""
        columns={[
          {
            title: 'Name', field: 'name',
          },
          {
            title: 'Filename', field: 'filename',
          },
          {
            title: 'User created',
            field: 'createdUser.username',
          },
        ]}
        data={templates}
        actions={[
          {
            icon: materialTableUtils.tableIcons.Download,
            tooltip: 'Download Template',
            onClick: (evt, data) => ReportingService.downloadTemplate(data.id, data.filename),
          },
        ]}
        onRowClick={(evt, rowData) => history.push(`${path}/${rowData.id}`)}
      />
    </Container>
  );
};

export default ReportTemplatesList;
