import React, { ReactElement, useState, useEffect } from "react";
import { Auction } from "@site/src/__generated__/graphql";
import Link from "@docusaurus/Link";
import {
  createEtherscanUrl,
  displayEth,
  getAuctionId,
  hexBufferToString,
} from "@site/src/utils";
import useBlockNumbers from "../hooks/useBlockNumbers";
import { useQuery } from "@apollo/client";
import { GET_AUCTION_UNSETTLED_BIDS_COUNT } from "../queries";
import { useQueryPollingWhileWindowFocused } from "@site/src/hooks/useQueryPollingWhileWindowFocused";

export interface BlockNumbers {
  1: { data: number | undefined; isLoading: boolean; error: Error | null };
  5: { data: number | undefined; isLoading: boolean; error: Error | null };
}

function getAuctionStatus(
  auction: Auction,
  blockNumbers: BlockNumbers
): ReactElement {
  if (
    !blockNumbers[auction.chainId] ||
    blockNumbers[auction.chainId].isLoading
  ) {
    return <>Thinking...</>;
  }

  if (blockNumbers[auction.chainId].error) {
    return <>Error</>;
  }

  const blockNumber = blockNumbers[auction.chainId].data;
  const bidStartDiff = Number(auction.bidStartBlock) - Number(blockNumber);

  // Fetch the items to display on the current page.
  const queryResult = useQuery(GET_AUCTION_UNSETTLED_BIDS_COUNT, {
    variables: {
      address: auction.address,
      name: auction.name
    },
  });
  useQueryPollingWhileWindowFocused({
    pollInterval: 1000,
    ...queryResult,
  });

  const settling: Number = queryResult.data?.auctionByAddressAndName?.bidsByAuctionAddressAndAuctionName?.totalCount;

  if (Number(auction.bidStartBlock) > Number(blockNumber)) {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span>
          Starting in {bidStartDiff} block{bidStartDiff > 1 ? "s..." : ""}
        </span>
        {bidStartDiff === 1 && (
          <div style={{ height: "auto", width: "8rem" }}>
            <img
              src="/img/auction_about_to_start_pikachu.gif"
              alt="About to start"
            />
          </div>
        )}
      </div>
    );
  } else if (bidStartDiff <= 0 && settling) {
    return <>Settling...</>;
  } else if (bidStartDiff <= 0 && !settling) {
    return <>Completed</>;
  }
  return <>Open</>;
}

export default function AuctionsTable(props: {
  auctions: Auction[];
  showName: boolean;
}): JSX.Element {
  const blockNumbers = useBlockNumbers();

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Chain ID</th>
            {props.showName ? <th>Name</th> : null}
            <th>Contract</th>
            <th>Size</th>
            <th>Base Price</th>
            <th>Bid Start Block</th>
            <th>Bid End Block</th>
            <th>Total Bids</th>
            <th>Status</th>
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
            const etherscanUrl = createEtherscanUrl(
              auctionAddressStr,
              auction.chainId,
              "address"
            );
            return (
              <tr key={id}>
                <td>{auction.chainId}</td>
                {props.showName ? (
                  <td>
                    {<Link to={`/explorer?auction=${id}`}>{auction.name}</Link>}
                  </td>
                ) : null}
                <td>
                  {
                    <Link href={etherscanUrl} target="_blank">
                      {truncatedAddress}
                    </Link>
                  }
                </td>
                <td>{auction.maxUnits}</td>
                <td>{displayEth(auction.price)}</td>
                <td>{auction.bidStartBlock}</td>
                <td>{auction.mintStartBlock}</td>
                <td>{auction.bidsByAuctionAddressAndAuctionName.totalCount}</td>
                <td>{getAuctionStatus(auction, blockNumbers)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
