<script setup>
import { RouterLink, RouterView } from "vue-router";
import logo from "./assets/svg/logo.svg";
</script>

<template>
   <header class="container mx-auto flex justify-between my-10 items-center">
      <router-link to="/">
         <img :src="logo" alt="" />
      </router-link>
      <nav class="flex-1 flex gap-20 justify-end px-6">
         <router-link to="/" class="text-2xl font-thin">Home</router-link>
         <router-link
            to="/vanilla-history"
            class="text-2xl font-thin text-primary"
            >Vanilla History</router-link
         >
         <router-link to="/profile" class="text-2xl font-thin text-primary"
            >Profile</router-link
         >
      </nav>
   </header>

   <RouterView />
</template>

<style>
.router-link-active {
   font-weight: 600 !important;
}
</style>
