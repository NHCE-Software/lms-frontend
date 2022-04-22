<script>
  export let data = [];
  export let selectedUserID = "";
  export let removeUser = () => {};
</script>

<div class="divTable">
  <div class="divTableHeading">
    <div class="divTableRow font-semibold">
      <div class="divTableCell" />
      <div class="divTableCell">Name</div>
      <div class="divTableCell ">Email</div>
      <div class="divTableCell">Password</div>
      <div class="divTableCell">Role</div>
      <div class="divTableCell">Actions</div>
    </div>
  </div>

  <div class="divTableBody">
    {#each data as { name, _id, email, role }, i}
      <div class="divTableRow">
        <div class="divTableCell">{i + 1}</div>
        <div class="divTableCell">{name}</div>
        <div class="divTableCell">{email}</div>
        <div class="divTableCell">Reset Password</div>
        <div class="divTableCell">{role}</div>
        <div class="divTableCell">
          <div class="flex gap-2">
            <label
              on:click={() => {
                console.log("changing id", _id);
                selectedUserID = _id;
              }}
              for="editusermodal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1.2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </label>
            <div
              on:click={() => {
                removeUser(_id);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1.2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>
          </div>
        </div>
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
