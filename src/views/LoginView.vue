<script setup>
import { ref, onBeforeMount, onMounted, watch } from "vue";
import { supabase } from "../supabase/supabase";
import router from "../router";
import { userStatusStore } from "../stores/counter";

// REACTIVE STATE START
// Refresh Management
const tagKey = ref(0);
const email = ref("");
const password = ref("");
const errorMsg = ref("");
// Instance pinia user store
const userStore = ref(userStatusStore());

// Internal tracking of the store variable
const logginStatus = ref(null);

// REACTIVE STATE END

// Page Methods START
async function loginSupabase() {
   try {
      // Native supabase method
      let { user, error } = await supabase.auth.signIn({
         email: email.value,
         password: password.value,
      });
      // If no login error, proceed
      if (error === null) {
         console.log("no error in the login, proceed with it");
         // Saving the user info into the store user variable
         // userStore.value = user;
         // Changing the authentified store variable
         userStore.value.isAuthenticated = true;
         console.log("Testing below the auth value");
         console.log(userStore.value.isAuthenticated);
         // Updating the store session info
         userStore.value.getAuthStatus();
         userStore.value.userID = user.id;
         // console.log(getAuthStatus());
         // Redirecting user to the create entry page
         router.push({ name: "createHistory" });
      } else {
         // Saving error info & message to the store error variable to be displayed in the login page error div
         errorMsg.value = error.message;
         console.log(error.message);
      }

      // console.log("no error in the login, proceed with it");
      // Saving the user info into the store user variable
      // userStore.setUserInfo(user);
      // console.log(user);

      // // Changing the authentified store variable
      // userStore.isAuthenticated = true;
      // // Updating the store session info
      // userStore.getAuthStatus();
      // // console.log(getAuthStatus());
      // // Redirecting user to the create entry page
      // router.push({ name: "createHistory" });
   } catch (error) {
      console.log("there is an error");
      console.log(error.message);
   } finally {
      userStore.value.increaseCount();
   }

   // // Redirecting user to the create entry page
   // router.push("/create-history");
   console.log(userStore.value.userStore);
}
// Manages the rerender with template keys
function forceRerender() {
   tagKey.value = tagKey.value + 1;
}
function test() {
   userStore.value.isAuthenticated = true;
   userStore.value.increaseCount();

   console.log(userStore.value.count);
   console.log(userStore.value.isAuthenticated);
}

// lifecycle hooks
onBeforeMount(() => {
   logginStatus.value = userStore.value.getAuthStatus();
});
onMounted(() => {
   console.log(userStore.value.isAuthenticated);
});
</script>

<template>
   <main class="container mx-auto mb-10">
      <!-- <button @click="test">Click</button> -->
      <section class="md:w-3/6 mx-auto h-full my-auto mt-20">
         <h1 class="text-4xl text-center">Login</h1>
         <form class="bg-secondary10 p-6 mt-10">
            <div class="">
               <!-- Form entry: email -->
               <div class="">
                  <label
                     for="email"
                     class="block mb-2 font-medium text-secondary dark:text-gray-300"
                  >
                     Email
                  </label>
                  <input
                     type="email"
                     id="email"
                     class="bg-customWhite border border-gray-300 text-secondary text-sm rounded-lg focus:ring-tertiary focus:border-tertiary block w-full p-2.5"
                     placeholder="Email"
                     required
                     v-model="email"
                  />
               </div>
            </div>
            <div class="mt-10">
               <!-- Form entry: password -->
               <div class="">
                  <label
                     for="password"
                     class="block mb-2 font-medium text-secondary dark:text-gray-300"
                  >
                     Password
                  </label>
                  <input
                     type="password"
                     id="password"
                     class="bg-customWhite border border-gray-300 text-secondary text-sm rounded-lg focus:ring-tertiary focus:border-tertiary block w-full p-2.5"
                     placeholder="Password"
                     required
                     v-model="password"
                  />
               </div>
            </div>

            <p class="mt-4 text text-red-600">
               <span class="font-medium">{{ errorMsg.message }}</span>
            </p>

            <!-- Confirmation button -->
            <button
               type="submit"
               class="mt-5 text-primary bg-secondary hover:bg-tertiary hover:text-secondary focus:ring-4 focus:outline-none focus:ring-tertiary font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
               @click="
                  (e) => {
                     e.preventDefault();
                     loginSupabase();
                  }
               "
            >
               Login
            </button>
         </form>
      </section>
   </main>
</template>
