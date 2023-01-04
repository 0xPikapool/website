import React from "react";
import { Auction } from "@site/src/__generated__/graphql";
import Link from "@docusaurus/Link";
import { useHistory } from "@docusaurus/router";

export default function AuctionsTable(props: {
  auctions: Auction[];
}): JSX.Element {
  const history = useHistory();

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Size</th>
            <th>Base Price</th>
            <th>Bid Start Block</th>
            <th>Bid End Block</th>
            <th>Total Bids</th>
            <th>Status</th>
            <th>Contract</th>
          </tr>
        </thead>
        <tbody>
          {props.auctions.map((auction) => {
            const truncatedAddress =
              auction.address.slice(0, 6) + "..." + auction.address.slice(-4);
            const etherscanUrl = `https://etherscan.io/address/${auction.address}`;
            return (
              <tr key={auction.auctionId}>
                <td>
                  {
                    <Link to={`/explorer?auction=${auction.auctionId}`}>
                      Test-Auction
                    </Link>
                  }
                </td>
                <td>{auction.maxUnits}</td>
                <td>{auction.price} WETH</td>
                <td>{auction.bidStartBlock}</td>
                <td>{auction.mintStartBlock}</td>
                <td>{auction.bidsByAuctionId.totalCount}</td>
                <td>Bidding Open!</td>
                <td>
                  {
                    <Link href={etherscanUrl} target="_blank">
                      {truncatedAddress}
                    </Link>
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
