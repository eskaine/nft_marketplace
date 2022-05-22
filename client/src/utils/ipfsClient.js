import { ipfsClient } from 'ipfs-http-client';

const ipfsId = REACT_APP_IPFS_ID;
const ipfsSecret = REACT_APP_IPFS_SECRET;
const auth = 'Basic ' + Buffer.from(ipfsId + ':' + ipfsSecret).toString('base64');

export default ipfsClient.create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth
  }
});
