import React from 'react';
import NFTDisplay from './shared/NFTDisplay';

function Main() {
  return (
    <main className="container mx-auto mt-10">
      <div>NFT List</div>
      <div className="flex justify-center flex-wrap">
        <NFTDisplay label="Sample" owner="Nobody" price="500" />
        <NFTDisplay label="Sample" owner="Nobody" price="500" />
        <NFTDisplay label="Sample" owner="Nobody" price="500" />
        <NFTDisplay label="Sample" owner="Nobody" price="500" />
        <NFTDisplay label="Sample" owner="Nobody" price="500" />
        <NFTDisplay label="Sample" owner="Nobody" price="500" />
        <NFTDisplay label="Sample" owner="Nobody" price="500" />
        <NFTDisplay label="Sample" owner="Nobody" price="500" />
      </div>
    </main>
  );
}

export default Main;
