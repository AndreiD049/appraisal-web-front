import React, { useEffect, useContext } from 'react';
import LoginRequired from '../../widgets/LoginRequired';
import GlobalContext from '../../services/GlobalContext';
import { useRouteMatch, Switch, Route } from 'react-router-dom'
import { Container, } from '@material-ui/core';
import NavigationAnnex from './components/navigation-annex';
import styles from './styles';
import SettingsGeneral from '../settings-general';
import SettingsUsers from '../settings-users';
import SettingsAppraisalPeriods from '../settings-app-periods';
import SettingsAppraisalItems from '../settings-app-items';

/*
 * On the settings page the navigation will be done via a 
 */
const SettingsPage = ({ctx, setCtx, ...props}) => {
  const { path } = useRouteMatch();
  const global = useContext(GlobalContext)
  const classes = styles();

  useEffect(() => {
    console.log("enter");
    global.setContext({
      ...global.context,
      annexElements: (<NavigationAnnex/>)
    });
    return () => {
      console.log("leave")
      global.setContext({
        ...global.context,
        annexElements: null
      });
    }
  // eslint-disable-next-line
  }, [])


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
        </Switch>
      </Container>
    </>
  );
};

export default SettingsPage;