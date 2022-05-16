import React from 'react';
import PropTypes from 'prop-types';

function NFTDisplay({ label, owner, price }) {
  return (
    <div className="rounded-full px-4 py-2">
      <img className="rounded-lg" src="https://via.placeholder.com/280" alt={label} />
      <p className="py-3 px-3 font-bold text-center">{label}</p>
      <hr className="mx-3" />
      <div className="flex justify-around items-center">

        <div className="py-3 px-3 text-sm italic text-gray-400">
          Listed by
          {owner}
        </div>
        <div className="py-3">
          <p className="text-sm text-gray-400">Buy Now</p>
          <p>
            $
            {price}
          </p>
        </div>
      </div>
    </div>
  );
}

NFTDisplay.propTypes = {
  label: PropTypes.string,
  owner: PropTypes.string,
  price: PropTypes.number,
};

export default NFTDisplay;
