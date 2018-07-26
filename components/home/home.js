import React from 'react';
import  { Redirect } from 'react-router-dom'
import Layout from '../../containers/page-layout'

export default class Home extends React.Component {

	constructor(props) {
        super(props);
        this.state = {
    		}
      }

	  

	render () {
		return (
                <Layout selectedTab="home">
				<div className='page-header'>
					
					<h1>Home?</h1>
				</div>
					<div className="book-mark-image">

						<div className="transparent-box">

						<p>©Introduction Text will go here...!©

						</p>

						</div>

						</div> 
                </Layout>
			
		)
	}
}



