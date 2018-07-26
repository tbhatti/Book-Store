import React from 'react';
import  { Redirect } from 'react-router-dom'
import _ from 'lodash'
import Layout from '../../containers/page-layout'


export default class NewCategory extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
            redirect: false,
            categoryName: '',
            categoryDescription: ''
		}
		
    }
    
    componentDidMount = () => {	
    }

    onCategoryNameInputChange = (event) => {
        this.setState({categoryName: event.target.value})
    }

    onCategoryDescriptionChange = (event) => {
        this.setState({categoryDescription: event.target.value})
    }
    

    createCatgory = () => {
        $.ajax({  
            type: "POST",  
            url: "http://localhost:5000/new-category",  
            data: JSON.stringify({"name": this.state.categoryName, "description": this.state.categoryDescription}),  
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
            <Layout selectedTab="book-categories">
                
                <div className='row page-header'>
					
					<h1>Book Categories</h1>
				</div>


               
                    <div className="container-new-category">
                        <div className="row">                        
                        <fieldset >
                                <div className="form-group">
                                <label>Category Name</label>
                                <input type="text" id="categoryNameInput" className="form-control"  placeholder="Category Name" onChange={this.onCategoryNameInputChange}/>
                                </div>
                                <div className="form-group">
                                    <label >Description</label>
                                    <textarea className="form-control" rows="10" cols="50" placeholder="Category Description" onChange={this.onCategoryDescriptionChange} ></textarea>
                                    
                                </div>
                                <button className="btn btn-primary" onClick={this.createCatgory}>Create Category</button>
                                <button className="btn btn-secondary" onClick={this.onClickCancel}>Cancel</button>
                                
                            </fieldset>
                            
                    </div>
                </div>
                {this.state.redirect && <Redirect to="/book-categories" />}
               
            </Layout>

        )
	}
}

NewCategory.propTypes = {
	/**Props will go here*/ 
}

