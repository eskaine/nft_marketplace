import React, { Component } from 'react'

class Navbar extends Component {
  render() {
    return (
      <div>
        <div className='container mx-auto flex justify-between'>
              <span className='font-bold text-white'>NFT Marketplace</span>
              <button className='rounded-full px-4 py-2 bg-blue-600 text-white'>Login with Metamask</button>
          </div>
      </div>
    )
  }
}

export default Navbar;
