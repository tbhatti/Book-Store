import React from 'react';
import { Redirect } from 'react-router-dom'
import Layout from '../../containers/page-layout'
import store from '../../store'
import StarRatings from 'react-star-ratings';
import Suggestions from '../books/suggestion'
import Service from '../../api-service'
import AdvanceSearch from '../advanced-search'
import FilterSearch from '../filter-search'

export default class Home extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			userProfile: store.getState().userReducer.user,
			bookCategories: [],
			booksList: [],
			redirect: false,
			bookID: 0,
			redirectToCart: false,
			authorsList: [],
			bookCategories: [],
			selectedBookCategory: '',
			selectedAuthor: '',
			results: [],
			showAdvanceSearch: false,
			publishersList: [],
			showLeftMenu: false
		}
	}

	componentDidMount = () => {
		this.getCategoriesList()
		this.getBooksList()
		this.getAuthorsList()
		$.ajax({
			type: "GET",
			url: "http://localhost:5000/publishers-list",
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: (data) => {
				this.setState({ publishersList: data });
			},
			error: () => { }
		});
	}

	getCategoriesList = () => {
		let data = Service.getCategoriesListRequest()
		this.setState({ bookCategories: data });
	}

	getBooksList = () => {
		let data = Service.getBooksListRequest()
		this.setState({ booksList: data });
	}

	getAuthorsList = () => {
		let data = Service.getAuthorsListRequest()
		this.setState({ authorsList: data });
	}

	gotoDetail = (book) => {
		this.setState({ redirect: true, bookID: book.id })
	}

	addToCart = (book) => {
		let data = { "customer_id": this.state.userProfile.id, "book_id": book.id, "quantity": 1, "price": book.price }
		let addedToCart = Service.addToCartRequest(data)
		this.setState({ redirectToCart: addedToCart })
	}

	handleInputChange = (event) => {
		this.setState({
			query: event.target.value
		})
	}

	keywordSearch = () => {
		this.setState({ showAdvanceSearch: false })
		let keyword = this.state.query
		let books = Service.keywordSearchRequest(keyword)
		this.setState({ booksList: books })
	}



	categoryClickEvent = (category) => {
		let books = Service.filterBooksByCategory(category.name)
		this.setState({ booksList: books })
	}

	authorClickEvent = (author) => {
		let books = Service.filterBooksByAuthor(author.name)
		this.setState({ booksList: books })
	}



	toAdvanceSearch = () => {
		this.setState({ showAdvanceSearch: true, showLeftMenu: false })
	}

	searchHandler = (booksList) => {

		console.log('HI I AM HERE!!!!', booksList)

		this.setState({ showLeftMenu: true, showAdvanceSearch: false })
	}

	renderBookCategories = (row) => {
		return (
			<ul className="list-categories" >
				{this.state.bookCategories.map(function (cat, index) {
					return <li key={index} onClick={() => this.categoryClickEvent(cat)}>{cat.name}</li>;
				}, this)}
			</ul>
		)
	}

	renderAuthors = () => {
		return (
			<ul className="list-categories" >
				{this.state.authorsList.map(function (author, index) {
					return <li key={index} onClick={() => this.authorClickEvent(author)}>{author.name}</li>;
				}, this)}
			</ul>
		)
	}

	renderBooks = (books) => {
		return books.map((book) => {
			let imageSource = 'http://localhost:8080/' + book.cover_image
			return <div className="col-md-2" key={book.title}>
				<a href="#" className="thumbnail" key={book.title} >
					<img src={imageSource} alt="Image" onClick={() => this.gotoDetail(book)} />
					<div className="title">{book.title}</div>
					<div className="author">{book.author_name}</div>
					<div className="">
						<StarRatings rating={book.rating} starRatedColor="orange" numberOfStars={5} name='rating' starDimension="14px" starSpacing="1px" />
					</div>
					<div className="price">$ {book.price}</div>
					<button type="button" className="btn btn-danger add-to-cart" onClick={() => this.addToCart(book)}>
						<span className="glyphicon glyphicon-shopping-cart" ></span> Add to Cart
                            </button>
				</a>
			</div>
		})
	}

	renderBookCategoriesItems = () => {
		let classname = ''
		let activeItemFlag = false
		return this.state.bookCategories.map((category, index) => {
			const books = this.state.booksList.filter(book => book.book_category === category.name);
			if (index === 0 && books.length > 0) {
				classname = "active item"
				activeItemFlag = true
			} else if (index > 0 && books.length > 0 && !activeItemFlag) {
				classname = "active item"
			}
			else {
				classname = "item"
			}
			return books.length > 0 ? <div key={category.name + category.id} className={classname}>
				<div className="category-name">{category.name}</div>
				<div className="row" key={category.id + category.name}>
					{books.length > 0 ? this.renderBooks(books) : null}
				</div>
			</div>
				: null
		})
	}

	render() {
		return (
			<Layout selectedTab="home">
				<div className="page-container-layout home-page">
					<div className='container-top-header'>
						<div className="logo-container"> <img className='logo' src='http://localhost:8080/logo.png' alt='Talent Manager' />
							<span className="store-name">T Books</span>
						</div>
						<div className="buttons-container">
							<div className="form-group">
								<input className="form-control" placeholder="Keyword Search for books by Title / Bppk Category / Author Name" onChange={this.handleInputChange} />
							</div>

							<button type="button" className="btn btn-primary btn-info search" onClick={this.keywordSearch}>
								Search
								</button>

							<button type="button" className="btn btn-primary advanced-search" onClick={this.toAdvanceSearch}>
								<span className="glyphicon glyphicon-cog"></span> Advanced Search
								</button>
						</div>
					</div>
					<div className="container-drop-down-menu">
						<span className="drop-dwon">Shop By Category
								<span className="glyphicon glyphicon-chevron-down"> </span>
							<span className="glyphicon glyphicon-chevron-up"> </span>
							<div className="container-categories">
								<div className="column-left">
									<div className="top-categories">Top Categories</div>
									{this.state.bookCategories.length > 0 ? this.renderBookCategories() : null}
								</div>
								<div className="column-middle">
									<div className="top-authors">Top Authors</div>
									{this.state.bookCategories.length > 0 ? this.renderAuthors() : null}
								</div>

							</div>
						</span>
						<span className="top-sellers">Top Sellers</span>
						<span className="coming-soon">Coming Soon</span>
						<span className="highlights">Highlights</span>
						<span className="bargain">Bargain Shop</span>
					</div>

					<div className="left-content">
						{this.state.showLeftMenu ? <div className="left-menu">
							<h3>Filter your search</h3>
							<FilterSearch />
						</div>
							:
							<div className="left-menu-contents"></div>
						}
					</div>
					<div className="right-content">
						{/*Carousal Starts here**/}
						{!this.state.showAdvanceSearch ? <div className="container">
							<div className="books-banner">
								<img src='http://localhost:8080/banner.jpg' className="banner-image" />
								<span className="location-shop">Watch People's Shop</span>
								<img src='http://localhost:8080/map.png' className="map-image" />
								<div className="banner-title">Best of 2018</div>
							</div>
							<div className="row">
								<div className="col-md-12">
									<div id="Carousel" className="carousel slide">
										<ol className="carousel-indicators">
											<li data-target="#Carousel" data-slide-to="0" className="active"></li>
											<li data-target="#Carousel" data-slide-to="1"></li>
											<li data-target="#Carousel" data-slide-to="2"></li>
										</ol>
										<div className="carousel-inner">
											{this.state.bookCategories.length > 0 && this.state.booksList.length > 0 ? this.renderBookCategoriesItems() : null}
										</div>
										<a data-slide="prev" href="#Carousel" className="left carousel-control">‹</a>
										<a data-slide="next" href="#Carousel" className="right carousel-control">›</a>
									</div>
								</div>
							</div>
						</div> : <AdvanceSearch searchHandler={this.searchHandler} />} {/*Carousal end here**/}
					</div>
				</div>
				{this.state.redirect && <Redirect to={`/book-detail/${this.state.bookID}`} />}
				{this.state.redirectToCart && <Redirect to="/cart" />}
			</Layout>

		)
	}
}



