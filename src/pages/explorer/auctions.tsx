import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import React from "react";
import { useQuery } from "@apollo/client";
import { useHistory, Redirect } from "@docusaurus/router";
import { GET_AUCTIONS } from "../../queries";
import AuctionsTable from "../../components/auctions-table";
import { Auction } from "@site/src/__generated__/graphql";

export default function Auctions(): JSX.Element {
  if (!ExecutionEnvironment.canUseDOM) return <p>Loading...</p>;

  const { loading, error, data } = useQuery(GET_AUCTIONS);
  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <>
        <p>Error :(</p>
        <p>{JSON.stringify(error)}</p>
      </>
    );

  const auctions = data.allAuctions.nodes as Auction[];
  return (
    <>
      <div className="hero__subtitle">All Auctions</div>
      <AuctionsTable auctions={auctions} />
    </>
  );
}
