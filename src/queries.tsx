import { useQuery } from "@apollo/client";
import { gql } from "./__generated__/gql";

export const GET_AUCTIONS = gql(`
  query GetAuctions {
    allAuctions(orderBy: BID_START_BLOCK_DESC, first: 100) {
      nodes {
        address
        name
        bidStartBlock
        mintStartBlock
        chainId
        maxUnits
        price
        bidsByAuctionAddressAndAuctionName {
          totalCount
        }
      }
    }
  }
`);

export const GET_AUCTION = gql(`
  query GetAuction($address: String!, $name: String!) {
    auctionByAddressAndName(address: $address, name: $name) {
      address
      name
      price
      bidStartBlock
      mintStartBlock
      maxUnits
      chainId
      bidsByAuctionAddressAndAuctionName(first: 100, orderBy: SUBMITTED_TIMESTAMP_DESC) {
        nodes {
          bidId
          signer
          status
          submittedTimestamp
          tipRevealed
          amount
        }
        totalCount
      }
      bundlesByAuctionAddressAndAuctionName {
        nodes {
          bundleHash
          signerAddress
        }
        totalCount
      }
    }
  }
`);

export const GET_BID = gql(`
  query GetBid($bidId: String!) {
    bidByBidId(bidId: $bidId) {
      bidId
      auctionAddress
      auctionName
      bundleHash
      replacedBy
      signer
      signature
      status
      submittedTimestamp
      statusLastUpdated
      tipRevealed
      txHash
      amount
      auctionByAuctionAddressAndAuctionName {
        price
      }
    }
  }
`);

export const HEALTH_CHECK = gql(`
  query HealthCheck {
    __typename
  }
`);
