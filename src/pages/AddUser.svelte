<script>
  import { roles } from "../constants";
  import Navbar from "../components/Navbar.svelte";
  import UserDashboardTable from "../components/UserDashboardTable.svelte";
  import { gql } from "@apollo/client";
  import { mutation } from "svelte-apollo";
  import swal from "sweetalert";
  import { onMount } from "svelte";
  onMount(() => {
    getAllUsers();
  });

  let contextData = {
    loadedusers: [
      {
        userid: "userid",
        name: "Danush",
        email: "email@dannyboi.com",
        role: "Admin",
      },
    ],
  };
  let newUser = {
    name: "",
    password: "",
    email: "",
    role: "",
  };
  export let selectedUserID = "";
  let selectedUser = {};
  $: {
    selectedUser = contextData.loadedusers.find(
      (user) => user._id === selectedUserID
    );
    console.log(selectedUser);
  }
  let ADDUSER = gql`
    mutation UserCreateOne($record: CreateOneUserInput!) {
      userCreateOne(record: $record) {
        record {
          name
          email
          role
        }
      }
    }
  `;
  let ADDUSER_MUTATION = mutation(ADDUSER);
  async function addUser() {
    try {
      let { error, data } = await ADDUSER_MUTATION({
        variables: { record: { ...newUser, role: newUser.role.toLowerCase() } },
      });
      console.log(error, data);
      if (data) {
        swal("Done!", "User has been created successfully", "success");
        getAllUsers();
      }
      if (error) {
        swal(
          "Umm...",
          "Something went wrong. This may happen because are trying enter a duplicate email, check all the fields and try again.",
          "success"
        );
        console.log(error);
      }
    } catch (error) {
      console.log(error);
      swal(
        "Umm...",
        "Something went wrong. This may happen because are trying enter a duplicate email, check all the fields and try again.",
        "error"
      );
    }
  }
  let GETUSERS = gql`
    query UserMany {
      userMany {
        name
        email
        role
        _id
      }
    }
  `;
  let GETUSERS_MUTATION = mutation(GETUSERS);
  async function getAllUsers() {
    const { loading, error, data } = await GETUSERS_MUTATION();
    contextData.loadedusers = data.userMany;
  }

  let REMOVEUSER = gql`
    mutation Mutation($filter: JSON) {
      userRemoveOne(filter: $filter)
    }
  `;
  let REMOVEUSER_MUTATION = mutation(REMOVEUSER);
  async function removeUser(userid) {
    console.log(userid);
    if (
      confirm(
        "Deleting " +
          contextData.loadedusers.find((item) => item._id === userid).name +
          " Confirm delete?"
      )
    ) {
      const { loading, errors, data } = await REMOVEUSER_MUTATION({
        variables: { filter: { _id: userid } },
      });
      console.log(data);
      if (data && data.userRemoveOne.message === "successful")
        swal(
          "Successfully Deleted",
          "The user is deleted from the database",
          "success"
        );
      else if (data && data.userRemoveOne.message === "deleteblocked")
        swal(
          "Can Not Delete LoggedIn Admin",
          "You are trying to delete yourself",
          "error"
        );
      else swal("Error", "Oops, Something went wrong", "error");

      getAllUsers();
    }
  }
  let EDITUSER = gql`
    mutation Mutation(
      $record: UpdateOneUserInput!
      $filter: FilterUpdateOneUserInput
    ) {
      userUpdateOne(record: $record, filter: $filter) {
        record {
          name
        }
      }
    }
  `;
  let EDITUSER_MUTATION = mutation(EDITUSER);
  async function editUser() {
    console.log("bro what", selectedUser);
    const { loading, data, error } = await EDITUSER_MUTATION({
      variables: {
        filter: { _id: selectedUserID },
        record: {
          name: selectedUser.name,
          password: selectedUser.password,
          email: selectedUser.email,
          role: selectedUser.role,
        },
      },
    });

    if (data) {
      swal("Successfully Edited", "The changes have been saved", "success");
      getAllUsers();
    } else {
      swal("Error", "Oops, Something went wrong", "error");
      console.log(error);
    }
  }
</script>

<input type="checkbox" id="addusermodal" class="modal-toggle" />
<div class="modal">
  <div class="modal-box bg-white">
    <h3 class="font-bold text-lg">Add User</h3>
    <form action="" class="gap-2 flex flex-col my-4">
      <label for="" class="tracking-wide opacity-50">Name</label>
      <input
        bind:value={newUser.name}
        type="text"
        class="w-full p-2 border rounded-lg"
        placeholder="Name"
        name=""
        id=""
      />
      <label for="" class="tracking-wide opacity-50">Email</label>
      <input
        bind:value={newUser.email}
        type="text"
        class="w-full p-2  border rounded-lg"
        placeholder="Email"
        name=""
        id=""
      />

      <label for="" class="tracking-wide opacity-50">Role</label>

      <select
        bind:value={newUser.role}
        class="p-2 rounded-lg border"
        name=""
        id=""
      >
        <option disabled selected value="">Select Role</option>
        {#each roles as role}
          <option>{role}</option>
        {/each}
      </select>
      <label for="" class="tracking-wide opacity-50">Password</label>

      <input
        bind:value={newUser.password}
        type="text"
        class="w-full p-2  border rounded-lg"
        placeholder="Password"
        name=""
        id=""
      />
    </form>
    <div class="modal-action">
      <div on:click={addUser} class="btn">Add User</div>
      <label for="addusermodal" class="btn">Close</label>
    </div>
  </div>
</div>

<input type="checkbox" id="editusermodal" class="modal-toggle" />
<div class="modal">
  <div class="modal-box bg-white">
    <h3 class="font-bold text-lg">Edit User</h3>
    {#if selectedUser}
      <form action="" class="gap-2 flex flex-col my-4">
        <label for="" class="tracking-wide opacity-50">Name</label>
        <input
          type="text"
          class="w-full p-2 border rounded-lg"
          placeholder="Name"
          bind:value={selectedUser.name}
          name=""
          id=""
        />
        <label for="" class="tracking-wide opacity-50">Username</label>
        <input
          type="text"
          class="w-full p-2  border rounded-lg"
          placeholder="Username"
          name=""
          id=""
          bind:value={selectedUser.email}
        />

        <label for="" class="tracking-wide opacity-50">Role</label>

        <select
          bind:value={selectedUser.role}
          class="p-2 rounded-lg border"
          name=""
          id=""
        >
          {#each roles as role}
            <option>{role}</option>
          {/each}
        </select>
        <label for="" class="tracking-wide opacity-50">Password</label>

        <input
          bind:value={selectedUser.password}
          type="text"
          class="w-full p-2  border rounded-lg"
          placeholder="Password"
          name=""
          id=""
        />
      </form>
    {/if}
    <div class="modal-action">
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label on:click={editUser} class="btn">Confirm Update</label>
      <label for="editusermodal" class="btn">Close</label>
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
      <UserDashboardTable
        {removeUser}
        bind:selectedUserID
        data={contextData.loadedusers}
      />
    </div>
  </div>
</section>
