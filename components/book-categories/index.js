import React from 'react';
import  { Redirect } from 'react-router-dom'
import _ from 'lodash'
import Layout from '../../containers/page-layout'


export default class BookCategories extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
            redirect: false,
            bookCategories: []
		}
      this.datas = {}
		
    }
    
    componentDidMount = () => {
        console.log('componentDidMount get called', this.state.userDetail,  'Data',  this.datas)
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

    rowClickEvent = (row) => {
		// console.log('EVENT=>', row)
		// this.setState({redirect: true, userID: row.id})
	}

	renderRows = () => {
		return this.state.bookCategories.map((row) => {
			return <tr onClick={() => this.rowClickEvent(row)} key={row.id}>
				<td>{row.id}</td>
				<td>{row.name}</td>
				<td>{row.description}</td>
                <td>{row.id}</td>
				<td>{row.name}</td>
				<td>{row.description}</td>
			
			</tr>
		})

    }
    
    onClickNewCategory = () => {
        this.setState({redirect: true})
    }


	render () {
		return (
            <Layout selectedTab="book-categories">
                <div className="page-container-layout">
                <div className='page-header'>
					
					<h1>Book Categories</h1>
				</div>

                    <div className="container-table">
                        <div className="row">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {this.renderRows()}
                                </tbody>
                            </table>
                            
                    </div>
                </div>
                {this.state.redirect && <Redirect to="/create" />}

                <div className='buttons-container'>
						<div className='pull-right'>
                        <button className="btn btn-primary pull-right" onClick={this.onClickNewCategory}>Add New Category</button>
							
						</div>
					</div>
                </div>
                

              
            </Layout>

        )
	}
}

BookCategories.propTypes = {
    /** Props will go here */
}

