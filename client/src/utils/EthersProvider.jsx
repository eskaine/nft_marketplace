import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { ethers } from 'ethers';
import contractAbi from './MarketPlace.json';
import ipfsClient from './ipfsClient';

const EthersContext = React.createContext();

function EthersProvider({ children }) {
  const [contractAddress] = useState('0x5FbDB2315678afecb367f032d93F642f64180aa3');
  const [userAccount, setUserAccount] = useState(null);

  async function connectWallet() {
    try {
      if (window.ethereum) {
        const user = await window.ethereum.request(
          { method: 'eth_requestAccounts' },
        );

        setUserAccount(user[0]);
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
    // const newNFT = {
    //   name, price, isListed, imageUrl: '',
    // };

    // if (image) {
    //   const imgObj = await ipfsClient.add(image, {
    //     progress: (prog) => console.log(`received: ${prog}`),
    //   });
    //   newNFT.imageUrl = `https://ipfs.infura.io/ipfs/${imgObj.path}`;
    // }
    console.log('adding');

    const contract = getContract();
    console.log('adding2');
    contract.addNFT(name, price, image, isListed);
  }

  async function editNFT({
    id, name, price, isListed, currentImageUrl, image,
  }) {
    const NFT = {
      id, name, price, isListed, imageUrl: '',
    };

    if (currentImageUrl === '') {
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
    const nfts = [];

    if (contract.items) {
      for (const i in contract.items) {
        const item = contract.items[i];

        if (item.isListed) {
          nfts.push(item);
        }
      }
    }

    return nfts;
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
