<script setup>
import logo from "../assets/svg/logo.svg";
</script>

<template>
   <nav class="w-[90%] px-2 sm:px-4 py-2.5">
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
               class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 text-xl lg:text-2xl justify-end items-center"
            >
               <li>
                  <router-link
                     to="/"
                     class="block py-2 pr-4 pl-3 rounded md:p-0"
                     aria-current="page"
                     >Home</router-link
                  >
               </li>
               <li>
                  <router-link
                     to="about"
                     class="block py-2 pr-4 pl-3 text-secondary"
                     >About</router-link
                  >
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
   <!-- <h1>hello world</h1> -->
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
