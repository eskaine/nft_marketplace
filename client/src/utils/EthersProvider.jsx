import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { ethers } from 'ethers';

const EthersContext = React.createContext();

function EthersProvider({ children }) {
  const [state, setState] = useState();

  async function setAccount() {
    if (typeof window.ethereum !== 'undefined') {
      const userAccount = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setState({
        userAccount, provider,
      });
    } else {
      // alert install metamask
    }
  }

  const memoizedState = useMemo(() => ({ setAccount, ...state }));

  return (
    <EthersContext.Provider value={memoizedState}>
      {children}
    </EthersContext.Provider>
  );
}

EthersProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export { EthersProvider, EthersContext };
