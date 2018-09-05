import React from 'react';
import  { Redirect } from 'react-router-dom'
import _ from 'lodash'
import Layout from '../../containers/page-layout'
import Suggestions from './suggestion'


export default class Books extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
            redirect: false,
            booksList: [],
            authorsList: [],
			bookCategories: [],
			selectedBookCategory: '',
            selectedAuthor: '',
            query: '',
            results: [],
            language: '',
            showSuggestions: false,
            spreadSheet:[],
            detailsRedirect: false,
            bookID: ''
		}
		
    }
    
    componentDidMount = () => {
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
			error: ()=> { console.log('Authors with the given Genre does not exit') } 
        });
	
	}

	onChangeAuthor = (event) => {
		this.setState({selectedAuthor: event.target.value})
	}

    rowClickEvent = (row) => {
        console.log('Details', row)
        this.setState({detailsRedirect: true, bookID: row.id})
	}

	renderRows = () => {
        return this.state.booksList.length > 0 ? 
        this.state.booksList.map((row) => {
          
            let imageSource = 'http://localhost:8080/'+row.cover_image
			return <tr onClick={() => this.rowClickEvent(row)} key={row.id}>
				<td>{row.id}</td>
				<td>{row.title}</td>
                <td>{row.author_name}</td>
                <td>{row.book_category}</td>  
				<td>{row.publish_date}</td>  
                <td><img className="small-image" src={imageSource} /></td>
			
			</tr>
		}) : null 

    }
    
    onClickNewCategory = () => {
        this.setState({redirect: true})
    }


    filterBooks = () => {
        $.ajax({  
			type: "POST",  
			url: "http://localhost:5000/filter-books",  
			data: JSON.stringify({"book_category": this.state.selectedBookCategory, "author_name":this.state.selectedAuthor}),  
			contentType: "application/json; charset=utf-8",    
			dataType: "json",
			success: (data) => { 
                data.length > 0 ? this.setState({error: ''}) : this.setState({error: 'Authors with the given Book Category does not exit'})
                this.setState({booksList: data});
                //console.log('Authors with the given Genre does not exit', filter-books)
			},
			error: ()=> {  console.log('whatttttttttt')} 
        });
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

	render () {
      
		return (

            <Layout selectedTab="books" ref='layOut'>
                <div className="page-container-layout">
                <div className="page-header">
					
					<h1>Books</h1>
				</div>
               
                <div className="container">
                    <div className="row">
                        <div id="filter-panel" className="collapse filter-panel">
                            <div className="panel panel-default">
                                <div className="panel-body">
                                    <div className="form-inline" role="form">
                                        <div className="form-group">
                                            <label className="filter-col" style={{margin: '0 0 0 0'}} >Book Category:</label>
                                            <select name="book-category" className="form-control" onChange = {this.onChangeBooksCategory}>
                                                <option hidden>Please Select</option> 
                                                    {this.state.bookCategories.map(cat =>                                                 
                                                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                                                    )};
                                            </select>                              
                                        </div> 
                                        <div className="form-group">
                                            <label className="filter-col" style={{margin: '0 0 0 0'}}>Author:</label>
                                            <select name="author-name" className="form-control" onChange = {this.onChangeAuthor}>
                                                <option  hidden>Please Select</option> 
                                                {this.state.authorsList.length ? this.state.authorsList.map((author, index) =>
                                                    <option key={author.id} value={author.name}>{author.name}</option>                                                  
                                                ) : null};
                                            </select>
                                        </div>
                                        <div className="form-group search-button">                            
                                            <button type="submit" className="btn btn-primary filter-col" onClick={this.filterBooks}>
                                                Filter Books
                                            </button>  
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>                             
                    </div>
                </div>
                <div className="search-buttons-container">
                    <div className="form-group">                      
                        <input className="form-control" placeholder="Search for books by Title / Author / Category" ref={input => this.search = input} onChange={this.handleInputChange}/>
                            {this.state.showSuggestions && <Suggestions results={this.state.results} onBookSelect={this.handleBooksTitleChange}/>}
                    </div>

                    <button type="button" className="btn btn-primary btn-info search" onClick={this.simplSearch}>
                       Search
                    </button>

                    <button type="button" className="btn btn-primary advanced-search" data-toggle="collapse" data-target="#filter-panel" >
                        <span className="glyphicon glyphicon-cog"></span> Advanced Search
                    </button>
                </div>
                         
                                                        
                    

                    <div className="container-table">
                    
                        <div className="row">
                        
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Author Name</th>
                                    <th scope="col">Book Category</th>
                                    <th scope="col">Published Date</th>
                                    <th scope="col">Book Image</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {this.renderRows()}
                                </tbody>
                            </table>
                            
                    </div>
                    <nav aria-label="Page navigation">
  <ul className="pagination">
    <li>
      <a href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li><a href="#">1</a></li>
    <li><a href="#">2</a></li>
    <li><a href="#">3</a></li>
    <li><a href="#">4</a></li>
    <li><a href="#">5</a></li>
    <li>
      <a href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
                </div>
                {this.state.redirect && <Redirect to="/new-book" />}
                {this.state.detailsRedirect && <Redirect to={`/book-detail/${this.state.bookID}`} />}

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

