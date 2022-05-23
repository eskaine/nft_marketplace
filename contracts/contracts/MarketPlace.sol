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
        string tokenurl;
        bool isListed;
    }

    mapping(uint256 => NFT) public items;
    mapping(address => uint256[]) private itemsbyaddress; 
 
    uint256[] items_listed; 

    function addNFT(uint256 price, string memory name, string memory tokenUrl) public notContractOwner {
        totalNFTs++;
        uint256 newItemId = totalNFTs;
        
        NFT memory newNFT = NFT(
            newItemId, name, msg.sender, price, tokenUrl, false
        );
        
        items[newItemId] = newNFT;
        itemsbyaddress[msg.sender].push(newItemId);
    }

    function removeFromList( uint256 id, address user ) private onlyNFTOwner(id) {
        delete itemsbyaddress[user][id]; //joyce and zach: remove from list
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
    
    function listNFT(uint256 id, uint256 price) public onlyNFTOwner(id) {
        require(price >= 0);
        items[id].isListed = true;
        items[id].price = price;
    }

    function delistNFT(uint256 id)public onlyNFTOwner(id) {
        items[id].isListed = false;
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
