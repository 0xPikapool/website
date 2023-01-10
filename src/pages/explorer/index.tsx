import React, { useEffect, useState } from "react";
import Layout from "@theme/Layout";
import { usePregeneratedHashes as withPregeneratedHashes } from "graphql-codegen-persisted-query-ids/lib/apollo";
import { createPersistedQueryLink } from "@apollo/client/link/persisted-queries";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  NormalizedCacheObject,
  ApolloLink,
  HttpLink,
} from "@apollo/client";
import AuctionsPage from "./auctions";
import AuctionPage from "./auction";
import { useHistory } from "@docusaurus/router";
import BidPage from "./bid";
import { parseAuctionId } from "@site/src/utils";
import {
  configureChains,
  createClient,
  goerli,
  mainnet,
  WagmiConfig,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { InjectedConnector } from "wagmi/connectors/injected";
import Loading from "@site/src/components/Loading";

const hashes = require("../../__generated__/client.json");
const persistedLink = createPersistedQueryLink({
  useGETForHashedQueries: false,
  generateHash: withPregeneratedHashes(hashes),
  disable: () => false,
});

const { chains, provider } = configureChains(
  [mainnet, goerli],
  [publicProvider()]
);

const wagmiClient = createClient({
  autoConnect: true,
  // connectors: [new InjectedProvider({ chains })],
  provider,
});

const apolloClient = new ApolloClient({
  link: ApolloLink.from([
    persistedLink,
    new HttpLink({ uri: "https://api.pikapool.cool/v0/graphql" }),
  ]),
  cache: new InMemoryCache(),
});

export default function Explorer(): JSX.Element {
  const history = useHistory();
  if (apolloClient === null) return <Loading />;

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
    <WagmiConfig client={wagmiClient}>
      <ApolloProvider client={apolloClient}>
        <Layout>
          <main style={{ margin: "40px" }}>{inner}</main>
        </Layout>
      </ApolloProvider>
    </WagmiConfig>
  );
}
