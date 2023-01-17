# Pikapool Protocol
## Smart Contracts

This repository houses the **Pikapool** smart contracts, including utils, scripts, and tests. All contracts including tests are written in Solidity and managed using [Paradigm's Foundry framework](https://github.com/foundry-rs/foundry).

For more documentation about the nitty-gritty workings of these smart contracts, see the [Pikapool documentation pages](https://www.pikapool.cool/docs).

## Getting Started

### Setting up Foundry

```sh
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

### Compiling the Project

```sh
forge b
```

### Running the Tests

```sh
forge test
```

### Gas Reports

First enable gas reports in the `foundry.toml` file:

```toml
gas.reports = ['*']
```

Then run tests with the --gas-report flag enabled

```sh
forge test --gas-report
```

## Deployment

Deployment of these contracts can be performed in your preferred manner, though a deployment script is provided for your convenience in the `script` directory.

First load your environment variables from a .env file. The bare minimum will of course be a private key and RPC endpoint, but an Etherscan api key may be provided for verification as well.

```sh
source .env
```

Then set constructor arguments in the script, ensuring that you have provided the correct WETH address for your desired chain and your desired maximum mint amount. Finally run the deployment script:

```sh
forge script script/Settlement.s.sol:SettlementScript --rpc-url $DESIREDCHAIN_RPC_URL --broadcast --verify -vvvv
```

New artifact files with details of the deployment will be generated if successful.

## Deployed Settlement Contract Address

Take note of the deployed Settlement contract address as you will need to provide that address to any subsequent Pikapatible NFT project that wishes to use Pikapool's auction engine.

## Further testing

Pikapool has written several additional scripts to aid in production testing using Typescript and Go, but they are beyond the scope of this repo. Check the organization's GitHub for more- it's all open source!