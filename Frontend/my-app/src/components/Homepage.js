import React, { Component } from "react";
import axios from 'axios';
import '../App';
class Homepage extends Component {


    constructor(props) {
        super(props)
        this.state = {
            id: 0,
            userName: '',
            userEmail: '',
            password: '',
            subscribed: false,
            loggedIn: false
        }
    }

    handleChange = e => {

        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = e => {


        e.preventDefault();

    }

    addUser = e => {
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
                console.log(response);
                if (response.data === "invalid") {
                    console.log("Något gick fel här..");
                } else {
                    var loggedInUser = {
                        //id: response.data.id,
                        userName: response.data.loginUserName,
                        subscribed: response.data.subscribed,
                    };
                    this.setState({
                        ...this.state,
                        loggedIn: response.data.loggedIn,
                        id: response.data.id
                    });
                    localStorage.setItem(
                        "currentLoggedInUser",
                        JSON.stringify(loggedInUser)

                    );
                    console.log("ID: " + this.state.id);
                }
            })
        e.preventDefault();

    }

    changeNewsLetter = e => {
        e.preventDefault();
        var id = this.state.id;
        console.log(id);
        axios.put("http://localhost:3000/users/" + id)
        .then(response => {
            console.log(response);    
        })
        .catch(error => {
            console.log(error);
            console.log(id);
        })
    }

    render() {

        if (this.state.loggedIn === true) {
            return (

                <div className="body">
                    <p>
                        Click the green button below to change newsletter subscription status to TRUE.
            </p>
                    <form>
                        <div className="newsletter">
                            Set subscription status to TRUE by clicking here: <button className="button" onClick={this.changeNewsLetter}>
                                {this.state.isToggleOn ? 'ON' : 'OFF'}
                            </button>
                        </div>

                    </form>
                </div>

            )
        } else {
            return (

                <div>
                    <form className="form" onSubmit={this.handleSubmit}>
                        <div>
                            <input
                                type="text" id="unId"
                                name="userName"
                                value={this.state.userName}
                                onChange={this.handleChange}
                            />
                            <label htmlFor="unId">New username:</label>
                        </div>
                        <div>
                            <input
                                type="email" id="emailId"
                                name="userEmail"
                                value={this.state.userEmail}
                                onChange={this.handleChange}
                            />
                            <label htmlFor="emailId">New email:</label>
                        </div>
                        <div>
                            <input
                                type="password" id="passwordId"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                            <label htmlFor="passwordId">New password:</label>
                        </div>
                        <button className="registerButton" type="submit" onClick={this.addUser} >Register</button>
                    </form>
                    <form className="form1" onSubmit={this.handleSubmit}>
                        <div>
                            <input
                                type="text" id="loggedUserId"
                                name="loginUserName"
                                //value={this.state.input || ""}
                                value={this.state.loginUserName}
                                onChange={this.handleChange}
                            />
                            <label htmlFor="loggedUserId">username:</label>
                        </div>
                        <div>
                            <input
                                type="text" id="userloginPassowrdId"
                                name="loginUserPassword"
                                //value={this.state.input || ""}
                                value={this.state.loginUserPassword}
                                onChange={this.handleChange}
                            />
                            <label htmlFor="userloginPassowrdId">password:</label>
                        </div>
                        <button className="button" type="submit" onClick={this.login} >Login</button>
                    </form>
                </div>
            )

        }
    }
}
export default Homepage;