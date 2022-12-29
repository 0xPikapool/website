# Why Pikapool?
Pikapool leverages meta-transactions and a synthetic gas price to order bids in a single bundle instead of leaving minters out on their own. Pikapool allows projects to align with the current minting paradigms while generating more revenue without burning participants who fail to pay enough gas to win the auction. Projects can still have an Allow List and Public Mint, plus the mint price can remain static.

The end result is the same gas auction experience with the same reseller floor protection, but a portion of the gas goes back to the NFT project instead of the validator. On top of that, minters who fail to get an NFT don't need to pay the gas on the failed transaction! Instead, the transaction is just left out completely.

## A Visual Example
Let's use the recent GM.Studio Catharsis Public Mint as an example. As standard, the Catharsis mint had an Allow List mint (which they called Early Access) followed by a Public Mint. The table below breaks down the highlights of the mint.

| Mint Type    | NFT's Minted | Participants | Average Gas per TX | Block Range |
|--------------|--------------|--------------|--------------------|-------------|
| Public       | 226          | 226          | 0.27 ETH           | 2           |
| Early Access | 767          | 601          | 0.001 ETH          | 1468        |

Look at that public mint... 226 NFT's minted in 2 blocks with an average gas cost of 0.27 ETH per transaction! This isn't inherently a bad thing. GM.Studio has built a trustworthy brand supporting top-level artists. They've earned this response. How did this impact the average gas cost surrounding the mint though? Check out the graph below.

![Surrounding Mint](/img/catharsis-surrounding-mint.png)

Here's the same graph, but the blocks containing a mint have been removed.

![Surrounding Mint](/img/catharsis-mint-removed.png)

It's clear that the spike in gas is a direct response to the NFT mint, but none of that additional gas went to GM.Studio or Dario Lanza (the artist behind Catharsis). Instead, most of it went to 
0xea674fdde714fd979de3edf0f56aa9716b898ec8, a validator maintained by Ethermine...

So, how much additional proceeds could have been sent to GM.Studio & Dario if they had used Pikapool?
- Average gas cost surrounding the mint (mint blocks removed): 18.95 gwei
- Average gas cost per mint transaction: 1917.13 gwei
- **Potential additional revenue: 61.2 ETH**

This doesn't even mention the 40.74 ETH spent on **failed** transactions.

And Catharsis isn't even the worst example! If you want to see more gas auction summaries, check out the Pokedex.