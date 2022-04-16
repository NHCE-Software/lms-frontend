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
      leadid: "bro1",
      name: "yajat",
      email: "email",
      phone: "phone",
      city: "city2",
      status: "Hot",
      course: "course",
      source: ["source1"],
      loadedby: ["loadby1"],
      calls: [
        {
          remark: "remark",
          date: "Someday",
          followup: "Today",
          updatedby: "user",
        },
        {
          remark: "remark",
          date: "date",
          followup: "Today1",
          updatedby: "user",
        },
      ],
    },
    {
      leadid: "bro11",
      name: "123",
      email: "email",
      phone: "phone",
      city: "city2",
      status: "Cold",
      course: "course",
      source: ["source1"],
      loadedby: ["loadby1"],
      calls: [
        {
          remark: "remark",
          date: "Someday",
          followup: "Today",
          updatedby: "user",
        },
        {
          remark: "remark",
          date: "Today",
          followup: "Today1",
          updatedby: "user",
        },
      ],
    },
  ];
  let selectedStoryUID;
  let selectedStatusID = "";
  let search = "";
  let filteredLeadData = selectedUserLeadData;
  let searchedLeads = filteredLeadData;

  $: {
    searchedLeads = filteredLeadData.filter((item) => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });
  }

  let andMode = true;
  let filters = {
    today: false,
    ondate: "",
    call1: false,
    call2: false,
    call3: false,
    call4: false,
    call5: false,
    greaterthan5: false,
    hot: false,
    cold: false,
    awaiting: false,
    closed: false,
  };
  function applyFilter() {
    filteredLeadData = selectedUserLeadData.map((item) => {
      return {
        ...item,
        followup: item.calls[item.calls.length - 1].followup,
      };
    });
    filteredLeadData = selectedUserLeadData.filter((item) => {
      let allTrues = [];
      if (filters.today) allTrues.push(item.followup === "Today");
      if (filters.ondate.length != 0)
        allTrues.push(item.calls.some((call) => call.date === filters.ondate));
      if (filters.greaterthan5) allTrues.push(item.calls.length > 5);
      if (filters.call1) allTrues.push(item.calls.length === 1);
      if (filters.call2) allTrues.push(item.calls.length === 2);
      if (filters.call3) allTrues.push(item.calls.length === 3);
      if (filters.call4) allTrues.push(item.calls.length === 4);
      if (filters.call5) allTrues.push(item.calls.length === 5);
      if (filters.hot) allTrues.push(item.status === "Hot");
      if (filters.cold) allTrues.push(item.status === "Cold");
      if (filters.closed) allTrues.push(item.status === "Closed");
      if (filters.awaiting) allTrues.push(item.status === "Awaiting");
      console.log(allTrues);
      return andMode
        ? allTrues.every((item) => item === true)
        : allTrues.some((item) => item === true);
    });
    filteredLeadData = [...filteredLeadData];
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
      <label for="filtermodal-home" class="btn">Ultra Advanced Filter</label>
    </div>

    <div class="h-full">
      <UserWorkTable
        bind:selectedStatusID
        data={search.length === 0 ? filteredLeadData : searchedLeads}
      />
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

<input type="checkbox" id="filtermodal-home" class="modal-toggle z-30" />
<div class="modal">
  <div class="modal-box bg-white max-w-xl flex flex-col gap-2">
    <div class="flex items-center justify-between">
      <h3 class="text-2xl font-bold opacity-50 my-2">Advanced Filtering</h3>
      <div class="flex gap-3">
        <label
          class={andMode ? "opacity-50" : "text-blue-600 font-semibold"}
          for="">Or Mode</label
        >
        <input type="checkbox" class="toggle" bind:checked={andMode} />
        <label
          class={!andMode ? "opacity-50 " : "text-blue-600 font-semibold"}
          for="">And Mode</label
        >
      </div>
    </div>
    <div class="flex items-center justify-between">
      <h3 class="text-xl font-bold opacity-50 my-2">Filter by date</h3>
      <div class="flex items-center gap-3">
        <input type="checkbox" bind:checked={filters.today} class="checkbox" />
        <label for=""> Show Today's Calls</label>
      </div>
    </div>

    <div class="items-center gap-3">
      <label class="flex-1" for=""> Calls Made on:</label>
      <input
        type="date"
        id="birthday"
        class="w-full border px-5 py-3 rounded-2xl"
        name="birthday"
        bind:value={filters.ondate}
      />
    </div>
    <h3 class="text-xl font-bold opacity-50 my-2">Filter by Calls</h3>
    <div class="flex gap-3 items-center flex-wrap">
      <div class="flex items-center gap-3">
        <input type="checkbox" bind:checked={filters.call1} class="checkbox" />
        <label for="">1 call</label>
      </div>
      <div class="flex items-center gap-3">
        <input type="checkbox" bind:checked={filters.call2} class="checkbox" />
        <label for="">2 calls</label>
      </div>
      <div class="flex items-center gap-3">
        <input type="checkbox" bind:checked={filters.call3} class="checkbox" />
        <label for="">3 calls</label>
      </div>
      <div class="flex items-center gap-3">
        <input type="checkbox" bind:checked={filters.call4} class="checkbox" />
        <label for="">4 calls</label>
      </div>
      <div class="flex items-center gap-3">
        <input type="checkbox" bind:checked={filters.call5} class="checkbox" />
        <label for="">5 calls</label>
      </div>
      <div class="flex items-center gap-3">
        <input
          type="checkbox"
          bind:checked={filters.greaterthan5}
          class="checkbox"
        />
        <label for="">More than 5 calls</label>
      </div>
    </div>
    <h3 class="text-xl font-bold opacity-50 my-2">Filter by Status</h3>
    <div class=" flex justify-between items-center">
      <div class="flex items-center gap-3">
        <input type="checkbox" bind:checked={filters.cold} class="checkbox" />
        <label for="">Cold</label>
      </div>
      <div class="flex items-center gap-3">
        <input type="checkbox" bind:checked={filters.hot} class="checkbox" />
        <label for="">Hot</label>
      </div>
      <div class="flex items-center gap-3">
        <input type="checkbox" bind:checked={filters.closed} class="checkbox" />
        <label for="">Closed</label>
      </div>
      <div class="flex items-center gap-3">
        <input
          type="checkbox"
          bind:checked={filters.awaiting}
          class="checkbox"
        />
        <label for="">Awaiting</label>
      </div>
    </div>

    <div class="modal-action">
      <label for="" on:click={applyFilter} class="btn">Apply</label>
      <label for="filtermodal-home" class="btn">Close</label>
    </div>
  </div>
</div>

<input type="checkbox" id="my-modal2" class="modal-toggle" />
<div class="modal">
  <div class="modal-box bg-white  ">
    {selectedStatusID}

    <div class="text-2xl font-semibold opacity-50">Remarks</div>
    {#if selectedStatusID}
      {#each selectedUserLeadData.find((item) => item.leadid === selectedStatusID).calls as call}
        <RemarksCard remark={call} />
      {/each}
    {/if}

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
