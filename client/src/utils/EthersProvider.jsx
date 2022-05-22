import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { ethers } from 'ethers';
import contractABI from './MarketPlace.json';
import ipfsClient from './ipfsClient';
import data from '../seedData';

const EthersContext = React.createContext();

function EthersProvider({ children }) {
  const [contractAddress] = useState('');
  const [state, setState] = useState({});
  // temp nft state
  const [nftList, addNFTToList] = useState(data);

  async function setAccount() {
    if (typeof window.ethereum !== 'undefined') {
      const userAccount = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setState({
        userAccount, provider, ...state,
      });
    } else {
      // alert install metamask
    }
  }

  function getContract() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      return new ethers.Contract(
        contractAddress,
        contractABI.abi,
        signer
      );
    }
  }

  function writeImage(imageFile) {
    try {
      if(ipfsClient) {
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(imageFile);
        reader.onloadend = () => {
          const buffer = Buffer(reader.result);
          return ipfsClient.add(buffer);
        }
      }
    } catch (error) {
      console.error('File reading error');
    }
  }

  async function addNFT(nftObj) {
    const ipfsUrl = await writeImage(nftObj.image);
    addNFTToList([...nftList, nftObj]);
  }

  function getNFTList() {
    return nftList;
  }

  const memoizedState = useMemo(() => ({
    addNFT, getNFTList, setAccount, ...state,
  }));

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
