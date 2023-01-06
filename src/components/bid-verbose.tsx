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
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <table align="left">
        <tr>
          <th>Submitted</th>
          <td>{bid.submittedTimestamp}</td>
        </tr>
        <tr>
          <th>Status</th>
          <td>{bid.status}</td>
        </tr>
        <tr>
          <th>Replaced By</th>
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
          <th>Signer</th>
          <td>
            <Link to={`https://etherscan.io/address/${signerStr}`}>
              {signerStr}
            </Link>
          </td>
        </tr>
        <tr>
          <th>Auction</th>
          <td>
            <Link to={auctionUrl}>{bid.auctionName}</Link>
          </td>
        </tr>
        <tr>
          <th>Amount</th>
          <td>{bid.amount}</td>
        </tr>
        <tr>
          <th>Base Price (per token)</th>
          <td>{displayEth(basePrice)}</td>
        </tr>
        <tr>
          <th>Tip (per token)</th>
          <td>
            {bid.tipRevealed === null ? "HIDDEN" : displayEth(bid.tipRevealed)}
          </td>
        </tr>
        <tr>
          <th>Transaction Hash</th>
          <td>
            {bid.txHash === null ? (
              "N/A"
            ) : (
              <Link
                to={`https://etherscan.io/tx/${hexBufferToString(bid.txHash)}`}
              >
                {hexBufferToString(bid.txHash)}
              </Link>
            )}
          </td>
        </tr>
        <tr>
          <th>Signature</th>
          <td style={{ maxWidth: "100px" }}>
            <span style={{ fontSize: "14px" }}>
              {hexBufferToString(bid.signature)}
            </span>
          </td>
        </tr>
      </table>
    </div>
  );
}
