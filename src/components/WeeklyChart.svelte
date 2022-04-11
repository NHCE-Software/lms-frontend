<script>
  export let max = 100;
  let data = [
    {
      value: 23,
      day: "Monday",
    },
    {
      value: 23,
      day: "Tuesday",
    },
    {
      value: 23,
      day: "Wednesday",
    },
    {
      value: 90,
      day: "Thrusday",
    },
    {
      value: 23,
      day: "Friday",
    },
    {
      value: 23,
      day: "Saturday",
    },
  ];
</script>

<div class="bg-white p-10 my-5 flex justify-between rounded-2xl shadow-xl">
  {#each data as { value, day }}
    <div class="flex flex-col items-center justify-center">
      <div class="slider-wrapper ">
        <input
          disabled
          type="range"
          min="0"
          {max}
          {value}
          class="range range-accent"
        />
      </div>
      <div class="mt-3">{day}</div>
      <div class="">{value}</div>
    </div>
  {/each}
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
</style>
