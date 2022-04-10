<script>
  let mode = "signin";
</script>

<section class="grid grid-cols-3 min-h-screen">
  <div class="p-10">
    <div class="flex gap-5 cursor-pointer items-center ">
      <div
        on:click={() => (mode = "signin")}
        class={mode === "signin" ? "text-blue-600 font-bold" : ""}
      >
        sign in
      </div>
      <div>|</div>
      <div
        on:click={() => (mode = "signup")}
        class={mode === "signup" ? "text-blue-600 font-bold" : ""}
      >
        sign up
      </div>
      <img class=" w-1/2 ml-auto" src="assets/logo.png" alt="" srcset="" />
    </div>

    <div class="flex h-full justify-center items-center flex-col ">
      <div class="mt-5 font-bold text-5xl">Welcome to LMS</div>
      <div class="leading-loose">powered by 3 Coders</div>
      <form class="flex gap-2 flex-col mt-5">
        <label for="">Email</label>
        <input
          type="text"
          class="p-4 rounded-lg bg-white text-black text-xl"
          placeholder="Email"
        />
        <label for="">Password</label>
        <input
          type="password"
          class="p-4 rounded-lg bg-white text-black text-xl"
          placeholder="Password"
        />
        <button
          class="p-4 rounded-lg font-bold mt-5 bg-blue-500 text-white text-xl"
        >
          Sign In
        </button>
      </form>
    </div>
  </div>
  <div class="col-span-2 bg-black grid place-items-center ">
    <img
      src="https://i.giphy.com/media/iv67d4rQjP5spe2MGi/giphy.webp"
      alt=""
      class="rounded-3xl "
      srcset=""
    />
    <div
      class="font-bold text-white opacity-75 text-6xl absolute max-w-sm text-center bottom-32"
    >
      NHCE's Lead Management system
    </div>
  </div>
</section>
