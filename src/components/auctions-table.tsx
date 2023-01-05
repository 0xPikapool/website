import React from "react";
import { Auction } from "@site/src/__generated__/graphql";
import Link from "@docusaurus/Link";
import { useHistory } from "@docusaurus/router";
import { displayEth, getAuctionId, hexBufferToString } from "@site/src/utils";

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
            const auctionAddressStr = hexBufferToString(auction.address);
            const id = getAuctionId(auctionAddressStr, auction.name);
            const truncatedAddress =
              auctionAddressStr.slice(0, 6) +
              "..." +
              auctionAddressStr.slice(-4);
            const etherscanUrl = `https://etherscan.io/address/${auctionAddressStr}`;
            return (
              <tr key={id}>
                <td>
                  {<Link to={`/explorer?auction=${id}`}>{auction.name}</Link>}
                </td>
                <td>{auction.maxUnits}</td>
                <td>{displayEth(auction.price)}</td>
                <td>{auction.bidStartBlock}</td>
                <td>{auction.mintStartBlock}</td>
                <td>{auction.bidsByAuctionAddressAndAuctionName.totalCount}</td>
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
