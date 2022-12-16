
# Using Pikachu

## Creators

Pikachu can be integrated into your sale in as little as one line of code.

Reach out to us on Discord [...] for a white glove service.

Pikachu will eventually implement self-service for creators.

### Payload

`POST https://some-lambda-url.com/`

```json
{
  "timestamp": string,
  "bidder_address": string,
  "sale_id": string,
  "tip": number,
  "expiry": number,
  "bidder_signature": string
}
```

### Response

```json
{
  "timestamp": string,
  "bidder_address": string,
  "sale_id": string,
  "tip": number,
  "expiry": number,
  "bidder_signature": string,

  "status": string,
  "receipt": {
    "signer": string,
    "signature": string
  }
}
```

## Bidders

Connect your wallet to a Pikachu-enabled NFT mint, and follow the instructions in the UI!
