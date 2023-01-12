import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import React from "react";
import { useQuery } from "@apollo/client";
import { GET_BID } from "../../queries";
import { Bid } from "@site/src/__generated__/graphql";
import BidVerbose from "@site/src/components/bid-verbose";
import { useQueryPollingWhileWindowFocused } from "@site/src/hooks/useQueryPollingWhileWindowFocused";
import { stringToHexBuffer } from "../../utils";
import Loading from "@site/src/components/Loading";
import NotFound from "@site/src/components/404";

export default function BidPage(props: { id: string }): JSX.Element {
  if (!ExecutionEnvironment.canUseDOM) return <Loading />;
  const queryResult = useQuery(GET_BID, {
    variables: { bidId: stringToHexBuffer(props.id) },
  });
  useQueryPollingWhileWindowFocused({ pollInterval: 1000, ...queryResult });

  const { loading, error, data } = queryResult;
  if (data?.bidByBidId) {
    const bid = data.bidByBidId as Bid;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <BidVerbose bid={bid} />
      </div>
    );
  }

  if (loading) return <Loading />;
  if (error)
    return (
      <>
        <p>Error :(</p>
        <p>{JSON.stringify(error)}</p>
      </>
    );

  return <NotFound what={"Bid"} id={props.id} />;
}
