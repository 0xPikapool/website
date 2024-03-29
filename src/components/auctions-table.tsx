import React, { ReactElement } from "react";
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
import { useQueryPollingWhileWindowFocused } from "../hooks/useQueryPollingWhileWindowFocused";

export interface BlockNumbers {
  1: { data: number | undefined; isLoading: boolean; error: Error | null };
  5: { data: number | undefined; isLoading: boolean; error: Error | null };
}

function getAuctionStatus(
  auction: Auction,
  blockNumbers: BlockNumbers
): ReactElement {
  // Fetch the items to display on the current page.
  const queryResult = useQuery(GET_AUCTION_UNSETTLED_BIDS_COUNT, {
    variables: {
      address: auction.address,
      name: auction.name,
    },
  });
  useQueryPollingWhileWindowFocused({
    pollInterval: 1000,
    ...queryResult,
  });

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
  const blocksUntilBidOpen =
    Number(auction.bidStartBlock) - Number(blockNumber);

  // Bidding not open yet
  if (blocksUntilBidOpen > 0) {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span>
          Starting in {blocksUntilBidOpen} block
          {blocksUntilBidOpen > 1 ? "s..." : ""}
        </span>
        {blocksUntilBidOpen === 1 && (
          <div style={{ height: "auto", width: "8rem" }}>
            <img
              src="/img/auction_about_to_start_pikachu.gif"
              alt="About to start"
            />
          </div>
        )}
      </div>
    );
  }

  // Bidding closed
  const biddingClosed = Number(blockNumber) >= Number(auction.mintStartBlock);
  if (biddingClosed) {
    const settling: boolean =
      queryResult.data?.auctionByAddressAndName
        ?.bidsByAuctionAddressAndAuctionName?.totalCount > 0;
    if (settling) return <>Settling...</>;
    return <>Completed</>;
  }

  // Bidding open
  return <>Open</>;
}

export default function AuctionsTable(props: {
  auctions: Auction[];
  showName: boolean;
}): JSX.Element {
  const blockNumbers = useBlockNumbers();

  return (
    <div className="flex justify-center w-full">
      <table className="table-auto overflow-x-auto text-[12px] sm:text-xs lg:text-sm xl:text-base 2xl:text-lg">
        <thead className="table-header-group">
          <tr className="table-row">
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
              <tr key={id} className="tracking-tighter">
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
    </div>
  );
}
