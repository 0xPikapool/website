# On NFT MEV

**TLDR; Tipping in EIP1559 is a fall back first price auction, NFT projects shouldn't need an auction expert to handle this, and Pikapool is a proto-Account Abstraction solution for expressing NFT bidding preferences privately.**

### MEV

MEV as a research space and problem has been around for a couple years now, if you're unfamiliar with it check out some of these great resources [1](https://www.flashbots.net/#ec162c79202f4983a80a29b221970ec1), [2](https://arxiv.org/abs/1904.05234), [3]

Gas wars have been a problem in ethereum ever since applications started getting competitive for state access. 

### EIP 1559

EIP-1559 solved many congestion related problems in ethereum in a very elegant manner, but in times very large congestion, the mechanism still reverts back a first price auction. This ["emergency back-up first price auction"](https://youtu.be/a9SB3uXR1qw?t=1604) is where the entirety of state contention in NFTs lives. 

![roadmap](/img/eip1559.png)


### Smart Contract Level Solutions

It's certainly possible, and we will continue to see smart contract advancements that make such reduction in negative externalities possible - but its the same for MEV on all other dapps. Maker changed their liquidation system to lower total MEV, there are proposals for MEV capturing DEXs - but we still have flashbots to route orderflow, why? Well because frankly it's hard to "get rid" of MEV. 

- https://a16zcrypto.com/nft-sales-market-clearing-gas-wars-auction-mechanism-design-for-builders/
- https://vitalik.ca/general/2021/08/22/prices.html






- resources talking about NFT auctions

timber markets and how private bidding incentivizes smaller bidders.
- http://web.mit.edu/athey/www/skewall.pdf