import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import App from './containers/App';
import PageLayout from './containers/page-layout';
import SignUp from './components/register/register.js';
import UserDetails from './components/user-details/user-details.js';

import Home from './components/home/home.js';
import BookCategories from './components/book-categories';
import CreateCategory from './components/book-categories/new';

import BooksList from './components/books';
import newBook from './components/books/new';

import AuthorsList from './components/authors';

export default () => {
	return (
		<BrowserRouter>
			<Switch>
				
			  <Route exact path='/' component={App}/>			  
				<Route path='/home' component={Home}/>
				<Route path='/register' component={SignUp}/>
				<Route path='/user-details/:id' component={UserDetails} />
				<Route path='/book-categories' component={BookCategories} />
				<Route path='/create' component={CreateCategory} />

				<Route path='/books' component={BooksList} />
				<Route path='/new-book' component={newBook} />

				<Route path='/authors' component={AuthorsList} />
}}/>
			</Switch>
		</BrowserRouter>
	)
}