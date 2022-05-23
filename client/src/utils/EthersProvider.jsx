import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { ethers } from 'ethers';
import contractAbi from './MarketPlace.json';
import ipfsClient from './ipfsClient';

const EthersContext = React.createContext();

function EthersProvider({ children }) {
  const [contractAddress] = useState('0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0');
  const [userAccount, setUserAccount] = useState(null);

  async function connectWallet() {
    try {
      if (window.ethereum) {
        const user = await window.ethereum.request(
          { method: 'eth_requestAccounts' },
        );

        setUserAccount(user);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function getContract() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      return new ethers.Contract(
        contractAddress,
        contractAbi.abi,
        signer,
      );
    }
  }

  async function addNFT({
    name, price, isListed, image,
  }) {
    const newNFT = {
      name, price, isListed, imageUrl: '',
    };

    if (image) {
      const imageUrl = await ipfsClient.add(image);
      newNFT.imageUrl = imageUrl;
    }

    const contract = getContract();
    contract.addNFT(...newNFT);
  }

  async function editNFT({
    id, name, price, isListed, currentImageUrl, image,
  }) {
    const NFT = {
      id, name, price, isListed, imageUrl: '',
    };

    if (currentImageUrl == '') {
      const imageUrl = await ipfsClient.add(image);
      NFT.imageUrl = imageUrl;
    } else {
      NFT.imageUrl = currentImageUrl;
    }

    const contract = getContract();
    contract.editNFT(...NFT);
  }

  function getNFTList() {
    const contract = getContract();
    return contract.items.filter((item) => item.isListed);
  }

  const memoizedState = useMemo(() => ({
    addNFT, editNFT, getNFTList, connectWallet, userAccount,
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
