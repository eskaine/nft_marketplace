// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "./MyNft.sol";
import "./structs/NftItem.sol";
import "hardhat/console.sol";

contract MarketPlace {
    address public owner;
    MyNft public myNft;

    mapping(address => uint256[]) private _nftsByOwnerAddress;
    mapping(uint256 => bool) private _nftsListed;
    mapping(uint256 => uint256) private _nftsPrices;

    event NftMinted(address indexed _to, uint256 indexed _tokenId);

    constructor() {
        owner = msg.sender;
        myNft = MyNft(msg.sender);
    }

 
    function addNFT(uint256 price, string calldata metadataUrl, bool isListed) public payable returns(NftItem memory)  {
        require(msg.value > 0.01 ether);

        uint256 nftId = myNft.mintNft(msg.sender, metadataUrl);
        _nftsByOwnerAddress[msg.sender].push(nftId);
        _nftsPrices[nftId] = price;
        _nftsListed[nftId] = isListed;
        NftItem memory nftItem = NftItem(msg.sender, price, metadataUrl, isListed);

        emit NftMinted(msg.sender, nftId);
        return nftItem;
    }

    // function getAllListedNFT() public view returns (nft[] memory) {
    //     nft[] memory nfts = new nft[](totalNFTs);

    //     console.log(totalNFTs);

        
    //     for (uint i = 0; i < totalNFTs; i++)
    //     {
    //         nft storage item = items[i];
    //         nfts[i] = item;
    //     }

    //     return nfts;
    // }

    // function getUserNFTList(address user) public view returns (nft[] memory) {
    //     uint256[] memory useritems = itemsbyaddress[user];
    //     nft[] memory nfts = new nft[](useritems.length+1);
        
    //     for ( uint i=0; i < useritems.length; i++)
    //     {
    //         nft storage item = items[i];
    //         nfts[i] = item;
    //     }
    //     return (nfts);
    // }

    // modifier notContractOwner() {
    //     require(msg.sender != owner);
    //     _;
    // }

    // modifier onlyNFTOwner(uint256 id) {
    //     require(msg.sender == items[id].currentOwner);
    //     _;
    // }
}
