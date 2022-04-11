<script>
  export let selectedStoryUID;
  export let users;
</script>

<div>
  <div class="my-4 mb-2 font-bold opacity-50">Stories</div>

  <div class="flex gap-5 mb-5">
    {#each users as { avatarURL, uid }}
      {#if uid === selectedStoryUID}
        <div
          on:click={() => {
            selectedStoryUID = uid;
          }}
          class="avatar"
        >
          <div class="w-20 rounded-full border-2 border-blue-500">
            <img src={avatarURL} />
          </div>
        </div>
      {:else}
        <div
          on:click={() => {
            selectedStoryUID = uid;
          }}
          class="avatar"
        >
          <div class="w-20 rounded-full">
            <img src={avatarURL} />
          </div>
        </div>
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
    background-color: #5532ff;
  }
</style>
