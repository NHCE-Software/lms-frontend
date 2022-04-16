<script>
  import { onMount } from "svelte";
  let fullBoxes;
  let currentBox = 0;
  let box1;
  let box2;
  let box3;
  let box4;

  onMount(() => {
    fullBoxes = [box1, box2, box3, box4];
  });
</script>

<section class="flex flex-col  items-center h-screen p-10">
  <div class="max-w-md">
    <img src="assets/logo.png" alt="" srcset="" />
  </div>
  <div class="text-3xl font-black text-blue-900 my-3 mb-10 text-center">
    Department of Admissions
  </div>

  <form action="" class="max-w-screen-md w-full my-auto">
    <div class=" opacity-50 font-semibold text-2xl ">
      Automated Form Filling
    </div>
    <div class="text-lg opacity-25">
      Enter the code recieved to fill in the addmission form
    </div>
    <div class="my-5 flex  gap-3">
      <div
        class="py-5  w-full text-center font-semibold text-5xl px-3 border-2 rounded-2xl"
      >
        <input
          bind:this={box1}
          maxlength="1"
          on:keydown={(event) => {
            if (currentBox < 4) {
              let key = event.key;
              console.log(key);
              if (key == "Backspace") {
              } else {
                fullBoxes[currentBox].focus();
                currentBox += 1;
              }
            }
          }}
          type="text"
          class="w-full text-center bg-transparent md:p-3 outline-none"
        />
      </div>
      <div
        class="py-5 w-full text-center font-semibold text-5xl px-3 border-2 rounded-2xl"
      >
        <input
          bind:this={box2}
          maxlength="1"
          on:keydown={(event) => {
            if (currentBox < 4) {
              let key = event.key;
              console.log(key);
              if (key == "Backspace") {
                currentBox -= 1;
                fullBoxes[currentBox].focus();
              } else {
                fullBoxes[currentBox].focus();
                currentBox += 1;
              }
            }
          }}
          type="text"
          class="w-full text-center bg-transparent md:p-3 outline-none"
        />
      </div>
      <div
        class="py-5 w-full text-center font-semibold text-5xl px-3 border-2 rounded-2xl"
      >
        <input
          bind:this={box3}
          maxlength="1"
          on:keydown={(event) => {
            if (currentBox < 4) {
              let key = event.key;
              console.log(key);
              if (key == "Backspace") {
                currentBox -= 1;
                fullBoxes[currentBox].focus();
              } else {
                fullBoxes[currentBox].focus();
                currentBox += 1;
              }
            }
          }}
          type="text"
          class="w-full text-center bg-transparent md:p-3 outline-none"
        />
      </div>
      <div
        class="py-5 w-full text-center font-semibold text-5xl px-3 border-2 rounded-2xl"
      >
        <input
          bind:this={box4}
          maxlength="1"
          on:keydown={(event) => {
            if (currentBox < 4) {
              let key = event.key;
              console.log(key);
              if (key == "Backspace") {
                currentBox -= 1;
                fullBoxes[currentBox].focus();
              } else {
                fullBoxes[currentBox].focus();
                currentBox += 1;
              }
            }
          }}
          type="text"
          class="w-full text-center bg-transparent md:p-3 outline-none"
        />
      </div>
    </div>
    <div class="flex justify-between items-center">
      <div class="text-lg opacity-25">
        For Assistance, contact the admission executives
      </div>
      <div class="btn w-fit text-lg bg-blue-900  border-0">Submit</div>
    </div>
  </form>
  <div class="mt-auto opacity-50 ">⚡ Built by Students of NHCE</div>
</section>
