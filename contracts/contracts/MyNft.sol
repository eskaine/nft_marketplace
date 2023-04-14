// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyNft is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _ids;
    address public owner;

    mapping(uint256 => string) private _tokenURIs;

    constructor() ERC721("MyNft", "MNFT") {
        owner = msg.sender;
    }

    function mintNft(address nftOwner, string calldata metadataUrl) public returns (uint256) {
        _ids.increment();
        uint256 newId = _ids.current();

        _mint(nftOwner, newId);
        _setTokenURI(newId, metadataUrl);

        return newId;
    }

    function getTokenURI(uint256 id) public view returns (string memory) {
        return _tokenURIs[id];
    }
}
