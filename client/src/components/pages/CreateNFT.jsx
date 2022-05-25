import React, { useContext, useState } from 'react';
import {Buffer} from 'buffer';
import { EthersContext } from '../../utils/EthersProvider';
import NFTDisplay from '../shared/NFTDisplay';
import Button from '../shared/Button';
import ipfsClient from '../../utils/ipfsClient';

// const client = ipfsClient('https://ipfs.infura.io:5001/api/v0');
function CreateNFT() {
  const { getNFTList, addNFT } = useContext(EthersContext);
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({ price: '', name: '' });

  async function onChange(e) {
    const file = e.target.files[0];
    // const reader = new window.FileReader();
    // reader.readAsArrayBuffer(file);
    // reader.onloadend = () => {
    //   const buffer = Buffer(reader.result);
    //   setFileUrl(buffer);
    // }
    try {
      const added = await ipfsClient.add(
        file,
        {
          // eslint-disable-next-line no-console
          progress: (prog) => console.log(`received: ${prog}`),
        },
      );
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      console.log({url});
      setFileUrl(url);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Error uploading file: ', error);
    }
  }

  async function createNft() {
  
    const {price, name} = formInput;
    try {
      addNFT(name, price, true, fileUrl);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Error uploading file: ', error);
    }
  }

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
          <div className="form__input">
            <label htmlFor="uploadfile">
              Upload File
              <input
                id="uploadfile"
                type="file"
                onChange={onChange}
                className="upload__input"
              />
              {
          fileUrl && (
            <img className="rounded mt-4" width="350" src={fileUrl} alt="" />
          )
        }
            </label>
          </div>
          <div className="form__input">
            <label htmlFor="price">
              Price
              <input
                id="price"
                type="number"
                onChange={(e) => updateFormInput({ ...formInput, price: e.target.value })}
                placeholder="Enter price for one item (ETH)"
              />
            </label>
          </div>
          <div className="form__input">
            <label htmlFor="title">
              Title
              <input
                id="title"
                type="text"
                onChange={(e) => updateFormInput({ ...formInput, name: e.target.value })}
                placeholder="Enter title"
              />
            </label>
          </div>
          {/* <div>
              <label htmlFor="listedTick">
                <input id="listedTick" type="checkbox" onChange={createNft}/>
                To be Listed
              </label>
            </div> */}
          <Button bgColor="primary-color" name="Add NFT" onClick={() => createNft()} />
        </div>
      </section>
    </main>
  );
}

export default CreateNFT;
