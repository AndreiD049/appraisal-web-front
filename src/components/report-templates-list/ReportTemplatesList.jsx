import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import {
  Container,
} from '@material-ui/core';
import MaterialTable from 'material-table';
import materialTableUtils from '../../utils/material-table-utils';
import ReportNewTemplate from '../report-templates-new';

const ReportTemplatesList = () => {
  const history = useHistory();
  const { path } = useRouteMatch();

  return (
    <Container maxWidth="lg">
      <h1 style={{ textAlign: 'center' }}>Templates</h1>
      <ReportNewTemplate />
      <MaterialTable
        icons={materialTableUtils.tableIcons}
        title="List"
        columns={[
          {
            title: 'Name', field: 'name',
          },
          {
            title: 'Filename', field: 'filename',
          },
          {
            title: 'User created', field: 'createdUser',
          },
        ]}
        data={[
          {
            id: 1234, name: 'Test', filename: 'test.xlsx', createdUser: 'me@you.com',
          },
          {
            id: 41231, name: 'Test1', filename: 'test.xlsx', createdUser: 'me@you.com',
          },
          {
            id: 123124, name: 'Test2', filename: 'test.xlsx', createdUser: 'me@you.com',
          },
          {
            id: 12345, name: 'Test3', filename: 'test.xlsx', createdUser: 'me@you.com',
          },
        ]}
        actions={[
          {
            icon: materialTableUtils.tableIcons.Download,
            tooltip: 'Download Template',
            // eslint-disable-next-line no-alert
            onClick: () => alert('Download file'),
          },
        ]}
        onRowClick={(evt, rowData) => history.push(`${path}/${rowData.id}`)}
      />
    </Container>
  );
};

export default ReportTemplatesList;
