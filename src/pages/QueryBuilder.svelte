<script>
  import Papa from "papaparse";
  import Navbar from "../components/Navbar.svelte";
  let file;
  let cols = [];
  let predef = ["Name", "Phone", "Email", "City", "State", "Course"];
  let chosen = [];
  let data = [];

  $: {
    file && console.log(file[0]);
    file &&
      Papa.parse(file[0], {
        header: true,
        complete: function (results) {
          console.log(results.data);
          console.log(results.meta.fields);
          cols = results.meta.fields;
          data = results.data;
          initChosen();
        },
      });
  }
  function initChosen(mode) {
    if (cols.length != 0)
      chosen = cols.map((col) => ({
        old: col,
        new: mode === 1 ? col : "Drop",
      }));

    console.log("this is chosen", chosen);
  }
</script>

<input type="checkbox" id="map-modal" class="modal-toggle" />
<div class="modal ">
  <div class="modal-box max-w-5xl bg-white">
    <div class="flex gap-3 flex-col">
      {#each cols as col}
        <div
          class="flex items-center w-full justify-between border p-2 rounded-2xl px-5"
        >
          <div class="">{col}</div>
          <select
            on:change={(e) => {
              let newCol = e.target.value;
              let oldCol = col;
              let newChosen = chosen.map((ch) => {
                if (ch.old == oldCol) {
                  return { old: oldCol, new: newCol };
                } else {
                  return ch;
                }
              });
              chosen = newChosen;
              //  console.log(chosen);
            }}
            class="select select-bordered w-full max-w-xs bg-white"
          >
            <option disabled selected>Choose attribute</option>
            <option value="Drop">Drop</option>
            {#each predef as pre}
              <option value={pre}>{pre}</option>
            {/each}
          </select>
        </div>
      {/each}
    </div>
    <div class="modal-action">
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label
        on:click={() => {
          //console.log(chosen);
          //console.log(data);
          let mapper = Object.assign(
            {},
            ...chosen.map((x) => ({ [x.old]: x.new }))
          );
          let data2 = data.map((item) => {
            let newItem = {};
            for (let key in item) {
              if (mapper[key] === "Drop") {
                continue;
              } else {
                //console.log(item[key]);
                if (newItem[mapper[key]] != undefined) {
                  newItem[mapper[key]] = newItem[mapper[key]].concat(
                    " " + item[key]
                  );
                } else {
                  newItem[mapper[key]] = item[key];
                }
              }
            }
            return newItem;
          });
          //console.log(data);
          //console.log(data2);
          data = [...data2];
          cols = Object.keys(data[0]);
          initChosen(1);
        }}
        class="btn bg-blue-500 border-none text-white">Map</label
      >
      <label for="map-modal" class="btn border-none bg-blue-500 text-white"
        >close</label
      >
    </div>
  </div>
</div>

<section class="grid min-h-screen h-full grid-cols-5 p-5">
  <Navbar />
  <div class="col-span-4 m-10">
    <form
      on:submit={() => {
        if (confirm("Confirm transformation? This cannot be undone.")) {
          //server call
          // insert
          console.log(data);
        }
      }}
      class="flex justify-between"
    >
      {#if file}
        <div class="flex gap-3 items-center">
          <svg
            on:click={() => {
              file = undefined;
              cols = [];
              chosen = [];
              data = [];
            }}
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <div class="text-2xl text-blue-500 font-bold">
            {file[0].name}
          </div>
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
              d="M9 5l7 7-7 7"
            />
          </svg>
          <div>
            <input
              required
              type="text"
              placeholder="Source name"
              class="p-3 rounded-xl"
            />
          </div>
        </div>
      {:else}
        <input
          class="file:bg-blue-100 file:text-blue-600 file:border-none file:px-4 file:py-3  file:rounded-full file:mr-5 hover:file:bg-blue-200 file:transition-all file:font-semibold"
          bind:files={file}
          type="file"
          name=""
          id=""
        />
      {/if}
      {#if cols.length != 0}
        <div class="flex items-center">
          <label
            for="map-modal"
            class="p-2 m-2 border text-blue-600 bg-blue-100 font-semibold hover:bg-blue-200 rounded-full px-5"
            >Map Data</label
          >
          <button
            type="submit"
            class="p-3 rounded-full hover:bg-blue-100 transition-all hover:text-blue-600"
          >
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
                d="M5 13l4 4L19 7"
              />
            </svg>
          </button>
        </div>
      {/if}
    </form>
    {#if cols.length != 0}
      <div class="divTable mt-10">
        <div class="divTableHeading">
          <div class="divTableRow">
            <div class="divTableCell" />
            {#each cols as col}
              <div class="divTableCell">{col}</div>
            {/each}
          </div>
        </div>

        <div class="divTableBody">
          {#each data as row, i}
            <div class="divTableRow">
              <div class="divTableCell">{i + 1}</div>
              {#each cols as col}
                <div class="divTableCell">{row[col]}</div>
              {/each}
            </div>
          {/each}
        </div>
      </div>
    {:else}
      <div
        class="text-center text-blue-500 opacity-20 text-7xl flex h-full justify-center items-center"
      >
        Load CSV to get started
      </div>
    {/if}
  </div>
</section>

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
