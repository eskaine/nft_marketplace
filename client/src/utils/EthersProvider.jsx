import React, { useState } from 'react';
import { ethers } from 'ethers';

const EthersContext = React.createContext();

const EthersProvider = ({children}) => {
  const [state, setState] = useState();
  
  async function setAccount() {
    if(typeof window.ethereum !== 'undefined') {
      const userAccount = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setState({
        userAccount, provider
      });
    } else {
      //alert install metamask
    }
  }

  return (
    <EthersContext.Provider value={{setAccount, ...state}}>
      {children}
    </EthersContext.Provider>
  );
}

export { EthersProvider, EthersContext };
