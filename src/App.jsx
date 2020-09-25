import welcome from './utils/welcome';
import React, { useState } from 'react';
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
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import ReportsPage from './pages/ReportsPage';
import LoginPage from './pages/LoginPage';
import GlobalContext from './services/GlobalContext';
welcome();

function App() {
	const [context, setContext] = useState(Context);

	return (
			<GlobalContext.Provider value={{context: context, setContext: setContext}}>
				<CssBaseline/>
				<Router>
					<Navigation/>

					{/* The page switch */}
					<Switch>
						<Route path='/appraisals/:id'>
							<AppraisalDetailsPage ctx={context} setCtx={setContext}/>
						</Route>
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
						<Route path='/'>
							<HomePage ctx={context} setCtx={setContext}/>
						</Route>
					</Switch>
				</Router>
			</GlobalContext.Provider>
  );
}

export default App;
