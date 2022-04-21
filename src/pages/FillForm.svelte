<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { courses } from "../constants";
  let fullBoxes;
  let currentBox = 0;
  let box1;
  let box2;
  let box3;
  let box4;
  let code = "33";
  let selectedCourse = [];
  $: {
    console.log(selectedCourse);
  }

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

  {#if code}
    <form class="flex flex-col w-full gap-3 max-w-md" action="">
      <label class="mt-3" for="">Name</label>
      <input
        class="input p-3 w-full "
        type="text"
        placeholder="What should we call you?"
      />
      <label class="mt-3" for="">What course are you Interested in?</label>
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

      <label class="mt-3" for="">Email</label>
      <input class="input p-3 w-full " type="text" placeholder="Email" />
      <label class="mt-3" for="">Phone number</label>
      <input class="input p-3 w-full " type="text" placeholder="Phone Number" />
      <label class="mt-3" for="">City</label>
      <input class="input p-3 w-full " type="text" placeholder="City" />
    </form>
  {:else}
    <form
      in:fade
      out:fade
      on:submit|preventDefault={() => {
        code = fullBoxes[0].value;
        code += fullBoxes[1].value;
        code += fullBoxes[2].value;
        code += fullBoxes[3].value;
        code = code.trim();
        console.log(code);
      }}
      class="max-w-screen-md w-full my-auto"
    >
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
        <button type="submit" class="btn w-fit text-lg bg-blue-900  border-0"
          >Submit</button
        >
      </div>
    </form>
  {/if}

  <div class="mt-auto opacity-50 ">⚡ Built by Students of NHCE</div>
</section>
