import React, { useContext } from 'react';
import Button from './shared/Button';
import { EthersContext } from '../utils/EthersProvider';

function Navbar() {
  const { connectWallet, userAccount } = useContext(EthersContext);

  return (
    <div className="my-5 flex justify-between">
      <span className="font-bold text-white"><a href="/">NFT MARKETPLACE</a></span>
      {!userAccount && <Button bgColor="primary-color" name="Login with Metamask" onClick={connectWallet} />}
      {userAccount && (
        <div className="user-nav">
          <a href="/user">My List</a>
          <Button bgColor="primary-color" name="Add NFT" />
        </div>
      )}
    </div>
  );
}

export default Navbar;
