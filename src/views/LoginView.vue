<script setup>
import { supabase } from "../supabase/supabase";
import router from "../router";
import { userStatusStore } from "../stores/counter";
</script>

<script>
export default {
   data() {
      return {
         // Refresh Management
         tagKey: 0,

         email: "",
         password: "",
         errorMsg: "",

         // Instance pinia user store
         userStore: userStatusStore(),

         // Internal tracking of the store variable
         logginStatus: null,
      };
   },
   methods: {
      async loginSupabase() {
         try {
            // Native supabase method
            let { user, error } = await supabase.auth.signIn({
               email: this.email,
               password: this.password,
            });
            // If no login error, proceed
            if (error === null) {
               console.log("no error in the login, proceed with it");
               // Saving the user info into the store user variable
               // this.userStore = user;
               // Changing the authentified store variable
               this.userStore.isAuthenticated = true;
               console.log("Testing below the auth value");
               console.log(this.userStore.isAuthenticated);
               // Updating the store session info
               this.userStore.getAuthStatus();
               this.userStore.userID = user.id;
               // console.log(this.getAuthStatus());
               // Redirecting user to the create entry page
               router.push({ name: "createHistory" });
            } else {
               // Saving error info & message to the store error variable to be displayed in the login page error div
               this.errorMsg = error.message;
               console.log(error.message);
            }

            // console.log("no error in the login, proceed with it");
            // Saving the user info into the store user variable
            // this.userStore.setUserInfo(user);
            // console.log(user);

            // // Changing the authentified store variable
            // this.userStore.isAuthenticated = true;
            // // Updating the store session info
            // this.userStore.getAuthStatus();
            // // console.log(this.getAuthStatus());
            // // Redirecting user to the create entry page
            // router.push({ name: "createHistory" });
         } catch (error) {
            console.log("there is an error");
            console.log(error.message);
         } finally {
            this.userStore.increaseCount();
         }

         // // Redirecting user to the create entry page
         // router.push("/create-history");
         console.log(this.userStore.userStore);
      },
      // Manages the rerender with template keys
      forceRerender() {
         this.tagKey = this.tagKey + 1;
      },
      test() {
         this.userStore.isAuthenticated = true;
         this.userStore.increaseCount();

         console.log(this.userStore.count);
         console.log(this.userStore.isAuthenticated);
      },
   },
   beforeMount() {
      // Internal tracking of the store variable
      this.logginStatus = this.userStore.getAuthStatus();
   },
   mounted() {
      // console.log(this.userStore);
      console.log(this.userStore.isAuthenticated);
   },
};
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
