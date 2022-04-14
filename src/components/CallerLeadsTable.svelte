<script>
  export let data = [];
  export let selectedLeadID;
</script>

<div class="divTable">
  <div class="divTableHeading">
    <div class="divTableRow font-semibold">
      <div class="divTableCell" />
      <div class="divTableCell">Name</div>
      <div class="divTableCell ">Email</div>
      <div class="divTableCell">Phone</div>
      <div class="divTableCell">City</div>
      <div class="divTableCell">Status</div>
      <div class="divTableCell">Follow Up</div>
      <div class="divTableCell">Source</div>
      <div class="divTableCell">Loaded by</div>
    </div>
  </div>

  <div class="divTableBody">
    {#each data as { leadid, followup, name, email, phone, city, source, status, loadedby }, i}
      <div
        on:click={() => (selectedLeadID = leadid)}
        class={`divTableRow ${leadid === selectedLeadID ? "bg-blue-200" : ""}`}
      >
        <div class="divTableCell">{i + 1}</div>
        <div class="divTableCell">{name}</div>
        <div class="divTableCell">{email}</div>
        <div class="divTableCell">{phone}</div>
        <div class="divTableCell">{city}</div>
        <div class="divTableCell">{status}</div>
        <div class="divTableCell">{followup}</div>
        <div class="divTableCell">{source}</div>
        <div class="divTableCell">{loadedby}</div>
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
