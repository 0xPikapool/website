import React from "react";
import { Auction } from "@site/src/__generated__/graphql";
import Link from "@docusaurus/Link";
import {
  createEtherscanUrl,
  displayEth,
  getAuctionId,
  hexBufferToString,
} from "@site/src/utils";
import { useBlockNumber } from "wagmi";

interface BlockNumbers {
  1: { data: number | undefined; isLoading: boolean; error: Error | null };
  5: { data: number | undefined; isLoading: boolean; error: Error | null };
}

function getAuctionStatus(
  auction: Auction,
  blockNumbers: BlockNumbers
): string {
  if (
    !blockNumbers[auction.chainId] ||
    blockNumbers[auction.chainId].isLoading
  ) {
    return "Thinking...";
  }

  if (blockNumbers[auction.chainId].error) {
    return "Error";
  }

  const blockNumber = blockNumbers[auction.chainId].data;
  if (Number(auction.bidStartBlock) > blockNumber) {
    return "Starting soon";
  } else if (blockNumber > Number(auction.mintStartBlock)) {
    return "Closed";
  }
  return "Open";
}

export default function AuctionsTable(props: {
  auctions: Auction[];
  showName: boolean;
}): JSX.Element {
  const blockNumbers = {
    1: useBlockNumber({ chainId: 1 }),
    5: useBlockNumber({ chainId: 5 }),
  } as BlockNumbers;

  console.log(blockNumbers);

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
