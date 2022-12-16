
# Batch Auctions

On Pikachu, bids are placed off-chain and not immediately executed, but rather collected and aggregated in a darkpool to later be settled in batches. As soon as a mint is "closed for bids", meaning the sale is over, the Pikapool protocol settles the winnings bids on-chain.

## Trustlessness

Although batch auctions will initially be conducted by a central orchestrator, the process is still trustless to the extent that the orchestrator cannot misbehave in secret.

When a bid is submitted to the darkpool, the bidder is provided a signed receipt by the orchestrator attesting that the bid was submitted and will be considered in the auction.

When a mint is "closed for bids", the orchestrator reveals the list of bids it considered in the auction.

If the orchestrator misbehaved by settling transactions on-chain inconsistenly with the list of candidate bids, this could be proven by comparing the list of candidate bids with the actual on-chain settled bids.

If the orchestrator misbehaved by omitting a bid from the published list of candidate bids, this could be proven by the signed receipt of the omitted bid being circulated off-chain.
