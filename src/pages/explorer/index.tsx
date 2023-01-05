import React, { useEffect, useState } from "react";
import Layout from "@theme/Layout";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  NormalizedCacheObject,
} from "@apollo/client";
import AuctionsPage from "./auctions";
import AuctionPage from "./auction";
import { useHistory } from "@docusaurus/router";
import BidPage from "./bid";
import { parseAuctionId } from "@site/src/utils";

export default function Explorer(): JSX.Element {
  const history = useHistory();
  const [client, setClient] =
    useState<ApolloClient<NormalizedCacheObject> | null>(null);
  useEffect(() => {
    setClient(
      new ApolloClient({
        uri: "http://localhost:5001/graphql",
        cache: new InMemoryCache(),
      })
    );
  }, []);

  if (client === null) return <p>Loading...</p>;

  let inner = <AuctionsPage />;
  if (history.location.search.startsWith("?auction=")) {
    const id = location.search.split("=")[1];
    const { name, address } = parseAuctionId(id);
    inner = <AuctionPage name={name} address={address} />;
  } else if (history.location.search.startsWith("?bid=")) {
    const id = location.search.split("=")[1];
    inner = <BidPage id={id} />;
  }

  return (
    <ApolloProvider client={client}>
      <Layout>
        <main style={{ margin: "40px" }}>{inner}</main>
      </Layout>
    </ApolloProvider>
  );
}
