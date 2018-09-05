import React from 'react';
import  { Redirect } from 'react-router-dom'
import _ from 'lodash'
import Layout from '../../containers/page-layout'


export default class Books extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
            redirect: false,
            authorsList: []
		}
      this.datas = {}
		
    }
    
    componentDidMount = () => {
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

    rowClickEvent = (row) => {
	}

	renderRows = () => {
		return this.state.authorsList.map((row) => {
			return <tr onClick={() => this.rowClickEvent(row)} key={row.id}>
				<td>{row.id}</td>
				<td>{row.name}</td>
				<td>{row.genre}</td>
			
			</tr>
		})

    }
    
    onClickNewAuthor = () => {
        this.setState({redirect: true})
    }


	render () {
		return (
            <Layout selectedTab="authors">
                <div className="page-container-layout">
                <div className='page-header'>
					
					<h1>Authors</h1>
				</div>

                    <div className="container-table">
                        <div className="row">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Genre</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {this.renderRows()}
                                </tbody>
                            </table>
                            
                    </div>
                </div>
                {this.state.redirect && <Redirect to="/new-author" />}

                <div className='buttons-container'>
						<div className='pull-right'>
                        <button className="btn btn-primary pull-right" onClick={this.onClickNewAuthor}>Add New Author</button>
							
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

