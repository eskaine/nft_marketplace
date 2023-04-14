// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

struct NftItem {
    address currentOwner;
    uint256 price;
    string metadataUrl;
    bool isListed;
}
