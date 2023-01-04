import React from "react";
import Layout from "@theme/Layout";
import { useQuery } from "@apollo/client";
import { useLocation, useHistory } from "@docusaurus/router";
import { gql } from "../../__generated__/gql";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import Auctions from "./auctions";
import Auction from "./auction";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});

export default function Explorer(): JSX.Element {
  let inner = <Auctions />;
  if (location.search.startsWith("?auction=")) {
    const id = location.search.split("=")[1];
    console.log(id);
    inner = <Auction id={id} />;
  }

  return (
    <ApolloProvider client={client}>
      <Layout>
        <main style={{ margin: "40px" }}>{inner}</main>
      </Layout>
    </ApolloProvider>
  );
}
