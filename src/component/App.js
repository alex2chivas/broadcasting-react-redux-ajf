import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import Header from './Header';
import StreamCreate from './streams/StreamCreate';
import StreamDelete from './streams/StreamDelete';
import StreamEdit from './streams/StreamEdit';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';
import history from '../history';

const App = () => {
	return (
		<div className='ui container'>
			{/*Notes - BrowersRouter, HashRouter, MemoryRouter*/}
			<Router history={history}>
				<div>
					{/* {google oauth scope list to get proper URL from google for flow} */}
					<Header />
					<Switch>
						<Route path='/' exact component={StreamList} />
						<Route path='/streams/new' exact component={StreamCreate} />
						<Route path='/streams/edit/:id' exact component={StreamEdit} />
						<Route path='/streams/delete/:id' exact component={StreamDelete} />
						<Route path='/streams/:id' exact component={StreamShow} />
					</Switch>
				</div>
			</Router>
		</div>
	);
};

export default App;
