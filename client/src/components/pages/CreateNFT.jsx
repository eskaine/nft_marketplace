import React, { useContext } from 'react';
import { EthersContext } from '../../utils/EthersProvider';
import NFTDisplay from '../shared/NFTDisplay';

function CreateNFT() {
  const { getNFTList } = useContext(EthersContext);
  return (
    <main className="container mx-auto mt-10">
      <section>
        <h5 className="mb-4 text-light">Preview Item</h5>
        {getNFTList().map((nft) => (
          <NFTDisplay
            label={nft.label}
            imageUrl={nft.imageUrl}
            owner={nft.owner}
            price={nft.price}
          />
        ))}
        <div className="create__item">
          <form>
            <div className="form__input">
              <label htmlFor="uploadfile">
                Upload File
                <input id="uploadfile" type="file" className="upload__input" />
              </label>
            </div>
            <div className="form__input">
              <label htmlFor="price">
                Price
                <input
                  id="uploadfile"
                  type="number"
                  placeholder="Enter price for one item (ETH)"
                />
              </label>
            </div>
            <div className="form__input">
              <label htmlFor="title">
                Title
                <input id="title" type="text" placeholder="Enter title" />
              </label>
            </div>
            <div>
              <label htmlFor="listedTick">
                <input id="listedTick" type="checkbox" />
                To be Listed
              </label>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default CreateNFT;
