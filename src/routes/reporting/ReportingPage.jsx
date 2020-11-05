import React from 'react';
import LoginRequired from '../../components/shared/login-required';
import { Container } from '@material-ui/core';
import { useRouteMatch, Switch, Route } from 'react-router-dom'
import AuthorizationRedirectComponent from '../../components/shared/authorization-redirect-component';
import ReportsPage from '../reporting-reports';
import ReportingTemplatesPage from '../reporting-templates';

const ReportingPage = ({ctx, setCtx, ...props}) => {
  const { path } = useRouteMatch();
  return (
    <>
      <LoginRequired ctx={ctx} setCtx={setCtx} />
      <Container maxWidth='lg'>
        <Switch>
          <Route exact path={path}>
            <AuthorizationRedirectComponent 
              code='REPORTS' 
              grant='read' 
              to='/'
              failureNotification={{
                header: 'No Access',
                content: 'No permission to access this page. Please contact your administrator.'
              }}
            >
              <ReportsPage />
            </AuthorizationRedirectComponent>
          </Route>
          <Route path={`${path}/templates`}>
            <AuthorizationRedirectComponent 
              code='REPORT-TEMPLATES' 
              grant='read' 
              to='/'
              failureNotification={{
                header: 'No Access',
                content: 'No permission to access this page. Please contact your administrator.'
              }}
            >
              <ReportingTemplatesPage />
            </AuthorizationRedirectComponent>
          </Route>
        </Switch>
      </Container>
    </>
  );
};

export default ReportingPage;