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
import NewBook from './components/books/new';
import BookDetail from './components/books/view';

import PublishersList from './components/publishers/index';

import AuthorsList from './components/authors';
import NewAuthor from './components/authors/new';

import ShoppingCart from './components/shopping-cart';


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
				<Route path='/new-book' component={NewBook} />
				<Route path='/book-detail/:id' component={BookDetail} />

				<Route path='/publishers' component={PublishersList} />

				<Route path='/authors' component={AuthorsList} />
				<Route path='/new-author' component={NewAuthor} />

				<Route path='/cart' component={ShoppingCart} />

}}/>
			</Switch>
		</BrowserRouter>
	)
}
