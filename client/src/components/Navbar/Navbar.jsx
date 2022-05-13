import React, { Component } from 'react'
import './Navbar.css';

class Navbar extends Component {
  render() {
    return (
      <div>
        <div className="container">
              <span>NFT Marketplace</span>
              <button>Login with Metamask</button>
          </div>
      </div>
    )
  }
}

export default Navbar;
