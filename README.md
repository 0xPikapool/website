# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### server-persisted-operations.json

The Explorer GraphQL Server must implement these [persisted operations](https://www.apollographql.com/docs/react/api/link/persisted-queries/) and should enforce that no other queries can be called, to prevent abuse.
