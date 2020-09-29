import welcome from '../../utils/welcome';
import React, { useState } from 'react';
import Navigation from '../../widgets/Navigation';
import CssBaseline from '@material-ui/core/CssBaseline'
import { 
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import AppraisalsPage from '../../routes/appraisals';
import Context from '../../models/AppContext';
import HomePage from '../../routes/home';
import SettingsPage from '../../routes/settings';
import ReportsPage from '../../routes/reports';
import LoginPage from '../../routes/login';
import GlobalContext from '../../services/GlobalContext';
import SandboxPage from '../../routes/sandbox';
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
				</Router>
			</GlobalContext.Provider>
  );
}

export default App;
