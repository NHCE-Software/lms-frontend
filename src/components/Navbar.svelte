<script>
  import { push } from "svelte-spa-router";
</script>

<div class="bg-white p-5 flex flex-col  rounded-2xl shadow-xl">
  <div class="text-2xl my-4 text-center text-blue-500 font-bold">
    Lead Management System
  </div>
  <div class="flex flex-col  h-full ">
    <div class="mt-10 mb-3 opacity-50">Navigation</div>
    <div class="flex flex-col gap-3  h-full">
      <div on:click={() => push("/home")} class="p-3 border rounded-xl">
        Admin Dashboard
      </div>
      <div on:click={() => push("/add-user")} class="p-3 border rounded-xl">
        Add Users
      </div>
      <div
        on:click={() => push("/query-builder")}
        class="p-3 border rounded-xl"
      >
        Add Leads
      </div>
      <div on:click={() => push("/lead-details")} class="p-3 border rounded-xl">
        Caller Dashboard
      </div>
      <div class="p-3 border rounded-xl mt-auto">Profile</div>
    </div>
  </div>
</div>
