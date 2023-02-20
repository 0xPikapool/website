# Pikapatible
[Git Source](https://github.com/0xPikapool/contracts/blob/0d2085bf07634179f0c90014bdaf01f8924364bc/src/utils/Pikapatible.sol)

**Inherits:**
ERC721A, Owned

**Author:**
0xViola and PikaPool Developers

*This abstract contract plugin attaches to any ERC721A contract via inheritance, rendering it
PikaPool-Compatible 'Pikapatible' by implementing its mint function and declaring the PikaPool Settlement contract its owner.
This ensures all payments are reliably received on mint from PikaPool in accordance with its robust auction engine*


## State Variables
### recipient
*The recipient address where revenue is to be forwarded. For example, an NFT creator's multisig*


```solidity
address public recipient;
```


### price
*The price to mint each individual NFT*


```solidity
uint256 public price;
```


## Functions
### constructor

*All Pikapatible 721A NFTs restrict batch minting solely to the PikaPool settlement contract by granting it ownership*


```solidity
constructor(address _settlementContract, address _recipient, uint256 _priceInWei) Owned(_settlementContract);
```

### mint

May only be called by the Settlement contract

*This mint function can be attached to any ERC721A to enjoy the benefits of the PikaPool auction engine*

*Will not mint if sent insufficient funds, avoiding reverts to facilitate PikaPool's settlement contract batch minting functionality*

*ERC721A's _safeMint() function is shirked here in favor of _mint, as all PikaPool mints
utilize meta-transactions which ensures no smart contracts can bid as they do not possess private keys with which to sign*


```solidity
function mint(address to, uint256 amount) external payable onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`to`|`address`|The bidder address to mint to, provided a sufficient bid was offered|
|`amount`|`uint256`|The number of NFTs to mint to the bidder|


### claimRevenue

*Function for creators to claim the ETH earned from their PikaPool auction mint*


```solidity
function claimRevenue() external;
```

### receive


```solidity
receive() external payable;
```

