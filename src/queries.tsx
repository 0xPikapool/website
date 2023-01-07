import { useQuery } from "@apollo/client";
import { gql } from "./__generated__/gql";

export const GET_AUCTIONS = gql(`
  query GetAuctions($offset: Int!) {
    allAuctions(orderBy: BID_START_BLOCK_DESC, first: 10, offset: $offset) {
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
      totalCount
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
      bidsByAuctionAddressAndAuctionName {
        totalCount
      }
    }
  }
`);

export const GET_AUCTION_BIDS = gql(`
  query GetAuctionBids($address: String!, $name: String!, $offset: Int!) {
    auctionByAddressAndName(address: $address, name: $name) {
      bidsByAuctionAddressAndAuctionName(first: 10, offset: $offset, orderBy: SUBMITTED_TIMESTAMP_DESC) {
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
