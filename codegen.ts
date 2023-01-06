import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "schema.graphql",
  documents: ["src/**/*.tsx"],
  generates: {
    "./src/__generated__/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
    "./src/__generated__/client.json": {
      config: {
        output: "client",
        algorithm: "sha256",
      },
      plugins: ["graphql-codegen-persisted-query-ids"],
    },
    "./server-persisted-operations.json": {
      config: {
        output: "server",
        algorithm: "sha256",
      },
      plugins: ["graphql-codegen-persisted-query-ids"],
    },
  },
  ignoreNoDocuments: true,
};

export default config;

// new ApolloClient({
//   link: ApolloLink.from([
//     persistedLink,
//     new HttpLink({ uri: "http://localhost:5001" }),
//   ]),
//   cache: new InMemoryCache(),
// })
