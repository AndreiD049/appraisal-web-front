import {
  Box, Button, Container, Grid, Paper,
} from '@material-ui/core';
import MaterialTable from 'material-table';
import React, { useState } from 'react';
import { useRouteMatch, Link, useHistory } from 'react-router-dom';
import materialTableUtils from '../../utils/material-table-utils';
import PageHeader from '../shared/page-header/PageHeader';
import ReportsInfoProvider from './components/reports-info-provider';

const ReportsList = () => {
  const history = useHistory();
  const [reports, setReports] = useState([]);
  const { path } = useRouteMatch();
  return (
    <Container maxWidth="lg">
      <ReportsInfoProvider setReports={setReports} />
      <Grid container className="owl">
        <Grid item xs={12}>
          <PageHeader text="Reports" />
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <Box p={2} className="centerFlexRow">
              <Link to={`${path}/new`} className="textDecorationOff">
                <Button
                  variant="contained"
                  color="secondary"
                >
                  New Report
                </Button>
              </Link>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <MaterialTable
            icons={materialTableUtils.tableIcons}
            title=""
            columns={[
              {
                title: 'Name', field: 'name',
              },
              {
                title: 'Description',
                field: 'description',
                cellStyle: {
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  maxWidth: 100,
                },
              },
              {
                title: 'Organization', field: 'organizationId.name',
              },
              {
                title: 'Parameters',
                render: (rowData) => rowData.parameters.map((p) => p.name).join(', '),
                cellStyle: {
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  maxWidth: 100,
                },
              },
              {
                title: 'Created user', field: 'createdUser.username',
              },
              {
                title: 'Created date', render: (rowData) => new Date(rowData.createdDate).toLocaleString(),
              },
            ]}
            data={reports}
            onRowClick={(evt, rowData) => history.push(`${path}/${rowData.id}`)}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ReportsList;
