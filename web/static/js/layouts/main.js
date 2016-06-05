import React from 'react';
import NavBar from './nav-bar'

export default class MainLayout extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (<div><NavBar /> {this.props.children} </div>);
  }
}
