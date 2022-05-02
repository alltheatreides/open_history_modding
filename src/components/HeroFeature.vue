<script setup>
import arrow from "../assets/svg/arrow.svg";
defineProps({
   title: {
      type: String,
      required: true,
   },
   description: {
      type: String,
      required: true,
   },
   picture: {
      type: String,
      required: true,
   },
   callToAction: {
      type: String,
      required: true,
   },
   link: {
      type: String,
      required: true,
   },
});
// bg-[#fbe1a2]
</script>

<template>
   <div class="bg-[#ede7d9] rounded-xl p-10">
      <img
         :src="picture"
         alt="small icon"
         class="bg-tertiary max-w-[40px] lg:max-w-[50px] p-2 rounded-full"
      />
      <h2 class="font-bold 2xl:text-lg my-4 whitespace-nowrap">
         {{ title }}
      </h2>
      <p class="text-sm 2xl:text-sm lg:min-h-[110px] xl:min-h-[100px]">
         {{ description }}
      </p>
      <router-link :to="link" class="flex gap-4 mt-6 w-full items-center">
         <button
            class="font-medium 2xl:text-lg whitespace-nowrap text-lg underline underline-offset-8 decoration-4 decoration-tertiary"
         >
            {{ callToAction }}
         </button>
         <img :src="arrow" alt="arrow image" class="" />
      </router-link>
   </div>
</template>
