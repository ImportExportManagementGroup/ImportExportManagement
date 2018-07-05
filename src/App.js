import React, { Component } from 'react';
import{
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import './Assets/css/default.min.css';
import Header from './components/headerComponents/header'
import Footer from './components/footerComponents/footer'
import HomePage from './components/pages/homePage'
import Item from './components/pages/item'
import fetch from 'node-fetch';

class App extends Component {

  state = {users: []}
  componentDidMount() {
    fetch('http://ec2-18-191-61-134.us-east-2.compute.amazonaws.com:3001/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  createTable = () => {
    let table = []
    for (let i = 0; i < 2; i++) {
      // use css to make class one and 2 parallel, and can change
      // this to a function so we can have more in one line
      table.push(<Item className="one"/>)
      table.push(<Item className="two"/>)
    }
    return table
  }

  render() {
    return (
      <Router>
      <div className="App">

        <h1>Users</h1>
        <ul> {this.state.users.map(user =>
          <li  key={user.id}>{user.username}</li>
        )}
        </ul>
        <Route exact path='/header' component={Header}/>
        <Route exact path='/homepage' component={HomePage}/>

        <ul>
          {this.createTable()}
        </ul>


        <Route exact path='/footer' component={Footer}/>

        <Header/>

        <Link to ="/homepage"> Homelink </Link>

        <Footer/>

      </div>
      </Router>
    );
  }
}

export default App;
