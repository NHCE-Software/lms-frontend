<script>
  import { onMount } from "svelte";

  import Router from "svelte-spa-router";
  import routes from "./routes.js";

  import { ApolloClient, InMemoryCache } from "@apollo/client";
  import { setClient } from "svelte-apollo";
  let client;
  onMount(() => {
    client = new ApolloClient({
      uri: "http://localhost:3000/graphql",
      cache: new InMemoryCache(),
    });
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
