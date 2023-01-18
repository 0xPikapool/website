# Example721A
[Git Source](https://github.com/0xPikapool/contracts/blob/37fc19120d4e886f816d210c3eaf53f1af03f4b6/src/Example721A.sol)

**Inherits:**
ERC721A, [Pikapatible](/src/utils/Pikapatible.sol/contract.Pikapatible.md)

**Author:**
0xViola and PikaPool Developers

*This contract is an example 721A NFT demonstrating PikaPool's convenient Pikapatible plugin.
As shown, projects may enjoy the benefits of the PikaPool auction engine simply by adding three lines of code*


## Functions
### constructor


```solidity
constructor(
    string memory _name,
    string memory _symbol,
    address _settlementContract,
    address _recipient,
    uint256 _priceInWei
) ERC721A(_name, _symbol) Pikapatible(_settlementContract, _recipient, _priceInWei);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_name`|`string`|The name of the creator's NFT project|
|`_symbol`|`string`|The token ticker symbol for the creator's NFT project|
|`_settlementContract`|`address`|The address of the PikaPool settlement contract|
|`_recipient`|`address`|The address of the recipient to which mint auction revenue will be sent|
|`_priceInWei`|`uint256`|The price of minting each NFT in the collection, to be paid in WETH and denominated in wei|


### tokenURI

This is the only function that needs to be implemented by an NFT project wishing to mint using PikaPool's engine,
metadata formats of all kinds are supported (IPFS, Arweave, on-chain etc)

*The tokenURI function that returns the NFT metadata, providing it for marketplaces or frontends viewing the NFT itself*


```solidity
function tokenURI(uint256 tokenId) public pure override returns (string memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId`|`uint256`|The unique (non-fungible) identifier of a specific NFT|


