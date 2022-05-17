<script>
  export let selectedTableFormat = [];
  export let data = [];
  let beautyMode = true;

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
    console.log("helo frands", data);
    pages = splitArray(data, 25);
    //console.log("perfect", pages[currentPage]);
  }
</script>

<div class=" overflow-auto h-full min-h-screen flex flex-col">
  <div class="divTable">
    <div class="divTableHeading">
      <div class="divTableRow font-semibold">
        <div class="divTableCell cursor-pointer">x</div>
        {#if selectedTableFormat}
          {#each selectedTableFormat as column}
            {#if column != "_id"}
              <div class="divTableCell">{column}</div>
            {/if}
          {/each}
        {/if}
      </div>
    </div>

    <div class="divTableBody">
      {#if pages[currentPage]}
        {#each pages[currentPage] as d, i}
          <label
            for="my-drawer"
            on:click={() => (selectedLeadID = d["_id"])}
            class={`divTableRow ${
              d["_id"] === selectedLeadID ? "bg-blue-200" : ""
            }`}
          >
            <div class="divTableCell">{i + 1}</div>

            {#each selectedTableFormat as column, j}
              <div class="divTableCell truncate max-w-[1em]">
                {d[selectedTableFormat[j]] || "-"}
              </div>
            {/each}
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
  .tooltip {
    position: relative;
    display: inline-block;
    border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
  }

  /* Tooltip text */
  .tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: black;
    color: #fff;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;

    /* Position the tooltip text - see examples below! */
    position: absolute;
    z-index: 1;
  }

  /* Show the tooltip text when you mouse over the tooltip container */
  .tooltip:hover .tooltiptext {
    visibility: visible;
  }

  .divTable {
    display: table;
    width: 100%;
  }
  .divTableRow {
    display: table-row;
  }

  .divTableCell,
  .divTableHead {
    border: 1px solid #e6e6e6;

    display: table-cell;
    @apply p-3;
  }
  .divTableHeading {
    @apply bg-blue-100 p-3;
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
