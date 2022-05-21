<script>
  import Router from "svelte-spa-router";
  import routes from "./routes.js";
  import {
    ApolloClient,
    HttpLink,
    ApolloLink,
    InMemoryCache,
    concat,
    from,
  } from "@apollo/client";

  import { setClient } from "svelte-apollo";
  import { onError } from "@apollo/client/link/error";
  const httpLink = new HttpLink({ uri: BASEURL + "/api/graphql" });
  const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: localStorage.getItem("token") || null,
      },
    }));
    return forward(operation);
  });
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );

    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
      swal("Error", "We are offline, please try again later", "error");
    }
  });
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: from([errorLink, concat(authMiddleware, httpLink)]),
  });
  setClient(client);
</script>

<div class="text-black bg-slate-100 min-h-screen h-full">
  <Router {routes} />
</div>

<style lang="postcss" global>
  @import url("https://fonts.googleapis.com/css2?family=Anek+Tamil:wght@200;300;400;500;600;700&display=swap");
  @import url("https://fonts.googleapis.com/css2?family=Whisper&display=swap");
  @import url("https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,300;0,400;0,500;0,700;0,800;0,900;1,300;1,500;1,600&display=swap");
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  body {
    font-family: "Anek Tamil", sans-serif;
    /* font-family: 'Whisper', cursive; */
    /* font-family: "Work Sans", sans-serif; */
  }
</style>
