import React, { useEffect } from 'react';
import Navigation from './widgets/Navigation';
import CssBaseline from '@material-ui/core/CssBaseline'
import { 
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import AppraisalsPage from './pages/AppraisalsPage';
import AppraisalDetailsPage from './pages/AppraisalDetailsPage';
import Context from './models/AppContext';
import LoginService  from './services/LoginService';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import ReportsPage from './pages/ReportsPage';

function App() {
	const context = Object.create(Context);

	useEffect(() => {
		// Set up the context
		async function getUser() {
			context.setUser(await LoginService.getCurrentUser(context));
		} 
		getUser();
	}, [context]);
	
	return (
		<>
			<CssBaseline/>
			<Router>
				<Navigation/>

				{/* The page switch */}
				<Switch>
					<Route path='/appraisals/:id'>
						<AppraisalDetailsPage context={context}/>
					</Route>
					<Route path='/appraisals'>
						<AppraisalsPage context={context}/>
					</Route>
					<Route path='/reports'>
						<ReportsPage context={context}/>
					</Route>
					<Route path='/settings'>
						<SettingsPage context={context}/>
					</Route>
					<Route path='/'>
						<HomePage context={context}/>
					</Route>
				</Switch>
			</Router>
		</>
  );
}

export default App;
