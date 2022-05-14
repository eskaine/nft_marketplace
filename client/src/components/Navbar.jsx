import React, { useContext } from 'react';
import Button from './shared/Button';
import { EthersContext } from '../utils/EthersProvider';

function Navbar() {
  const { setAccount, userAccount } = useContext(EthersContext);

  return (
    <div>
      <div className="container mx-auto flex justify-between">
        <span className="font-bold text-white">NFT MARKETPLACE</span>
        {!userAccount && <Button bgColor="primary-color" name="Login with Metamask" onClick={setAccount} />}
      </div>
    </div>
  );
}

export default Navbar;
