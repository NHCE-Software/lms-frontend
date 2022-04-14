<script>
  import LoadedCard from "../components/LoadedCard.svelte";

  import Stories from "../components/Stories.svelte";
  import Stats from "../components/Stats.svelte";
  import WeeklyChart from "../components/WeeklyChart.svelte";
  import RemarksCard from "../components/RemarksCard.svelte";
  import Navbar from "../components/Navbar.svelte";
  import UserWorkTable from "../components/UserWorkTable.svelte";

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

  let selectedUserLeadData = [
    {
      statusid: "stausid1",
      status: "Hot",
      source: "source",
      location: "location",
      name: "123",
      email: "email",
      phone: "phone",
    },
    {
      statusid: "stausid",
      status: "Cold",
      source: "source",
      location: "location",
      name: "wer123",
      email: "email",
      phone: "phone",
    },
    {
      statusid: "stausid",
      status: "Cold",
      source: "source",
      location: "location",
      name: "sdfg",
      email: "email",
      phone: "phone",
    },
    {
      statusid: "stausid",
      status: "Awaiting",
      source: "source",
      location: "location",
      name: "jkgh",
      email: "email",
      phone: "phone",
    },
  ];
  let selectedStoryUID = data.users[0].uid;
  let selectedStatusID = "";
  let search = "";

  let searchedLeadData = [];
  $: {
    searchedLeadData =
      search.length === 0
        ? [...selectedUserLeadData]
        : selectedUserLeadData.filter((obj) =>
            Object.values(obj).some((val) => val.includes(search))
          );
    searchedLeadData = [...searchedLeadData];
    console.log(searchedLeadData);
  }
</script>

<input type="checkbox" id="assigned-modal" class="modal-toggle" />
<div class="modal">
  <div class="modal-box bg-white max-w-6xl flex flex-col gap-5">
    <div class="flex gap-10">
      <div class="border w-full rounded-lg">
        <input
          bind:value={search}
          type="text"
          class="outline-none p-3"
          placeholder="Search"
        />
      </div>
      <label for="">From:</label>
      <input
        type="date"
        id="birthday"
        class="w-full border px-5 rounded-2xl"
        name="birthday"
      />
      <label for="">To:</label>

      <input
        type="date"
        id="birthday"
        class="w-full border px-5 rounded-2xl"
        name="birthday"
      />
    </div>

    <div class="h-full">
      <UserWorkTable bind:selectedStatusID data={searchedLeadData} />
    </div>

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
  <div class="modal-box bg-white  ">
    {selectedStatusID}

    <div class="text-2xl font-semibold opacity-50">Remarks</div>

    <div class="modal-action">
      <label for="my-modal2" class="btn">Close</label>
    </div>
  </div>
</div>

<section class="grid min-h-screen p-5 h-full grid-cols-5">
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

  <div class="bg-white  m-2  p-5 rounded-xl shadow-xl ">
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
