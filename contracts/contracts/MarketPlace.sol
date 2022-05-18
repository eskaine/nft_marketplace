// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MarketPlace is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    address public owner;
    uint256 totalNFTs;

    constructor() ERC721("TheNFT", "NFT") {
        owner = msg.sender;
    }
    
    // Variables
    //address payable public immutable feeAccount; // the account that receives fees
    struct NFT{
        string label;
        address currentOwner;
        uint256 price;
        bool isListed;
    }

    // itemId -> Item
    mapping(uint256 => NFT) private items;
 
    uint256[] items_listed; 

    //address -> list of id for the NFTs owned by this address? WELL DONE
    mapping(address => uint256[] ) private itemsbyaddress;

    function addNFT(string memory label, uint256 price) public {

        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(owner, newItemId);
        _setTokenURI(newItemId, label);
        
        
        NFT memory newNFT = NFT(
            label, msg.sender, price, false
        );
        
        items[newItemId] = newNFT;
        //add to the itemsbyaddress
        itemsbyaddress[msg.sender].push(newItemId);
        totalNFTs++;

        // To push to blockchain, finish the above and we can proceed with this next
    }

    function removeFromList( uint256 id, address user ) private {
        uint256[] storage itemslist = itemsbyaddress[user];
        for ( uint256 i = 0; i < itemslist.length; i++ ){
            if ( itemslist[i] == id ) {
                if ( itemslist.length > 1 ) {
                    itemslist[i] = itemslist[itemslist.length-1]; //replace with last item in the least?
                }
                itemslist.pop();              
                break;
            }
        }
        itemsbyaddress[user] = itemslist;
    }

    function buyNFT( uint256 id ) public payable  {
        //require( msg.sender != items[id].currentOwner); //buyer and seller not the same person, if i'm not mistaken, opensea allows user to buy their own nft, i leave it to u
        //require( msg.sender != address(0)); // u are checking for contract address? check constructor above
        require( items[id].currentOwner != address(0));
        require( msg.value >= items[id].price );

        
        address payable sendTo = payable(items[id].currentOwner);
        // send token's worth of ethers to the owner
        sendTo.transfer(msg.value);
        
        _transfer( sendTo, msg.sender, id ); //xfer ownership
        
        //remove id from itemsbyaddress
        removeFromList(id, items[id].currentOwner);

        items[id].currentOwner = msg.sender;//update to new owner of the nft
        itemsbyaddress[msg.sender].push( id );
    }
    
    

    //To list the NFT on the marketplace
    function listNFT(uint256 id, uint256 price) public payable {
        //Make sure only owner of NFT can do this
        require(msg.sender == items[id].currentOwner);  // use a modifier if u are using the same checks throughout the codebase
        require(msg.value == 0);
        require(price >= 0);
        items[id].isListed = true;
        items[id].price = price;
    }

    function delistNFT(uint256 id)public payable{
        //Make sure only owner of NFT can do this
        require(msg.sender == items[id].currentOwner);
        require(items[id].isListed == true, "Item is not listed");
        require(msg.value == 0);
        items[id].isListed = false;
    }

    // return entire nft list
    function getNFTList() public view returns (uint256[] memory, NFT[] memory) {
        uint256[] memory ids = new uint256[](_tokenIds.current()+1);
        NFT[] memory nfts = new NFT[](_tokenIds.current()+1);

        for ( uint256 i=1; i < _tokenIds.current()+1; i++ )
        {
            NFT storage nft = items[i];
            ids[i] = i;
            nfts[i] = nft;
        }
        return ( ids, nfts );
    }

    function getUserNFTList() public view returns (uint256[] memory) {
        return itemsbyaddress[msg.sender];
    }
}
