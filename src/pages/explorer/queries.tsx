import { gql } from "../../__generated__/gql";

export const GET_AUCTIONS = gql(`
  query GetAuctions {
    allAuctions(orderBy: BID_START_BLOCK_DESC, first: 100) {
      nodes {
        address
        auctionId
        bidStartBlock
        chainId
        maxUnits
        mintStartBlock
        price
        bidsByAuctionId {
          totalCount
        }
      }
    }
  }
`);

export const GET_AUCTION = gql(`
  query GetAuction($auctionId: String!) {
    auctionByAuctionId(auctionId: $auctionId) {
      address
      auctionId
      price
      bidStartBlock
      mintStartBlock
      maxUnits
      chainId
      bidsByAuctionId(first: 100, orderBy: SUBMITTED_TIMESTAMP_DESC) {
        nodes {
          bidId
          signer
          status
          submittedTimestamp
          tip
          units
        }
        totalCount
      }
      bundlesByAuctionId {
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
      auctionId
      bidId
      bundleHash
      replacedBy
      signer
      signedHash
      status
      submittedTimestamp
      statusLastUpdated
      tip
      txHash
      units
    }
  }
`);
