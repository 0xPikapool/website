# Meta-transactions

Bids are submitted to the Pikachu protocol using gasless meta-transactions.

Meta-transactions are enabled by two smart contracts, an allowance manager and a settlement smart contract.

Users first approve the vault relayer contract to execute signed bids on their behalf. Once the protocol is approved, users can submit bids via meta-transactions that contain the bid details, such as the mint ID, tip, timestamp, and so on to the orchestrator.

After the orchestrator has gathered winning bids, aka meta-transactions, into a batch, they send the transaction to the settlement contract, which verifies with the allowance manager that each meta-transaction has approval to be executed.

The combination of these two smart contracts are key in enabling off-chain bid submission, as ultimately, the user guarantees that the settlement contract will not be able to spend any funds that have not previously been approved in the allowance manager contract.
