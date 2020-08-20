import React, { Component } from 'react';

import './App.css';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }


  componentDidMount() {
    fetch('http://localhost:3000/users')
      .then(response => response.json())
      .then(res => {
        if (res.data) {
          console.log(res.data);
          this.setState({ users: [...this.state.users, ...res.data] })
        }
      })
  }

  renderUsers() {

    if (this.state.users.length <= 0) {
      return <div>Loading..</div>
    }
    else {
      return this.state.users.map((val, key) => {
        return <div key={key}>{val.userName} | {val.userEmail}

        </div>;
      })
    }

  }

  render() {
    return (
      <div className="App" >
        {this.renderUsers()}
      </div>
    );

  }

}

export default App;
