<script>
  import { onMount } from "svelte";
  export let selectedTableFormat = [];
  export let data = [];
  const capitalize = (s) => (s && s[0].toUpperCase() + s.slice(1)) || "";
  import { status, statusColor } from "../constants";
  let statusMap = {};
  export let selectedLeadID;
  let currentPage = 0;
  function splitArray(array, n) {
    if (array) {
      let [...arr] = array;
      var res = [];
      while (arr.length) {
        res.push(arr.splice(0, n));
      }
      return res;
    }
    return [];
  }
  let pages;
  $: {
    status.forEach((key, i) => (statusMap[key] = statusColor[i]));
    statusMap = { ...statusMap };
    data = data.map((item, index) => {
      return { ...item, index: index + 1 };
    });
    pages = splitArray(data, 25);
  }
  let overflowTitle, overflowContent;
</script>

<input type="checkbox" id="overflowmodal" class="modal-toggle" />
<div class="modal">
  <div class="modal-box relative">
    <label
      for="overflowmodal"
      class="btn btn-sm btn-circle absolute right-2 top-2">✕</label
    >
    <h3 class="text-lg font-bold">{capitalize(overflowTitle)}</h3>
    <p class="py-4">
      {capitalize(overflowContent)}
    </p>
  </div>
</div>

<div class=" overflow-auto h-full min-h-screen flex flex-col">
  <div class="divTable">
    <div class="divTableHeading">
      <div class="divTableRow font-bold">
        <div class="divTableCell cursor-pointer">x</div>
        {#if selectedTableFormat}
          {#each selectedTableFormat as column}
            {#if column != "_id"}
              <div class="divTableCell">{capitalize(column)}</div>
            {/if}
          {/each}
        {/if}
        <div class="divTableCell cursor-pointer">actions</div>
      </div>
    </div>

    <div class="divTableBody">
      {#if pages[currentPage]}
        {#each pages[currentPage] as d, i}
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label
            on:click={() => (selectedLeadID = d["_id"])}
            class={`divTableRow  ${statusMap[d["status"]]}  ${
              d["_id"] === selectedLeadID ? `font-bold ` : ""
            }`}
          >
            <div class="divTableCell">{d["index"]}</div>
            <!-- on:click={() => {
              overflowTitle = column + " ( " + d["name"] + " )";
              overflowContent = d[selectedTableFormat[j]];
            }}
            for="overflowmodal" -->
            {#each selectedTableFormat as column, j}
              <label
                class={`divTableCell overflow-auto ${
                  column === "lastremark" ? " max-w-[3em]" : "max-w-[1em]"
                }  cursor-pointer`}
              >
                {d[selectedTableFormat[j]] || "-"}
              </label>
            {/each}
            <div class="divTableCell truncate  max-w-[1em] gap-3">
              <div class="flex items-center gap-3 flex-wrap">
                <label class="cursor-pointer" for="my-drawer">
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
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </label>
                <label class="cursor-pointer" for="addremarksmodal">
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
                </label>
                <label class="cursor-pointer" for="editmodal">
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
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </label>
              </div>
            </div>
          </label>
        {/each}
      {/if}
    </div>
  </div>
  <div
    class="btn-group mt-auto flex items-center justify-end  py-2  rounded-3xl"
  >
    {#each pages as page, i}
      {#if i == currentPage}
        <button
          on:click={() => (currentPage = i)}
          class="btn  btn-outline-primary btn-active"
        >
          {i + 1}
        </button>
      {:else}
        <button
          on:click={() => (currentPage = i)}
          class="btn  btn-outline-primary "
        >
          {i + 1}
        </button>
      {/if}
    {/each}
  </div>
</div>

<style>
  .divTable {
    display: table;
    width: 100%;
  }
  .divTableRow {
    display: table-row;
  }
  .divTableCell {
    border: 1px solid #e6e6e6;
    display: table-cell;
    @apply p-3;
  }
  .divTableHead {
    border: 0;
    display: table-cell;
    @apply m-0 rounded-lg;
  }
  .divTableHeading {
    @apply bg-blue-700 text-white  p-3;
    display: table-header-group;
  }
  .divTableFoot {
    background-color: #eee;
    display: table-footer-group;
    font-weight: bold;
  }
  .divTableBody {
    display: table-row-group;
  }
</style>
