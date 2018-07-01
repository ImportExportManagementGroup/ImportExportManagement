import React, { Component } from 'react';
import{
  Link
}  from 'react-router-dom';
class Header extends Component {
  render() {
    return (
      <header>

        <div className="container-fluid">
          Company Name
        </div>

        <nav>

          <ul>
            <li>
              <Link to ="/homepage"> Homelink </Link>
              <a href="#">Link to the Company website</a>
            </li>
            <li>
              <Link to ="/homepage"> Sign in as admin </Link>
            </li>
            <li>
              <Link to ="/homepage"> Sign in as guest </Link>
            </li>
          </ul>


        </nav>

      </header>
    );
  }
}

export default Header;
