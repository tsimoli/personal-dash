import React from 'react';
import { Link }  from 'react-router';
export default class NavBar extends React.Component {
  constructor() {
     super();
  }

  render() {
    return (
      <nav>
    <div className="nav-wrapper">
      <a href="/" className="brand-logo center">Dashboard</a>
      <Link to="/weather"> Weather </Link>
    </div>
  </nav>
    );
  }
}
