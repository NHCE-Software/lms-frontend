<script>
  import { onMount } from "svelte";
  import { currentPage } from "../stores/store";

  export let selectedTableFormat = [];
  export let deleteLead = () => {};
  export let data = [];
  let sortedData = [];
  let displayData = [];
  let unSortedData = [];
  let isSorted = false;

  const capitalize = (s) => (s && s[0].toUpperCase() + s.slice(1)) || "";
  import { status, statusColor } from "../constants";
  let statusMap = {};
  export let selectedLeadID;

  onMount(() => {
    for (let i = 0; i < status.length; i++) {
      statusMap[status[i].toLowerCase()] = statusColor[i];
    }
    console.log(statusMap);
  });

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
    unSortedData = [...data];

    sortedData = unSortedData.sort((a, b) => {
      let datePartsA = a.createdAt.split("/");
      let datePartsB = b.createdAt.split("/");
      let dateA = new Date(+datePartsA[2], datePartsA[1] - 1, +datePartsA[0]),
        dateB = new Date(+datePartsB[2], datePartsB[1] - 1, +datePartsB[0]);
      return dateA - dateB;
    });
    unSortedData = [...data];
    // console.log("sorted Data:", sortedData);
    // console.log("unsorted data", unSortedData);

    if (isSorted) {
      displayData = [...sortedData];
    } else {
      displayData = [...unSortedData];
    }
    displayData = displayData.map((item, index) => {
      return { ...item, index: index + 1 };
    });
    pages = splitArray(displayData, 25);
    //console.log("display data", pages);
  }
</script>

<div class="overflow-auto h-full min-h-screen flex flex-col">
  <div class="divTable">
    <div class="divTableHeading">
      <div class="divTableRow font-bold">
        <div class="divTableCell  cursor-pointer">x</div>
        {#if selectedTableFormat}
          {#each selectedTableFormat as column}
            {#if column != "_id"}
              {#if column == "createdAt"}
                <div
                  on:click={() => (isSorted = !isSorted)}
                  class={`divTableCell cursor-pointer max-w-4 ${
                    isSorted ? "bg-blue-500" : ""
                  }`}
                >
                  {capitalize(column)}
                </div>
              {:else}
                <div class="divTableCell  ">{capitalize(column)}</div>
              {/if}
            {/if}
          {/each}
        {/if}
        <div class="divTableCell cursor-pointer">actions</div>
      </div>
    </div>

    <div>
      <!-- do not remove -->
      <div class="bg-red-100" />
      <div class="bg-yellow-100" />
      <div class="bg-green-100" />
    </div>

    <div class="divTableBody">
      {#if pages[$currentPage]}
        {#each pages[$currentPage] as d, i}
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label
            on:click={() => (selectedLeadID = d["_id"])}
            class={`divTableRow cell2 ${statusMap[d["status"].toLowerCase()]} ${
              statusMap[d["status"]]
            }  ${d["_id"] === selectedLeadID ? `font-bold ` : ""}`}
          >
            <div class="divTableCell">{d["index"]}</div>
            {#each selectedTableFormat as column, j}
              <label
                class={`divTableCell cell2 ${
                  column === "lastremark" ? "max-w-[3em]" : "max-w-[1em]"
                } max-h-4 cursor-pointer`}
              >
                {d[selectedTableFormat[j]] || "-"}
              </label>
            {/each}
            <div class="divTableCell truncate max-w-[1em] gap-3">
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
                <label class="cursor-pointer" for="modalz">
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
                <label
                  on:click={() => {
                    deleteLead(d["_id"]);
                  }}
                  class="cursor-pointer"
                >
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
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
      {#if i == $currentPage}
        <button
          on:click={() => ($currentPage = i)}
          class="btn  btn-outline-primary btn-active"
        >
          {i + 1}
        </button>
      {:else}
        <button
          on:click={() => ($currentPage = i)}
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
    resize: horizontal;
    overflow: auto;
  }
  .divTableCell {
    border: 1px solid #e6e6e6;
    display: table-cell;
    resize: horizontal;
    overflow: auto;
    @apply p-3;
  }
  .cell2 {
    resize: none;
    overflow: none;
  }
  .divTableHead {
    border: 0;
    resize: horizontal;
    overflow: auto;
    display: table-cell;
    @apply m-0 rounded-lg;
  }
  .divTableHeading {
    @apply bg-blue-700 text-white  p-3;
    resize: horizontal;
    overflow: auto;
    display: table-header-group;
  }
  .divTableFoot {
    background-color: #eee;
    resize: horizontal;
    overflow: auto;
    display: table-footer-group;
    font-weight: bold;
  }
  .divTableBody {
    display: table-row-group;
    resize: horizontal;
    overflow: auto;
  }
</style>
