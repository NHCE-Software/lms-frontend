<script>
  import { gql } from "@apollo/client";
  import { mutation } from "svelte-apollo";
  import axios from "axios";

  import Navbar from "../components/Navbar.svelte";
  import QueryTable from "../components/QueryTable.svelte";
  import { replace } from "svelte-spa-router";
  import { sources } from "../constants";

  let sources1 = {
    Siksha: "sk",
    "Careers 360": "c360",
    "College Dunia": "cd",
    "NHCE Website Enquiry": "we",
    "NHCM Website Enquiry": "we",
    "NHCE Website Application": "wa",
    "NHCM Website Application": "wa",
  };
  let schema = {
    Siksha: [
      '"First Name"',
      "Last Name",
      "Course Parent Institute",
      "Response to Course",
      "City",
      "Locality",
      "Student State",
      "Student City",
      "Current Locality",
      "Response Date",
      "Response Type",
      "Email",
      "ISD Code",
      "Mobile",
      "Is in NDNC List",
      "Exams Taken",
      "Student Work Experience",
      "Response to Course Program",
      "Total responses to Course Parent Institute",
      "Total responses to Course Program",
      "Total responses to Course",
      ,
    ],
    "Careers 360": [
      "user_name",
      "user_email",
      "user_phone_number",
      "user_city",
      "user_state",
      "created",
      "course",
      "feedback",
      "remarks",
    ],
    "College Dunia": [
      "Sl no",
      "Name",
      "Email",
      "Contact",
      "Course",
      "City",
      "State",
      "Created_Date",
      "Branch ",
      "Feedback",
      "Remarks ",
    ],
    "NHCE Website Enquiry": "nhcewe",
    "NHCM Website Enquiry": "nhcmwe",
    "NHCE Website Application": "nhcewa",
    "NHCM Website Application": "nhcmwa",
  };
  let files = [];
  let data = [];
  let cols = [];
  let source = "";
  let csource = "";

  let INSERTLEAD = gql`
    mutation Mutation($record: [JSON]) {
      addleads(record: $record)
    }
  `;
  let INSERTLEAD_MUTATION = mutation(INSERTLEAD);
  async function insertAllLeads() {
    if (confirm("Confirm transformation? This cannot be undone.")) {
      //console.log("broooo in bto");
      data = data.map((item) => {
        return { ...item, source: source, phonenumber: [item.phonenumber] };
      });
      console.log("this is what is getting sent", data);
      let res = await INSERTLEAD_MUTATION({ variables: { record: data } });
      console.log("broooooooooo sent bro", res);
      if (res.data.addleads && res.data.addleads.message === "success") {
        swal("Added Lead", "We are good to go", "success");
        replace("/lead-details");
      } else {
        swal("Oops", "Something went wrong", "error");
      }
    }
  }
  let INSERTCLEAD = gql`
    mutation Mutation($record: [JSON]) {
      addCustomLeads(record: $record)
    }
  `;
  let INSERTCLEAD_MUTATION = mutation(INSERTCLEAD);

  async function insertAllCLeads() {
    if (confirm("Confirm Custom transformation? This cannot be undone.")) {
      data = data.map((item) => {
        let c = item.calls;
        delete item.calls;
        return {
          ...item,
          source: csource,
          remark: c,
          createdAt: formatDate(item["createdAt"]),
          phonenumber: [item.phonenumber],
        };
      });
      console.log("country roads  ", data);
      let res = await INSERTCLEAD_MUTATION({ variables: { record: data } });
      if (
        res.data.addCustomLeads &&
        res.data.addCustomLeads.message === "success"
      ) {
        swal("Added Lead", "We are good to go", "success");
        replace("/lead-details");
      } else {
        swal("Oops", "Something went wrong", "error");
      }
    }
  }

  function loadData() {
    csource = "";
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("source", sources1[source]);
    console.log(source);
    if (files.length > 0 && data.length === 0) {
      axios.post(BASEURLQB + "/qb/upload", formData).then((res) => {
        console.log(res.data);
        data = res.data.data;
        cols = res.data.cols;
      });
    }
  }
  function loadDataCus() {
    source = "";
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("source", csource);
    console.log(source);
    if (files.length > 0 && data.length === 0) {
      axios.post(BASEURLQB + "/qb/cupload", formData).then((res) => {
        console.log(res.data);
        data = res.data.data;
        cols = res.data.cols;
      });
    }
  }
  function formatDate(date) {
    console.log(date);
    let day = date.split("-")[0];
    let month = date.split("-")[1];
    let year = date.split("-")[2];
    return `${year}-${month}-${day}`;
  }
</script>

<input type="checkbox" id="chooseSource" class="modal-toggle" />
<div class="modal">
  <div class="modal-box relative">
    <label
      for="chooseSource"
      class="btn btn-sm btn-circle absolute right-2 top-2">✕</label
    >
  </div>
</div>

<section class="grid grid-cols-5">
  <div class="col-span-1 p-5">
    <Navbar />
  </div>
  <div class="col-span-4 m-10">
    {#if data && data.length > 0}
      {#if source !== ""}
        <div on:click={insertAllLeads} class="btn mb-10">
          Load Predefined leads
        </div>
      {/if}
      {#if csource !== ""}
        <div on:click={insertAllCLeads} class="btn mb-10">
          Load Custom leads
        </div>
      {/if}

      <div class="w-full">
        <QueryTable {data} {cols} />
      </div>
    {:else}
      <div class="grid grid-cols-2 flex-col gap-5" action="">
        <div class="flex flex-col gap-5">
          <form action="" on:submit|preventDefault={loadData}>
            <div>
              <h3 class=" text-lg font-bold">Load Predefined Data</h3>
              <h3 class=" font-bold mt-5 opacity-50">1. Choose CSV file</h3>
              <input
                class="file:bg-blue-100 mt-5 file:text-blue-600 file:border-none file:px-4 file:py-3  file:rounded-full file:mr-5 hover:file:bg-blue-200 file:transition-all file:font-semibold"
                bind:files
                id="file_input"
                type="file"
              />
            </div>
            <div>
              <h3 class="font-bold mt-5 opacity-50">2. Choose Source</h3>
              <div class="grid grid-cols-2 gap-5 mt-5">
                {#each Object.keys(sources1) as s}
                  <label class="flex items-center">
                    <input
                      type="radio"
                      name="source"
                      class="radio"
                      value={s}
                      on:change={(e) => (source = e.target.value)}
                    />
                    <span class="ml-2">{s}</span>
                  </label>
                {/each}
              </div>
            </div>
            <div class="mt-5">
              <button type="submit" class="btn btn-primary"> Upload </button>
            </div>
          </form>
          <div class="divider">OR</div>
          <form on:submit|preventDefault={loadDataCus}>
            <h3 class="text-lg font-bold">Load Custom data</h3>
            <h3 class=" mt-5 font-bold opacity-50">1. Choose CSV file</h3>
            <input
              class="file:bg-blue-100 mt-5 file:text-blue-600 file:border-none file:px-4 file:py-3  file:rounded-full file:mr-5 hover:file:bg-blue-200 file:transition-all file:font-semibold"
              bind:files
              id="file_input"
              type="file"
            />
            <h3 class=" mt-5 font-bold opacity-50 mb-5">2. Choose Source</h3>
            <select
              bind:value={csource}
              required
              id="source"
              class="select w-full bg-white "
            >
              <option disabled selected>Pick Source</option>
              {#each sources as s}
                <option value={s}>{s}</option>
              {/each}
            </select>
            <div class="mt-5 flex justify-between items-center">
              <button type="submit" class="btn bg-blue-700"> Upload </button>
              <button
                type="submit"
                class="text-sm text-red-500 max-w-md text-left"
              >
                * if the file is not getting uploaded, please ensure that the
                data is being uploaded in the correct order
              </button>
            </div>
          </form>
        </div>
        <div>
          {#if schema[source]}
            <div>Make sure the data has the below columns:</div>
            {#each schema[source] as s, i}
              <div class="text-sm">
                {i}: {s} <br />
              </div>
            {/each}
          {:else}
            <div>
              NHCE LMS supports loading of data from various sources. <br />
              Data can be loaded in 2 ways:
              <ol>
                <li>
                  <h3 class="font-bold">1. Load Predefined data</h3>
                  <div>
                    Data that follow the schema provided to us can be loaded
                    without alteration in the CSV file. <br />
                    <div
                      class="uppercase font-bold my-2 bg-blue-500 rounded-lg text-white p-3"
                    >
                      Columns that are not defined in the schema will be
                      ignored.
                    </div>
                  </div>
                </li>
                <li>
                  <h3 class="font-bold">2. Load Custom data</h3>
                  <div>
                    Loading of custom data is also supported. <br />

                    When loading custom data, please follow the below format
                    (column names and value can be anything, but must follow the
                    order):<br />
                    <ul>
                      <li>1. Lead Name</li>
                      <li>2. Email</li>
                      <li>3. Phone No</li>
                      <li>4. City</li>
                      <li>5. State</li>
                      <li>6. Program</li>
                      <li>7. Course</li>
                      <li>8. Remarks</li>
                      <li>9. CreatedAt(dd-mm-yyyy)</li>
                    </ul>
                  </div>
                </li>
              </ol>
              <div>
                Please ensure that when loading custom leads, the data complies
                to the mentioned format. In case of missing data, follow the
                format and leave the remaining columns empty. <span
                  class="font-bold"
                  >BUT MAKE SURE THE COLUMNS EXIST IN THE SAME ORDER.
                </span>
                <br />
              </div>
            </div>
          {/if}
        </div>
      </div>
    {/if}
  </div>
</section>
