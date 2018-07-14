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
function openWindow() {
    var i, l, options = [{
       value: 'first',
       text: 'First'
    }, {
       value: 'second',
       text: 'Second'
    }],
    newWindow = window.open("", null, "height=200,width=400,status=yes,toolbar=no,menubar=no,location=no");

    newWindow.document.write("<select onchange='window.opener.setValue(this.value);'>");
    for(i=0,l=options.length; i<l; i++) {
        newWindow.document.write("<option value='"+options[i].value+"'>");
        newWindow.document.write(options[i].text);
        newWindow.document.write("</option>");
    }
    newWindow.document.write("</select>");
}

function setValue(value) {
    document.getElementById('value').value = value;
}

for (var i = 1 ; i < 2; i++){
  var currentItem = document.getElementById('item'+i)
  var currentData=1;
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
    .then(res => {
      currentData=res;
      var item = new Item(res.object_id,res.picture_id,res.date_in,res.date_out,res.number_in_stock);
      console.log(item);
      ReactDOM.render(
        <div id="wrap" >
          <h1>
            This is an Item {item.getObjectId()}
          </h1>
          <img src="./dog.jpg"/>
          <ul>
            <li>
              Current number in stock is {item.getNumberInStock()}
            </li>
            <li>
              date in is {item.getDateIn()}
            </li>
            <li>
              date out is {item.getDateOut()}
            </li>
            <li>
              <button className="runbutton" onClick={item.handleChangeClick}>{item.state.change}</button>
            </li>
            <li>
              <button className="runbutton" onClick={item.handleAddClick}>{item.state.add}</button>
            </li>
            <li>
              <button className="runbutton" onClick={item.handleCheckingClick}>{item.state.check}</button>
            </li>
            <li>
              <button id="pop" onClick={item.handleCheckingClick}>{item.state.check}</button>
            </li>
          </ul>
        </div>, currentItem);
    })
  }
  construct();
}
ReactDOM.render(<Footer/>, document.getElementById('footer'));
ReactDOM.render(<Catalog/>, document.getElementById('catalog'));
registerServiceWorker();


// ReactDOM.render(<Footer/>, document.getElementById('button'));
// document.getElementById("button").addEventListener("click", tick(), false);

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
