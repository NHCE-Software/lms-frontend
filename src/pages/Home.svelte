<script>
  // --------------------imports-------------------------------
  import Stories from "../components/Stories.svelte";
  import RemarksCard from "../components/RemarksCard.svelte";
  import Navbar from "../components/Navbar.svelte";
  import UserWorkTable from "../components/UserWorkTable.svelte";
  import { courses, noauth, status } from "../constants";
  import { gql } from "@apollo/client";
  import { mutation, query } from "svelte-apollo";
  import { onMount } from "svelte";

  onMount(async () => {
    await getUsers();
  });
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  let prnDt = "" + new Date().toLocaleTimeString("en-us", options);

  // --------------------State declaration-------------------------
  let loading = false;

  let contextData = {
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
      _id: "bro1",
      name: "yajat",
      email: "email",
      phone: "phone",
      city: "city2",
      status: "Hot",
      course: ["CIVIL", "MECH"],
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
      _id: "bro11",
      name: "123",
      email: "email",
      phone: "phone",
      city: "city2",
      status: "Cold",
      course: ["CSE"],
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
  console.log(contextData.users);
  let search = "";
  let filteredLeadData = selectedUserLeadData;
  let searchedLeads = filteredLeadData;
  let andMode = true;
  let filters = {
    today: false,
    ondate: "",
    course: [],
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

  // ------------------graphql----------------------------------

  let GETUSERS = gql`
    query UserMany {
      userMany {
        role
        email
        name
        _id
      }
    }
  `;
  let GETUSERS_QUERY = query(GETUSERS);

  async function getUsers() {
    try {
      let { error, data } = await GETUSERS_QUERY.result();
      if (data) {
        contextData.users = data.userMany.map((item) => {
          return {
            ...item,
          };
        });

        contextData.users = [...contextData.users];
      }
    } catch (error) {
      if (error && error.message === "You must be an admin") noauth();
    }
  }

  let GETLEADDATA = gql`
    query LeadMany($record: JSON) {
      getLeads(record: $record) {
        name
        loadedby
        email
        city
        phonenumber
        status
        source
        course
        calls {
          call
          remark
          updatedby
          followup
          _id
          updatedAt
          createdAt
        }
        createdByUser {
          name
          _id
        }
        _id
      }
    }
  `;

  let GETLEADDATA_QUERY;
  $: {
    GETLEADDATA_QUERY = query(GETLEADDATA, {
      variables: {
        record: {
          callerid: selectedStoryUID,
        },
      },
    });
  }
  async function getLeadData() {
    try {
      loading = true;
      let { error, data } = await GETLEADDATA_QUERY.result();
      console.log(selectedStoryUID);
      console.log("lead data", data);
      loading = false;
      if (data) {
        filteredLeadData = data.getLeads;
        selectedUserLeadData = data.getLeads;
      }
    } catch (error) {
      console.log(error);
      if (error && error.message === "You must be an admin") noauth();
    }

    //console.log(selectedUserLeadData, searchedLeads);
  }

  // ----------------------Reactive changes--------------------------
  $: {
    console.log(selectedStoryUID);
    // network call
  }
  $: {
    searchedLeads = filteredLeadData.filter((item) => {
      if (item.name != null)
        return item.name.toLowerCase().includes(search.toLowerCase());
      return;
    });
  }
  // -------------------------helper functions------------------------
  function applyFilter() {
    filteredLeadData = selectedUserLeadData.map((item) => {
      return {
        ...item,
        followup:
          item.calls && item.calls.length > 1
            ? item.calls[item.calls.length - 1].followup
            : undefined,
      };
    });
    console.log("this is filter", filteredLeadData);
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
      if (filters.status.length != 0) {
        allTrues.push(filters.status.includes(item.status));
      }

      if (filters.course.length != 0) {
        console.log(item.course, filters.course);
        allTrues.push(
          andMode
            ? item.course.every((course) => filters.course.includes(course))
            : item.course.some((course) => filters.course.includes(course))
        );
      }

      console.log(allTrues);
      return andMode
        ? allTrues.every((item) => item === true)
        : allTrues.some((item) => item === true);
    });
    filteredLeadData = [...filteredLeadData];
  }
  async function changeSelectedLeadData() {
    await getLeadData();
  }
</script>

<!-- ----------------------------------html---------------------------------------- -->

<input type="checkbox" id="assigned-modal" class="modal-toggle" />
<div class="modal" for="assigned-modal">
  <div class="modal-box bg-white max-w-6xl flex flex-col gap-5">
    <div class="flex gap-10">
      <div class="border w-full rounded-lg">
        <input
          bind:value={search}
          type="text"
          class="outline-none p-3 w-full"
          placeholder="Search"
        />
      </div>
      <label
        for="assigned-modal"
        class="bg-blue-600 black-black px-5 py-3 rounded-xl text-white"
        >Close</label
      >
    </div>

    <div class="h-full">
      {#if loading}
        <div>Loading</div>
      {:else}
        <UserWorkTable
          bind:selectedStatusID
          data={search.length === 0 ? filteredLeadData : searchedLeads}
        />
      {/if}
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
    {#if selectedStatusID}
      {#each filteredLeadData.find((item) => item._id === selectedStatusID).calls as call}
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
    <div class="text-3xl">Ahoy, Admin,</div>
    <div class="text-xl opacity-50">It's {prnDt}</div>

    <Stories users={contextData.users} bind:selectedStoryUID />
  </div>

  <div class="bg-white  m-2  p-5 rounded-xl shadow-xl ">
    {#if selectedStoryUID}
      <div class="text-center text-2xl mt-5 ">
        {contextData.users.find((item) => item._id === selectedStoryUID).name}
      </div>
      <div class="mt-10 opacity-50 mb-4">Work Status</div>
      <div class="grid grid-cols-2 gap-2 ">
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
        <label
          for="assigned-modal"
          on:click={changeSelectedLeadData}
          class="rounded-2xl flex-none flex  items-center justify-center p-5 w-fit border my-2 text-center bg-blue-300   text-blue-600   transition-all cursor-pointer hover:text-blue-600"
        >
          <div class="text-2xl ">View all calls</div>
        </label>
      </div>
    {:else}
      <div class="opacity-10 text-2xl font-bold">
        Select story to get started
      </div>
    {/if}
  </div>
</section>

<!-- ----------------------------------css---------------------------------------- -->
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
