# TypeScript SDK

Utilizing the TypeScript SDK, bids can be used to created, signed and broadcast in just 3 lines of code.

The SDK is in development and will be released as an NPM package shortly with detailed documentation.

## SDK Usage Example

```typescript
import pikapool from 'pikapool-sdk';
import { ethers, BigNumber } from 'ethers';

async function createSignAndBroadcastBid(
  auctionId: string, 
  amount: BigNumber, // number of nfts signer wishes to bid for
  tip: BigNumber, // equivalent to priority fee / gas fee
  ethersSigner: ethers.Signer // ethers Signer (e.g. MetaMask)
) {
  // Generate a typed message to sign
  const unsignedBid = pikapool.bid.create(auctionId, amount, tip);

  // Prompt the user to sign the typed message
  const signedBid = await ethersSigner._signTypedData(unsignedBid);

  // Broadcast the bid to the pikapool darkpool
  return pikapool.bid.broadcast(signedBid);
}
```
