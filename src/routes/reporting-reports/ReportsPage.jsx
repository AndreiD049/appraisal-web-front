import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ReportDetails from '../../components/reports/components/report-details/ReportDetails';
import ReportNew from '../../components/reports/components/reports-new/ReportNew';
import ReportsList from '../../components/reports/ReportsList';

const ReportsPage = () => {
  const { path } = useRouteMatch();
  return (
    <>
      <Switch>
        <Route exact path={path}>
          <ReportsList />
        </Route>
        <Route exact path={`${path}/new`}>
          <ReportNew />
        </Route>
        <Route exact path={`${path}/:id`}>
          <ReportDetails />
        </Route>
      </Switch>
    </>
  );
};

export default ReportsPage;
