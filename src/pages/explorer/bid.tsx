import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import React from "react";
import { useQuery } from "@apollo/client";
import { GET_BID } from "../../queries";
import { Bid } from "@site/src/__generated__/graphql";
import BidVerbose from "@site/src/components/bid-verbose";
import { useQueryPollingWhileWindowFocused } from "@site/src/hooks/useQueryPollingWhileWindowFocused";

export default function BidPage(props: { id: string }): JSX.Element {
  if (!ExecutionEnvironment.canUseDOM) return <p>Loading...</p>;
  const queryResult = useQuery(GET_BID, { variables: { bidId: props.id } });
  useQueryPollingWhileWindowFocused({ pollInterval: 1000, ...queryResult });

  const { loading, error, data } = queryResult;
  if (data) {
    const bid = data.bidByBidId as Bid;
    return (
      <>
        <div className="hero__subtitle">{`Bid ${props.id}`}</div>
        <BidVerbose bid={bid} />
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
