<script setup>
import { RouterLink, RouterView } from "vue-router";
import logo from "./assets/svg/logo.svg";
import NavBar from "./components/NavBar.vue";
</script>

<template>
   <header
      class="container mx-auto flex justify-between my-10 items-center flex-col md:flex-row"
   >
      <!-- <router-link to="/">
         <img :src="logo" alt="" />
      </router-link>
      <nav class="flex-1 flex gap-20 justify-end px-6 hidden md:block">
         <router-link to="/" class="text-xl lg:text-2xl font-thin"
            >Home</router-link
         >
         <router-link
            to="/vanilla-history"
            class="text-xl lg:text-2xl font-thin text-primary"
            >Vanilla History</router-link
         >
         <router-link
            to="/profile"
            class="text-xl lg:text-2xl font-thin text-primary"
            >Profile</router-link
         >
      </nav> -->
      <NavBar></NavBar>
   </header>

   <RouterView />
</template>

<style>
.router-link-active {
   font-weight: 600 !important;
}
</style>
