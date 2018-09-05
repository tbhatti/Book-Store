import React from 'react';
import  { Redirect } from 'react-router-dom'
import _ from 'lodash'
import Layout from '../../containers/page-layout'


export default class Books extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
            publishersList: []
		}
      this.datas = {}
		
    }
    
    componentDidMount = () => {
        $.ajax({  
			type: "GET",  
			url: "http://localhost:5000/publishers-list",  
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: (data) => { 
				this.setState({publishersList: data});
			},
			error: ()=> { } 
		});
		
    }

    rowClickEvent = (row) => {
	}

	renderRows = () => {
		return this.state.publishersList.map((row) => {
			return <tr onClick={() => this.rowClickEvent(row)} key={row.id}>
				<td>{row.id}</td>
				<td>{row.name}</td>
				<td>{row.publication_city}</td>
			
			</tr>
		})

    }
    
    onClickNewAuthor = () => {}


	render () {
		return (
            <Layout selectedTab="publishers">
                <div className="page-container-layout">
                <div className='page-header'>
					
					<h1>Publishers</h1>
				</div>

                    <div className="container-table">
                        <div className="row table-publishers">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Publication City</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {this.renderRows()}
                                </tbody>
                            </table>
                            
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

