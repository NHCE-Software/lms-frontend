<script>
  import LoadedCard from "../components/LoadedCard.svelte";

  import Stories from "../components/Stories.svelte";
  import Stats from "../components/Stats.svelte";
  import WeeklyChart from "../components/WeeklyChart.svelte";
  import Navbar from "../components/Navbar.svelte";
  $: {
    console.log(selectedStoryUID);
  }
  let data = {
    users: [
      {
        avatarURL: "https://api.lorem.space/image/face?hash=92310",
        uid: "uid",
      },
      {
        avatarURL: "https://api.lorem.space/image/face?hash=92310",
        uid: "uid2",
      },
    ],
  };
  let selectedStoryUID = data.users[0].uid;
</script>

<input type="checkbox" checked id="assigned-modal" class="modal-toggle" />
<div class="modal">
  <div class="modal-box bg-white max-w-6xl flex flex-col gap-5">
    <div class="flex gap-10">
      <div class="border w-full rounded-lg p-3">
        <input type="text" placeholder="Search" />
      </div>
      <input type="date" id="birthday" class="w-full" name="birthday" />
      <input type="date" id="birthday" class="w-full" name="birthday" />
      <select class="select  max-w-xs bg-white text-black border">
        <option>Hot</option>
        <option>Cold</option>
        <option>Awaiting</option>
      </select>
    </div>

    <div class="h-full" />

    <div class="modal-action">
      <label
        for="assigned-modal"
        class="bg-blue-600 black-black px-5 py-3 rounded-xl text-white"
        >Close</label
      >
    </div>
  </div>
</div>

<input type="checkbox" id="my-modal2" class="modal-toggle" />
<div class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg">Congratulations random Interner user!</h3>
    <p class="py-4">
      You've been selected for a chance to get one year of subscription to use
      Wikipedia for free!
    </p>
    <div class="modal-action">
      <label for="my-modal2" class="btn">Yay!</label>
    </div>
  </div>
</div>

<section class="grid min-h-screen h-full grid-cols-5">
  <Navbar />
  <div class="col-span-3 m-10">
    <div class="text-3xl">Ahoy, Shanti ma'am,</div>
    <div class="text-xl opacity-50">It's a Monday, 19th Apr, 2022</div>
    <div class="text-xl opacity-50">
      You have <span class="text-blue-500">3</span> new leads
    </div>
    <Stories users={data.users} bind:selectedStoryUID />
    <WeeklyChart />
    <Stats />
  </div>

  <div class="bg-white p-5 m-2 my-5 rounded-xl shadow-xl ">
    <div class="avatar flex justify-center mt-10 ">
      <div class="w-1/2 rounded-full">
        <img src="https://api.lorem.space/image/face?hash=92310" />
      </div>
    </div>
    <div class="text-center text-2xl mt-5 ">Mr. Siva Balan</div>
    <div class="text-center opacity-50">Online</div>
    <div class="mt-10 opacity-50 mb-4">Work Completed Today</div>
    <div class="flex overflow-auto  gap-5 ">
      <div class="rounded-2xl flex-none p-5 w-fit border my-2">
        <div class="text-3xl">56</div>
        <div class="">Calls made today</div>
      </div>
      <div class="rounded-2xl flex-none p-5 w-fit border my-2">
        <div class="text-3xl">56</div>
        <div class="">Hot calls today</div>
      </div>
      <div class="rounded-2xl flex-none p-5 w-fit border my-2">
        <div class="text-3xl">156</div>
        <div class="">Cold calls today</div>
      </div>
    </div>

    <div class="mt-6 opacity-50 mb-4">Details of the Calls made Today</div>
    <div class="flex flex-col overflow-auto gap-3">
      <LoadedCard />
      <LoadedCard />
      <label
        for="assigned-modal"
        class="text-right transition-all cursor-pointer hover:text-blue-600"
        >view more</label
      >
    </div>
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

  ::-webkit-scrollbar {
    height: 8px;
    scroll-margin: 2em;
  }

  ::-webkit-scrollbar-track {
    background-color: #e4e4e4;
    border-radius: 100px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 100px;
    border: 10px solid rgba(0, 0, 0, 0.18);
    @apply bg-blue-500;
  }
</style>
