# TypeScript SDK

Utilizing the [Pikapool TypeScript SDK](https://github.com/0xPikapool/typescript-sdk), bids can be used to created, signed and broadcast in just 3 lines of code.

## Interactive Demonstration

[Check out the Typescript SDK's capabilities by playing around with our live demo](https://pikapool-react-demo.vercel.app/), hosted on Vercel.

## SDK Package Installation

The SDK is available as an NPM package for easy installation:

```sh
yarn add @pikapool/sdk
# or
npm install @pikapool/sdk
```

## Usage Example

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

  // Broadcast the bid to pikapool
  return pikapool.bid.broadcast(signedBid);
}
```
