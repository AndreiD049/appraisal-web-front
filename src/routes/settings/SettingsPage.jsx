import React from 'react';
import LoginRequired from '../../components/shared/login-required';
import { useRouteMatch, Switch, Route } from 'react-router-dom'
import { Container, } from '@material-ui/core';
import styles from './styles';
import SettingsGeneral from '../settings-general';
import SettingsUsers from '../settings-users';
import SettingsAppraisalPeriods from '../settings-app-periods';
import SettingsAppraisalItems from '../settings-app-items';
import SettingsRolesPage from '../settings-role-permissions';

/*
 * On the settings page the navigation will be done via a 
 */
const SettingsPage = ({ctx, setCtx, ...props}) => {
  const { path } = useRouteMatch();
  const classes = styles();

  return (
    <>
      <LoginRequired ctx={ctx} setCtx={setCtx} />
      <Container maxWidth='lg' className={classes.root}>
        <Switch>
          <Route exact path={path}>
            <SettingsGeneral/>
          </Route>
          <Route path={`${path}/users`}>
            <SettingsUsers/>
          </Route>
          <Route path={`${path}/appraisal-periods`}>
            <SettingsAppraisalPeriods/>
          </Route>
          <Route path={`${path}/appraisal-items`}>
            <SettingsAppraisalItems/>
          </Route>
          <Route path={`${path}/permissions`}>
            <SettingsRolesPage />
          </Route>
        </Switch>
      </Container>
    </>
  );
};

export default SettingsPage;