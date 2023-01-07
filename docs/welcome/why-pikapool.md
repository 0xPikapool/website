# Why Pikapool?
Pikapool uses meta-transactions to create pseudo account abstraction, then handles transaction ordering off-chain based on the gas price selected by the minter. Pikapool allows projects to align with the current minting paradigms while generating more revenue without burning participants who fail to pay enough gas to win the auction.

The end result is the same gas auction experience, but a portion of the gas goes back to the NFT project instead of the validator. On top of that, minters who fail to get an NFT don't need to pay the gas on the failed transaction! Instead, the transaction is just left out completely.

Pikapool can also be used to pre-sign mint transactions. If a minter won't be at their keyboard during the minting period, Pikapool allows them to pre-sign the mint transaction which gurantees they'll be included in the mint as long as the gas price they select isn't too low.

## A Visual Example - GM.Studio Catharsis Public Mint
GM.Studio's [Catharsis](https://www.gmstudio.art/collections/catharsis) mint was only available for participants on the Allow List (which they called Early Access) until the mint was opened to the public. The table below breaks down the highlights of the mint.

| Mint Type    | NFT's Minted | Participants | Average Gas per TX | Block Range |
|--------------|--------------|--------------|--------------------|-------------|
| Public       | 226          | 226          | 0.27 ETH           | 2           |
| Early Access | 767          | 601          | 0.001 ETH          | 1468        |

The switch to a public mint resulted in a surge in demand, selling out the remaining 226 NFTs in just 2 blocks while causing a gas auction. Compared to the Early Access mint, which saw an average gas price of 0.001 ETH, the Public mint averaged a 0.27 ETH gas price per transaction.

The graph below shows average gas price per block surrounding the Catharsis mint.

![Surrounding Mint](/img/why_pikapool/catharsis_surrounding.png)

Here's the same graph, but the blocks containing a mint have been removed.

![Surrounding Mint](/img/why_pikapool/catharsis_removed.png)

It's clear that the spike in gas is a direct response to the NFT mint, but none of that additional gas went to GM.Studio or Dario Lanza (the artist behind Catharsis). Instead, most of it went to 
0xea674fdde714fd979de3edf0f56aa9716b898ec8, a validator maintained by Ethermine.

Had GM.Studio & Dario used Pikapool, the excess gas spent on the auction would have gone to them instead of the validator. Details on the potential additional revenue can be seen below:
- Average gas cost surrounding the mint (mint blocks removed): 18.95 gwei
- Average gas cost per mint transaction: 1917.13 gwei
- **Potential additional revenue: 61.2 ETH**

This also ignores the 40.74 ETH spent on **failed** transactions.

If you want to see more gas auction summaries, check out the [Pokedex](../category/pokedex).