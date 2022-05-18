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
    event account_created(string username);
    event account_existed(string username);

    // itemId -> Item
    mapping(uint256 => NFT) private items;
    
    mapping(address => string) private users; // why do u need to store the list of user? don't think of traditional user accounts
    uint256[] items_listed; 

    //address -> list of id for the NFTs owned by this address? WELL DONE
    mapping(address => uint256[] ) private itemsbyaddress;

    function registerAccount( string memory username ) public {
        require( msg.sender != address(0) );
        if ( bytes(users[msg.sender]).length == 0 ) //username is empty = account not created
        {
            users[msg.sender] = username;
            emit account_created(username);
        }
        else{
            emit account_existed(username);
        }
    }

    function addNFT(string memory label, string memory username, uint256 price) public {
        require(price >= 0, "price less than 0"); //user can add nft without price, but to list it, price must be stated
        require(keccak256(abi.encodePacked((users[msg.sender]))) == keccak256(abi.encodePacked((username))), "not valid account"); //check above comment, we dont need acc system or create a user registration
        //require (address(owner) != msg.sender); if we dont need this, remove

        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, label);
        
        NFT memory newNFT = NFT(
            label, msg.sender, price, false
        );
        
        items[newItemId] = newNFT;
        //add to the itemsbyaddress
        itemsbyaddress[msg.sender].push(newItemId);
        

        // To push to blockchain, finish the above and we can proceed with this next
    }

    function buyNFT( uint256 id ) public payable  {
        require( msg.sender != items[id].currentOwner); //buyer and seller not the same person, if i'm not mistaken, opensea allows user to buy their own nft, i leave it to u
        require( msg.sender != address(0)); // u are checking for contract address? check constructor above
        require( items[id].currentOwner != address(0));
        require( msg.value >= items[id].price );

        address payable currentOwner = payable(items[id].currentOwner);
        currentOwner.transfer(msg.value);
        //transfer the nft ownership
        transferFrom( items[id].currentOwner, msg.sender, id );
        
        items[id].currentOwner = msg.sender;
        //remove id from itemsbyaddress
    }
    
    //To list the NFT on the marketplace
    function listNFT(uint256 id) public payable {
        //Make sure only owner of NFT can do this
        require(msg.sender == items[id].currentOwner);  // use a modifier if u are using the same checks throughout the codebase
        require(items[id].price > 0);
        require(msg.value == 0);
        items[id].isListed = true;
    }

    function delistNFT(uint256 id)public payable{
        //Make sure only owner of NFT can do this
        require(msg.sender == items[id].currentOwner);
        require(items[id].isListed == true, "Item is not listed");
        require(msg.value == 0);
        items[id].isListed = false;
    }

    // return entire nft list
    function getNFTList() {

    }

    function getUserNFTList() {

    }
}
