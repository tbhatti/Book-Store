import React from 'react';
import  { Redirect } from 'react-router-dom'
import ClassNames from 'classnames'

export default class PageLayout extends React.Component {

	constructor(props) {
        super(props);
        this.state = {
			userProfile: {},
			redirectToBookCategories: false,
			redirectToHome: false,
			redirectToBooks: false,
			redirectToAuthors: false
		}			
	  }
	  
	  componentDidMount = () => {
        $.ajax({  
            type: "POST",  
            url: "http://localhost:5000/userProfile", 
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: (userProfile) => {
			   this.setState({userProfile: userProfile[0]});
            },
            error: ()=> {
                console.log('User with the given username does not exit')

              } 
		});		
	}
	
	onClickBookCategories = () => {
		this.setState({redirectToBookCategories: true})
	}

	setBookCategoriesTabClass =  () => {
		return ClassNames(
		'menu categories', this.props.selectedTab === 'book-categories' ? this.props.selectedTab : '')
	}

	onClickBooks = () => {
		this.setState({redirectToBooks: true})
	}

	setBooksTabClass =  () => {
		return ClassNames(
		'menu books-list', this.props.selectedTab === 'books' ? this.props.selectedTab : '')
	}

	onClickHome = () => {
		this.setState({redirectToHome: true})
	}

	  setHomeTabClass =  () => {
		return ClassNames(
		'menu home-simple', this.props.selectedTab === 'home' ? this.props.selectedTab : '')
	}  

	onClickAuthors = () => {
		this.setState({redirectToAuthors: true})
	}

	setAuthorsTabClass =  () => {
		return ClassNames(
		'menu authors-list', this.props.selectedTab === 'authors' ? this.props.selectedTab : '')
	}

	render () {
		return (
			<div className='container-home-page'> 
				<div className="container">
					<div className="row">
						<div className="col order-last">
							<div className='container-user-profile'>
								{this.state.userProfile ? <div className='conatiner-welcome'><h4>Welcome:</h4> <h4>{this.state.userProfile.name}</h4>
								<span className="logout-span"><a href="/">Logout</a></span></div> : null }
								
							</div>
						</div>
						<div className="col order-12">
						
						</div>
						<div className="col order-1">
						<img className='logo' src='http://localhost:8080/Online-Book-Clubs.png' alt='Talent Manager'  />
						</div>
					</div>          
				</div>
				
				<div className='container-top-header'>							
				</div>
				<div className='container-middle-page'>
					<div className="container-menu">
						<div className={this.setHomeTabClass()} onClick={this.onClickHome}>Home</div>
						<div className={this.setBookCategoriesTabClass()} onClick={this.onClickBookCategories}>Book Categories</div>
						<div className={this.setBooksTabClass()} onClick={this.onClickBooks} >Books</div>
						<div className={this.setAuthorsTabClass()} onClick={this.onClickAuthors} >Authors</div>
					</div>	
					<div className="container-page">{this.props.children}</div>			
					
				</div>
				{this.state.redirectToBookCategories && <Redirect to='/book-categories' />}		
				{this.state.redirectToHome && <Redirect to='/home' />}	
				{this.state.redirectToBooks && <Redirect to='/books' />}   
				{this.state.redirectToAuthors && <Redirect to='/authors' />}	
	</div>
		)
	}
}
PageLayout.propTypes = {
	selectedTab: React.PropTypes.string
}