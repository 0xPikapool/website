import React from "react";
import { useQuery } from "@apollo/client";
import { useHistory } from "@docusaurus/router";
import { gql } from "../../__generated__/gql";

const GET_AUCTION = gql(`
  query GetAuctions {
    allAuctions {
      edges {
        node {
          address
          auctionId
          bidStartBlock
          chainId
          lastUpdated
          maxUnits
          mintStartBlock
          nodeId
          price
        }
      }
    }
  }
`);

export default function Auction(props: { id: string }): JSX.Element {
  const { loading, error, data } = useQuery(GET_AUCTION);
  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <>
        <p>Error :(</p>
        <p>{JSON.stringify(error)}</p>
      </>
    );

  return <>{props.id}</>;
}
