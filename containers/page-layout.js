import React from 'react';
import  { Redirect } from 'react-router-dom'
import ClassNames from 'classnames'
import store from '../store'
import Suggestions from '../components/books/suggestion'

export default class PageLayout extends React.Component {

	constructor(props) {
        super(props);
        this.state = {
			userProfile: store.getState().userReducer.user,
			redirectToBookCategories: false,
			redirectToHome: false,
			redirectToBooks: false,
			redirectToAuthors: false,
			redirectToCart: false,
			redirectToPublishers: false,
			itemsList: [],
			results: []
		}			
	  }
	  
	  componentDidMount = () => {
        this.getShoppingCartDetails()		
	}

	getShoppingCartDetails = () => {
		$.ajax({  
            type: "POST",  
            url: "http://localhost:5000/get-cart-details",  
            data: JSON.stringify({"customer_id": this.state.userProfile.id}),  
            contentType: "application/json; charset=utf-8",    
            dataType: "json",
            success: (data) => {              
               
                this.setState({itemsList: data});      
            },
            error: ()=> { console.log('There is no item in your shoping cart') } 
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

	onClickPublishers = () => {
		this.setState({redirectToPublishers: true})
	}

	setPublishersTabClass =  () => {
		return ClassNames(
		'menu publishers-list', this.props.selectedTab === 'publishers' ? this.props.selectedTab : '')
	}

	onClickCart = () => {
		this.setState({redirectToCart: true})
	}

	isAdmin = () => {
		return store.getState().userReducer.user.role === "Admin" 
	}

	setLeftMenuClass =  () => { 
		return ClassNames(
		'container-menu', this.isAdmin() ?  '' : 'hide-left-menu-non-admin')
	}

	setContainerMainPageClass =  () => { 
		return ClassNames(
		'container-page', this.isAdmin() ?  '' : 'container-page-non-admin')
	}

	autoSuggestBooks = () => {
        $.ajax({  
			type: "POST",  
            url: "http://localhost:5000/search-books", 
            data: JSON.stringify({"prefix": this.state.query}), 
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: (data) => { 
				this.setState({
                    results: data
                  })
			},
			error: ()=> { } 
        });

    }
    
    handleInputChange = () => {
        this.setState({
          query: this.search.value,
          showSuggestions: true
        }, () => {
          if (this.search.value && this.search.value.length > 1) {
            if (this.search.value.length % 2 === 0) {
              this.autoSuggestBooks()
            }
          } else if (!this.search.value) {
          }
        })
      }
    
      handleBooksTitleChange = (langValue) => {
        this.setState({language: langValue, showSuggestions: false});
        this.search.value = langValue
	}
	
	simplSearch = () => {
        let keyword = this.state.language
        $.ajax({  
			type: "POST",  
            url: "http://localhost:5000/search", 
            data: JSON.stringify({"keyword": keyword}), 
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: (data) => { 
                console.log(data)
				this.setState({booksList: data})
			},
			error: ()=> { } 
        });
	}
	
	goHome = () => {
		this.setState({redirectToHome: true})
	}

	render () {
		return (
			<div className='container-home-page'> 
				<div className="container">
					<div className="row">
						<div className="col order-last">
							<div className='container-user-profile'>
								{this.state.userProfile ? <div className='conatiner-welcome'><h5>Welcome:</h5> <h5>{this.state.userProfile.name}</h5><h5><a href="/">Logout</a></h5>
								</div> : null }
								<div className="shopping-cart" onClick={this.onClickCart}>
									<span className="glyphicon glyphicon-shopping-cart"></span> My Shopping Cart
									<div className="circleBase type3">{this.state.itemsList.length}</div>
                            	</div>   
							</div>
						</div>
						
						<div className="col order-1">
						<div className="help-contact-us">
							<span className="icon-home glyphicon glyphicon-home" onClick={this.goHome}>
							</span>
							<span className="icon-envelope glyphicon glyphicon-envelope">
								<span className="contact-us-label">Contact Us</span>
							</span>
							<span className="icon-envelope glyphicon glyphicon-info-sign">
								<span className="contact-us-label">Help</span>
							</span>
						</div>
						{/* <img className='logo' src='http://localhost:8080/Online-Book-Clubs.png' alt='Talent Manager'  /> */}
						</div>
					</div>
					        
				</div>
				
				
				<div className='container-middle-page'>
					<div className={this.setLeftMenuClass()} >
						{this.isAdmin() ?
					<span>  
						<div className={this.setHomeTabClass()} onClick={this.onClickHome}>Home</div>
							<div className={this.setBookCategoriesTabClass()} onClick={this.onClickBookCategories}>Book Categories</div>
						<div className={this.setBooksTabClass()} onClick={this.onClickBooks} >Books</div>
						<div className={this.setAuthorsTabClass()} onClick={this.onClickAuthors} >Authors</div>
						<div className={this.setPublishersTabClass()} onClick={this.onClickPublishers} >Publishers</div></span>: null}
					</div>	
					<div className={this.setContainerMainPageClass()}>{this.props.children}</div>			
					
				</div>
				{this.state.redirectToBookCategories && <Redirect to='/book-categories' />}		
				{this.state.redirectToHome && <Redirect to='/home' />}	
				{this.state.redirectToBooks && <Redirect to='/books' />}   
				{this.state.redirectToAuthors && <Redirect to='/authors' />} 
				{this.state.redirectToPublishers && <Redirect to='/publishers' />}	
				{this.state.redirectToCart && <Redirect to='/cart' />}  
	</div>
		)
	}
}
PageLayout.propTypes = {
	selectedTab: React.PropTypes.string
}