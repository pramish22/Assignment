import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import NavBar from './components/NavBar';

function App() {
	return (
		<Router>
			<div>
				<Switch>
					<Route path="/dashboard">
						<NavBar />
						<Dashboard />
					</Route>
					<Route path="/">
						<NavBar />
						<Home />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
