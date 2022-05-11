<script setup>
import { ref, onMounted, watch } from "vue";
import { supabase } from "../supabase/supabase";
import router from "../router";

// reactive state
const email = ref("");
const userName = ref("");
const modTeam = ref("");
const password = ref("");
const errorMsg = ref("");

// Page Methods
async function signUpSupabase() {
   try {
      const { user, session, error } = await supabase.auth.signUp({
         email: email.value,
         password: password.value,
      });
      console.log(user);
      console.log(session);
      if (error) {
         errorMsg.value = error;
         throw error;
      } else {
         router.push("/login");
      }
   } catch (error) {
      console.log(error.message);
   } finally {
   }
}
</script>

<template>
   <main class="container mx-auto mb-10">
      <section class="md:w-3/6 mx-auto h-full my-auto mt-20">
         <h1 class="text-4xl text-center">Register</h1>
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
                     signUpSupabase();
                  }
               "
            >
               Register
            </button>
         </form>
      </section>
   </main>
</template>
