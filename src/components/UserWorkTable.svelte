<script>
  export let data = [];
  export let selectedStatusID = "";
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
  let pages = [];
  let currentPage = 0;
  $: {
    data = data.map((item, index) => {
      return { ...item, index: index + 1 };
    });
    pages = splitArray(data, 10);
  }
</script>

<div class="divTable">
  <div class="divTableHeading">
    <div class="divTableRow">
      <div class="divTableCell" />
      <div class="divTableCell">Lead Name</div>
      <div class="divTableCell">Phone Number</div>
      <div class="divTableCell">Email</div>
      <div class="divTableCell">Location</div>
      <div class="divTableCell">Source</div>
      <div class="divTableCell">Course</div>
      <div class="divTableCell">Status</div>
    </div>
  </div>

  <div class="divTableBody">
    {#each pages[currentPage] as { _id, index, status, source, city, name, email, course, phonenumber }, i}
      <div class="divTableRow">
        <div class="divTableCell">{index}</div>
        <div class="divTableCell">{name}</div>
        <div class="divTableCell">{phonenumber}</div>
        <div class="divTableCell">{email}</div>
        <div class="divTableCell">{city}</div>
        <div class="divTableCell">{source}</div>
        <div class="divTableCell">{course}</div>
        <label
          on:click={() => {
            selectedStatusID = _id;
          }}
          for="my-modal2"
          class="divTableCell">{status}</label
        >
      </div>
    {/each}

    <div class="flex gap-3 mt-5">
      {#each pages as p, i}
        {#if currentPage === i}
          <div
            class="font-bold bg-blue-600 text-white p-3 rounded-lg cursor-pointer"
            on:click={() => (currentPage = i)}
          >
            {i + 1}
          </div>
        {:else}
          <div
            class=" p-3 rounded-lg border cursor-pointer"
            on:click={() => (currentPage = i)}
          >
            {i + 1}
          </div>
        {/if}
      {/each}
    </div>
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
