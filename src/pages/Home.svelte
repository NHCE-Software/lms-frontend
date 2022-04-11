<script>
  import WeeklyChart from "../components/WeeklyChart.svelte";

  import Navbar from "../components/Navbar.svelte";
</script>

<section class="grid h-screen grid-cols-5">
  <Navbar />
  <div class="col-span-3 m-10">
    <div class="text-3xl ">Ahoy, Shanti ma'am,</div>
    <div class="text-xl opacity-50">It's a Monday, 19th Apr, 2022</div>
    <div class="text-xl opacity-50">
      You have <span class="text-blue-500">3</span> new leads
    </div>
    <WeeklyChart />
  </div>
</section>

<style>
  .slider-wrapper {
    display: inline-block;
    width: 20px;
    height: 150px;
    padding: 0;
  }
  .slider-wrapper input {
    width: 150px;
    height: 20px;
    margin: 0;
    transform-origin: 75px 75px;
    transform: rotate(-90deg);
  }
</style>
