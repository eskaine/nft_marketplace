// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract MarketPlace {

    address public owner;
    uint256 totalNFTs;

    constructor() {
        owner = msg.sender;
    }
    
    // Variables
    //address payable public immutable feeAccount; // the account that receives fees
    struct NFT{
        uint256 id;
        string name;
        address currentOwner;
        uint256 price;
        string tokenurl;
        bool isListed;
    }

    mapping(uint256 => NFT) private items;
    mapping(address => uint256[]) private itemsbyaddress; //joyce and zach: change to int array
 
    uint256[] items_listed; 

    function addNFT(uint256 price, string memory name, string memory tokenUrl) public notContractOwner {
        totalNFTs++;
        uint256 newItemId = totalNFTs;
        //_mint(owner, newItemId);
        //_setTokenURI(newItemId, label);
        //create token here?
        
        NFT memory newNFT = NFT(
            totalNFTs, name, msg.sender, price, tokenUrl, false
        );
        
        items[newItemId] = newNFT;
        //add to the itemsbyaddress
        itemsbyaddress[msg.sender].push(newItemId);
       

    }

    function removeFromList( uint256 id, address user ) private onlyNFTOwner(id) {
        delete itemsbyaddress[user][id]; //joyce and zach: remove from list
    }

    function buyNFT( uint256 id ) public payable notContractOwner {
        //require( msg.sender != items[id].currentOwner); //buyer and seller not the same person, if i'm not mistaken, opensea allows user to buy their own nft, i leave it to u
        require( msg.value >= items[id].price );

        
        address payable sendTo = payable(items[id].currentOwner);
        // send token's worth of ethers to the owner
        sendTo.transfer(msg.value);
        
        //_transfer( sendTo, msg.sender, id ); //xfer token ownership
        
        //remove id from itemsbyaddress
        removeFromList(id, items[id].currentOwner);

        items[id].currentOwner = msg.sender;//update to new owner of the nft
        itemsbyaddress[msg.sender].push( id );
    }
    
    //To list the NFT on the marketplace
    // listing nft does perform any transactions
    function listNFT(uint256 id, uint256 price) public onlyNFTOwner(id) {
        //require(msg.value == 0);
        require(price >= 0);
        items[id].isListed = true;
        items[id].price = price;
    }

    // delisting does not require any transactions to take place
    function delistNFT(uint256 id)public onlyNFTOwner(id) {
        //require(items[id].isListed == true, "Item is not listed"); //not required
        //require(msg.value == 0);
        items[id].isListed = false;
    }

    // return entire nft list, forget to mention listed nfts only
    function getNFTList() public view returns ( NFT[] memory ) {
        // instead of doing all these work to process the data, it's better to just store the id in the struct on creation
        // joyce and zach: how to return mapping without using for loop?  
        NFT[] memory nfts = new NFT[](totalNFTs+1);
        uint count; 

        for ( uint i=0; i < totalNFTs+1; i++)
        {
            NFT storage nft = items[i];
            if ( nft.isListed )
                nfts[count] = nft;
                count++;
        }

        return (nfts);
    }

    //joyce and zach: updated on 22 may 2022
    function getUserNFTList(address user) public view returns (NFT[] memory) {
        // return the actual nft data not the id
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
        //Make sure only owner of NFT can do this
        require(msg.sender == items[id].currentOwner);
        _;
    }
}
