import React from 'react';
import  { Redirect } from 'react-router-dom'
import _ from 'lodash'
import Layout from '../../containers/page-layout'
import store from '../../store'
import StarRatings from 'react-star-ratings';

export default class ShoppingCart extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
            redirect: false,
            itemsList: [],
            bookIds: [],
            userProfile: store.getState().userReducer.user,
            booksList: [],
            detailsRedirect: false,
            bookID: '',
            showError: false
		}
    }
    
    componentDidMount = () => {
        
        console.log('store.getState().userReducer.user',store.getState().userReducer.user)
        this.getCartDetails( this.state.userProfile.id)      
    }

    getCartDetails = (id) => { 
        if(id) {
            $.ajax({  
                type: "POST",  
                url: "http://localhost:5000/get-cart-details",  
                data: JSON.stringify({"customer_id": id}),  
                contentType: "application/json; charset=utf-8",    
                dataType: "json",
                success: (data) => {                   
                    let booksIDs = []
                    let abc = data.map((item) => {  booksIDs.push(item.book_id)})
                    this.setState({itemsList: data, bookIds: booksIDs}); 
                    this.getBooksList(booksIDs)             
                },
                error: ()=> { console.log('There is no item in your shoping cart') } 
            });
        } else {
            this.setState({showError: true})
       }
    }

    getBooksList = (ids) => { 
        $.ajax({  
            type: "POST",  
            url: "http://localhost:5000/books-in-cart",  
            data: JSON.stringify({"book_ids": ids.toString()}),  
            contentType: "application/json; charset=utf-8",    
            dataType: "json",
            success: (data) => { 
                this.setState({booksList: data});
              
            },
            error: ()=> { console.log('There is no item in your shoping cart') } 
        });
        
    }

    getImageURL = (bookId) => {
        
        
    }

    onRemoveItem = (id) => {
        $.ajax({  
            type: "DELETE",  
            url: "http://localhost:5000/delete-cart-item",  
            data: JSON.stringify({"cart_id": id}),  
            contentType: "application/json; charset=utf-8",    
            dataType: "json",
            success: (data) => { 
               console.log('Returned Data is =>', data)
               this.setState({itemsList: data})
              
            },
            error: ()=> { console.log('There is no item in your shoping cart') } 
        });
    }

    rowClickEvent = (row) => {
        this.setState({detailsRedirect: true, bookID: row.book_id})
	}
    
    renderButton = (id) => {
        
        return <button type="button" className="btn btn-danger" onClick={()=>{this.onRemoveItem(id)}}>
                <span className="glyphicon glyphicon-trash"></span>
         </button>
    }

    renderRows = () => {        
		return this.state.itemsList.map((row) => {  
           
            const result = this.state.booksList.filter(book =>book.id === Number(row.book_id));   
            console.log('ROE DATA', row) 
            let coverImage =  result[0].cover_image
            let book =  result[0]
            let imageSource = 'http://localhost:8080/'+coverImage
			return <tr key={row.id}>
				<td>{row.id}</td>
                <td className="book-cell">
                    <div className="container-book" onClick={() => this.rowClickEvent(row)}><span className="image-span"><img className="small-image" src={imageSource} /></span>
                        <span className="info-span">
                            <div className="title">{book.title}</div>
                            <div className="category">{book.book_category}</div>
                            <div className="author">{book.author_name}</div>
                            <div className="">
                                <StarRatings rating={book.rating} starRatedColor="orange"  numberOfStars={5} name='rating' starDimension="14px" starSpacing="1px"/>
                            </div>
                            <div className="price">$ {book.price}</div>
                        </span>
                    </div>
                </td>
				<td>{row.price}</td>
                <td>{row.quantity}</td>
                <td>{row.quantity*row.price}</td>
                <td>{this.renderButton(row.id)}</td>
			
			</tr>
		})
      
    }


	render () {
        
		return (
            this.state.booksList.length > 0? <Layout selectedTab="books" ref='layOut'>
                <div className="page-container-layout">
                    <div className='page-header'>					
                        <h1>Your Cart</h1>
                    </div> 
                    <div className="cotainer-shopping-cart">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Book</th>
                            <th scope="col">Unit Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Subtotal</th>
                            <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.renderRows()}
                        </tbody>
                    </table>
                    </div>             
                </div>
                {this.state.detailsRedirect && <Redirect to={`/book-detail/${this.state.bookID}`} />}
            </Layout> :  this.state.showError ? <div className="alert alert-danger alert-block">
                    <button className="close" data-dismiss="alert">&times;</button>
                        <span>Your Session Expired! Please <a href="/" class="alert-link">Login Again</a></span>
                </div>
                : null
                

        )
	}
}

ShoppingCart.propTypes = {
    //bookID: React.PropTypes.string
}
