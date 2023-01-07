import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import React from "react";
import { useQuery } from "@apollo/client";
import { GET_AUCTION } from "../../queries";
import AuctionsTable from "../../components/auctions-table";
import { Auction } from "@site/src/__generated__/graphql";
import BidsTable from "@site/src/components/bids-table";
import { stringToHexBuffer } from "@site/src/utils";
import { useQueryPollingWhileWindowFocused } from "@site/src/hooks/useQueryPollingWhileWindowFocused";

export default function AuctionPage(props: {
  name: string;
  address: string;
}): JSX.Element {
  if (!ExecutionEnvironment.canUseDOM) return <p>Loading...</p>;
  const queryResult = useQuery(GET_AUCTION, {
    variables: { name: props.name, address: stringToHexBuffer(props.address) },
  });
  useQueryPollingWhileWindowFocused({ pollInterval: 1000, ...queryResult });

  const { loading, error, data } = queryResult;
  if (data) {
    const auction = data.auctionByAddressAndName as Auction;
    const bids = auction.bidsByAuctionAddressAndAuctionName.nodes;
    return (
      <>
        <div className="hero__subtitle">{`Auction`}</div>
        <AuctionsTable auctions={[auction]} />
        <div className="hero__subtitle">{`Latest 100 Bids`}</div>
        <BidsTable bids={bids} verbose={false} />
      </>
    );
  }

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <>
        <p>Error :(</p>
        <p>{JSON.stringify(error)}</p>
      </>
    );
}
