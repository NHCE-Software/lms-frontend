<script>
  import Router from 'svelte-spa-router'
  import routes from './routes.js'
  
</script>

<div>
  <Router {routes}/>
</div>


<style lang="postcss" global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
