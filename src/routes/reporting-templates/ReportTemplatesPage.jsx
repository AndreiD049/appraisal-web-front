import React from 'react';
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import ReportTemplatesList from '../../components/report-templates-list';
import ReportTemplateDetails from '../../components/report-template-details/ReportTemplateDetails';

const ReportTemplatesPage = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <ReportTemplatesList />
      </Route>
      <Route path={`${path}/:id`}>
        <ReportTemplateDetails />
      </Route>
    </Switch>
  );
};

export default ReportTemplatesPage;
