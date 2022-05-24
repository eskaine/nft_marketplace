import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { EthersContext } from '../../utils/EthersProvider';

function NFTDetail() {
  const { getNFTList } = useContext(EthersContext);
  return (
    <div className="flex justify-center flex-wrap">
      {getNFTList().map((nft) => (
        <div className="flex justify-center flex-wrap">
          <img
            src={nft.imageUrl}
            alt=""
            className="w-100 single__nft-img"
          />
          <div className="single__nft__content">
            <h2>{nft.label}</h2>

            <div className=" d-flex align-items-center justify-content-between mt-4 mb-4">
              <div className=" d-flex align-items-center gap-4 single__nft-seen">
                <span>
                  <i className="ri-eye-line" />
                  {' '}
                  234
                </span>
                <span>
                  <i className="ri-heart-line" />
                  {' '}
                  123
                </span>
              </div>

              <div className=" d-flex align-items-center gap-2 single__nft-more">
                <span>
                  <i className="ri-send-plane-line" />
                </span>
                <span>
                  <i className="ri-more-2-line" />
                </span>
              </div>
            </div>

            <div className="nft__creator d-flex gap-3 align-items-center">
              <div className="creator__img">
                <img src={nft.imageUrl} alt="" className="w-100" />
              </div>

              <div className="creator__detail">
                <p>Created By</p>
                <h6>{nft.owner}</h6>
              </div>
            </div>
            <button className="singleNft-btn d-flex align-items-center gap-2 w-100">
              <i className="ri-shopping-bag-line" />
              <Link to="/wallet">Buy Now</Link>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NFTDetail;
