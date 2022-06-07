<script>
  import { pop, push, replace } from "svelte-spa-router";

  import Navbar from "../components/Navbar.svelte";
  import { status, courses, references, sources, programs } from "../constants";
  import { mutation, query } from "svelte-apollo";
  import { gql } from "@apollo/client";
  import swal from "sweetalert";

  let userExists = false;
  let loading = false;
  // modify userExists after check call from modal

  // -------------------------------STATE-------------------------------
  let leadName = "";
  let city = "";
  let address = "";
  let pphno = "";
  let sphno = "";
  let email = "";
  let source = "";
  let state = "";
  let category = "";
  let leadStatus = "Not Contacted";
  let remarks = "";
  let followup = "";
  let nameofboard = "";
  let regnum12 = "";
  let program = "";

  let selectedCourse = [];
  let selectedReferences = [];

  // ----------------------------------helper functions---------------------
  let INSERTLEAD = gql`
    mutation AddOneLead($record: JSON) {
      addOneLead(record: $record)
    }
  `;
  let INSERTLEAD_MUTATION = mutation(INSERTLEAD);
  async function insertLead() {
    loading = true;
    try {
      const { error, data } = await INSERTLEAD_MUTATION({
        variables: {
          record: {
            name: leadName,
            email,
            program,
            city,
            state,
            source,
            phonenumber: [pphno],
            status: leadStatus,
            course: selectedCourse,
            admcateg: category,
            address,
            reference: selectedReferences,
            nameofboard,
            regnum12,
            remark: remarks,
            followup,
          },
        },
      });
      loading = false;
      if (error) {
        console.log(error);
        swal("Error", "Something went wrong", "error");
      }
      if (data.addOneLead.message === "success") {
        swal("Success", "Added Successfully", "success");
        replace("/lead-details/" + data.addOneLead.id);
      } else {
        swal("Error", "Something went wrong", "error");
      }
    } catch (error) {
      console.log(error);
      swal("Error", "Something went wrong", "error");
    }
  }
</script>

<!-- 
<input
  type="checkbox"
  checked={userExists}
  id="search-user-modal"
  class="modal-toggle"
/>
<div class="modal">
  <div class="modal-box bg-white shadow-md max-w-6xl ">
    <div class="text-2xl opacity-50 font-semibold">
      Check if User Already Exists
    </div>
    <form action="" class="my-5 ">
      <div class="flex gap-3 w-full ">
        <div class="w-full">
          <label for="">Email</label>
          <input
            type="text"
            placeholder="Type here"
            class="input w-full input-bordered bg-white "
          />
        </div>
        <div class="w-full">
          <label for="">Phone Number</label>
          <input
            type="text"
            placeholder="Type here"
            class="input w-full input-bordered bg-white "
            required
          />
        </div>
      </div>
      <div class="flex justify-between items-center">
        <div>
          <button class="btn mt-3" on:click={() => pop()}>Go Back</button>
          <button type="submit" class="btn mt-3">Check user</button>
        </div>
        <div
          on:click={() => {
            push("/lead-details/" + "bro");
          }}
          class="cursor-pointer px-3 py-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-all"
        >
          User Exists! Go to user
        </div>
      </div>
    </form>
  </div>
</div> -->

<section class="grid min-h-screen p-5 h-full grid-cols-5">
  <Navbar />
  <div class="col-span-4 m-20 mt-10">
    <div class="text-2xl  font-semibold">Add Lead</div>
    <div class=" opacity-50 ">Load Single Lead</div>
    <div class="mt-5">
      <form
        on:submit|preventDefault={insertLead}
        class="form-control flex flex-col w-full"
      >
        <div class="divider">Personal Information</div>
        <label for="name" class="label">
          <span class="label-text">Lead Name</span>
        </label>
        <input
          bind:value={leadName}
          id="name"
          type="text"
          placeholder="Type here"
          class="input input-bordered  w-full bg-white shadow-md"
          required
        />
        <label for="course" class="label">
          <span class="label-text">Course Interested</span>
        </label>
        <div class="gap-3 grid grid-cols-3">
          {#each courses as course}
            <div class="flex items-center gap-2">
              <input
                type="checkbox"
                on:change={(e) => {
                  if (e.target.checked) {
                    selectedCourse.push(course);
                    selectedCourse = [...selectedCourse];
                  } else {
                    selectedCourse = selectedCourse.filter(
                      (item) => item !== course
                    );
                    selectedCourse = [...selectedCourse];
                  }
                }}
                class="checkbox"
              />
              <div>{course}</div>
            </div>
          {/each}
        </div>
        <label for="program" class="label">
          <span class="label-text">Program</span>
        </label>
        <select
          bind:value={program}
          id="source"
          class="select w-full bg-white shadow-md "
        >
          <option disabled selected>Pick Program</option>
          {#each programs as s}
            <option value={s}>{s}</option>
          {/each}
        </select>

        <label for="city" class="label">
          <span class="label-text">City</span>
        </label>
        <input
          id="city"
          bind:value={city}
          type="text"
          placeholder="Type here"
          class="input input-bordered w-full bg-white shadow-md "
        />
        <label for="city" class="label">
          <span class="label-text">State</span>
        </label>
        <input
          id="state"
          bind:value={state}
          type="text"
          placeholder="Type here"
          class="input input-bordered w-full bg-white shadow-md "
        />
        <label for="address" class="label">
          <span class="label-text">Address</span>
        </label>
        <textarea
          id="address"
          bind:value={address}
          type="text"
          placeholder="Type here"
          class="textarea input-bordered w-full  bg-white shadow-md "
        />
        <label for="nob" class="label">
          <span class="label-text">Name of Board</span>
        </label>
        <input
          id="nob"
          bind:value={nameofboard}
          type="text"
          placeholder="Type here"
          class="input input-bordered w-full bg-white shadow-md "
        />
        <label for="regnob" class="label">
          <span class="label-text">Registration number for 12th board</span>
        </label>
        <input
          id="regnob"
          bind:value={regnum12}
          type="text"
          placeholder="Type here"
          class="input input-bordered w-full bg-white shadow-md "
        />
        <div class="divider">Contact Information</div>
        <label for="pphno" class="label">
          <span class="label-text">Primary Phone Number</span>
        </label>
        <input
          bind:value={pphno}
          id="pphno"
          type="text"
          required
          placeholder="Type here"
          class="input input-bordered w-full bg-white shadow-md"
        />
        <label for="sphno" class="label">
          <span class="label-text">Secondary Phone Number</span>
        </label>

        <input
          id="sphno"
          type="text"
          bind:value={sphno}
          placeholder="Type here"
          class="input input-bordered w-full bg-white shadow-md"
        />
        <label for="email" class="label">
          <span class="label-text">Email</span>
        </label>
        <input
          bind:value={email}
          id="email"
          type="text"
          placeholder="Type here"
          class="input input-bordered w-full bg-white shadow-md"
        />
        <div class="divider">References Information</div>
        <label for="refs" class="label">
          <span class="label-text"
            >How did the lead come to know about NHCE?</span
          >
        </label>
        <div class="gap-5 grid grid-cols-3">
          {#each references as ref}
            <div class="flex gap-2 items-center">
              <input
                type="checkbox"
                on:change={(e) => {
                  if (e.target.checked) {
                    selectedReferences.push(ref);
                    selectedReferences = [...selectedReferences];
                  } else {
                    selectedReferences = selectedReferences.filter(
                      (item) => item !== ref
                    );
                    selectedReferences = [...selectedReferences];
                  }
                  console.log(selectedReferences);
                }}
                class="checkbox"
              />
              <div>
                {ref}
              </div>
            </div>
          {/each}
        </div>

        <div class="divider">Admission Information</div>

        <label for="status" class="label">
          <span class="label-text">Admission Category</span>
        </label>
        <select
          id="category"
          class="select input-bordered w-full bg-white shadow-md"
          bind:value={category}
        >
          <option value="">Select Category</option>
          <option value="CET">CET</option>
          <option value="MANAGEMENT">MANAGEMENT</option>
          <option value="LATERAL ENTRY">LATERAL ENTRY</option>
        </select>

        <label for="source" class="label">
          <span class="label-text">Source</span>
        </label>
        <select
          bind:value={source}
          id="source"
          class="select w-full bg-white shadow-md "
        >
          <option disabled selected>Pick Source</option>
          {#each sources as s}
            <option value={s}>{s}</option>
          {/each}
        </select>

        <label for="source" class="label">
          <span class="label-text">Status</span>
        </label>
        <select
          bind:value={leadStatus}
          id="status"
          class="select w-full bg-white shadow-md "
        >
          <option disabled selected>Pick status</option>
          {#each status as s}
            <option value={s}>{s}</option>
          {/each}
        </select>
        <label for="callrem" class="label">
          <span class="label-text">Remarks</span>
        </label>
        <textarea
          bind:value={remarks}
          id="callrem"
          type="text"
          placeholder="Type here"
          class="w-full p-2 textarea bg-white shadow-md"
        />
        <label for="callrem" class="label">
          <span class="label-text">Follow up Date</span>
        </label>
        <input
          bind:value={followup}
          type="date"
          class="border rounded-xl p-3"
          name=""
          id=""
        />
        {#if loading}
          <div class="btn mt-5">
            <div class="animate-spin">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 235.319 235.319"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                enable-background="new 0 0 235.319 235.319"
              >
                <g>
                  <path
                    d="m201.094,29.997c2.649-0.623 4.623-2.996 4.623-5.835v-18.162c0-3.313-2.687-6-6-6h-164.114c-3.313,0-6,2.687-6,6v18.163c0,2.839 1.974,5.212 4.623,5.835 1.812,32.314 18.594,61.928 45.682,80.076l11.324,7.586-11.324,7.586c-27.089,18.147-43.871,47.762-45.682,80.076-2.649,0.623-4.623,2.996-4.623,5.835v18.163c0,3.313 2.687,6 6,6h164.114c3.313,0 6-2.687 6-6v-18.163c0-2.839-1.974-5.212-4.623-5.835-1.812-32.314-18.594-61.928-45.683-80.076l-11.324-7.586 11.324-7.586c27.089-18.148 43.871-47.763 45.683-80.077zm-159.491-17.997h152.114v6.163h-152.114v-6.163zm152.114,211.319h-152.114v-6.163h152.114v6.163zm-63.749-110.644c-1.663,1.114-2.661,2.983-2.661,4.985s0.998,3.871 2.661,4.985l18.765,12.571c23.71,15.883 38.49,41.705 40.333,69.941h-142.812c1.843-28.235 16.623-54.057 40.333-69.941l18.765-12.571c1.663-1.114 2.661-2.983 2.661-4.985s-0.998-3.871-2.661-4.985l-18.765-12.571c-23.71-15.884-38.49-41.706-40.333-69.941h142.812c-1.843,28.236-16.623,54.057-40.333,69.941l-18.765,12.571z"
                  />
                  <path
                    d="m133.307,82.66h-31.295c-2.487,0-4.717,1.535-5.605,3.858-0.888,2.324-0.25,4.955 1.604,6.613l15.647,14c1.139,1.019 2.57,1.528 4,1.528s2.862-0.509 4-1.528l15.647-14c1.854-1.659 2.492-4.29 1.604-6.613-0.885-2.323-3.115-3.858-5.602-3.858z"
                  />
                  <path
                    d="m117.414,140.581l-15.218,9.775c-13.306,8.914-21.292,23.876-21.292,39.892h76.511c0-16.016-7.986-30.978-21.292-39.892l-15.218-9.775c-1.074-0.644-2.416-0.644-3.491,0z"
                  />
                </g>
              </svg>
            </div>
            loading
          </div>
        {:else}
          <button type="submit" class="btn mt-5">Submit</button>
        {/if}
      </form>
    </div>
  </div>

  <!-- <div class="bg-white shadow-md  m-2 flex flex-col p-5 rounded-xl shadow-xl ">
    <div class="text-2xl opacity-50 font-semibold">Share form</div>
    <div class="opacity-50">Automated Lead Entry</div>

    <div class="my-10 flex flex-col gap-7 ">
      <div>
        <div>1. Ask the lead to visit</div>
        <div class="p-3 bg-slate-100 text-center font-mono rounded-xl mt-2">
          http://randome.com/fill-form
        </div>
      </div>
      <div>
        <div>2. Give them this code to fill this form automatically</div>
        <div class="my-4">Shareable Code</div>
        <div class="flex gap-4 justify-between ">
          <div
            class="bg-slate-100 p-3 w-full text-center font-semibold text-2xl rounded-2xl "
          >
            1
          </div>
          <div
            class="bg-slate-100 p-3 w-full text-center font-semibold text-2xl rounded-2xl "
          >
            1
          </div>
          <div
            class="bg-slate-100 p-3 w-full text-center font-semibold text-2xl rounded-2xl "
          >
            1
          </div>
          <div
            class="bg-slate-100 p-3 w-full text-center font-semibold text-2xl rounded-2xl "
          >
            1
          </div>
        </div>
      </div>
    </div>

    <div class="text-2xl text-center my-auto opacity-50">
      Connection Waiting...
    </div>
    <div class=" text-center flex items-center justify-center gap-3 mt-auto">
      <div
        class="font-semibold text-blue-600 bg-blue-100 p-3 px-5 rounded-full"
      >
        Refresh
      </div>
      <div class="font-semibold text-red-600 bg-red-100 p-3 px-5 rounded-full">
        Close Connection
      </div>
    </div>
  </div> -->
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
