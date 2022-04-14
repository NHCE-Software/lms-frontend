<script>
  import RemarksCard from "../components/RemarksCard.svelte";

  import CallerLeadsTable from "../components/CallerLeadsTable.svelte";
  let selectedLeadID;
  let data = {
    leads: [
      {
        leadid: "bro",
        name: "123",
        email: "email",
        phone: "phone",
        city: "city",
        status: "status",
        source: "source",
        loadedby: "user1",
        loadeduserid: "userid1",
        city: "city",
      },
      {
        leadid: "bro",
        name: "123",
        email: "email",
        phone: "phone",
        city: "city",
        status: "status",
        source: "source",
        loadedby: "user",
        loadeduserid: "userid",
        city: "city",
      },
    ],
  };
  let selectedLeadData = {
    leadid: "bro",
    name: "123",
    email: "email",
    phone: "phone",
    city: "city",
    status: "Hot",
    source: [
      "source1",
      "source2",
      "source2",
      "source2",
      "source2",
      "source2",
      "source2",
    ],
    remarks: [
      {
        remark: "remark",
        date: "date",
        followup: "date",
        updatedby: "user",
      },
    ],
  };
  import Navbar from "../components/Navbar.svelte";
</script>

<input type="checkbox" id="editmodal" class="modal-toggle" />
<div class="modal">
  <div class="modal-box bg-white">
    <h3 class="font-bold text-lg">Edit Leads</h3>
    <form action="" class="gap-2 flex flex-col my-4">
      <label for="" class="tracking-wide opacity-50">Email</label>
      <input
        type="text"
        class="w-full p-2  border rounded-lg"
        placeholder="Email"
        name=""
        id=""
      />
      <label for="" class="tracking-wide opacity-50">City</label>
      <input
        type="text"
        class="w-full p-2  border rounded-lg"
        placeholder="City"
        name=""
        id=""
      />
      <label for="" class="tracking-wide opacity-50">Phone</label>
      <input
        type="text"
        class="w-full p-2  border rounded-lg"
        placeholder="Phone"
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
      <label for="" class="tracking-wide opacity-50">Status</label>
      <select class="p-2 border rounded-xl" name="" id="">
        <option value="hot">Hot</option>
        <option value="hot">Cold</option>
        <option value="hot">Awaiting</option>
        <option value="hot">Closed</option>
      </select>
    </form>
    <div class="modal-action">
      <label for="" class="btn">Save</label>
      <label for="editmodal" class="btn">Close</label>
    </div>
  </div>
</div>

<input type="checkbox" id="addremarksmodal" class="modal-toggle" />
<div class="modal">
  <div class="modal-box bg-white">
    <h3 class="font-bold text-lg">Add Remarks</h3>
    <form action="" class="gap-2 flex flex-col my-4">
      <label for="">Remarks</label>
      <textarea
        name=""
        placeholder="Start typing here..."
        class="border rounded-lg p-3"
        id=""
        cols="30"
        rows="10"
      />
      <label for="">Follow Up Call</label>

      <input type="date" class="border rounded-xl p-3" name="" id="" />
    </form>
    <div class="modal-action">
      <label for="addremarksmodal" class="btn">Close</label>
    </div>
  </div>
</div>

<section class="grid min-h-screen h-full grid-cols-5 p-5">
  <Navbar />
  <div class="col-span-3 m-10">
    <div class="flex justify-between">
      <div>
        <div class="text-3xl">Welcome, Caller</div>
        <div class="text-xl opacity-50">Add, Edit and Remove Leads</div>
      </div>
      <label
        for="addusermodal"
        class="px-4 rounded-full h-fit hover:bg-blue-200 transition-all  w-fit py-2 font-semibold bg-blue-100 text-blue-500"
      >
        Add Leads
      </label>
    </div>
    <div class="overflow-auto mt-10 ">
      <CallerLeadsTable bind:selectedLeadID data={data.leads} />
    </div>
  </div>
  <div
    class="bg-white col-span-1 rounded-xl shadow-xl flex flex-col max-h-screen h-full p-5 "
  >
    <div class="text-center text-2xl mt-2 ">{selectedLeadData.name}</div>
    <div class="flex flex-wrap justify-center gap-5 mt-3">
      <div
        class="text-center opacity-50 flex items-center gap-3 justify-center"
      >
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <div>{selectedLeadData.city}</div>
      </div>
      <div
        class="text-center opacity-50 flex items-center gap-3 justify-center"
      >
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
        </div>
        <div>{selectedLeadData.phone}</div>
      </div>
      <div
        class="text-center opacity-50 flex items-center gap-3 justify-center"
      >
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
            />
          </svg>
        </div>
        <div>{selectedLeadData.email}</div>
      </div>
    </div>
    <div class="">
      <div class="text-2xl font-semibold opacity-50">Sources</div>
      <div class="flex gap-3 overflow-auto">
        {#each selectedLeadData.source as source}
          <div class="p-3 border rounded-xl flex-none">{source}</div>
        {/each}
      </div>
    </div>
    <div class="mt-5">
      <div class="text-2xl font-semibold opacity-50">Status</div>
      <div
        class="border rounded-2xl p-3 flex items-center bg-red-100 text-red-500 gap-3 justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
            clip-rule="evenodd"
          />
        </svg>
        {selectedLeadData.status} Lead
      </div>
    </div>
    <div class="  h-2/3 flex flex-col ">
      <div class="text-2xl font-semibold opacity-50">Remarks</div>
      <div class=" overflow-auto flex flex-col p-3 gap-3 ">
        {#each selectedLeadData.remarks as remark}
          <RemarksCard {remark} />
        {/each}
      </div>
    </div>
    <div class="flex gap-3 justify-center m-2 ">
      <label
        for="addremarksmodal"
        class="border rounded-lg p-3 bg-blue-100 text-blue-500 font-semibold"
      >
        Add Remarks
      </label>
      <label
        for="editmodal"
        class="border rounded-lg p-3 bg-blue-100 text-blue-500 font-semibold"
      >
        Edit Leads Info
      </label>
    </div>
  </div>
</section>

<style>
  ::-webkit-scrollbar {
    height: 8px;
    width: 8px;
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
