import React from 'react';
import  { Redirect } from 'react-router-dom'
import _ from 'lodash'
import Layout from '../../containers/page-layout'


export default class NewBook extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
            redirect: false,
            bookTitle: '',
            publishedDate: '',
            bookCategories: [],
            selectedBookCategory: '',
            authorsList: [],
            selectedAuthor: ''
		}
		
    }
    
    componentDidMount = () => {	
        $.ajax({  
			type: "GET",  
			url: "http://localhost:5000/books-categories-list",  
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: (data) => { 
				this.setState({bookCategories: data});
			},
			error: ()=> { } 
        });
        
        $.ajax({  
			type: "GET",  
			url: "http://localhost:5000/authors-list",  
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: (data) => { 
				this.setState({authorsList: data});
			},
			error: ()=> { } 
		});
    }

    onTitleChange = (event) => {
        this.setState({bookTitle: event.target.value})
    }

    onPublishedDateChange = (event) => {
       this.setState({publishedDate: event.target.value})
       
    }

    onChangeBooksCategory = (event) => {
        this.setState({selectedBookCategory: event.target.value})
    }

    onChangeAuthor = (event) => {
        this.setState({selectedAuthor: event.target.value})
    }
    

    createBook = () => {
        $.ajax({  
            type: "POST",  
            url: "http://localhost:5000/new-book",  
            data: JSON.stringify({"title": this.state.bookTitle, "publish_date": this.state.publishedDate, "book_category": this.state.selectedBookCategory, "author_name": this.state.selectedAuthor}),  
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: (dataString) => {  
                console.log('SUCCESSFULLY DONE____!')
               this.setState({redirect: true})
            },
            error: ()=> {
                console.log('ERRROR DONE____!')

              } 
        });

        
    }

    onClickCancel = () => {
        this.setState({redirect: true})
    }


	render () {
		return (
            <Layout selectedTab="books">
                
                <div className='page-header'>
					
					<h1>New Book</h1>
				</div>


               
                    <div className="container-new-category">
                        <div className="row">
                        <fieldset >
                                <div className="form-group">
                                <label>Title</label>
                                <input type="text" id="title" className="form-control"  placeholder="Book Title" onChange={this.onTitleChange}/>
                                </div>

                                <div className="form-group">
                                    <label>Author Name</label>
                                    <select name="author-name" className="form-control" onChange = {this.onChangeAuthor}>
                                        {this.state.authorsList.map(author =>
                                        <option id={author.id} value={author.name}>{author.name}</option>
                                        )};
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Book Category</label>
                                    <select name="book-category" className="form-control" onChange = {this.onChangeBooksCategory}>
                                        {this.state.bookCategories.map(cat =>
                                        <option id={cat.id} value={cat.name}>{cat.name}</option>
                                        )};
                                    </select>
                                </div>

                                
                                <div className="form-group">
                                    <label >Published Date</label>
                                    <input type="date" className="form-control" id="end" name="trip"
                                        value="2018-07-29"
                                        min="2018-01-01" max="2018-12-31" onChange={this.onPublishedDateChange}/>
                                    
                                </div>
                                <form ref='uploadForm' 
                                id='uploadForm' 
                                action="http://localhost:5000/upload"
                                method='post' 
                                target="_blank"
                                encType="multipart/form-data">
                                    <input type="file" className="form-control" name="myCV" />
                                    <input type='submit' className="btn btn-success" value='Upload!' />
                                </form>

                                
                                <button className="btn btn-primary" onClick={this.createBook}>Create Book</button>
                                <button className="btn btn-secondary" onClick={this.onClickCancel}>Cancel</button>
                                
                            </fieldset>
                            
                    </div>
                </div>
                {this.state.redirect && <Redirect to="/books" />}
               
            </Layout>

        )
	}
}

NewBook.propTypes = {
	/**Props will go here*/ 
}

