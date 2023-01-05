import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import React from "react";
import { useQuery } from "@apollo/client";
import { GET_BID } from "../../queries";
import { Bid } from "@site/src/__generated__/graphql";
import BidVerbose from "@site/src/components/bid-verbose";
import { stringToHexBuffer } from "@site/src/utils";

export default function BidPage(props: { id: string }): JSX.Element {
  if (!ExecutionEnvironment.canUseDOM) return <p>Loading...</p>;

  const { loading, error, data } = useQuery(GET_BID, {
    variables: { bidId: stringToHexBuffer(props.id) },
  });
  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <>
        <p>Error :(</p>
        <p>{JSON.stringify(error)}</p>
      </>
    );

  const bid = data.bidByBidId as Bid;
  return (
    <>
      <div className="hero__subtitle">{`Bid ${props.id}`}</div>
      <BidVerbose bid={bid} />
    </>
  );
}
