import React from "react";
import Layout from "@theme/Layout";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import AuctionsPage from "./auctions";
import AuctionPage from "./auction";
import { useHistory } from "@docusaurus/router";
import BidPage from "./bid";

const client = new ApolloClient({
  uri: "http://localhost:5001/graphql",
  cache: new InMemoryCache(),
});

export default function Explorer(): JSX.Element {
  const history = useHistory();
  let inner = <AuctionsPage />;
  if (history.location.search.startsWith("?auction=")) {
    const id = location.search.split("=")[1];
    inner = <AuctionPage id={id} />;
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
