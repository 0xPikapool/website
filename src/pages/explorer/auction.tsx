import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import React from "react";
import { useQuery } from "@apollo/client";
import { GET_AUCTION } from "../../queries";
import AuctionsTable from "../../components/HomepageFeatures/auctions-table";
import { Auction } from "@site/src/__generated__/graphql";
import BidsTable from "@site/src/components/HomepageFeatures/bids-table";

export default function AuctionPage(props: { id: string }): JSX.Element {
  if (!ExecutionEnvironment.canUseDOM) return <p>Loading...</p>;

  const { loading, error, data } = useQuery(GET_AUCTION, {
    variables: { auctionId: props.id },
  });
  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <>
        <p>Error :(</p>
        <p>{JSON.stringify(error)}</p>
      </>
    );

  const auction = data.auctionByAuctionId as Auction;
  const bids = auction.bidsByAuctionId.nodes;
  // const bundles = auction.bundlesByAuctionId.nodes;
  return (
    <>
      <div className="hero__subtitle">{`Auction`}</div>
      <AuctionsTable auctions={[auction]} />
      <div className="hero__subtitle">{`Latest 100 Bids`}</div>
      <BidsTable bids={bids} verbose={false} />
    </>
  );
}
