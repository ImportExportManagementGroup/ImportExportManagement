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

  state = {users: [], items :[]};
  componentDidMount() {
    console.log("componentDidMount");
    fetch('http://localhost:3001/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));

      // fetch data from mysql database
      console.log("query is");
      fetch('http://localhost:3306/queryLocal', {
          "async": true,
          "crossDomain": true,
          "method": "POST",
          "headers": {
            "query": "SELECT * FROM Stock",
            "Cache-Control": "no-cache",
            "Postman-Token": "d1d3836f-c361-4756-8e64-20bb5428e35f"
          },
          "processData": false,
          "contentType": false,
          "mimeType": "multipart/form-data",
          "data": form
      })
      .then(res => function (){
        res.json();
        console.log("the res is " + res[0]['object_id']);
        for (var i = 0 ; i < 2 ; i++) {
          console.log("first item is" + res[0]);
          console.log(res[0]['object_id']);
          var a = new Item(res[i]['object_id'],res[i]['picture_id'],res[i]['time_in'],res[i]['time_out'],res[i]['number_of_stock']);
          console.log("the current a is " + a);
        }}
      )
      .then(items => this.setState({ items }))
  }

  // // fetch data from mysql database
  // fetchItemData() {
  //   console.log("query is");
  //   fetch('http://localhost:3306/queryLocal', {
  //       "async": true,
  //       "crossDomain": true,
  //       "method": "POST",
  //       "headers": {
  //         "query": "SELECT * FROM Stock",
  //         "Cache-Control": "no-cache",
  //         "Postman-Token": "d1d3836f-c361-4756-8e64-20bb5428e35f"
  //       },
  //       "processData": false,
  //       "contentType": false,
  //       "mimeType": "multipart/form-data",
  //       "data": form
  //   })
  //   .then(res => res.json())
  //   .then(rawItems => this.setRawItems({ rawItems }))
  // }

  //construct an item for each item, and add them to the list
  constructItems (items) {
    console.log("construct item");
    items.map(
      item => {
        var a = new Item(item.object_id,item.picture_id,item.time_in,item.time_out,item.number_of_stockd);
        console.log("the current a is " + a);
      })
      // .then(console.log(item))
      // .then(items.add(item))
  }

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

        // <Header/>

        <Link to ="/homepage"> Homelink </Link>

        // <Footer/>

      </div>
      </Router>
    );
  }
}

export default App;
