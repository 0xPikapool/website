import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import React from "react";
import { useQuery } from "@apollo/client";
import { GET_AUCTIONS } from "../../queries";
import AuctionsTable from "../../components/auctions-table";
import { Auction } from "@site/src/__generated__/graphql";
import { useQueryPollingWhileWindowFocused } from "@site/src/hooks/useQueryPollingWhileWindowFocused";

export default function Auctions(): JSX.Element {
  if (!ExecutionEnvironment.canUseDOM) return <p>Loading...</p>;
  const queryResult = useQuery(GET_AUCTIONS);
  useQueryPollingWhileWindowFocused({ pollInterval: 1000, ...queryResult });

  const { loading, error, data } = queryResult;

  if (loading) return <p>Loading...</p>;

  if (data) {
    const auctions = data.allAuctions.nodes as Auction[];
    return (
      <>
        <div className="hero__subtitle">All Auctions</div>
        <AuctionsTable auctions={auctions} />
      </>
    );
  }

  if (error)
    return (
      <>
        <p>Error :(</p>
        <p>{JSON.stringify(error)}</p>
      </>
    );
}
