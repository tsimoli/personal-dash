import React from 'react'

export default class NavBar extends React.Component {
  constructor() {
     super();
  }

  render() {
    return (
      <nav>
    <div className="nav-wrapper">
      <a href="/" className="brand-logo center">Dashboard</a>
    </div>
  </nav>
    )
  }
}
