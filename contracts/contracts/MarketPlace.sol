// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract MarketPlace {
    address public owner;
    uint256 private totalNFTs;

    constructor() {
        owner = msg.sender;
    }
    
    struct NFT{
        uint256 id;
        string name;
        address currentOwner;
        uint256 price;
        string imageUrl;
        bool isListed;
    }

    mapping(uint256 => NFT) public items;
    mapping(address => uint256[]) private itemsbyaddress; 
 
    uint256[] items_listed; 

    function addNFT(string memory name, uint256 price, string memory imageUrl, bool isListed) public notContractOwner {
        totalNFTs++;
        uint256 newItemId = totalNFTs;

        // add checks for isListed
        
        NFT memory newNFT = NFT(
            newItemId, name, msg.sender, price, imageUrl, isListed
        );
        
        items[newItemId] = newNFT;
        itemsbyaddress[msg.sender].push(newItemId);
    }

    function removeFromList( uint256 id, address user ) private onlyNFTOwner(id) {
        delete itemsbyaddress[user][id];
    }

    // function buyNFT( uint256 id ) public payable notContractOwner {
    //     require( msg.value >= items[id].price );

        
    //     address payable sendTo = payable(items[id].currentOwner);
    //     // send token's worth of ethers to the owner
    //     sendTo.transfer(msg.value);

    //     removeFromList(id, items[id].currentOwner);

    //     //update to new owner of the nft
    //     items[id].currentOwner = msg.sender;
    //     itemsbyaddress[msg.sender].push( id );
    // }

    function editNFT(uint256 id, string memory name, uint256 price, string memory imageUrl, bool isListed) public onlyNFTOwner(id) {
        items[id].name = name;
        items[id].price = price;
        items[id].imageUrl = imageUrl;
        items[id].isListed = false;

        if(isListed) {
            require(price >= 0);
            items[id].isListed = true;
        }
    }

    function getUserNFTList(address user) public view returns (NFT[] memory) {
        uint256[] memory useritems = itemsbyaddress[user];
        NFT[] memory nfts = new NFT[](useritems.length+1);
        
        for ( uint i=0; i < useritems.length; i++)
        {
            NFT storage nft = items[i];
            nfts[i] = nft;
        }
        return (nfts);
    }

    modifier notContractOwner() {
        require(msg.sender != owner);
        _;
    }

    modifier onlyNFTOwner(uint256 id) {
        require(msg.sender == items[id].currentOwner);
        _;
    }
}
