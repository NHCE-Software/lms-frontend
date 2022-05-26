<script>
  import { gql } from "@apollo/client";
  import { mutation } from "svelte-apollo";
  import axios from "axios";

  import Navbar from "../components/Navbar.svelte";
  import QueryTable from "../components/QueryTable.svelte";
  import { replace } from "svelte-spa-router";
  let sources = {
    Siksha: "sk",
    "Careers 360": "c360",
    "College Dunia": "cd",
    "NHCE Website Enquiry": "nhcewe",
    "NHCM Website Enquiry": "nhcmwe",
    "NHCE Website Application": "nhcewa",
    "NHCM Website Application": "nhcmwa",
  };
  let files = [];
  let data = [];
  let cols = [];
  let source = "";

  let INSERTLEAD = gql`
    mutation Mutation($record: [JSON]) {
      addleads(record: $record)
    }
  `;
  let INSERTLEAD_MUTATION = mutation(INSERTLEAD);
  async function insertAllLeads() {
    if (confirm("Confirm transformation? This cannot be undone.")) {
      console.log("broooo in bto");
      data = data.map((item) => {
        return { ...item, source: source };
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

  function loadData() {
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("source", sources[source]);
    console.log(source);
    if (files.length > 0 && data.length === 0) {
      axios.post("http://localhost:5000/upload", formData).then((res) => {
        console.log(res.data);
        data = res.data.data;
        cols = res.data.cols;
      });
    }
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
    {#if data.length > 0}
      <div on:click={insertAllLeads} class="btn mb-10">Load em leads</div>
      <div class="w-full">
        <QueryTable {data} {cols} />
      </div>
    {:else}
      <form on:submit|preventDefault={loadData} action="">
        <input type="file" required name="file" bind:files id="" />
        <h3 class="text-lg font-bold">Choose Source</h3>
        <div class="grid grid-cols-2 gap-5 mt-5">
          {#each Object.keys(sources) as s}
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
        <div class="mt-5">
          <button type="submit" class="btn btn-primary"> Upload </button>
        </div>
      </form>
    {/if}
  </div>
</section>
