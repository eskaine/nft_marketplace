import React, { useContext } from 'react';
import NFTDisplay from './shared/NFTDisplay';
import { EthersContext } from '../utils/EthersProvider';

function Main() {
  const { getNFTList } = useContext(EthersContext);

  return (
    <main className="content mt-10">
      <div className="content-title">NFT List</div>
      <div className="flex justify-center flex-wrap">
        {getNFTList().map((nft) => (
          <NFTDisplay
            label={nft.label}
            imageUrl={nft.imageUrl}
            owner={nft.owner}
            price={nft.price}
          />
        ))}
      </div>
    </main>
  );
}

export default Main;
