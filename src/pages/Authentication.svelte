<script>
  import { gql } from "@apollo/client/core";
  import { mutation } from "svelte-apollo";
  import { ApolloClient, InMemoryCache } from "@apollo/client";
  import { setClient } from "svelte-apollo";
  let email, password;

  let client = new ApolloClient({
    uri: "http://localhost:3000/graphql",
    cache: new InMemoryCache(),
  });

  setClient(client);

  const SIGNIN = gql`
    mutation SignIn($email: String!, $password: String!) {
      signIn(email: $email, password: $password)
    }
  `;
  const SIGNIN_MUTATION = mutation(SIGNIN);
</script>

<section class="grid grid-cols-1 lg:grid-cols-3 min-h-screen">
  <div class="p-10">
    <div class="flex h-full justify-center items-center flex-col w-full ">
      <img class=" w-1/2 mx-auto" src="assets/logo.png" alt="" srcset="" />
      <div class="mt-5 font-bold text-5xl">Welcome to LMS</div>
      <div class="leading-loose">powered by 3 Coders</div>
      <form
        on:submit|preventDefault={async () => {
          const { loading, error, data } = await SIGNIN_MUTATION({
            variables: { email, password },
          });
          console.log(loading, error, data);
        }}
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
          type="submit"
          class="p-4 rounded-lg font-bold mt-5 bg-blue-500 text-white text-xl"
        >
          Sign In
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
