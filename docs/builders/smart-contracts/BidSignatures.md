# BidSignatures
[Git Source](https://github.com/0xPikapool/contracts/blob/0d2085bf07634179f0c90014bdaf01f8924364bc/src/utils/BidSignatures.sol)

**Author:**
0xViola, 0xArceus, and PikaPool Developers

*This contract is abstract and inherited by the Settlement contract,
providing the Bid struct type as well as the EIP712 hashing logic and variables to create the domain separator*


## State Variables
### BID_TYPE_HASH
*The EIP-712 type hash of the bid struct, required to derive domain separator*


```solidity
bytes32 internal constant BID_TYPE_HASH = keccak256(
    "Bid(string auctionName,address auctionAddress,address bidder,uint256 amount,uint256 basePrice,uint256 tip)"
);
```


### DOMAIN_TYPE_HASH
*The EIP-712 domain type hash, required to derive domain separator*


```solidity
bytes32 internal constant DOMAIN_TYPE_HASH =
    keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)");
```


### DOMAIN_NAME
*The EIP-712 domain name, required to derive domain separator*


```solidity
bytes32 internal constant DOMAIN_NAME = keccak256("Pikapool Auction");
```


### DOMAIN_VERSION
*The EIP-712 domain version, required to derive domain separator*


```solidity
bytes32 internal constant DOMAIN_VERSION = keccak256("1");
```


### DOMAIN_SEPARATOR
*The EIP-712 domain separator, computed in the constructor using the current chain id and settlement
contract's own address to prevent replay attacks across networks*


```solidity
bytes32 public immutable DOMAIN_SEPARATOR;
```


## Functions
### constructor


```solidity
constructor();
```

### hashBid

*Function to compute hash of a PikaPool bid*


```solidity
function hashBid(Bid memory bid) public pure returns (bytes32);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`bid`|`Bid`|The Bid struct to be hashed|


### hashTypedData

*Function to compute hash of fully EIP-712 encoded message for the domain to be used with ecrecover()*


```solidity
function hashTypedData(Bid memory bid) public view returns (bytes32);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`bid`|`Bid`|The Bid struct to be hashed using hashBid and then hashed again in keeping with EIP712 standards|


## Structs
### Bid
*Struct of bid data to be hashed and signed for meta-transactions.*


```solidity
struct Bid {
    string auctionName;
    address auctionAddress;
    address bidder;
    uint256 amount;
    uint256 basePrice;
    uint256 tip;
}
```

