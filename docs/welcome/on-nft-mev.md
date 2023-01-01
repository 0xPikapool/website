# On NFT MEV

TLDR; Tipping in EIP1559 is a fall back first price auction and Pikapool is a proto-Account Abstraction solution to expressing NFT bidding preferences privately.

### MEV

Gas wars have been a problem in ethereum ever since applications started getting competitive for state access. 

### EIP 1559

EIP-1559 solved many congestion related problems in ethereum in a very elegant manner, but in times very large congestion, the mechanism still reverts back a first price auction. This ["emergency back-up first price auction"](https://youtu.be/a9SB3uXR1qw?t=1604) is where the entirety of state contention in NFTs lives. 

![roadmap](/img/eip1559.png)


### Smart Contract Level Solutions

It's certainly possible, and we will continue to see smart contract advancements that make such reduction in negative externalities possible - but its the same for MEV on all other dapps. Maker changed their liquidation system to lower total MEV, there are proposals for MEV capturing DEXs - but we still have flashbots to route orderflow, why? Well because frankly it's hard to "get rid" of MEV. 

- https://a16zcrypto.com/nft-sales-market-clearing-gas-wars-auction-mechanism-design-for-builders/
- https://vitalik.ca/general/2021/08/22/prices.html






- resources talking about NFT auctions

- http://web.mit.edu/athey/www/skewall.pdf