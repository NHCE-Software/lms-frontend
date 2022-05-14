import Authentication from "./pages/Authentication.svelte";
import Home from "./pages/Home.svelte";
import QueryBuilder from "./pages/QueryBuilder.svelte";
import LeadDetails from "./pages/LeadDetails.svelte";
import AddUser from "./pages/AddUser.svelte";
import AddLead from "./pages/AddLead.svelte";
import FillForm from "./pages/FillForm.svelte";
import Notification from "./pages/Notification.svelte";
import NotAuth from "./pages/NotAuth.svelte";
import {wrap} from  "svelte-spa-router/wrap"





const routes = {
  // Exact path
  "/notauth": NotAuth,
  "/auth": Authentication,
  "/add-user": wrap( {
    component: AddUser,
    // loadingComponent: Loading
   
  }),
  "/add-lead": AddLead,
  "/query-builder": QueryBuilder,
  "/lead-details/:selectedLeadID": LeadDetails,
  "/lead-details": LeadDetails,
  "/fill-form": FillForm,
  "/notification": Notification,
  "/home": Home,
};

export default routes;
