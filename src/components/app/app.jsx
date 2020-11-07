import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { Container, ThemeProvider, createMuiTheme } from '@material-ui/core';
import Navigation from '../navigation/Navigation';
import AppraisalsPage from '../../routes/appraisals';
import HomePage from '../../routes/home';
import SettingsPage from '../../routes/settings';
import ReportingPage from '../../routes/reporting';
import LoginPage from '../../routes/login';
import GlobalContext from '../../services/GlobalContext';
import NotificationManager from '../shared/notification-manager';
import NotificationService, { NotificationContextObject } from '../../services/NotificationService';
import PopUp from '../shared/pop-up';
import UserSecuritiesProvider from '../shared/user-securities-provider';
import AuthorizationService from '../../services/AuthorizationService';
import UserInfoProvider from '../shared/user-info-provider';
import useStyle from './styles';

import { themeDark, themeLight } from '../../styles/theme';

function App() {
  const classes = useStyle();

  const [context, setContext] = useState({
    user: null,
    Authorize: AuthorizationService.Authorize,
    setContext: null,
    userPreferences: {
      theme: localStorage.getItem('theme') === 'dark' ? createMuiTheme(themeDark) : createMuiTheme(themeLight),
    },
  });

  const { userPreferences } = context;
  const { theme } = userPreferences;

  useEffect(() => {
    setContext((prev) => ({
      ...prev,
      setContext,
    }));
  }, []);

  const [notifications, setNotifications] = useState([]);
  const notificationObject = NotificationContextObject(notifications, setNotifications);
  // set the notification object so we can notify the user
  NotificationService.notificationObject = notificationObject;

  return (
  // <GlobalContext.Provider value={{context: context, setContext: setContext}}>
    <GlobalContext.Provider value={context}>
      <ThemeProvider theme={theme}>
        <NotificationManager
          notifications={notifications}
          notificationRender={(notification, props) => (
            <PopUp
              type={notification.type}
              entry={props.entry}
              onBeforeClose={props.onBeforeClose}
              onAfterClose={props.onAfterClose}
            />
          )}
          onAfterClose={(entry) => {
            setNotifications((prev) => prev.filter((n) => n !== entry));
          }}
        />
        <UserInfoProvider ctx={context} setCtx={setContext} />
        <CssBaseline />
        <UserSecuritiesProvider />
        <Router>
          <Navigation />
          <Container maxWidth="lg" className={classes.root}>
            {/* The page switch */}
            <Switch>
              <Route path="/appraisals">
                <AppraisalsPage ctx={context} setCtx={setContext} />
              </Route>
              <Route path="/audits">
                <h1>IN PROGRESS</h1>
              </Route>
              <Route path="/reporting">
                <ReportingPage ctx={context} setCtx={setContext} />
              </Route>
              <Route path="/settings">
                <SettingsPage ctx={context} setCtx={setContext} />
              </Route>
              <Route path="/login">
                <LoginPage ctx={context} setCtx={setContext} />
              </Route>
              <Route path="/">
                <HomePage ctx={context} setCtx={setContext} />
              </Route>
            </Switch>
          </Container>
        </Router>
      </ThemeProvider>
    </GlobalContext.Provider>
  );
}

export default App;
