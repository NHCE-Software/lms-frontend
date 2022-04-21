<script>
  import { gql } from "@apollo/client/core";
  import { mutation } from "svelte-apollo";
  import { push } from "svelte-spa-router";

  let email, password;
  let loading = false;
  const SIGNIN = gql`
    mutation SignIn($email: String!, $password: String!) {
      signIn(email: $email, password: $password)
    }
  `;
  const SIGNIN_MUTATION = mutation(SIGNIN);
  async function signIn() {
    loading = true;
    const { error, data } = await SIGNIN_MUTATION({
      variables: { email, password },
    });
    if (error) return console.log(error);
    else {
      loading = false;
      if (data.signIn.role === "admin") {
        localStorage.setItem("token", data.signIn.token);
        localStorage.setItem("role", data.signIn.role);
        push("/home");
      }
    }
  }
</script>

<section class="grid grid-cols-1 lg:grid-cols-3 min-h-screen">
  <div class="p-10">
    <div class="flex h-full  justify-center items-center flex-col w-full ">
      <div class="text-center mb-auto">
        <img
          class=" w-full p-3 mx-auto"
          src="assets/logo.png"
          alt=""
          srcset=""
        />
        <div class="mt-5 font-bold text-5xl">Welcome to LMS</div>
        <div class="leading-loose">powered by 3 Coders</div>
      </div>
      <form
        on:submit|preventDefault={signIn}
        class="flex gap-2 flex-col mt-5 w-full "
      >
        <label for="">Email</label>
        <input
          bind:value={email}
          type="text"
          class="p-4 rounded-lg bg-white text-black "
          placeholder="Email"
        />
        <label for="">Password</label>
        <input
          bind:value={password}
          type="password"
          class="p-4 rounded-lg bg-white text-black "
          placeholder="Password"
        />
        <button
          disabled={loading}
          type="submit"
          class="p-4 rounded-lg font-bold mt-5 bg-blue-500 text-white text-xl"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  </div>
  <div class="col-span-2 bg-black grid place-items-center ">
    <img
      src="assets/1.png"
      alt=""
      class="rounded-3xl w-full h-full max-h-screen object-cover "
      srcset=""
    />
  </div>
</section>
