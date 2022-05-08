<script>
  export let selectedTableFormat = [];
  export let data = [];

  export let selectedLeadID;
</script>

<div class="divTable">
  <div class="divTableHeading">
    <div class="divTableRow font-semibold">
      <div class="divTableCell" />
      {#each selectedTableFormat as column}
        {#if column != "_id"}
          <div class="divTableCell">{column}</div>
        {/if}
      {/each}
    </div>
  </div>

  <div class="divTableBody">
    {#each data as d, i}
      <label
        for="my-drawer"
        on:click={() => (selectedLeadID = d["_id"])}
        class={`divTableRow ${
          d["_id"] === selectedLeadID ? "bg-blue-200" : ""
        }`}
      >
        <div class="divTableCell">{i + 1}</div>

        {#each selectedTableFormat as column, j}
          <div class="divTableCell">{d[selectedTableFormat[j]] || "-"}</div>
        {/each}

        <!-- <div class="divTableCell">{email || "-"}</div>
        <div class="divTableCell">{phonenumber || "-"}</div>
        <div class="divTableCell">{city || "-"}</div>
        <div class="divTableCell">{course || "-"}</div>
        <div class="divTableCell">{status || "-"}</div>
        <div class="divTableCell">{followup || "-"}</div>
        <div class="divTableCell">{source || "-"}</div>
        <div class="divTableCell">{loadedbyname || "-"}</div> -->
      </label>
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
