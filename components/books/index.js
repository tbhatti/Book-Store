import React from 'react';
import  { Redirect } from 'react-router-dom'
import _ from 'lodash'
import Layout from '../../containers/page-layout'


export default class Books extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
            redirect: false,
            booksList: [],
            authorsList: [],
			bookCategories: [],
			selectedBookCategory: '',
			selectedAuthor: ''
		}
      this.datas = {}
		
    }
    
    componentDidMount = () => {
        console.log('componentDidMount get called', this.state.userDetail,  'Data',  this.datas)
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
        
        $.ajax({  
			type: "GET",  
			url: "http://localhost:5000/books-categories-list",  
			contentType: "application/json; charset=utf-8",    
			dataType: "json",
			success: (data) => { 
                console.log('CAT====>', data[0].name)
				this.setState({bookCategories: data, selectedBookCategory: data[0].name });
			},
			error: ()=> { } 
        });
        
        $.ajax({  
			type: "GET",  
			url: "http://localhost:5000/authors-list",  
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: (data) => { 
                console.log('AUTHHHH====>', data[0].name)
				this.setState({authorsList: data, selectedAuthor: data[0].name});
			},
			error: ()=> { } 
		});
		
    }

    onChangeBooksCategory = (event) => {
		this.setState({selectedBookCategory: event.target.value})
		let genre = event.target.value
		$.ajax({  
			type: "POST",  
			url: "http://localhost:5000/filter-authors",  
			data: JSON.stringify({"genre": genre}),  
			contentType: "application/json; charset=utf-8",    
			dataType: "json",
			success: (data) => { 
				this.setState({authorsList: data});
			},
			error: ()=> { } 
        });
	
	}

	onChangeAuthor = (event) => {
		this.setState({selectedAuthor: event.target.value})
	}

    rowClickEvent = (row) => {
		
	}

	renderRows = () => {
		return this.state.booksList.map((row) => {
          
            let imageSource = 'http://localhost:8080/'+row.cover_image
			return <tr onClick={() => this.rowClickEvent(row)}>
				<td>{row.id}</td>
				<td>{row.title}</td>
                <td>{row.author_name}</td>
                <td>{row.book_category}</td>  
				<td>{row.publish_date}</td>  
                <td><img className="small-image" src={imageSource} /></td>
			
			</tr>
		})

    }
    
    onClickNewCategory = () => {
        this.setState({redirect: true})
    }


    filterBooks = () => {
        console.log('selectedBookCategory=>', this.state.selectedBookCategory, 'selectedAuthor', this.state.selectedAuthor)
        $.ajax({  
			type: "POST",  
			url: "http://localhost:5000/filter-books",  
			data: JSON.stringify({"book_category": this.state.selectedBookCategory, "author_name":this.state.selectedAuthor}),  
			contentType: "application/json; charset=utf-8",    
			dataType: "json",
			success: (data) => { 
				this.setState({booksList: data});
			},
			error: ()=> { } 
        });
	}

	render () {
		return (
            <Layout selectedTab="books">
                <div className="container-book-categories">
                <div className='page-header'>
					
					<h1>Books</h1>
				</div>

                    <div className="container-table">
                    
                        <div className="row">
                                <div className="row">
								<div className="form-group">
                                    <label>Select Category</label>
                                    <select name="book-category" className="form-control" onChange = {this.onChangeBooksCategory}>
                                        {this.state.bookCategories.map(cat =>
                                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                                        )};
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Select Name</label>
                                    <select name="author-name" className="form-control" onChange = {this.onChangeAuthor}>
                                        {this.state.authorsList.map(author =>
                                        <option key={author.id} value={author.name}>{author.name}</option>
                                        )};
                                    </select>
                                </div> 
                                <button className="btn btn-primary" onClick={this.filterBooks}>Filter</button>
                        </div>
                          
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Author Name</th>
                                    <th scope="col">Book Category</th>
                                    <th scope="col">Published Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {this.renderRows()}
                                </tbody>
                            </table>
                            
                    </div>
                </div>
                {this.state.redirect && <Redirect to="/new-book" />}

                <div className='buttons-container'>
						<div className='pull-right'>
                        <button className="btn btn-primary pull-right" onClick={this.onClickNewCategory}>Add New Book</button>
							
						</div>
					</div>
                </div>
                

              
            </Layout>

        )
	}
}

Books.propTypes = {
    /** Props will go here */
}

