<script>
  export let remark;
  console.log(remark);
  // remarks:
  //     {
  //       remark: "remark",
  //       date: "date",
  //       followup: "date",
  //       updatedby: "user",
  //     },
</script>

<div class="p-4 border rounded-2xl">
  <div>
    {remark.remark}
  </div>
  <div class="my-3 mb-0 font-semibold flex justify-between">
    <div>updated by {remark.updatedbyname}</div>
    <div>{new Date(remark.createdAt).toLocaleDateString("en-GB")}</div>
  </div>
  <div class="text-blue-600 font-semibold">
    Follow up: {new Date(remark.followup).toLocaleDateString("en-GB")}
  </div>
</div>

<style>
  .h-99 {
    height: 60vh;
  }
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
