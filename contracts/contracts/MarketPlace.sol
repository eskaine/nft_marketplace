// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/hardhat/console.sol";

contract MarketPlace {
    // Variables
    TheNFT _NFT;
    address payable public immutable feeAccount; // the account that receives fees
    struct NFT{
        string label;
        string owner;
        uint price;
    }

    // itemId -> Item
    mapping(uint256 => NFT) public items;

    constructor() {
        // what should be in here?
        feeAccount = payable(msg.sender);
        //feePercent = _feePercent;
    }

    function addNFT(string label, string owner, uint price) public{
        require (price > 0);
        require (address(owner) != msg.sender);
        // what params is pass in? check client
        // the data is store in this contract, how is the data store?
        // what are the checks?
        //new NFT
        NFT memory newNFT = NFT(
            label, owner, price
        );
        uint256 item_id = _NFT.mintNFT(address(owner), label);
        items[item_id] = newNFT;



        // To push to blockchain, finish the above and we can proceed with this next
    }
}