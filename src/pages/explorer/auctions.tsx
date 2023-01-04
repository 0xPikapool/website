import React from "react";
import { useQuery } from "@apollo/client";
import { useHistory } from "@docusaurus/router";
import { gql } from "../../__generated__/gql";

const GET_AUCTIONS = gql(`
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

export default function Auctions(): JSX.Element {
  const history = useHistory();
  const { loading, error, data } = useQuery(GET_AUCTIONS);

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <>
        <p>Error :(</p>
        <p>{JSON.stringify(error)}</p>
      </>
    );

  return (
    <>
      <div className="hero__subtitle">Auctions</div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Size</th>
            <th>Base Price</th>
            <th>Bid Start</th>
            <th>Bid End</th>
            <th>Status</th>
            <th>Contract</th>
          </tr>
        </thead>
        <tbody>
          {data.allAuctions.edges.map((edge) => {
            const auction = edge.node;

            const truncatedAddress =
              auction.address.slice(0, 6) + "..." + auction.address.slice(-4);

            const etherscanUrl = `https://etherscan.io/address/${auction.address}`;

            return (
              <tr key={auction.auctionId}>
                <td
                  onClick={() => {
                    history.replace({
                      search: `?auction=${auction.auctionId}`,
                    });
                  }}
                >
                  The Potatooz
                </td>
                <td>{auction.maxUnits}</td>
                <td>{auction.price} WETH</td>
                <td>{auction.bidStartBlock}</td>
                <td>{auction.mintStartBlock}</td>
                <td>Bidding Open!</td>
                <td>
                  {
                    <a href={etherscanUrl} target="_blank">
                      {truncatedAddress}
                    </a>
                  }
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
