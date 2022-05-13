import React, { Component } from 'react'

class Navbar extends Component {
  render() {
    return (
      <div>
        <div className="container mx-auto flex justify-between">
              <span>NFT Marketplace</span>
              <button>Login with Metamask</button>
          </div>
      </div>
    )
  }
}

export default Navbar;
