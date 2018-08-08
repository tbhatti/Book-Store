import React from 'react';
import  { Redirect } from 'react-router-dom'
import _ from 'lodash'
import Layout from '../../containers/page-layout'


export default class NewCategory extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
            redirect: false,
            authorName: '',
            selectedBookCategory: '',
            bookCategories: []
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
    }

    onAuthorNameInputChange = (event) => {
        this.setState({authorName: event.target.value})
    }

    onChangeBooksCategory = (event) => {
        this.setState({selectedBookCategory: event.target.value})
    }

    createAuthor = () => {
        $.ajax({  
            type: "POST",  
            url: "http://localhost:5000/new-author",  
            data: JSON.stringify({"name": this.state.authorName, "genre": this.state.selectedBookCategory}),  
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
            <Layout selectedTab="authors">
                
                <div className='row page-header'>
					
					<h1>Authors</h1>
				</div>


               
               <div className="container-new-category">
                        <div className="row">
                        <fieldset >
                                <div className="form-group">
                                <label>Author Name</label>
                                <input type="text" id="authorNameInput" className="form-control"  placeholder="Author Name" onChange={this.onAuthorNameInputChange}/>
                                </div>
                                <div className="form-group">
                                    <label>Book Category</label>
                                    <select name="book-category" className="form-control" onChange = {this.onChangeBooksCategory}>
                                        {this.state.bookCategories.map(cat =>
                                        <option id={cat.id} value={cat.name}>{cat.name}</option>
                                        )};
                                    </select>
                                </div>
                                <button className="btn btn-primary" onClick={this.createAuthor}>Create Author</button>
                                <button className="btn btn-secondary" onClick={this.onClickCancel}>Cancel</button>
                                
                            </fieldset>
                            
                    </div>
                </div>
                {this.state.redirect && <Redirect to="/authors" />}
               
            </Layout>

        )
	}
}

NewCategory.propTypes = {
	/**Props will go here*/ 
}

