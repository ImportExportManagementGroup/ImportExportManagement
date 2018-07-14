import React, { Component } from 'react';
import{
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import './Assets/css/default.min.css';
import Header from './components/pages/header'
import Footer from './components/pages/footer'
import HomePage from './components/pages/homePage'
import Item from './components/pages/item'
import fetch from 'node-fetch';

var sqlQuery = "SELECT * FROM Stock";
var form = new FormData();
form.append("query", sqlQuery);

class App extends Component {

  // create a table of Items
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
        <Link to ="/homepage"> Homelink </Link>

      </div>
      </Router>
    );
  }
}

export default App;
