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

class App extends Component {
  state = {users: []}

  componentDidMount(){
    fetch('/users').
    then(res => res.json()).
    then(users => this.setState({users }));
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
