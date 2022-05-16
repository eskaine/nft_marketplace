// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "hardhat/console.sol";
import "./TheNFT.sol";

contract MarketPlace {
    // Variables
    TheNFT _NFT;
    //address payable public immutable feeAccount; // the account that receives fees
    struct NFT{
        string label;
        string owner;
        uint256 price;
    }

    struct User {
        address userAddress;

        //string password;
    }

    uint256 numOfNfts;

    // itemId -> Item
    mapping(uint256 => NFT) private items;
    mapping(string => User) private users;
    

    constructor() {
        // what should be in here?
        //feeAccount = payable(msg.sender);
        //feePercent = _feePercent;
    }
    event account_existed( string owner);
    event account_created( string owner );

    event invalid_user( string owner );
    event valid_user( string owner );

    function registerAccount( string memory owner ) public {
        if ( users[ owner ].userAddress != address( 0 ) )
            emit account_existed( owner );
        else
            users[ owner ].userAddress = msg.sender;
            emit account_created( owner );
    }

    function getAddressOfOwner( string memory owner ) public view
        returns (address) {
        return users[owner].userAddress;
    }

    function addNFT(string memory label, string memory owner, uint256 price) public {
        require(price >= 0, "price more than 0");
        require( getAddressOfOwner(owner) != address(0), "invalid user" ); // check for valid account
        //require (address(owner) != msg.sender);
        // what params is pass in? check client
        // the data is store in this contract, how is the data store?
        // what are the checks?
        // create new NFT
        NFT memory newNFT = NFT(
            label, owner, price
        );
        
        uint256 item_id = _NFT.mintNFT(getAddressOfOwner( owner ), label); // error here in remix
        items[item_id] = newNFT;
        numOfNfts = item_id + 1;



        // To push to blockchain, finish the above and we can proceed with this next
    }
}