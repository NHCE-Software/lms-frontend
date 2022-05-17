<script>
  export let selectedStoryUID;
  export let users;
</script>

<div>
  <div class="grid grid-cols-2 gap-5 mb-5 overflow-auto py-4">
    {#each users as { _id, role, name }}
      {#if role === "caller"}
        {#if _id === selectedStoryUID}
          <div
            on:click={() => {
              selectedStoryUID = _id;
            }}
            class="px-4 py-8 text-center rounded-2xl  text-blue-800 bg-blue-300 font-bold cursor-pointer"
          >
            <div>{name}</div>
          </div>
        {:else}
          <div
            on:click={() => {
              selectedStoryUID = _id;
            }}
            class="px-4 py-8 text-center rounded-2xl bg-white text-black cursor-pointer"
          >
            <div>{name}</div>
          </div>
        {/if}
      {/if}
    {/each}
  </div>
</div>

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
    background-color: #327aff;
  }
</style>
