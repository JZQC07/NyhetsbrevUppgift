import React, { Component } from "react"
import axios from 'axios';
import './App.css';


class Homepage extends Component {


    constructor(props) {
        super(props)

        this.state = {
            userName: '',
            userEmail: '',
            password: '',
            subscribed: false,
            loggedIn: false


        }
    }

    changeHandler = e => {

        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = e => {


        e.preventDefault();

    }


    adduser = e => {

        e.preventDefault();

        axios.post("http://localhost:3000/users", this.state)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error);
            })



    }

    login = e => {
        axios.post("http://localhost:3000/users/login", this.state)

            .then(response => {
                console.log(response)
                console.log(typeof (response.data.subscribed));
                if (response.data === "invalid") {
                    console.log("Något gick fel här..");
                } else {
                    var loggedInUser = {
                        username: response.data.loginUserName,
                        subscribed: response.data.subscribed,
                    };
                    this.setState({
                        ...this.state,
                        loggedIn: response.data.loggedIn
                    });
                    localStorage.setItem(
                        "currentLoggedInUser",
                        JSON.stringify(loggedInUser)

                    );
                }
            })
        e.preventDefault();

    }

    changeNewsLetter = () => {

        axios.post("http://localhost:3000/users", this.state, this.state.subscribed = true)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error);
            })




    }







    render() {



        const { userName, userEmail, password } = this.state
        const { loginUserName, loginUserPassword } = this.state

        if (this.state.loggedIn === true) {
            return (

                <div>
                    <p>
                        Subscribe to newsletter!
            </p>

                    <form onSubmit={this.changeNewsLetter}>
                        <div class="newsletter">
                            Set Newsletter status to TRUE by clicking here: <button onClick={this.onClickHandler}>
                                {this.state.isToggleOn ? 'ON' : 'OFF'}
                            </button>
                        </div>

                    </form>


                </div>

            )
        } else {


            return (

                <div>
                    <form onSubmit={this.submitHandler}>
                        <div>
                            <input

                                type="text" id="unId"
                                name="userName"
                                value={userName}
                                onChange={this.changeHandler}
                            />
                            <label for="unId">username:</label>
                        </div>
                        <div>

                            <input
                                type="email" id="emailId"
                                name="userEmail"
                                value={userEmail}
                                onChange={this.changeHandler}
                            />
                            <label for="emailId">email:</label>
                        </div>
                        <div>

                            <input
                                type="password" id="passwordId"
                                name="password"
                                value={password}
                                onChange={this.changeHandler}
                            />
                            <label for="passwordId">password:</label>
                        </div>
                        <button type="submit" onClick={this.adduser} >Register</button>


                    </form>

                    <form onSubmit={this.submitHandler}>

                        <div>
                            <input
                                type="text" id="loggedUserId"

                                name="loginUserName"
                                value={loginUserName}
                                onChange={this.changeHandler}
                            />
                            <label for="loggedUserId">username:</label>
                        </div>

                        <div>
                            <input
                                type="text" id="userloginPassowrdId"

                                name="loginUserPassword"
                                value={loginUserPassword}
                                onChange={this.changeHandler}
                            />
                            <label for="userloginPassowrdId">password:</label>
                        </div>

                        <button type="submit" onClick={this.login} >Login</button>


                    </form>
                </div>


            )

        }
    }
}
export default Homepage;