import React from "react";
import { Bid } from "@site/src/__generated__/graphql";
import Link from "@docusaurus/Link";
import { displayEth, getAuctionId, hexBufferToString } from "../utils";

export default function BidVerbose(props: { bid: Bid }): JSX.Element {
  const { bid } = props;
  const basePrice = bid.auctionByAuctionAddressAndAuctionName.price;
  const signerStr = hexBufferToString(bid.signer);
  const auctionAddressStr = hexBufferToString(bid.auctionAddress);
  const auctionUrl = `/explorer?auction=${getAuctionId(
    auctionAddressStr,
    bid.auctionName
  )}`;
  const bidIdStr = hexBufferToString(bid.bidId);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>{`Bid ${bidIdStr}`}</h1>
      <table align="left">
        <tbody>
          <tr>
            <th align="right">Submitted</th>
            <td>{bid.submittedTimestamp}</td>
          </tr>
          <tr>
            <th align="right">Status</th>
            <td>{bid.status}</td>
          </tr>
          <tr>
            <th align="right">Replaced By</th>
            <td>
              {bid.replacedBy === null ? (
                "N/A"
              ) : (
                <Link to={`/explorer?bid=${hexBufferToString(bid.replacedBy)}`}>
                  {hexBufferToString(bid.replacedBy)}
                </Link>
              )}
            </td>
          </tr>
          <tr>
            <th align="right">Signer</th>
            <td>
              <Link to={`https://etherscan.io/address/${signerStr}`}>
                {signerStr}
              </Link>
            </td>
          </tr>
          <tr>
            <th align="right">Auction</th>
            <td>
              <Link to={auctionUrl}>{bid.auctionName}</Link>
            </td>
          </tr>
          <tr>
            <th align="right">Amount</th>
            <td>{bid.amount}</td>
          </tr>
          <tr>
            <th align="right">Base Price</th>
            <td>{displayEth(basePrice)}</td>
          </tr>
          <tr>
            <th align="right">⚡ Tip</th>
            <td>
              {bid.tipRevealed === null
                ? "Hidden until mint end"
                : displayEth(bid.tipRevealed)}
            </td>
          </tr>
          <tr>
            <th align="right">On-Chain Hash</th>
            <td>
              {bid.txHash === null ? (
                "n/a"
              ) : (
                <Link
                  to={`https://etherscan.io/tx/${hexBufferToString(
                    bid.txHash
                  )}`}
                >
                  {hexBufferToString(bid.txHash)}
                </Link>
              )}
            </td>
          </tr>
          <tr>
            <th align="right">Signature</th>
            <td style={{ maxWidth: "100px" }}>
              <span style={{ fontSize: "14px" }}>
                {hexBufferToString(bid.signature)}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
