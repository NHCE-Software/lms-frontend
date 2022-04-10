<script>
  import Router from "svelte-spa-router";
  import routes from "./routes.js";
</script>

<div class="text-black bg-slate-100 min-h-screen h-full">
  <Router {routes} />
</div>

<style lang="postcss" global>
  @import url("https://fonts.googleapis.com/css2?family=Anek+Tamil:wght@200;300;400;500;600;700&display=swap");
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  body {
    font-family: "Anek Tamil", sans-serif;
  }
</style>
