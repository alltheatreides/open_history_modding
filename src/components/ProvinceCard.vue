<script setup>
defineProps({
   province_id: {
      type: Number,
      required: false,
   },
   barony: {
      type: String,
      required: false,
   },
   holding_type: {
      type: String,
      required: false,
   },
   culture: {
      type: String,
      required: false,
   },
   religion: {
      type: String,
      required: false,
   },
   date: {
      type: String,
      required: false,
   },
   buildings: {
      type: [Array],
      required: false,
   },
   special_buildings: {
      type: String,
      required: false,
   },
   duchy_capital_building: {
      type: String,
      required: false,
   },
   special_building_slot: {
      type: String,
      required: false,
   },
   terrain: {
      type: String,
      required: false,
   },
   author: {
      type: Object,
      required: false,
   },
   manual: {
      type: Boolean,
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
         <p class="font-semibold">Province ID:</p>
         <h3 class="text-normal">{{ province_id }}</h3>
      </div>
      <div class="flex gap-2 text-normal">
         <p class="font-semibold">Title:</p>
         <h4 class="">{{ barony }}</h4>
      </div>
      <div class="flex gap-2 text-normal">
         <p class="font-semibold">Holding type:</p>
         <p class="">{{ holding_type }}</p>
      </div>
      <div class="flex gap-2 text-normal">
         <p class="font-semibold">Culture:</p>
         <p class="">{{ culture }}</p>
      </div>
      <div class="flex gap-2 text-normal">
         <p class="font-semibold">Religion:</p>
         <p class="">{{ religion }}</p>
      </div>
      <div class="">
         <p class="text-normal font-semibold">Buildings:</p>
         <div class="mt-2 flex flex-col gap-2">
            <p class="" v-for="building in buildings">
               {{ building }}
            </p>
         </div>
      </div>
      <div class="">
         <p class="text-normal font-semibold">Special Buildings:</p>
         <div class="flex flex-col gap-2">
            <p class="" v-for="special_building in special_buildings">
               {{ special_building }}
            </p>
         </div>
      </div>
      <div class="flex gap-2 text-normal">
         <p class="font-semibold">Duchy Capital Building:</p>
         <p class="">{{ duchy_capital_building }}</p>
      </div>
      <div class="flex gap-2 text-normal">
         <p class="font-semibold">Special Building Slot:</p>
         <p class="">{{ special_building_slot }}</p>
      </div>
      <div class="flex gap-2 text-normal">
         <p class="font-semibold">Terrain:</p>
         <p class="">{{ terrain }}</p>
      </div>
      <div class="flex gap-2 text-normal" v-if="author">
         <p class="font-semibold">Author:</p>
         <p class="">{{ author.name }}</p>
      </div>
      <div class="flex gap-2 text-normal">
         <p class="font-semibold">Manually added:</p>
         <p class="">{{ manual }}</p>
      </div>
   </div>
</template>
