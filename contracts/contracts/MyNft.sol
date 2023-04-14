// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyNft is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _ids;
    address public owner;

    event Minted(address indexed _to, uint256 indexed _tokenId);

    constructor() ERC721("MyNft", "MNFT") {
        owner = msg.sender;
    }

    function mint(string memory metadataUrl) public returns (uint256) {
        _ids.increment();
        uint256 newId = _ids.current();

        _mint(msg.sender, newId);
        _setTokenURI(newId, metadataUrl);

        emit Minted(msg.sender, newId);
        return newId;
    }
}
