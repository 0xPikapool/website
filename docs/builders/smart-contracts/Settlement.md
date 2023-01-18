# Settlement
[Git Source](https://github.com/0xPikapool/contracts/blob/37fc19120d4e886f816d210c3eaf53f1af03f4b6/src/Settlement.sol)

**Inherits:**
[BidSignatures](/src/utils/BidSignatures.sol/contract.BidSignatures.md)

**Author:**
0xViola and PikaPool Developers

*This contract lies at the heart of PikaPool's on-chain mechanics, providing batch settlement of mints
for 721A NFTs that extend the Pikapatible plugin. It need only ever be called by the PikaPool orchestrator,
which provides an array of bid signatures to mint NFTs to the winning bidders*


## State Variables
### weth
*WETH contract for this chain, set in constructor*


```solidity
WETH public immutable weth;
```


### mintMax
*Maximum mint threshold amount to prevent excessive first-time token transfer costs*

*Stored in storage for gas optimization (as opposed to repeated mstores)*


```solidity
uint256 public mintMax;
```


### spentSigNonces
*Mapping that stores keccak256 hashes of spent signatures to protect against replay attacks*


```solidity
mapping(bytes32 => bool) spentSigNonces;
```


## Functions
### constructor


```solidity
constructor(address payable _wethAddress, uint256 _mintMax);
```

### finalizeAuction

Once testing has been completed, this function will be restricted via access control to the Orchestrator only

*Function to be called by the Orchestrator following the conclusion of each auction*

*To save gas, this function cycles through a series of checks via internal functions that simply trigger a continuation of the loop at the next index upon failure*


```solidity
function finalizeAuction(Signature[] memory signatures) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`signatures`|`Signature[]`|Array of Signature structs to be deconstructed and verified before settling the auction|


### _aboveMintMax

*Internal function to check against this Settlement contract's `mintMax` and reject excessive bid amounts*


```solidity
function _aboveMintMax(uint256 _sigBidAmount, address _sigBidder) internal returns (bool excessAmt);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_sigBidAmount`|`uint256`|The amount of NFTs requested by the bid|
|`_sigBidder`|`address`|The address of the winning bid's originator, in this case comparable to tx.origin|


### _spentSig

*Internal function to check against storage mapping of keccak256 sig hashes for spent signatures*


```solidity
function _spentSig(uint8 _v, bytes32 _r, bytes32 _s, address _sigBidder) internal returns (bool sigSpent);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_v`|`uint8`|ECDSA cryptographic recovery ID derived from digest hash and bidder privatekey|
|`_r`|`bytes32`|ECDSA cryptographic parameter derived from digest hash and bidder privatekey|
|`_s`|`bytes32`|ECDSA cryptographic parameter derived from digest hash and bidder privatekey|
|`_sigBidder`|`address`|The address of the winning bid's originator, in this case comparable to tx.origin|


### _verifySignature

*Function to settle each winning bid via EIP-712 signature*


```solidity
function _verifySignature(
    string memory auctionName,
    address auctionAddress,
    address bidder,
    uint256 amount,
    uint256 basePrice,
    uint256 tip,
    uint8 v,
    bytes32 r,
    bytes32 s
) internal view returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`auctionName`|`string`|The name of the creator's NFT collection being auctioned|
|`auctionAddress`|`address`|The address of the creator NFT being bid on. Becomes a string off-chain.|
|`bidder`|`address`|The address of the winning bid's originator, in this case comparable to tx.origin.|
|`amount`|`uint256`|The number of assets being bid on.|
|`basePrice`|`uint256`|The base price per NFT set by the collection's creator|
|`tip`|`uint256`|The tip per NFT offered by the bidder in order to win a mint in the auction|
|`v`|`uint8`||
|`r`|`bytes32`||
|`s`|`bytes32`||


### _settle

*Internal function that finalizes the settlements upon verification of signatures*


```solidity
function _settle(address auctionAddress, address bidder, uint256 amount, uint256 basePrice, uint256 tip) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`auctionAddress`|`address`|The address of the creator NFT being bid on. Becomes a string off-chain.|
|`bidder`|`address`|The address of the winning bid's originator, in this case comparable to tx.origin.|
|`amount`|`uint256`|The number of assets being bid on.|
|`basePrice`|`uint256`|The base price per NFT set by the collection's creator|
|`tip`|`uint256`|The tip per NFT offered by the bidder in order to win a mint in the auction|


### receive


```solidity
receive() external payable;
```

## Events
### SettlementFailure
*Event emitted upon any signature's settlement failure,
used instead of reverts to ensure finality for successful mints even in the case of failures interspersed within the batch*


```solidity
event SettlementFailure(address indexed bidder, bytes reason);
```

## Structs
### Signature
*Struct of signature data for winning bids to be deconstructed and validated to mint NFTs*


```solidity
struct Signature {
    Bid bid;
    uint8 v;
    bytes32 r;
    bytes32 s;
}
```

