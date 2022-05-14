<script>
  import { gql } from "@apollo/client/core";
  import Papa from "papaparse";
  import { mutation } from "svelte-apollo";
  import { replace } from "svelte-spa-router";
  import Navbar from "../components/Navbar.svelte";
  import { sanitize } from "string-sanitizer";
  import {
    courses,
    sources,
    predef,
    preloadedMaps,
    preloadedMapsCourses,
  } from "../constants";
  let file;
  let source = "";
  let cols = [];
  let allCoursesInCSV = [];
  let coursesMapper = [];
  let chosen = [];
  let data = [];
  let chosenMapper = {};

  function initChosen() {
    if (cols.length != 0)
      chosen = cols.map((col) => ({
        old: col,
        new: col,
      }));
  }

  let INSERTLEAD = gql`
    mutation Mutation($record: [JSON]) {
      addleads(record: $record)
    }
  `;
  let INSERTLEAD_MUTATION = mutation(INSERTLEAD);

  async function insertAllLeads() {
    if (confirm("Confirm transformation? This cannot be undone.")) {
      data = data.map((item) => {
        return { ...item, source: source };
      });
      //console.log(data);
      let res = await INSERTLEAD_MUTATION({ variables: { record: data } });
      console.log(res.data);
      if (res.data.addleads === null) {
        swal("Lead Exists", "No changes were made", "success");
        replace("/lead-details");
      } else if (res.data.addleads.message) {
        swal("Added Lead", "We are good to go", "success");
        replace("/lead-details");
      } else {
        swal("Oops", "Something went wrong", "error");
      }
    }
  }
  function mapData(course) {
    let data2 = data.map((item) => {
      let newItem = {};
      for (let key in item) {
        if (chosenMapper[key] === "Drop") {
          continue;
        } else {
          //console.log(item[key]);
          if (newItem[chosenMapper[key]] != undefined) {
            newItem[chosenMapper[key]] = newItem[chosenMapper[key]].concat(
              " " + item[key]
            );
          } else {
            newItem[chosenMapper[key]] = item[key];
          }
        }
      }
      return newItem;
    });
    //console.log(data);
    console.log(data2);
    data = [...data2];
    cols = Object.keys(data[0]);
    initChosen();
    if (course) {
      // map courses
      console.log(coursesMapper);
      console.log(preloadedMapsCourses[source.toLowerCase()]);
      coursesMapper = Object.keys(
        preloadedMapsCourses[source.toLowerCase()]
      ).map((key) => {
        return {
          old: key,
          new: preloadedMapsCourses[source.toLowerCase()][key],
        };
      });
      // console.log("temp", temp);
      mapCourses();
    }
  }
  function mapCourses() {
    let mapper = Object.assign(
      {},
      ...coursesMapper.map((x) => ({
        [x.old]: x.new,
      }))
    );
    console.log(mapper);
    data = data.map((item) => {
      if (item.course && mapper[item.course]) {
        item.course = mapper[item.course];
      }
      return item;
    });
  }

  function setSource() {
    if (
      sources.includes(source) &&
      confirm(`Are you sure to apply ${source} transformation to the data?`)
    ) {
      console.log(preloadedMaps[source.toLowerCase()]);
      chosen = chosen.map((item) => {
        if (preloadedMaps[source.toLowerCase()][item.old]) {
          return {
            old: item.old,
            new: preloadedMaps[source.toLowerCase()][item.old],
          };
        } else {
          return item;
        }
      });
      console.log(chosen);
    } else if (!sources.includes(source)) {
      console.log("custom source");
    } else {
      source = "";
    }
  }

  $: {
    file &&
      Papa.parse(file[0], {
        header: true,
        complete: function (res) {
          console.log("Parsed");
          console.log(res.data);
          cols = res.meta.fields.map((item) => {
            return sanitize(item.toLowerCase());
          });
          let acc = {};
          let tdata = [];
          for (let index = 0; index < res.data.length; index++) {
            const element = res.data[index];
            console.log(Object.keys(element));
            for (let key of Object.keys(element)) {
              console.log(key);
              acc[sanitize(key.toLowerCase())] = element[key];
            }
            tdata.push(acc);
            acc = {};
          }
          console.log(tdata);

          data = [...tdata];
          initChosen();
        },
      });
  }
  $: {
    if (cols.includes("course")) {
      allCoursesInCSV = [...new Set(data.map((item) => item.course))];
    }
  }
  $: {
    chosenMapper = Object.assign(
      {},
      ...chosen.map((x) => ({ [x.old]: x.new }))
    );
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
            bind:value={chosenMapper[col]}
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
            <option disabled>Choose attribute</option>
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
        for="map-modal"
        on:click={() => {
          console.log(chosen);
          //console.log(data);

          mapData();
        }}
        class="btn bg-blue-500 border-none text-white">Map</label
      >
      <label for="map-modal" class="btn border-none bg-blue-500 text-white"
        >close</label
      >
    </div>
  </div>
</div>
<input type="checkbox" id="map-course-modal" class="modal-toggle" />
<div class="modal ">
  <div class="modal-box max-w-5xl bg-white">
    <div class="flex gap-3 flex-col">
      {#each allCoursesInCSV as cc}
        <div
          class="flex items-center  w-full justify-between border p-2 rounded-2xl px-5"
        >
          <div class="">{cc}</div>
          <select
            on:change={(e) => {
              let x = coursesMapper.find((item) => item.old === cc);
              if (x) {
                x.new = e.target.value;
              } else {
                coursesMapper.push({ old: cc, new: e.target.value });
              }
              console.log(coursesMapper);
            }}
            class="select select-bordered w-full max-w-xs bg-white"
          >
            <option disabled selected>Choose attribute</option>
            {#each courses as c}
              <option value={c}>{c}</option>
            {/each}
          </select>
        </div>
      {/each}
    </div>
    <div class="modal-action">
      <div
        on:click={() => {
          mapCourses();
        }}
        class="btn"
      >
        Replace Courses
      </div>
      <label
        for="map-course-modal"
        class="btn border-none bg-blue-500 text-white">close</label
      >
    </div>
  </div>
</div>

<input type="checkbox" id="sources-modal" class="modal-toggle" />
<div class="modal">
  <div class="modal-box bg-white  ">
    <div class="text-xl font-bold my-2">Choose Source for the data</div>
    <div class="grid grid-cols-2 gap-2">
      {#each sources as s}
        {#if source === s}
          <div
            class="p-6 border-blue-400 bg-blue-200 border-2 text-blue-600 font-bold rounded-2xl"
          >
            {s}
          </div>
        {:else}
          <div
            on:click={() => {
              source = s;
            }}
            class="p-6 border rounded-2xl"
          >
            {s}
          </div>
        {/if}
      {/each}

      <input
        bind:value={source}
        type="text"
        placeholder="custom source"
        class="p-6 border rounded-2xl"
      />
    </div>
    <div class="modal-action">
      <label for="sources-modal" on:click={setSource} class="btn">Confirm</label
      >
      <label for="sources-modal" class="btn">Close</label>
    </div>
  </div>
</div>

<section class="grid min-h-screen h-full grid-cols-5 p-5">
  <Navbar />
  <div class="col-span-4 m-10">
    <form
      on:submit|preventDefault={insertAllLeads}
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
              source = "";
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
            {#if !source}
              <label
                class="px-3 py-2 font-bold bg-blue-600 text-blue-200 rounded-full"
                for="sources-modal"
              >
                Choose source
              </label>
            {:else}
              <label>{source}</label>
            {/if}
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
          <!-- svelte-ignore a11y-label-has-associated-control -->
          {#if sources.includes(source)}
            <label
              on:click={() => mapData(true)}
              class="p-2 m-2 border text-blue-600 bg-blue-100 font-semibold hover:bg-blue-200 rounded-full px-5"
              >Auto Map</label
            >
          {/if}
          <label
            for="map-modal"
            class="p-2 m-2 border text-red-600 bg-red-100 font-semibold hover:bg-red-200 rounded-full px-5"
            >Manually Map</label
          >
          {#if cols.includes("course")}
            <label
              for="map-course-modal"
              class="p-2 m-2 border text-red-600 bg-red-100 font-semibold hover:bg-red-200 rounded-full px-5"
              >Map Course Data</label
            >
          {/if}

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
      <div class=" flex overflow-auto">
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
