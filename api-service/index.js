import assign from 'object-assign'
import {EventEmitter} from 'events'

const BooksService = assign({}, EventEmitter.prototype, {
	loginRequest (data) {
        let result 
		$.ajax({  
            type: "POST",  
            url: "http://localhost:5000/login",  
            data: JSON.stringify({"email": this.state.username, "password": this.state.password}),  
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: (userArray) => { 
                this.setState({errorMessage: '', showError: false, redirect: true});
                result = userArray[0]
            },
            error: ()=> {
                this.setState({errorMessage: 'User with the given username does not exit', showError: true});

              } 
        });
        return {errorMessage: '', result}
	},
	emitChange () {
		this.emit('change')
	}
})

export default BooksService
