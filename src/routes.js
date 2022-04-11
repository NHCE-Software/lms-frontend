import Authentication from "./pages/Authentication.svelte";
import Home from "./pages/Home.svelte";

const routes = {
  // Exact path
  "/auth": Authentication,
  "/home": Home,
};

export default routes;
