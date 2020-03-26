import React, { Component } from 'react';
import Logo from '../img/logo.png';

export default class Banner extends Component {
  render() {
    return (
      <div className="Banner">
        <img src={Logo} alt="Banner" />
      </div>
    )
  }
}
