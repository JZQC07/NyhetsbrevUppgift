import React, { Component } from "react"
import './App.css';

import axios from 'axios';


class login extends Component {


changeHandler = e => {

this.setState({ [e.target.name]: e.target.value })
}

submitHandler = e => {


e.preventDefault();

}


login = e => {
e.preventDefault();

axios.post("http://localhost:3000/users",this.state)
.then(response => {
console.log(response)
})
.catch(error => {
console.log(error);
})
}


render() {
const { loginUser, userLoginPassword} = this.state


return (

<div class ="Login">
    <form onSubmit={this.submitHandler}>
        <div>
            <input type="text" placeholder="Username" name="Username" value={loginUser} onChange={this.changeHandler} />
        </div>

        <div>
            <input type="password"  placeholder="password" name="Password" value={userLoginPassword} onChange={this.changeHandler} />
        </div>
        <button type="submit" onClick={this.login}>Login</button>
    </form>
</div>
)
}
}
export default login;