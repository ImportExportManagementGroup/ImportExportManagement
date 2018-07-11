import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Header from './components/pages/header';
import Footer from './components/pages/footer';
import Catalog from './components/pages/catalog';
import Item from './components/pages/item';
import fetch from 'node-fetch';

ReactDOM.render(<Header/>, document.getElementById('header'));
// ReactDOM.render(<App />, document.getElementById('root'));

for (var i = 1 ; i < 2; i++){
  var currentItem = document.getElementById('item'+i)
  currentItem.setAttribute('number',i);
  function construct() {
    var sqlQuery = "SELECT * FROM Stock WHERE object_id = " + i;
    var form = new FormData();
    form.append("query", sqlQuery);
    fetch('http://localhost:3306/queryLocal', {
        "async": true,
        "crossDomain": true,
        "method": "POST",
        "headers": {
          "query": sqlQuery,
          "Cache-Control": "no-cache",
          "Postman-Token": "d1d3836f-c361-4756-8e64-20bb5428e35f",
        },
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    })
    .then(res => res.json())
    .then(res => res.item)
    .then(res => res[0])
    // return <Catalog/>;
  }
  ReactDOM.render(construct(), currentItem);
}
ReactDOM.render(<Footer/>, document.getElementById('footer'));
ReactDOM.render(<Catalog/>, document.getElementById('catalog'));
registerServiceWorker();



function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById('second'));
}

setInterval(tick, 1000);
