<script>
  import { push, location } from "svelte-spa-router";
  const role = localStorage.getItem("role");
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

<div class="bg-white p-5 flex flex-col   rounded-2xl shadow-xl">
  <div class="text-2xl my-4 text-center text-blue-500 font-bold">
    Lead Management System
  </div>
  <div class="flex flex-col  h-full ">
    <div class="mt-10 mb-3 opacity-50">Navigation</div>
    <div class="flex flex-col gap-3  h-full">
      {#each routes as r}
        {#if $location.includes(r.path)}
          <div
            on:click={() => push(r.path)}
            class="p-3 border bg-blue-300 text-blue-600 font-bold rounded-xl cursor-pointer"
          >
            {r.name}
          </div>
        {:else}
          <div
            on:click={() => push(r.path)}
            class="p-3 border rounded-xl cursor-pointer"
          >
            {r.name}
          </div>
        {/if}
      {/each}

      <div
        on:click={() => {
          localStorage.clear();
          push("/auth");
        }}
        class=" btn p-3 border-none mt-auto text-center bg-red-300 text-red-600"
      >
        Log out
      </div>
    </div>
  </div>
</div>
