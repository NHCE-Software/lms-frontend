<script>
  export let data = [];
  let pages;
  let currentPage = 0;
  export let cols = [];

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

  $: {
    console.log(data, cols);
    data = data.map((item, i) => {
      return {
        ...item,
        index: i + 1,
      };
    });
    pages = splitArray(data, 25);
  }
</script>

<div class="overflow-auto h-full min-h-screen flex flex-col">
  <div class="divTable">
    <div class="divTableHeading">
      <div class="divTableRow font-bold">
        <div class="divTableCell" />
        {#each cols as col}
          <div class="divTableCell">{col}</div>
        {/each}
      </div>
    </div>
    <div class="divTableBody">
      {#if pages[currentPage]}
        {#each pages[currentPage] as p}
          <div class="divTableRow ">
            <div class="divTableCell">{p["index"]}</div>
            {#each cols as col}
              <div class="divTableCell">{p[col]}</div>
            {/each}
          </div>
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
