import Authentication from "./pages/Authentication.svelte";
import Home from "./pages/Home.svelte";
import QueryBuilder from "./pages/QueryBuilder.svelte";
import LeadDetails from "./pages/LeadDetails.svelte";
import AddUser from "./pages/AddUser.svelte";

const routes = {
  // Exact path
  "/auth": Authentication,
  "/add-user": AddUser,
  "/query-builder": QueryBuilder,
  "/lead-details": LeadDetails,
  "/home": Home,
};

export default routes;
