# Overview

## Meta-transactions

Bids are submitted to the Pikachu protocol using gasless meta-transactions.

Meta-transactions are enabled by two smart contracts, an allowance manager and a settlement smart contract.

Users first approve the vault relayer contract to execute signed bids on their behalf. Once the protocol is approved, users can submit bids via meta-transactions that contain the bid details, such as the mint ID, tip, timestamp, and so on to the orchestrator.

After the orchestrator has gathered winning bids, aka meta-transactions, into a batch, they send the transaction to the settlement contract, which verifies with the allowance manager that each meta-transaction has approval to be executed.

The combination of these two smart contracts are key in enabling off-chain bid submission, as ultimately, the user guarantees that the settlement contract will not be able to spend any funds that have not previously been approved in the allowance manager contract.

## Bundling

On Pikachu, bids are placed off-chain and not immediately executed, but rather collected and aggregated in a darkpool to later be settled in batches. As soon as a mint is "closed for bids", meaning the sale is over, the Pikapool protocol settles the winnings bids on-chain.

### Trustlessness

Although batch auctions will initially be conducted by a central orchestrator, the process is still trustless to the extent that the orchestrator cannot misbehave in secret.

When a bid is submitted to the darkpool, the bidder is provided a signed receipt by the orchestrator attesting that the bid was submitted and will be considered in the auction.

When a mint is "closed for bids", the orchestrator reveals the list of bids it considered in the auction.

If the orchestrator misbehaved by settling transactions on-chain inconsistenly with the list of candidate bids, this could be proven by comparing the list of candidate bids with the actual on-chain settled bids.

If the orchestrator misbehaved by omitting a bid from the published list of candidate bids, this could be proven by the signed receipt of the omitted bid being circulated off-chain.
