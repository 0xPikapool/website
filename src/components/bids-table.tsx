import React from "react";
import { Bid } from "@site/src/__generated__/graphql";
import Link from "@docusaurus/Link";
import {
  createEtherscanUrl,
  displayEth,
  hexBufferToString,
} from "@site/src/utils";

export default function BidsTable(props: {
  bids: Bid[];
  chainId: 1 | 5;
}): JSX.Element {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Signer</th>
            <th>Submitted</th>
            <th className="whitespace-nowrap">⚡ Tip ⚡</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {props.bids.map((bid) => {
            const signerStr = hexBufferToString(bid.signer);
            const idStr = hexBufferToString(bid.bidId);
            const truncatedBidId = idStr.slice(0, 4) + "..." + idStr.slice(-4);
            const truncatedAddress =
              signerStr.slice(0, 6) + "..." + signerStr.slice(-4);
            const etherscanUrl = createEtherscanUrl(
              signerStr,
              props.chainId,
              "address"
            );
            const bidUrl = `/explorer?bid=${idStr}`;
            return (
              <tr key={bid.bidId}>
                <td>{<Link to={bidUrl}>{truncatedBidId}</Link>}</td>
                <td>{<Link to={etherscanUrl}>{truncatedAddress}</Link>}</td>
                <td>{bid.submittedTimestamp}</td>
                <td>
                  {bid.tipRevealed ? displayEth(bid.tipRevealed) : "Hidden"}
                </td>
                <td>{bid.amount}</td>
                <td>{bid.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
