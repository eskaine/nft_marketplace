import React, { useContext } from 'react';
import Button from './shared/Button';
import { EthersContext } from '../utils/EthersProvider';

function Navbar() {
  const { setAccount, userAccount } = useContext(EthersContext);

  return (
    <div className="my-5 flex justify-between">
      <span className="font-bold text-white">NFT MARKETPLACE</span>
      {!userAccount && <Button bgColor="primary-color" name="Login with Metamask" onClick={setAccount} />}
      {userAccount && <Button bgColor="primary-color" name="Add NFT" />}
    </div>
  );
}

export default Navbar;
