
# Integration

Users can send Flashbots compatible MEV bundles directly to our relay endpoint at https://eth-builder.com. For the specification of the bundle format see the Flashbots rpc docs.

## eth_sendBundle

eth_sendBundle can be used to send your bundles to our builder. The eth_sendBundle RPC has the following payload format:

```json
{
  "jsonrpc": "2.0", 
  "id": 1,
  "method": "eth_sendBundle",
  "params": [
    {
      txs,               // Array[String], A list of signed transactions to execute in an atomic bundle
      blockNumber,       // String, a hex encoded block number for which this bundle is valid on
      revertingTxHashes, // (Optional) Array[String], A list of tx hashes that are allowed to revert
    }
  ]
}
```

Note that we do not support minTimestamp or maxTimestamp.

Example:

## Request

```bash
curl -X POST -H 'Content-Type: application/json' --data '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "eth_sendBundle",
    "params": [
        {
          "txs" : [
              "0xf86c8201568506b8f2dc588252089478d82944afaaf5432d32d7025a95b10c8c7a4065860591f9b808788025a05b2a171ea176ab09e18f4394f1414224c7a2cbbfe603d12da941a36f7183cbe4a0658233ffa7efbbf6c6b9b447ec3efa869c0be5773b984b1795121ce8bd5dd29d"
          ],
          "blockNumber" : "0xf1d277"
        }
    ]
}' https://eth-builder.com
```

## Response

```bash
{"jsonrpc":"2.0","id":1,"result":{"bundleHash":"0x9d3e40d170871ad458cbca61dbf9cc9e8683bfe69a8c302032ed90a6af90c465"}}
```

## FAQ

### Address

Our on-chain fee receipient is 0xFeebabE6b0418eC13b30aAdF129F5DcDd4f70CeA, also known as sendbundle.eth.

Our builder pubkey is 0x8eb772d9...17fff18ad0.

### Privacy

We do not use bundles for anything other than building mev-boost blocks.
