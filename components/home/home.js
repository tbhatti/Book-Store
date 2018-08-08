import React from 'react';
import  { Redirect } from 'react-router-dom'
import Layout from '../../containers/page-layout'
import store from '../../store'
import StarRatings from 'react-star-ratings';

export default class Home extends React.Component {

	constructor(props) {
        super(props);
        this.state = {
			userProfile: store.getState().userReducer.user,
			bookCategories: [],
			booksList: [],
			redirect: false,
			bookID: 0,
			redirectToCart: false
    	}
      }

	  componentDidMount = () => {
		$.ajax({  
			type: "GET",  
			url: "http://localhost:5000/books-categories-list",  
			contentType: "application/json; charset=utf-8",    
			dataType: "json",
			success: (data) => { 
				this.setState({bookCategories: data });
			},
			error: ()=> { } 
		});
		
		$.ajax({  
			type: "GET",  
			url: "http://localhost:5000/books-list",  
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: (data) => { 
				this.setState({booksList: data});
			},
			error: ()=> { } 
        });
	}

	gotoDetail = (book) => {
		this.setState({redirect: true, bookID: book.id})
	}

	renderBooks = (books) => {
	
        return  books.map((book) => {
			let imageSource = 'http://localhost:8080/'+book.cover_image  
			return 	<div className="col-md-3" key={book.title}>
						<a href="#" className="thumbnail" key={book.title} >
							<img src={imageSource} alt="Image" onClick={() => this.gotoDetail(book)}/>
							<div className="title">{book.title}</div>
							<div className="author">{book.author_name}</div>
							<div className="">
                    			<StarRatings rating={book.rating} starRatedColor="orange"  numberOfStars={5} name='rating' starDimension="14px" starSpacing="1px"/>
                			</div>
							<div className="price">$ {book.price}</div>
							<button type="button" className="btn btn-danger add-to-cart">
                              <span className="glyphicon glyphicon-shopping-cart" onClick={() => this.addToCart(book)}></span> Add to Cart
                            </button> 
						</a>
						
					</div>
				  
			}) 
		

	}

	addToCart = (book) => {
		console.log('WHAT IS')
        $.ajax({  
			type: "POST",  
			url: "http://localhost:5000/add-to-cart",  
		    data: JSON.stringify({"customer_id": this.state.userProfile.id, "book_id": book.id, "quantity": 1, "price": book.price}),  
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: (data) => {
                
                console.log('Book Added to Cart Successfuly')
                this.setState({redirectToCart: true})
			},
			error: ()=> {
				console.log('User does not exist')

			  } 
        });
    }
	
	renderBookCategoriesItems = () => {
		let classname = ''
		return  this.state.bookCategories.map((category, index) => {
				const books = this.state.booksList.filter(book =>book.book_category === category.name);
				classname = index === 0 ? "active item" : "item"
			return <div key={category.name+category.id} className={classname}>
						<div className="category-name">{category.name}</div>
						<div className="row" key={category.id+category.name}>
							{books.length > 0 ? this.renderBooks(books) : null}
						</div>						
					</div>
		})
	}

	render () {
		return (
                <Layout selectedTab="home">
					<div className="page-container-layout home-page">
						<div className='page-header'>					
							<h1>Home</h1>
						</div>
						<div className="container">
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
							
						</div>
					</div>
					{this.state.redirect && <Redirect to={`/book-detail/${this.state.bookID}`} />}
					{this.state.redirectToCart && <Redirect to="/cart" />}
            </Layout>
			
		)
	}
}



