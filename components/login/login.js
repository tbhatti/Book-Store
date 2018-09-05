
import React, { Component } from 'react';
import  { Redirect } from 'react-router-dom'
import {setProfile} from '../../actions/user';
import {connect} from 'react-redux';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errorMessage: '',
            showError: false,
            redirect: false,
            // User Object for Registeration
            firstName: '',
            lastName: '',
            email: '',
            userPassword: ''

    };
      }
      onSignInClick = () => {
           $.ajax({  
            type: "POST",  
            url: "http://localhost:5000/login",  
            data: JSON.stringify({"email": this.state.username, "password": this.state.password}),  
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: (userArray) => {  
                //$('#mentor_list').html(dataString);
                console.log('LOGIN===========>', userArray[0])
                this.props.dispatch(setProfile(userArray[0]))
                this.setState({errorMessage: '', showError: false, redirect: true});
               // <Redirect to='www.google.com'  />
            },
            error: ()=> {
                this.setState({errorMessage: 'User with the given username does not exit', showError: true});

              } 
        });
    }

    typeUsername = (event) => {
       // console.log(event.target.value)
		this.setState({username: event.target.value})
	}

    typePwd = (event) => {
		this.setState({password: event.target.value})
    }

    onFirstNameChange = (event) => {
        this.setState({firstName: event.target.value})
    }

    onLastNameChange = (event) => {
        this.setState({lastName: event.target.value})
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({userPassword: event.target.value})
    }
    
    onJoinClick = () => {
        $.ajax({  
            type: "POST",  
            url: "http://localhost:5000/register-user",  
            data: JSON.stringify({"first_name": this.state.firstName, "last_name": this.state.lastName, "email": this.state.email, "password": this.state.userPassword}),  
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: (dataString) => {  
                //$('#mentor_list').html(dataString);
                this.setState({errorMessage: '', showError: false, redirect: true});
               // <Redirect to='www.google.com'  />
            },
            error: ()=> {
                this.setState({errorMessage: 'User with the given Email address does not exit', showError: true});

              } 
        });
    }




  render() {
    const {user} = this.props.userReducer;
    return (
        <div className="container-main-page">       
           
            <div className="container">
                <div className="row">
                    <div className="col order-last">
                    first, but unordered
                    </div>
                    <div className="col order-12">
                    <form>
                            <div className="form-row">
                                <div className="col-md">
                                <input type="text" className="form-control" placeholder="Email" onChange={this.typeUsername} />
                                </div>
                                <div className="col-md">
                                <input type="password" className="form-control" placeholder="Password" onChange={this.typePwd} />
                                </div>
                                <div className="col">
                                    <button type="button" className="btn btn-danger" onClick={this.onSignInClick}>Sign in</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col order-1">
                    <img className='Talent Manager' src='tm.png' alt='Talent Manager'  />
                    </div>
                </div>          
            </div>

            { this.state.showError ?  
                <div className="alert alert-danger">
                    <span className="glyphicon glyphicon-remove-circle"></span>
                    <strong></strong> {this.state.errorMessage}
                </div> 
            : null}

            {/*Sign Up*/}

            <div className="container-sign-up">
           <div className="row">
                <div className="header">
                    <p className="be-great-paragraph">Be great at what you do</p>
                    <p className="get-started-paragraph">Get started - it's free.</p>
                </div>
                <form>
                    <fieldset>
                        <div className="form-group">
                        <label>First Name</label>
                        <input type="text" id="fistNameTextInput" className="form-control" placeholder="First Name" onChange={this.onFirstNameChange}/>
                        </div>
                        <div className="form-group">
                            <label >Last Name</label>
                            <input type="text" id="lastNameTextInput" className="form-control" placeholder="Last Name" onChange={this.onLastNameChange}/>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" id="emailTextInput" className="form-control" placeholder="Email" onChange={this.onEmailChange}/>
                        </div>
                       
                        <div className="form-group">
                            <label>Password (7 or more characters)</label>
                            <input type="password" id="passwordTextInput" className="form-control" placeholder="Password" onChange={this.onPasswordChange} />
                        </div>

                        <div className="form-group">
                            <label className="label-privacy-policy"> By clicking Join now, you agree to the LinkedIn User Agreement, Privacy Policy, and Cookie Policy.</label>
                            
                        </div>
                        <button type="submit" className="btn btn-primary btn-join" onClick={this.onJoinClick}>Join Now</button>
                    </fieldset>
                </form>
            </div>
         </div>
         {this.state.redirect && <Redirect to="/home" />}
         <div className="container-footer"></div>
         
 </div>

        

    );
  }
}

export default connect(state => state)(Login);
