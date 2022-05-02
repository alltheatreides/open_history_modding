<script setup>
import router from "../router";
import logo from "../assets/svg/logo.svg";
import { userStatusStore } from "../stores/counter";
</script>

<script>
export default {
   data() {
      return {
         // Instance pinia user store
         userStore: userStatusStore(),
         authenticated: userStatusStore().isAuthenticated,
      };
   },
   methods: {
      logout() {
         this.userStore.logout();
         this.userStore.increaseCount();
         // console.log(this.userStore.session);
         router.push("/");
      },
   },
};
</script>

<template>
   <nav class="w-[90%] px-2 sm:px-4 py-2.5" :key="userStore.count + 2">
      <div
         class="container flex flex-wrap justify-between items-center mx-auto"
      >
         <!-- Logo -->
         <router-link to="/" class="flex items-center">
            <img
               :src="logo"
               class="mr-3 h-6 sm:h-9"
               alt="History Export Logo"
            />
         </router-link>
         <!-- Mobile Button menu -->
         <button
            data-collapse-toggle="mobile-menu"
            type="button"
            class="flex-1 justify-end inline-flex items-center p-2 ml-3 text-sm text-secondary rounded-lg md:hidden"
            aria-controls="mobile-menu"
            aria-expanded="false"
         >
            <span class="sr-only">Open main menu</span>
            <svg
               class="w-12 h-12"
               fill="currentColor"
               viewBox="0 0 20 20"
               xmlns="http://www.w3.org/2000/svg"
            >
               <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
               ></path>
            </svg>
            <svg
               class="hidden w-6 h-6"
               fill="currentColor"
               viewBox="0 0 20 20"
               xmlns="http://www.w3.org/2000/svg"
            >
               <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
               ></path>
            </svg>
         </button>
         <!-- Menu -->
         <div class="hidden w-full md:block md:w-auto" id="mobile-menu">
            <ul
               class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 text-lg lg:text-xl justify-end items-center"
            >
               <!-- Home -->
               <li>
                  <router-link
                     to="/"
                     class="block py-2 pr-4 pl-3 text-secondary"
                     aria-current="page"
                     >Home</router-link
                  >
               </li>
               <!-- About -->
               <li>
                  <router-link
                     to="about"
                     class="block py-2 pr-4 pl-3 text-secondary"
                     >About</router-link
                  >
               </li>
               <!-- Vanilla History -->
               <li>
                  <router-link
                     to="vanilla-history"
                     class="block py-2 pr-4 pl-3 text-secondary"
                     >Vanilla History</router-link
                  >
               </li>
               <!-- Register -->
               <li>
                  <router-link
                     v-if="!userStatusStore().isAuthenticated"
                     to="register"
                     class="block py-2 pr-4 pl-3 text-secondary"
                     >Register</router-link
                  >
               </li>
               <!-- Login -->
               <li v-if="!userStatusStore().isAuthenticated">
                  <router-link
                     to="login"
                     class="block py-2 pr-4 pl-3 text-secondary"
                     >Login</router-link
                  >
               </li>

               <!-- Create Entry -->
               <li>
                  <router-link
                     v-if="userStatusStore().isAuthenticated"
                     to="create-history"
                     class="block py-2 pr-4 pl-3 text-secondary"
                     title="Create a new history entry"
                  >
                     <div class="">
                        <svg
                           width="25"
                           height="20"
                           viewBox="0 0 50 41"
                           fill="none"
                           xmlns="http://www.w3.org/2000/svg"
                        >
                           <path
                              d="M48 7.15H25.5625L18.2313 0.1375C18.138 0.0501734 18.0153 0.0010956 17.8875 0H2C0.89375 0 0 0.89375 0 2V39C0 40.1063 0.89375 41 2 41H48C49.1063 41 50 40.1063 50 39V9.15C50 8.04375 49.1063 7.15 48 7.15ZM32.5 24.5625C32.5 24.8 32.2875 25 32.0312 25H26.75V30.3063C26.75 30.55 26.55 30.75 26.3125 30.75H23.6875C23.45 30.75 23.25 30.55 23.25 30.3063V25H17.9688C17.7125 25 17.5 24.8 17.5 24.5625V21.9375C17.5 21.7 17.7125 21.5 17.9688 21.5H23.25V16.1938C23.25 15.95 23.45 15.75 23.6875 15.75H26.3125C26.55 15.75 26.75 15.95 26.75 16.1938V21.5H32.0312C32.2875 21.5 32.5 21.7 32.5 21.9375V24.5625Z"
                              fill="#3A343A"
                           />
                        </svg>
                     </div>
                  </router-link>
               </li>
               <!-- User page -->
               <li v-if="userStatusStore().isAuthenticated">
                  <router-link to="/profile" title="Go to your profile page">
                     <div
                        class="relative w-10 h-10 overflow-hidden bg-secondary rounded-full"
                     >
                        <svg
                           class="absolute w-12 h-12 text-primary -left-1"
                           fill="#F7F0E1"
                           viewBox="0 0 20 20"
                           xmlns="http://www.w3.org/2000/svg"
                        >
                           <path
                              fill-rule="evenodd"
                              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                              clip-rule="evenodd"
                           ></path>
                        </svg>
                     </div>
                  </router-link>
               </li>
               <!-- Log Out -->
               <li>
                  <button
                     v-if="userStatusStore().isAuthenticated"
                     @click="logout"
                     title="Log out of user session"
                     class="block py-2 pr-4 pl-3 text-secondary"
                  >
                     <svg
                        width="25"
                        height="25"
                        viewBox="0 0 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path
                           d="M12.4957 3.125H3.125V21.875H12.5"
                           stroke="currentColor"
                           stroke-width="4"
                           stroke-linecap="round"
                           stroke-linejoin="round"
                        />
                        <path
                           d="M17.1875 17.1875L21.875 12.5L17.1875 7.8125"
                           stroke="currentColor"
                           stroke-width="4"
                           stroke-linecap="round"
                           stroke-linejoin="round"
                        />
                        <path
                           d="M8.3335 12.4957H21.8752"
                           stroke="currentColor"
                           stroke-width="4"
                           stroke-linecap="round"
                           stroke-linejoin="round"
                        />
                     </svg>
                  </button>
               </li>
               <!-- <li>
                  <router-link
                     to="#"
                     class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                     >Services</router-link
                  >
               </li>
               <li>
                  <router-link
                     to="#"
                     class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                     >Pricing</router-link
                  >
               </li>
               <li>
                  <router-link
                     to="#"
                     class="block py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                     >Contact</router-link
                  >
               </li> -->
            </ul>
         </div>
      </div>
   </nav>
</template>

<style>
.router-link-active {
   font-weight: 600 !important;
}
@media (max-width: 640px) {
   .router-link-active {
      @apply text-primary !important;
      @apply bg-secondary !important;
   }
}
</style>
