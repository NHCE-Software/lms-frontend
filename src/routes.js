import Authentication from "./pages/Authentication.svelte";
import Home from "./pages/Home.svelte";
import QueryBuilder from "./pages/QueryBuilder.svelte";

const routes = {
  // Exact path
  "/auth": Authentication,
  "/query-builder": QueryBuilder,
  "/home": Home,
};

export default routes;
