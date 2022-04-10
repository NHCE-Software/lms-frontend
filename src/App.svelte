<script>
  import Router from 'svelte-spa-router'
  import routes from './routes.js'
  </script>

<div class="text-black bg-slate-200 min-h-screen h-full">
  <Router {routes}/>
</div>


<style lang="postcss" global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
