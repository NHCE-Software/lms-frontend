<script>
  import { gql } from "@apollo/client";
  import { mutation } from "svelte-apollo";
  import { courses, noauth, programs, sources, status } from "../constants";
  import Grid from "gridjs-svelte";
  import { h } from "gridjs";

  let loading = false;
  let selectedLeadData;
  let selectedLeadID;
  let newCall = {
    remark: "",
    followup: "",
  };
  let modals = {
    addremarksmodal: false,
    editLead: false,
    customizeview: false,
    filter: false,
    drawer: false,
  };
  let top;
  function setYPosition() {
    top = window.pageYOffset || document.documentElement.scrollTop;
    console.log(top);
  }

  let data = [];

  let GETLEADS = gql`
    query GetLeads {
      getLeads {
        name
        loadedby
        loadedbyname
        email
        city
        state
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
      let res = await GETLEADS_MUTATION();
      if (res.data) {
        //console.log("data from server", data);
        let stageData = res.data.getLeads;
        stageData = stageData.map((item) => {
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
          else
            return {
              ...item,
              createdAt: new Date(item.createdAt)
                .toJSON()
                .slice(0, 10)
                .split("-")
                .reverse()
                .join("/"),
            };
        });
        data = stageData.map((item) => {
          return {
            id: item._id,
            source: item.source.filter((item) => {
              if (item) return item;
            }),
            name: item.name,
            email: item.email,
            phonenumber: item.phonenumber,
            city: item.city,
            state: item.state,
            status: item.status,
            program: item.program,
            course: item.course,
            lastremark: item.lastremark,
            createdAt: item.createdAt,
          };
        });
        loading = false;
        return data;
      }
      if (res.errors) {
        console.log(res.errors);
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
            calladded: newCall.remark === "" ? false : true,
            followup: newCall.followup,
            leadid: selectedLeadID,
            status: selectedLeadData.status,
            name: selectedLeadData.name,
            email: selectedLeadData.email,
            city: selectedLeadData.city,
            source: selectedLeadData.source,
            phonenumber: selectedLeadData.phonenumber,
            course: selectedLeadData.course,
            program: selectedLeadData.program,
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
        swal("Done", "Added call remark to lead successfully", "success", {
          buttons: {
            ok: {
              text: "OK",
              value: "ok",
            },
          },
        }).then((val) => {
          //applyFilter("keeppage");
        });
      } else {
        swal("Error", "Something went wrong", "error");
      }
      getLeads();
    } catch (error) {
      if (error && error.message === "You must be an admin") noauth();
    }
  }
  $: {
    console.log(selectedLeadID);
    selectedLeadData = data.find((item) => item.id === selectedLeadID);
  }
</script>

<input
  type="checkbox"
  bind:checked={modals.editLead}
  id="modalz"
  class="modal-toggle"
/>
<div class="modal">
  <div class="modal-box bg-white max-w-7xl relative">
    <label
      on:click={() => {
        console.log(top);
      }}
      for="modalz"
      class="btn btn-sm btn-circle absolute right-2 top-2">✕</label
    >
    <div class="grid grid-cols-2 gap-10">
      <div>
        {#if selectedLeadData}
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
                  <option selected={selectedLeadData.program} value={s}
                    >{s}</option
                  >
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
                        selectedLeadData.course =
                          selectedLeadData.course.filter(
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
                        selectedLeadData.source =
                          selectedLeadData.source.filter(
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
                <option selected={selectedLeadData.status} value={s}>{s}</option
                >
              {/each}
            </select>
          </form>
        {/if}
      </div>
      <div>
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
        </form>
      </div>
    </div>
    <div class="modal-action">
      <label for="modalz" on:click={addCall} class="btn">Save Changes</label>
    </div>
  </div>
</div>

<!-- do not remove , scroll hold work because of this. No clear explanation why -->
<div
  class=" "
  on:click={() => {
    window.scrollTo(0, top);
  }}
>
  brn
</div>

<section class="overflow-auto w-full p-10 h-full min-h-screen">
  <div class="overflow-auto w-full">
    <Grid
      data={() => {
        return new Promise((resolve) => {
          let d = getLeads();
          resolve(d);
        });
      }}
      sort={true}
      search={{ enabled: true }}
      resizable={true}
      columns={[
        { name: "id", hidden: true },
        { name: "source", hidden: true },
        { name: "name", title: "Name" },
        { name: "email", title: "Email" },
        { name: "phonenumber", title: "Phone Number" },
        { name: "city", title: "City" },
        { name: "state", title: "State" },
        { name: "status", title: "Status" },
        { name: "program", title: "Program" },
        {
          name: "course",
          title: "Course",
          formatter: (cell) => `${cell.join(", ")}`,
        },
        { name: "lastremark", title: "Last Remark" },
        { name: "createdAt", title: "Created At" },
        {
          name: "Actions",
          formatter: (cell, row) => {
            return h(
              "button",
              {
                className:
                  "py-2 mb-4 px-4 border rounded-md text-white bg-blue-600",
                onClick: () => {
                  {
                    modals.editLead = true;
                    setYPosition();
                    selectedLeadID = row.cells[0].data;
                  }
                },
              },
              "Edit"
            );
          },
        },
      ]}
      pagination={{
        enabled: true,
        limit: 30,
        summary: true,
      }}
    />
  </div>
</section>
