<script>
  import RemarksCard from "../components/RemarksCard.svelte";
  import {
    availableColumns,
    courses,
    noauth,
    programs,
    sources,
    status,
  } from "../constants";
  import CallerLeadsTable from "../components/CallerLeadsTable.svelte";
  import Navbar from "../components/Navbar.svelte";
  import { push } from "svelte-spa-router";
  import { gql } from "@apollo/client";
  import { mutation } from "svelte-apollo";
  import { onMount } from "svelte";
  import papaparse from "papaparse";
  export let params = {};
  export let selectedLeadID = params.selectedLeadID || "";
  onMount(async () => {
    await getLeads();
  });
  // -------------------graphql-------------------------------
  let GETLEADS = gql`
    query GetLeads {
      getLeads {
        name
        loadedby
        loadedbyname
        email
        city
        phonenumber
        status
        program
        course
        source
        calls {
          call
          remark
          updatedby
          updatedbyname
          followup
          _id
          updatedAt
          createdAt
        }
        _id
        createdByUser {
          name
          _id
        }
        createdAt
      }
    }
  `;
  let GETLEADS_MUTATION = mutation(GETLEADS);
  async function getLeads() {
    try {
      loading = true;
      let { error, data } = await GETLEADS_MUTATION();
      if (data) {
        //console.log("data from server", data);
        contextData.leads = data.getLeads;
        contextData.leads = contextData.leads.map((item) => {
          if (item.calls.length > 0)
            return {
              ...item,
              followup: item.calls[item.calls.length - 1].followup,
              lastremark: item.calls[item.calls.length - 1].remark,
              callquantity: item.calls.length,
              createdAt: new Date(item.createdAt)
                .toJSON()
                .slice(0, 10)
                .split("-")
                .reverse()
                .join("/"),
            };
          else return item;
        });
        loading = false;
        //console.log("this is getLeads", contextData.leads);
      }
      if (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
      if (error && error.message === "You must be an admin") noauth();
    }
  }

  let ADDCALL = gql`
    mutation AddCall($record: JSON) {
      addCall(record: $record)
    }
  `;
  let ADDCALL_MUTATION = mutation(ADDCALL);
  async function addCall() {
    try {
      let { errors, data } = await ADDCALL_MUTATION({
        variables: {
          record: {
            remark: newCall.remark,
            followup: newCall.followup,
            leadid: selectedLeadID,
            status: selectedLeadData.status,
          },
        },
      });
      //console.log(data);
      if (errors) {
        swal("Error", "Something went wrong", "error");
        return console.log(errors);
      }
      if (data && data.addCall.message === "success") {
        newCall.followup = "";
        newCall.remark = "";
        swal("Done", "Added call remark to lead successfully", "success");
      } else {
        swal("Error", "Something went wrong", "error");
      }
      getLeads();
    } catch (error) {
      if (error && error.message === "You must be an admin") noauth();
    }
  }

  let EDITLEAD = gql`
    mutation Mutation(
      $record: UpdateOneLeadInput!
      $filter: FilterUpdateOneLeadInput
    ) {
      leadUpdateOne(record: $record, filter: $filter) {
        record {
          name
        }
      }
    }
  `;
  let EDITLEAD_MUTATION = mutation(EDITLEAD);
  async function editLead() {
    try {
      let { errors, data } = await EDITLEAD_MUTATION({
        variables: {
          record: {
            name: selectedLeadData.name,
            email: selectedLeadData.email,
            city: selectedLeadData.city,
            source: selectedLeadData.source,
            phonenumber: selectedLeadData.phonenumber,
            status: selectedLeadData.status,
            course: selectedLeadData.course,
            program: selectedLeadData.program,
          },
          filter: {
            _id: selectedLeadID,
          },
        },
      });
      if (errors) {
        swal("Error", "Something went wrong", "error");
        return console.log(errors);
      }
      if (data && data.leadUpdateOne.record.name === selectedLeadData.name) {
        swal("Done", "Lead updated successfully", "success");
      } else {
        swal("Error", "Something went wrong", "error");
      }
      getLeads();
    } catch (error) {
      if (error && error.message === "You must be an admin") noauth();
    }
  }
  // ----------------------------state declaration-----------------------------------------

  let selectedLeadData;
  let searchby = "name";
  let search = "";
  let loading = false;
  let filterapplied = false;
  let andMode = false; // andMode = true means AND mode, false means OR mode
  let filters = {
    today: false,
    course: [],
    status: [],
    ondate: "",
    call1: false,
    call2: false,
    call3: false,
    call4: false,
    call5: false,
    greaterthan5: false,
  };
  let contextData = {
    leads: [
      {
        _id: "bro1",
        name: "123",
        email: "email",
        phonenumber: "phone",
        city: "city2",
        status: "Cold",
        course: ["course"],
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
            followup: "Today",
            updatedby: "user",
          },
        ],
      },
      {
        _id: "bro12",
        name: "asdasd",
        email: "email",
        phonenumber: "phone",
        city: "city2",
        status: "Cold",
        course: ["course"],
        source: ["source1"],
        loadedby: ["loadby1"],
        calls: [
          {
            remark: "remark",
            date: "date",
            followup: "Toda2y",
            updatedby: "user",
          },
          {
            remark: "remark",
            date: "date",
            followup: "Toda2y",
            updatedby: "user",
          },
          {
            remark: "remark",
            date: "date",
            followup: "Toda2y",
            updatedby: "user",
          },
          {
            remark: "remark",
            date: "date",
            followup: "Toda2y",
            updatedby: "user",
          },
          {
            remark: "remark",
            date: "date",
            followup: "Toda2y",
            updatedby: "user",
          },
          {
            remark: "remark",
            date: "date",
            followup: "Toda2y",
            updatedby: "user",
          },
          {
            remark: "remark",
            date: "date",
            followup: "Toda2y",
            updatedby: "user",
          },
          {
            remark: "remark",
            date: "date",
            followup: "Today",
            updatedby: "user",
          },
        ],
      },
      {
        _id: "bro",
        name: "123",
        email: "email",
        phonenumber: "phone",
        city: "city",
        status: "Hot",
        course: ["course"],
        source: ["source1", "source2"],
        loadedby: ["loadby1", "loadby2"],
        calls: [
          {
            remark: "remark",
            date: "date",
            followup: "Today",
            updatedby: "user",
          },
          {
            remark: "remark",
            date: "date",
            followup: "Tomorrow",
            updatedby: "user",
          },
        ],
      },
    ],
  };

  let filteredLeads = contextData.leads;

  let searchedLeads = filteredLeads;
  let newCall = {
    remark: "",
    followup: "",
  };
  let selectedTableFormat = [
    "loadedbyname",
    "name",
    "email",
    "phonenumber",
    "city",
    "createdAt",
    "course",
    "status",
    "lastremark",
  ];
  let modals = {
    addremarksmodal: false,
    editLead: false,
    customizeview: false,
    filter: false,
    drawer: false,
  };

  // ----------------------------helper functions-----------------------------------------
  const isEqual = (...objects) =>
    objects.every((obj) => JSON.stringify(obj) === JSON.stringify(objects[0]));
  const isSameDate = (dateA, dateB) => {
    dateA.setHours(0, 0, 0, 0);
    dateB.setHours(0, 0, 0, 0);
    console.log(dateA.toISOString(), dateB.toISOString());
    return dateA.toISOString() === dateB.toISOString();
  };
  function applyFilter() {
    filteredLeads = contextData.leads.filter((item) => {
      let allTrues = [];
      let todayDate = new Date().toISOString().slice(0, 10);
      //console.log(todayDate);
      if (filters.today) allTrues.push(item.followup === todayDate);
      if (filters.ondate.length != 0) {
        let dateParts = item.createdAt.split("/");
        allTrues.push(
          isSameDate(
            new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]),
            new Date(filters.ondate)
          )
        );
        //console.log("dates");
      }
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
        allTrues.push(
          andMode
            ? item.course.every((course) => filters.course.includes(course))
            : item.course.some((course) => filters.course.includes(course))
        );
      }

      //console.log(allTrues);
      if (allTrues.length === 0) {
        return allTrues.every((item) => item === true);
      }
      return andMode
        ? allTrues.every((item) => item === true)
        : allTrues.some((item) => item === true);
    });
    filteredLeads = [...filteredLeads];
  }
  function makeTextFile(text) {
    let data = new Blob([text], { type: "text/plain" });

    let textFile = URL.createObjectURL(data);
    return textFile;
  }
  // ----------------------------reactive changes-----------------------------------------

  $: {
    filteredLeads = contextData.leads;
  }
  $: {
    selectedLeadData = contextData.leads.find(
      (item) => item._id === selectedLeadID
    );
    console.log("this is selectedLeadData", selectedLeadData);
  }

  $: {
    try {
      searchedLeads = filteredLeads.filter((item) => {
        if (item[searchby]) {
          return item[searchby]
            .trim()
            .toLowerCase()
            .includes(search.toLowerCase().trim());
        }
        //console.log(search, item[searchby].includes(search.toLowerCase()));
        //console.log(search, "==", item[searchby], search === item[searchby]);
        //console.log(item[searchby].trim());
      });
    } catch (error) {
      console.log(error);
    }
  }

  $: {
    let checkfilters = {
      today: false,
      course: [],
      status: [],
      ondate: "",
      call1: false,
      call2: false,
      call3: false,
      call4: false,
      call5: false,
      greaterthan5: false,
    };
    if (isEqual(filters, checkfilters)) {
      filterapplied = false;
    } else {
      filterapplied = true;
    }
  }
</script>

<svelte:window
  on:keydown={(e) => {
    //console.log(e.key);
    if (e.key === "Escape") {
      modals = {
        addremarksmodal: false,
        editLead: false,
        customizeview: false,
        filter: false,
        drawer: false,
      };
    }
  }}
/>

<input
  type="checkbox"
  bind:checked={modals.editLead}
  id="editmodal"
  class="modal-toggle"
/>
<div class="modal">
  {#if selectedLeadData}
    <div class="modal-box bg-white max-w-5xl">
      <h3 class="font-bold text-lg">Edit Leads</h3>
      <form class="gap-2 flex flex-col my-4">
        <div class="flex gap-2 w-full">
          <div class="flex-1">
            <label for="" class="tracking-wide opacity-50">Name</label>
            <input
              bind:value={selectedLeadData.name}
              type="text"
              class="w-full p-2  border rounded-lg"
              placeholder="Name"
              name=""
              id=""
            />
          </div>
          <div>
            <label for="" class="tracking-wide opacity-50">Email</label>
            <input
              bind:value={selectedLeadData.email}
              type="text"
              class="w-full p-2  border rounded-lg"
              placeholder="Email"
              name=""
              id=""
            />
          </div>
        </div>
        <label for="" class="tracking-wide opacity-50">City</label>
        <input
          bind:value={selectedLeadData.city}
          type="text"
          class="w-full p-2  border rounded-lg"
          placeholder="City"
          name=""
          id=""
        />
        <label for="" class="tracking-wide opacity-50">Phone</label>
        <input
          bind:value={selectedLeadData.phonenumber}
          type="text"
          class="w-full p-2  border rounded-lg"
          placeholder="Phone"
          name=""
          id=""
        />
        <label for="" class="tracking-wide opacity-50">Program</label>
        <div class="flex gap-3 flex-wrap">
          <select
            bind:value={selectedLeadData.program}
            id="course"
            class="select select-bordered bg-white text-black w-full"
          >
            <option disabled>Pick Status</option>
            {#each programs as s}
              <option selected={selectedLeadData.program} value={s}>{s}</option>
            {/each}
          </select>
        </div>
        <label for="" class="tracking-wide opacity-50">Course</label>
        <div class="gap-3 grid grid-cols-3 ">
          {#each courses as course}
            <div class="flex item-center gap-3">
              <input
                checked={selectedLeadData.course.includes(course)}
                type="checkbox"
                on:change={(e) => {
                  if (e.target.checked) {
                    selectedLeadData.course.push(course);
                    selectedLeadData.course = [...selectedLeadData.course];
                  } else {
                    selectedLeadData.course = selectedLeadData.course.filter(
                      (item) => item !== course
                    );
                    selectedLeadData.course = [...selectedLeadData.course];
                  }
                  console.log(selectedLeadData.course);
                }}
                class="checkbox"
              />
              <div>{course}</div>
            </div>
          {/each}
        </div>

        <label for="" class="tracking-wide opacity-50">Source</label>
        <div class="gap-3 grid grid-cols-3 ">
          {#each sources as source}
            <div class="flex item-center gap-3">
              <input
                checked={selectedLeadData.source.includes(source)}
                type="checkbox"
                on:change={(e) => {
                  if (e.target.checked) {
                    selectedLeadData.source.push(source);
                    selectedLeadData.source = [...selectedLeadData.source];
                  } else {
                    selectedLeadData.source = selectedLeadData.source.filter(
                      (item) => item !== source
                    );
                    selectedLeadData.source = [...selectedLeadData.source];
                  }
                }}
                class="checkbox"
              />
              <div>{source}</div>
            </div>
          {/each}
        </div>

        <label for="" class="tracking-wide  opacity-50">Status</label>
        <select
          bind:value={selectedLeadData.status}
          id="course"
          class="select select-bordered bg-white text-black w-full"
        >
          <option disabled>Pick Status</option>
          {#each status as s}
            <option selected={selectedLeadData.status} value={s}>{s}</option>
          {/each}
        </select>
      </form>

      <div class="modal-action">
        <label on:click={editLead} for="" class="btn">Save</label>
        <label for="editmodal" class="btn">Close</label>
      </div>
    </div>
  {/if}
</div>

<input
  type="checkbox"
  bind:checked={modals.customizeview}
  id="customizeview"
  class="modal-toggle"
/>
<div class="modal">
  <div class="modal-box bg-white">
    <h3 class="font-bold text-lg">Customize Views</h3>
    <div class="my-3">Choose all the columns you want to see</div>
    <div class="grid grid-cols-3 gap-5">
      {#each availableColumns as c}
        <div class="flex items-center gap-2">
          <input
            checked={selectedTableFormat.includes(c)}
            on:change={(e) => {
              if (e.target.checked) {
                selectedTableFormat.push(c);
                selectedTableFormat = [...selectedTableFormat];
              } else {
                selectedTableFormat = selectedTableFormat.filter(
                  (item) => item !== c
                );
                selectedTableFormat = [...selectedTableFormat];
              }
            }}
            class="checkbox"
            type="checkbox"
          />
          <div>{c}</div>
        </div>
      {/each}
    </div>

    <div class="modal-action">
      <label for="customizeview" class="btn">Close</label>
    </div>
  </div>
</div>

<input
  type="checkbox"
  id="filtermodal"
  bind:checked={modals.filter}
  class="modal-toggle"
/>
<label for="filtermodal" class="modal">
  <div class="modal-box bg-white max-w-3xl flex flex-col  gap-2">
    <div class="flex items-center justify-between">
      <h3 class="text-2xl font-bold opacity-20 my-2">Advanced Filtering</h3>
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
    </div>
    <div class="flex items-center gap-3">
      <input type="checkbox" bind:checked={filters.today} class="checkbox" />
      <label for=""> Show Today's Follow Up Calls</label>
    </div>

    <div class="items-center gap-3">
      <label class="flex-1" for=""> Calls Created on:</label>
      <input
        type="date"
        class="w-full border px-5 py-3 rounded-2xl"
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
    <div class="grid grid-cols-3 gap-3">
      {#each status as s}
        <div class="flex items-center gap-3">
          <input
            type="checkbox"
            on:change={(e) => {
              if (e.target.checked) {
                filters.status.push(s);
                filters = { ...filters };
              } else {
                filters.status = filters.status.filter((item) => item !== s);
                filters = { ...filters };
              }
            }}
            class="checkbox"
          />
          <label for="">{s}</label>
        </div>
      {/each}
    </div>
    <div class="flex flex-col">
      <div class="text-xl font-bold opacity-50 my-2">Filter by Course</div>
      <div class="grid grid-cols-4 gap-3">
        {#each courses as c}
          <div class="flex items-center gap-3">
            <input
              type="checkbox"
              on:change={(e) => {
                if (e.target.checked) filters.course.push(c);
                else
                  filters.course = filters.course.filter((item) => item !== c);
              }}
              class="checkbox"
            />
            <label for="">{c}</label>
          </div>
        {/each}
      </div>
    </div>

    <div class="modal-action">
      <label for="" on:click={applyFilter} class="btn">Apply</label>
      <label for="filtermodal" class="btn">Close</label>
    </div>
  </div></label
>

<input
  type="checkbox"
  bind:checked={modals.addremarksmodal}
  id="addremarksmodal"
  class="modal-toggle"
/>
<label for="addremarksmodal" class="modal">
  <div class="modal-box bg-white">
    <h3 class="font-bold text-lg">
      Add Call for {selectedLeadData ? selectedLeadData["name"] : "-"}
    </h3>
    <form action="" class="gap-2 flex flex-col my-4">
      <label for="">Remarks</label>
      <textarea
        bind:value={newCall.remark}
        name=""
        placeholder="Start typing here..."
        class="border rounded-lg p-3"
        id=""
        cols="30"
        rows="10"
      />
      <label for="">Follow Up Call</label>
      <input
        type="date"
        bind:value={newCall.followup}
        class="border rounded-xl p-3"
        name=""
        id=""
      />
      <label for="" class="tracking-wide  opacity-50">Status</label>
      {#if selectedLeadData}
        <select
          bind:value={selectedLeadData.status}
          id="course"
          class="select select-bordered bg-white text-black w-full"
        >
          <option disabled>Pick Status</option>
          {#each status as s}
            <option selected={selectedLeadData.status} value={s}>{s}</option>
          {/each}
        </select>
      {/if}
    </form>
    <div class="modal-action">
      <div on:click={addCall} class="btn">Add Call</div>
      <label for="addremarksmodal" class="btn">Close</label>
    </div>
  </div>
</label>

<div class="drawer">
  <input id="my-drawer2" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content">
    <!-- Page content here -->
    <div class="drawer drawer-end">
      <input
        id="my-drawer"
        bind:checked={modals.drawer}
        type="checkbox"
        class="drawer-toggle"
      />
      <div class="drawer-content">
        <section class="grid min-h-screen h-full grid-cols-5 p-5">
          <div class="col-span-5 m-10">
            <div class="flex justify-between">
              <div>
                <div class="text-3xl flex items-center  gap-5">
                  <label for="my-drawer2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4 6h16M4 12h8m-8 6h16"
                      />
                    </svg>
                  </label>
                  <div>
                    <div>Lead Details</div>
                    <div class="text-xl opacity-50">
                      Add, Edit and Remove Leads
                    </div>
                  </div>
                </div>
              </div>
              <div class="gap-3 flex">
                <label
                  for=""
                  on:click={() => {
                    console.log(contextData);
                    let csvdata = contextData.leads.map((item) => {
                      return {
                        ...item,
                        __typename: undefined,
                        _id: undefined,
                        calls: item.calls
                          .map((call, index) => {
                            return `(Call ${index + 1}::${
                              call.updatedbyname
                            }::${new Date(call.createdAt)
                              .toJSON()
                              .slice(0, 10)}) ${call.remark}`;
                          })
                          .join("\n"),
                      };
                    });

                    let csv = papaparse.unparse(csvdata, {
                      header: true,
                      newline: "\r\n",
                    });

                    console.log(makeTextFile(csv));
                    let download = document.createElement("a");
                    download.setAttribute("href", makeTextFile(csv));
                    download.setAttribute("download", "test.csv");
                    document.body.appendChild(download);
                    download.click();
                  }}
                  class="px-4 rounded-full h-fit cursor-pointer hover:bg-blue-200 transition-all  w-fit py-2 font-semibold bg-blue-100 text-blue-500"
                >
                  Export to CSV
                </label>
                <label
                  for="customizeview"
                  class="px-4 rounded-full h-fit cursor-pointer hover:bg-blue-200 transition-all  w-fit py-2 font-semibold bg-blue-100 text-blue-500"
                >
                  Customize view
                </label>
                <div
                  on:click={() => push("/add-lead")}
                  class="px-4 rounded-full h-fit cursor-pointer hover:bg-blue-200 transition-all  w-fit py-2 font-semibold bg-blue-100 text-blue-500"
                >
                  Add Lead
                </div>
                <label
                  for="filtermodal"
                  class={`px-4 rounded-full h-fit cursor-pointer  transition-all  w-fit py-2 font-semibold ${
                    filterapplied
                      ? "hover:bg-blue-700 bg-blue-600 text-white"
                      : "hover:bg-blue-200 bg-blue-100 text-blue-500"
                  }   `}
                >
                  Filter
                </label>
              </div>
            </div>
            <div class="mt-5 flex  justify-between items-center">
              <input
                bind:value={search}
                type="text"
                placeholder="🔭 Search"
                class="p-3 rounded-xl border w-2/3"
              />
              <form
                on:change|preventDefault={(e) => {
                  console.log(e.target.value);
                  searchby = e.target.value;
                }}
                class="flex-wrap gap-3 flex"
              >
                <input
                  type="radio"
                  name="searchby"
                  class="radio"
                  bind:group={searchby}
                  value={"name"}
                />
                Name
                <input
                  type="radio"
                  class="radio"
                  name="searchby"
                  bind:group={searchby}
                  value={"email"}
                />
                Email
                <input
                  type="radio"
                  class="radio"
                  name="searchby"
                  bind:group={searchby}
                  value={"phonenumber"}
                />
                Phone
              </form>
            </div>
            <div class=" mt-5">
              {#if loading}
                <div>Loading</div>
              {:else}
                <CallerLeadsTable
                  bind:selectedLeadID
                  {selectedTableFormat}
                  data={searchedLeads.length === 0
                    ? filteredLeads
                    : searchedLeads}
                />
              {/if}
            </div>
          </div>
        </section>
      </div>
      <div class="drawer-side">
        <label for="my-drawer" class="drawer-overlay" />
        <div
          class="bg-white rounded-xl  shadow-xl w-100 grid grid-cols-2 gap-5  p-5  "
        >
          {#if selectedLeadData}
            <div class=" flex mt-5 flex-col border-r-4 rounded-2xl px-2 ">
              <div class="text-center text-2xl">
                {selectedLeadData.name}
              </div>
              <div class="flex flex-wrap justify-center gap-5 mt-5">
                <div
                  class="text-center opacity-50 flex items-center gap-3 justify-center"
                >
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>{selectedLeadData.city}</div>
                </div>
                <div
                  class="text-center opacity-50 flex items-center gap-3 justify-center"
                >
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>{selectedLeadData.phonenumber}</div>
                </div>
                <div
                  class="text-center opacity-50 flex items-center gap-3 justify-center"
                >
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </div>
                  <div>{selectedLeadData.email}</div>
                </div>
              </div>
              <div class="mt-10">
                <div class="text-2xl font-semibold opacity-50">
                  Interested Courses
                </div>
                <div class="flex gap-3 overflow-auto">
                  {#each selectedLeadData.course as c}
                    <div class="p-3 border rounded-xl flex-none">{c}</div>
                  {/each}
                </div>
              </div>
              <div class="mt-5">
                <div class="text-2xl font-semibold opacity-50">Program</div>
                <div
                  class="rounded-2xl p-3 font-bold flex items-center bg-blue-100 text-blue-500 gap-3 mt-3 justify-center"
                >
                  {selectedLeadData.program}
                </div>
              </div>
              <div class="mt-5">
                <div class="text-2xl font-semibold opacity-50">Sources</div>
                <div class="flex gap-3 overflow-auto">
                  {#each selectedLeadData.source as source}
                    <div class="p-3 border rounded-xl flex-none">{source}</div>
                  {/each}
                </div>
              </div>
              <div class="mt-5">
                <div class="text-2xl  font-bold opacity-50">Status</div>
                <div
                  class="rounded-2xl p-3 flex items-center bg-blue-100 text-blue-500 gap-3 mt-3 justify-center"
                >
                  {selectedLeadData.status}
                </div>
              </div>

              <div class="flex gap-3 justify-center mt-auto">
                <div class="my-10">
                  <label
                    for="addremarksmodal"
                    class="border rounded-lg p-3 bg-blue-100 text-blue-500 font-semibold"
                  >
                    Add Call
                  </label>
                  <label
                    for="editmodal"
                    class="border rounded-lg p-3 bg-blue-100 text-blue-500 font-semibold"
                  >
                    Edit Leads Info
                  </label>
                </div>
              </div>
            </div>
            <div class="flex flex-col">
              <div class="text-2xl mt-5 font-semibold opacity-50">Calls</div>
              <div class=" flex-1  flex flex-col overflow-auto">
                <div class=" flex flex-col min-h-min p-3 gap-3 ">
                  {#each selectedLeadData.calls as call}
                    <RemarksCard remark={call} />
                  {/each}
                </div>
              </div>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
  <div class="drawer-side">
    <label for="my-drawer2" class="drawer-overlay" />
    <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
      <!-- Sidebar content here -->
      <Navbar />
    </ul>
  </div>
</div>

<style>
  .w-100 {
    width: 700px;
  }
  ::-webkit-scrollbar {
    height: 8px;
    width: 8px;
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
