# Roadmap

Pikapool's main goal is to increase revenue for NFT projects and minimize negative externalities associated with NFT mints on the Ethereum network. In order to provide a sustainable auction service, our architecture will need to evolve over time. At first our v1 APIs will be centralized and require trust assumptions on our servers. But eventually we hope to enable anyone to run their own auction house in a permissionless and trustless way for both creators and minters. Viva La NFT!


![roadmap](/img/roadmap.png)


## Pikapool Evolution Timeline

### v1 - Pichu

Pichu is the first version of our NFT auction platform. It's purpose is to create a new way for minters to express their NFT minting preferences in a manner that doesnt negatively impact their own bids, and the rest of the ethereum network. In this stage centralization and trust are at their highest. NFT projects will be able to usher bids from users facilitated by meta txns to the pikapool, where auction clearing will automatically be facilitated and winning bids will be settled through our settlement contract.

- **Centralized API** - pikapool is a series of streaming services and auction houses operating in tandem to provide high throughput auction clearing
- **Meta-txn Support** - users need not pay gas for settlement or failed transactions anymore
- **Gas Fee Redistribution** - at first 50% of bids will go to the underlying project and 50% will go to validators, drastically improving settlement through public mempool where 100% goes to valdiators
- **Permissioned Auctions** - projects will need to work with pikapool's trainers to set up their first electifying auction



### v2 - Pikachu

Pikachu is where true expressivity enters the NFT auction landscape and the road to decentralization begins. Major milestones in this version are the ability for any project to be able to permissionless register an auction with pikapool, bid publishing to increase transparency in auction processes, and the ability to use more advanced clearing algorithms. With customizable clearing, auction winners can be calculated through a much more rich lens of data than simply their bids, including on and off chain signals such as minting history and interactions with projects.

- **Configurable Clearing Algos** - incorporate exotic onchain data such as "mean time to paper handing" other NFT projects 
- **Bid Data Publishing** - bids will be published to an alternative data layer such as IPFS, or even a roll up like Optimism or Arbitrum
- **Permissionless Auctions** - anyone can register an auction by making an onchain transaction
- **Explorer** - live explorer to monitor meta txns and auction results


### v3 - Raichu

Raichu builds on the expressitivty unleashed in Pikachu and brings these gurantees on par with the decentralized gurantees we have come to enjoy in the ethereum network. If these ideals are forsaken in pikapool's journey then it will have failed, epicly.

- **Decentralized API** - using encrypted mempools, anyone can broadcast bids publicly removing reliance on pikapools API servers
- **Fully OSS** - all code, out in the open, free for anyone to use
- **Censorship Resistant** - attack vectors for supressing auction proceedings mitigated
- **Custom Roll Up/ Suave Integration** - maximally decentralized by integrating into Flashbot's future MEV chain, or a custom pikapool roll up

### v4 - Legendary

WAIT, but the roadmap only goes to `v3`. Thats right anon. In version 4, pikapool becomes a legendary pokemon. Its compute grows past the ability of computers and becomes reliant upon farms of shrimps hooked up to neuralink to enable infinitely scalable and trustless compute.