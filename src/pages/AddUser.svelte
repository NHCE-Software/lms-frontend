<script>
  import Navbar from "../components/Navbar.svelte";
  import UserDashboardTable from "../components/UserDashboardTable.svelte";
  let roles = ["Caller", "Admin"];
  let data = {
    loadedusers: [
      {
        name: "Danush",
        email: "email@dannyboi.com",
        role: "Caller",
      },
    ],
  };
</script>

<input type="checkbox" id="addusermodal" class="modal-toggle" />
<div class="modal">
  <div class="modal-box bg-white">
    <h3 class="font-bold text-lg">Add User</h3>
    <form action="" class="gap-2 flex flex-col my-4">
      <label for="" class="tracking-wide opacity-50">Name</label>
      <input
        type="text"
        class="w-full p-2 border rounded-lg"
        placeholder="Name"
        name=""
        id=""
      />
      <label for="" class="tracking-wide opacity-50">Email</label>
      <input
        type="text"
        class="w-full p-2  border rounded-lg"
        placeholder="Email"
        name=""
        id=""
      />

      <label for="" class="tracking-wide opacity-50">Role</label>

      <select class="p-2 rounded-lg border" name="" id="">
        {#each roles as role}
          <option>{role}</option>
        {/each}
      </select>
      <label for="" class="tracking-wide opacity-50">Password</label>

      <input
        type="text"
        class="w-full p-2  border rounded-lg"
        placeholder="Password"
        name=""
        id=""
      />
    </form>
    <div class="modal-action">
      <label for="addusermodal" class="btn">Yay!</label>
    </div>
  </div>
</div>

<section class="grid min-h-screen h-full grid-cols-5 p-5">
  <Navbar />
  <div class="col-span-4 col-start-2 m-10">
    <div class="flex justify-between">
      <div>
        <div class="text-3xl">Users Dashboard</div>
        <div class="text-xl opacity-50">Add and remove user</div>
      </div>
      <label
        for="addusermodal"
        class="px-4 rounded-full h-fit hover:bg-blue-200 transition-all  w-fit py-2 font-semibold bg-blue-100 text-blue-500"
      >
        Add user
      </label>
    </div>
    <div class="overflow-auto mt-10">
      <UserDashboardTable data={data.loadedusers} />
    </div>
  </div>
</section>
