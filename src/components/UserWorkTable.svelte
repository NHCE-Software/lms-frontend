<script>
  export let data = [];
  export let selectedStatusID = "";

  data.sort((a, b) => (a.status > b.status ? 1 : b.status > a.status ? -1 : 0));
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
      <div class="divTableCell">Status</div>
    </div>
  </div>

  <div class="divTableBody">
    {#each data as { statusid, status, source, location, name, email, phone }, i}
      <div class="divTableRow">
        <div class="divTableCell">{i + 1}</div>
        <div class="divTableCell">{name}</div>
        <div class="divTableCell">{phone}</div>
        <div class="divTableCell">{email}</div>
        <div class="divTableCell">{location}</div>
        <div class="divTableCell">{source}</div>
        <label
          on:click={() => {
            selectedStatusID = statusid;
          }}
          for="my-modal2"
          class="divTableCell">{status}</label
        >
      </div>
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
