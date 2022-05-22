import { ethers } from 'ethers';
import React from 'react';

function CreateNFT() {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' });
  const router = useRouter();
  async function onChange(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`),
        },
      );
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFileUrl(url);
    } catch (e) {
      console.log(e);
    }
  }
  async function createItem() {
    const { name, description, price } = formInput;
    if (!name || !description || !price || !fileUrl) return;
    const data = JSON.stringify({
      name, description, image: fileUrl,
    });
    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      createSale(url);
    } catch (error) {
      console.log('ERROR uploading file', error);
    }
  }

  async function createSales() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(nftaddress, NFT.abi, signer);
    const transaction = await contract.createToken(url);
    const tax = await transaction.wait();
    const event = tx.events[0];
    const value = event.args[2];
    const tokenId = value.toNumber();
    const price = ethers.utils.parseUnits(formInput.price, 'ether');
    contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);
    const listingPrice = await contract.getListingPrice();
    transaction = await contract.createMarketItem(nftaddress, tokenId, price, {
      value:
	listingPrice,
    });
    await transaction.wait();
    router.push('/');
  }

  return (
    <main className="container mx-auto mt-10">
      <input
        placeholder="NFT Name"
        className="mt-8 border rounded p-4"
        onChange={(e) => updateFormInput({ ...formInput, name: e.target.value })}
      />
      <textarea
        placeholder="NFT Description"
        className="mt-2 border rounded p-4"
        onChange={(e) => updateFormInput({ ...formInput, description: e.target.value })}
      />
      <input
        placeholder="Asset Price in Eth"
        className="mt-2 border rounded p-4"
        onChange={(e) => updateFormInput({ ...formInput, price: e.target.value })}
      />
      <input
        type="file"
        name="Asset"
        className="my-4"
        onChange={onChange}
      />
      <button
        onClick={createMarketItem}
        className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg"
      >
        Create Digital
      </button>
    </main>
  );
}

export default CreateNFT;
