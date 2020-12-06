import React, { useState, useEffect } from 'react';
import DocumentTitle from 'react-document-title';
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
import UserSecuritiesProvider from '../shared/user-securities-provider';
import AuthorizationService from '../../services/AuthorizationService';
import UserInfoProvider from '../shared/user-info-provider';
import GlobalCss from '../../styles/GlobalCSS';
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

  return (
    <GlobalContext.Provider value={context}>
      <ThemeProvider theme={theme}>
        <NotificationManager />
        <UserInfoProvider ctx={context} setCtx={setContext} />
        <CssBaseline />
        <GlobalCss />
        <UserSecuritiesProvider />
        <Router>
          <Navigation />
          <Container maxWidth="lg" className={classes.root}>
            {/* The page switch */}
            <Switch>
              <Route path="/appraisals">
                <DocumentTitle title="Appraisals">
                  <AppraisalsPage ctx={context} setCtx={setContext} />
                </DocumentTitle>
              </Route>
              <Route path="/audits">
                <DocumentTitle title="Audits">
                  <h1>IN PROGRESS</h1>
                </DocumentTitle>
              </Route>
              <Route path="/reporting">
                <DocumentTitle title="Reporting">
                  <ReportingPage ctx={context} setCtx={setContext} />
                </DocumentTitle>
              </Route>
              <Route path="/settings">
                <DocumentTitle title="Settings">
                  <SettingsPage />
                </DocumentTitle>
              </Route>
              <Route path="/login">
                <DocumentTitle title="Sign in">
                  <LoginPage ctx={context} setCtx={setContext} />
                </DocumentTitle>
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
