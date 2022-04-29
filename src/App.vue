<script setup>
import { RouterLink, RouterView } from "vue-router";
import logo from "./assets/svg/logo.svg";
import NavBar from "./components/NavBar.vue";
import { supabase } from "./supabase/supabase";
import { userStatusStore } from "./stores/counter";

// Pinia state management
// Instance the store, counter.count is the internal variable that is used as key for the header template
const session = userStatusStore();
// Watching session state change triggered by various actions such as login/disconnect to refresh the app
userStatusStore().$subscribe((mutation) => {
   // console.log("it liiiives! (hi this is patrierrm the header");
   console.log("state change");
   if (userStatusStore().session !== null) {
      userStatusStore().isAuthenticated = true;
   }
   if (userStatusStore().session === null) {
      // console.log("Hi ma");
      userStatusStore().isAuthenticated = false;
   }
});
</script>

<script>
export default {
   data() {
      return {
         // Instance pinia user store
         userStore: userStatusStore(),
      };
   },
   methods: {
      pageTest() {
         this.userStore.increaseCount();
         console.log(this.userStore.count);
      },
   },
   beforeMount() {
      console.log(this.userStore.getAuthStatus());
   },
};
</script>

<template>
   <header
      class="container mx-auto flex justify-between my-10 items-center flex-col md:flex-row"
      :key="userStore.count + 1"
   >
      <NavBar></NavBar>
   </header>

   <RouterView :key="userStore.count" />
</template>

<style>
.router-link-active {
   font-weight: 600 !important;
}
</style>
