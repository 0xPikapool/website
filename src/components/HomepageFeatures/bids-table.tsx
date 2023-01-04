import React from "react";
import { Bid } from "@site/src/__generated__/graphql";
import Link from "@docusaurus/Link";

export default function BidsTable(props: {
  bids: Bid[];
  verbose: boolean;
}): JSX.Element {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Signer</th>
            <th>Submitted</th>
            <th>Tip</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {props.bids.map((bid) => {
            const truncatedBidId =
              bid.bidId.slice(0, 4) + "..." + bid.bidId.slice(-4);
            const truncatedAddress =
              bid.signer.slice(0, 6) + "..." + bid.signer.slice(-4);
            const etherscanUrl = `https://etherscan.io/address/${bid.signer}`;
            const bidUrl = `/explorer?bid=${bid.bidId}`;
            return (
              <tr key={bid.bidId}>
                <td>{<Link to={bidUrl}>{truncatedBidId}</Link>}</td>
                <td>{<Link to={etherscanUrl}>{truncatedAddress}</Link>}</td>
                <td>{bid.submittedTimestamp}</td>
                <td>?</td>
                <td>{bid.units}</td>
                <td>{bid.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {props.verbose && (
        <>
          <table>
            <thead>
              <tr>
                <th>Status Last Updated</th>
                <th>Auction</th>
                <th>Bundle</th>
                <th>Replaced By</th>
                <th>Tx Hash</th>
                <th>Signature</th>
              </tr>
            </thead>
            <tbody>
              {props.bids.map((bid) => {
                const truncatedAuctionId =
                  bid.auctionId.slice(0, 4) + "..." + bid.auctionId.slice(-4);
                return (
                  <tr key={bid.bidId}>
                    <td>{bid.statusLastUpdated}</td>
                    <td>
                      <Link to={`/explorer?auction=${bid.auctionId}`}>
                        {truncatedAuctionId}
                      </Link>
                    </td>
                    <td>{bid.bundleHash || "N/A"}</td>
                    <td>{bid.replacedBy || "N/A"}</td>
                    <td>{bid.txHash || "N/A"}</td>
                    <td>{bid.signedHash}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}
