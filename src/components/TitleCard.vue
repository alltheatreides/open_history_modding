<script setup>
defineProps({
   title: {
      type: String,
      required: false,
   },
   date: {
      type: String,
      required: false,
   },
   liege: {
      type: String,
      required: false,
   },
   holder: {
      type: String,
      required: false,
   },
   government: {
      type: String,
      required: false,
   },
   change_development_level: {
      type: String,
      required: false,
   },
   succession_laws: {
      type: [Array],
      required: false,
   },
   de_jure_liege: {
      type: String,
      required: false,
   },
   insert_title_history: {
      type: String,
      required: false,
   },
   holder_ignore_head_of_faith_requirement: {
      type: String,
      required: false,
   },
});
</script>

<template>
   <div
      class="flex flex-col gap-4 bg-[#ede7d9] p-6 rounded-xl w-[350px] border-b-2 border-gray-800"
   >
      <div class="flex gap-2 text-normal border-b-2 border-secondary">
         <p class="font-semibold">Date:</p>
         <p class="">{{ date }}</p>
      </div>
      <div class="flex gap-2 text-normal">
         <p class="font-semibold">Title:</p>
         <h3 class="text-normal">{{ title }}</h3>
      </div>
      <div class="flex gap-2 text-normal">
         <p class="font-semibold">Liege:</p>
         <h4 class="">{{ liege }}</h4>
      </div>
      <div class="flex gap-2 text-normal">
         <p class="font-semibold">Holder:</p>
         <p class="">{{ holder }}</p>
      </div>
      <div class="flex gap-2 text-normal">
         <p class="font-semibold">Government:</p>
         <p class="">{{ government }}</p>
      </div>
      <div class="">
         <p class="text-normal font-semibold">Succession Laws:</p>
         <div class="mt-2 flex flex-col gap-2">
            <p class="" v-for="succession_law in succession_laws">
               {{ succession_law }}
            </p>
         </div>
      </div>
      <div class="flex gap-2 text-normal">
         <p class="font-semibold">De Jure Liege:</p>
         <p class="">{{ de_jure_liege }}</p>
      </div>
      <div class="flex gap-2 text-normal">
         <p class="font-semibold">Insert Title History:</p>
         <p class="">{{ insert_title_history }}</p>
      </div>
      <div class="flex gap-2 text-normal">
         <p class="font-semibold">Holder ignore head of faith requirement:</p>
         <p class="">{{ holder_ignore_head_of_faith_requirement }}</p>
      </div>
   </div>
</template>
