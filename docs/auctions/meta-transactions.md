# Meta-transactions

Bids are submitted to Pikachu as [ERC712 meta-transactions](https://medium.com/metamask/eip712-is-coming-what-to-expect-and-how-to-use-it-bb92fd1a7a26).

First, users approve the SettlementContract to execute signed bids on their behalf and the NFT creator grants the SettlementContract permission to mint NFTs.

Next, users craft and submit bids as meta-transactions to the Pikapool darkpool.

When the auction closes, Pikapool gathers winning bids into bundles and submits them on-chain where the SettlementContract 1. verifies the bids are legitimate, 2. sends the tips to the NFT creator and 3. mints the NFTs to the winning addresses.
