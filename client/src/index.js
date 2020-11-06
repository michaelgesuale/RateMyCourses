import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './views/home';
import CatalogPage from './views/catalog';
import CoursePage from './views/course_page';

import { Switch, Route, BrowserRouter } from 'react-router-dom';

ReactDOM.render(
	<BrowserRouter>
		<Switch>
			<Route path="/course_page" render={() => <CoursePage user="newUser" course_id="3"/>} />
			<Route path="/catalog" component={CatalogPage} />
			<Route path="/" component={HomePage} />
		</Switch>
	</BrowserRouter>,
	document.getElementById('root')
);
