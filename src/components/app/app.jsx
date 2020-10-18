import welcome from '../../utils/welcome';
import React, { useState } from 'react';
import Navigation from '../navigation/Navigation';
import CssBaseline from '@material-ui/core/CssBaseline'
import { 
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import AppraisalsPage from '../../routes/appraisals';
import HomePage from '../../routes/home';
import SettingsPage from '../../routes/settings';
import ReportsPage from '../../routes/reports';
import LoginPage from '../../routes/login';
import GlobalContext from '../../services/GlobalContext';
import NotificationManager from '../../components/shared/notification-manager';
import NotificationService, { NotificationContextObject } from '../../services/NotificationService';
import PopUp from '../../components/shared/pop-up';
import SandboxPage from '../../routes/sandbox';
import UserSecuritiesProvider from '../shared/user-securities-provider';
import AuthorizationService from '../../services/AuthorizationService';
import UserInfoProvider from '../../components/shared/user-info-provider';
import { Container } from '@material-ui/core';
import useStyle from './styles';
welcome();

function App() {
	const classes = useStyle();
	const [context, setContext] = useState({ 
		user: null,
		Authorize: AuthorizationService.Authorize 
	});
	const [notifications, setNotifications] = useState([]);
	const notificationObject = NotificationContextObject(notifications, setNotifications);
	// set the notification object so we can notify the user
	NotificationService.notificationObject = notificationObject;

	return (
		<GlobalContext.Provider value={{context: context, setContext: setContext}}>
			<NotificationManager
				notifications={notifications}
				notificationRender={(notification, props) => (
					<PopUp {...props} type={notification.type} />
				)}
				onAfterClose={(entry) => {
					setNotifications(prev => prev.filter(n => n !== entry));
				}}
			/>
      <UserInfoProvider ctx={context} setCtx={setContext}/>
			<CssBaseline/>
			<UserSecuritiesProvider/>
			<Router>
				<Navigation annexElements={context.annexElements}/>
				<Container maxWidth='lg' className={classes.root}>
					{/* The page switch */}
					<Switch>
						<Route path='/appraisals'>
							<AppraisalsPage ctx={context} setCtx={setContext}/>
						</Route>
						<Route path='/reports'>
							<ReportsPage ctx={context} setCtx={setContext}/>
						</Route>
						<Route path='/settings'>
							<SettingsPage ctx={context} setCtx={setContext}/>
						</Route>
						<Route path='/login'>
							<LoginPage ctx={context} setCtx={setContext}/>
						</Route>
						<Route path='/sandbox'>
							<SandboxPage />
						</Route>
						<Route path='/'>
							<HomePage ctx={context} setCtx={setContext}/>
						</Route>
					</Switch>
				</Container>
			</Router>
		</GlobalContext.Provider>
  );
}

export default App;
