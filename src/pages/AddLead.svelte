<script>
  import { pop, push } from "svelte-spa-router";

  import Navbar from "../components/Navbar.svelte";
  import { status, courses } from "../constants";
  let userExists = false;
  // modify userExists after check call from modal
  let selectedCourse = [];
</script>

<input
  type="checkbox"
  checked={userExists}
  id="search-user-modal"
  class="modal-toggle"
/>
<div class="modal">
  <div class="modal-box bg-white max-w-6xl ">
    <div class="text-2xl opacity-50 font-semibold">
      Check if User Already Exists
    </div>
    <form action="" class="my-5 ">
      <div class="flex gap-3 w-full ">
        <div class="w-full">
          <label for="">Email</label>
          <input
            type="text"
            placeholder="Type here"
            class="input w-full input-bordered bg-white "
          />
        </div>
        <div class="w-full">
          <label for="">Phone Number</label>
          <input
            type="text"
            placeholder="Type here"
            class="input w-full input-bordered bg-white "
          />
        </div>
      </div>
      <div class="flex justify-between items-center">
        <div>
          <button class="btn mt-3" on:click={() => pop()}>Go Back</button>
          <button type="submit" class="btn mt-3">Check user</button>
        </div>
        <div
          on:click={() => {
            push("/lead-details/" + "bro");
          }}
          class="cursor-pointer px-3 py-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-all"
        >
          User Exists! Go to user
        </div>
      </div>
    </form>
  </div>
</div>

<section class="grid min-h-screen p-5 h-full grid-cols-5">
  <Navbar />
  <div class="col-span-3 m-10">
    <div class="text-2xl  font-semibold">Add Walk-in Lead</div>
    <div class=" opacity-50 ">Load Single Lead</div>
    <div class="mt-5">
      <form class="form-control flex flex-col w-full">
        <label for="name" class="label">
          <span class="label-text">Lead Name</span>
        </label>
        <input
          id="name"
          type="text"
          placeholder="Type here"
          class="input input-bordered w-full bg-white"
        />
        <label for="course" class="label">
          <span class="label-text">Course Interested</span>
        </label>
        <div class="flex gap-3 flex-wrap">
          {#each courses as course}
            <input
              type="checkbox"
              on:change={(e) => {
                if (e.target.checked) {
                  selectedCourse.push(course);
                  selectedCourse = [...selectedCourse];
                } else {
                  selectedCourse = selectedCourse.filter(
                    (item) => item !== course
                  );
                  selectedCourse = [...selectedCourse];
                }
              }}
              class="checkbox"
            />{course}
          {/each}
        </div>

        <label for="city" class="label">
          <span class="label-text">City</span>
        </label>
        <input
          id="city"
          type="text"
          placeholder="Type here"
          class="input input-bordered w-full bg-white "
        />
        <label for="email" class="label">
          <span class="label-text">Email</span>
        </label>
        <input
          id="email"
          type="text"
          placeholder="Type here"
          class="input input-bordered w-full bg-white"
        />
        <label for="phno" class="label">
          <span class="label-text">Phone Number</span>
        </label>
        <input
          id="phno"
          type="text"
          placeholder="Type here"
          class="input input-bordered w-full bg-white"
        />
        <label for="status" class="label">
          <span class="label-text">Status</span>
        </label>
        <select id="status" class="select w-full bg-white ">
          <option disabled selected>Pick status</option>
          {#each status as s}
            <option value={s}>{s}</option>
          {/each}
        </select>

        <button type="submit" class="btn mt-5 w-fit">Submit</button>
      </form>
    </div>
  </div>

  <div class="bg-white  m-2 flex flex-col p-5 rounded-xl shadow-xl ">
    <div class="text-2xl opacity-50 font-semibold">Share form</div>
    <div class="opacity-50">Automated Lead Entry</div>

    <div class="my-10 flex flex-col gap-7 ">
      <div>
        <div>1. Ask the lead to visit</div>
        <div class="p-3 bg-slate-100 text-center font-mono rounded-xl mt-2">
          http://randome.com/fill-form
        </div>
      </div>
      <div>
        <div>2. Give them this code to fill this form automatically</div>
        <div class="my-4">Shareable Code</div>
        <div class="flex gap-4 justify-between ">
          <div
            class="bg-slate-100 p-3 w-full text-center font-semibold text-2xl rounded-2xl "
          >
            1
          </div>
          <div
            class="bg-slate-100 p-3 w-full text-center font-semibold text-2xl rounded-2xl "
          >
            1
          </div>
          <div
            class="bg-slate-100 p-3 w-full text-center font-semibold text-2xl rounded-2xl "
          >
            1
          </div>
          <div
            class="bg-slate-100 p-3 w-full text-center font-semibold text-2xl rounded-2xl "
          >
            1
          </div>
        </div>
      </div>
    </div>

    <div class="text-2xl text-center my-auto opacity-50">
      Connection Waiting...
    </div>
    <div class=" text-center flex items-center justify-center gap-3 mt-auto">
      <div
        class="font-semibold text-blue-600 bg-blue-100 p-3 px-5 rounded-full"
      >
        Refresh
      </div>
      <div class="font-semibold text-red-600 bg-red-100 p-3 px-5 rounded-full">
        Close Connection
      </div>
    </div>
  </div>
</section>

<style>
  .slider-wrapper {
    display: inline-block;
    width: 20px;
    height: 150px;
    padding: 0;
  }
  .slider-wrapper input {
    width: 150px;
    height: 20px;
    margin: 0;
    transform-origin: 75px 75px;
    transform: rotate(-90deg);
  }

  ::-webkit-scrollbar {
    height: 8px;
    scroll-margin: 2em;
  }

  ::-webkit-scrollbar-track {
    background-color: #e4e4e4;
    border-radius: 100px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 100px;
    border: 10px solid rgba(0, 0, 0, 0.18);
    @apply bg-blue-500;
  }
</style>
