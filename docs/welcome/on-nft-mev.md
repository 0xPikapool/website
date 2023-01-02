# On NFT MEV

** TLDR; Tipping in EIP1559 is a fall back first price auction, NFT projects shouldn't need an auction expert to handle this, and Pikapool is a proto-Account Abstraction solution for expressing NFT bidding preferences privately. **

### MEV

Maximal Extractable Value as a research space and problem has been around for a couple years, if you're unfamiliar with it check out some of these great resources [1](https://www.flashbots.net/#ec162c79202f4983a80a29b221970ec1), [2](https://arxiv.org/abs/1904.05234), [3](https://blog.shutter.network/what-the-heck-is-miner-extractable-value-a-series-about-mev-basics/).

Sometimes people will not include gas fees as a type of MEV, but we stand firmly that it is. Because validators are able to decide the order of transactions, they can decide to include txns which fail the mint as one example of ways in which value is extracted from the user. If you follow the [next couple of blocks after the start of this NFT mint](https://beaconcha.in/slot/5055601#overview), you will see over `163 + 140+ 125 + 82 + 28 + 4.5 + 4.5 = 547 Eth` are given as MEV rewards to the validator. And towards the end of the mint, there are many failed transactions included here. 

Failed transactions aren't the only negative externaility caused by this type of MEV, superlinear increases in base fees are also a by-product. This is of course good for eth holders, but from an NFT projects perspective it is essentially handing over the distribution of your hard work to the hands of validators. Participants are left with only one possible bidding strategy, to monitor the mempool and keep increasing your bid via the tip/priority fee, giving those with advanced infrastrucutre a leg up. This mimics something like HFT in NFT mints.

### Smart Contract Solutions

[Selling NFTs at below market clearing prices](https://vitalik.ca/general/2021/08/22/prices.html) has been a hot topic for sometime.

It's certainly possible to mitigate negative bidding experiences from solely the smart contract level. Allow lists are one of these tools and [they're very popular/succesful at the moment](https://collective.xyz/blog/the-evolution-of-nft-allowlists-and-presale-minting). But most projects are interested in allocating some portion of their mint to open bidding to allow for price discovery. 

There are many other cool auction designs to experiment with at the smart contract level, including dutch auctions, [descending clearing-price auctions](https://a16zcrypto.com/nft-sales-market-clearing-gas-wars-auction-mechanism-design-for-builders/), [sealed-bid Vickrey auction](https://a16zcrypto.com/hidden-in-plain-sight-a-sneaky-solidity-implementation-of-a-sealed-bid-auction/). But to quote one of the most infamous designs around auction designs from one of the largest auctions of all time, ["So actually, fuck doing a Dutch auction"](https://mirror.xyz/0x3ae401F245034dAe25af1e2f9b9Bb8F006b1Dc6e/ErZMh-0TTwMrAKPJ1hlDcjvNfZvQ998G-B-oTS6BVQk). Which drives home one of the core tenets of pikapool, **NFT projects shouldn't need an auction expert to design their auction**.

### EIP 1559

EIP-1559 solved many congestion related problems in ethereum in a very elegant manner, but in times very large congestion, the mechanism still reverts back a first price auction. This ["emergency back-up first price auction"](https://youtu.be/a9SB3uXR1qw?t=1604) is where the entirety of state contention in NFTs lives. 

![roadmap](/img/eip1559.png)








- resources talking about NFT auctions

timber markets and how private bidding incentivizes smaller bidders.
- http://web.mit.edu/athey/www/skewall.pdf