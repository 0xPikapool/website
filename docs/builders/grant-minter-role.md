# Grant Minter Role

In order to mint NFTs for your project, the Pikapool SettlementContract must be granted a Minter role.

We suggest using [OpenZepplin AccessControl](https://docs.openzeppelin.com/contracts/4.x/access-control#role-based-access-control).

## Example Contract

```solidity
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor() ERC721("MyNFT") {
        // Grant the contract deployer the default admin role: it will be able
        // to grant and revoke any roles
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);

        // Grant the Pikapool SettlementContract the minter role
        _grantRole(MINTER_ROLE, PIKAPOOL_SETTLEMENT_CONTRACT_ADDRESS);
    }

    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }
}
```
