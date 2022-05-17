<script>
  import Navbar from "../components/Navbar.svelte";
</script>

<section class="grid min-h-screen p-5 h-full grid-cols-5">
  <Navbar />
  <div class="col-span-3 m-10">
    <div class="text-2xl ">Notifications</div>
    <div class="text-lg ">Find all the tasks to complete today</div>
    <div class="mt-5 text-2xl font-bold text-blue-500">
      Calls for {new Date().toLocaleDateString()} (Today)
    </div>
  </div>
</section>
