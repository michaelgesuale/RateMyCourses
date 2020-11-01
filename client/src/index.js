import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './views/home.jsx';

import { Switch, Route, BrowserRouter } from 'react-router-dom';

ReactDOM.render(
	<BrowserRouter>
		<Switch>
       			<Route path="/" component={HomePage} />
		</Switch>
	</BrowserRouter>,
  document.getElementById('root')
);
