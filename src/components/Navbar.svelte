<script>
  import { push, location } from "svelte-spa-router";
  const role = localStorage.getItem("role");
  console.log($location);
  const routes =
    role && role.toLowerCase() === "admin"
      ? [
          { path: "/home", name: "Admin Dashboard" },
          { path: "/add-user", name: "Users" },
          { path: "/lead-details", name: "Lead Details" },
        ]
      : [
          { path: "/query-builder", name: "Load Leads" },
          { path: "/lead-details", name: "Lead Details" },
          { path: "/add-lead", name: "Add Lead" },
        ];
</script>

<input type="checkbox" id="change-pass-modal" class="modal-toggle" />
<div class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg">Change Password</h3>
    <div class="py-4">
      <form action="" class="flex flex-col gap-5">
        <div class="flex flex-col">
          <label for="">Current Password</label>
          <input
            type="text"
            placeholder=""
            class="input input-bordered"
            name=""
            id=""
          />
        </div>
        <div class="flex flex-col">
          <label for="">New Password</label>
          <input
            type="text"
            placeholder=""
            class="input input-bordered"
            name=""
            id=""
          />
        </div>
        <div class="flex flex-col">
          <label for="">New Password Again</label>
          <input
            type="text"
            placeholder=""
            class="input input-bordered"
            name=""
            id=""
          />
        </div>
      </form>
    </div>
    <div class="modal-action">
      <div class="btn">Save</div>
      <label for="change-pass-modal" class="btn">Close</label>
    </div>
  </div>
</div>

<div class="bg-white p-5 flex flex-col   rounded-2xl shadow-xl">
  <div class="text-2xl my-4 text-center text-blue-500 font-bold">
    Lead Management System
  </div>
  <div class="flex flex-col  h-full ">
    <div class="mt-10 mb-3 opacity-50">
      <div class="divider">Navigation</div>
    </div>
    <div class="flex flex-col gap-3  h-full">
      {#each routes as r}
        {#if $location.includes(r.path)}
          <div
            on:click={() => (window.location.href = "/#" + r.path)}
            class="p-3 border bg-blue-300 text-blue-600 font-bold rounded-xl cursor-pointer"
          >
            {r.name}
          </div>
        {:else}
          <div
            on:click={() => (window.location.href = "/#" + r.path)}
            class="p-3 border rounded-xl cursor-pointer"
          >
            {r.name}
          </div>
        {/if}
      {/each}
      <div class="divider opacity-50 mt-10">Action Center</div>

      {#if localStorage.getItem("role") === "caller"}
        <label
          for="change-pass-modal"
          class="btn p-3 border  text-center cursor-pointer"
        >
          Change Password
        </label>
      {/if}

      <div
        on:click={() => {
          if (confirm("Are you sure you want to log out?")) {
            localStorage.clear();
            window.location.href = "/#/auth";
          }
        }}
        class=" btn p-3 border-none  text-center bg-red-300 text-red-600"
      >
        Log out
      </div>
    </div>
  </div>
</div>
