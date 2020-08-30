import React from 'react';
import Navigation from './components/Navigation';
import CssBaseline from '@material-ui/core/CssBaseline'
import { 
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import Appraisals from './components/Appraisals';
import AppraisalDetails from './components/AppraisalDetails';

function App() {
	return (
		<>
			<CssBaseline/>
			<Router>
				<Navigation/>

				{/* The pages switch */}
				<Switch>
					<Route path='/appraisals/:id'>
						<AppraisalDetails/>
					</Route>
					<Route path='/appraisals'>
						<Appraisals/>
					</Route>
					<Route path='/reports'>
						reports
					</Route>
					<Route path='/settings'>
						settings
					</Route>
					<Route path='/'>
						Home
					</Route>
				</Switch>
			</Router>
		</>
  );
}

export default App;
