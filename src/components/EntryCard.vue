<script setup>
import { ref, onBeforeMount, onMounted, watch } from "vue";

// const title = defineProps([""]);
// const date = defineProps([""]);
defineProps({
   title: String,
   date: String,
   infos: Object,
});

let infoObject = ref({});
let detailsShown = ref(false);

function revealDetail() {
   detailsShown.value = !detailsShown.value;
}
onMounted(() => {
   // console.log(infos);
});
</script>
<!-- w-[250px] <-saved up was for the div below -->
<template>
   <div
      class="px-3.5 py-2 bg-tertiary rounded-[10px] shadow-brutal border border-secondary flex flex-col justify-between min-w-[250px]"
   >
      <!-- Upper part, title and date information -->
      <div class="flex justify-between">
         <h4 class="font-semibold">{{ title }}</h4>
         <p>{{ date }}</p>
      </div>
      <!-- Lower part, detail to expand info and icon type -->
      <div class="flex justify-between mt-4">
         <button
            @click="revealDetail"
            class="flex justify-between items-center gap-2 cursor-pointer"
            title="Click to toggle detailed entry informations"
         >
            <p class="font-extralight">details</p>
            <svg
               width="16"
               height="11"
               viewBox="0 0 16 11"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
               class="opacity-80"
               preserveAspectRatio="none"
            >
               <path
                  opacity="0.8"
                  d="M2.28571 0.886719L8 7.13672L13.7143 0.886719L16 2.13672L8 10.8867L0 2.13672L2.28571 0.886719Z"
                  fill="#3A343A"
               ></path>
            </svg>
         </button>
         <slot></slot>
      </div>
      <div
         v-if="detailsShown"
         class="my-4 bg-[#DED6C5] rounded-[10px] shadow-brutal p-6"
      >
         <!-- <p>hello world</p> -->
         <div class="flex flex-col gap-2">
            <div class="flex gap-2">
               <p class="font-semibold underline">Date:</p>
               <p class="">{{ infos.date }}</p>
            </div>
            <!-- Province type infos -->
            <div v-if="infos.province_id" class="flex gap-2">
               <p class="font-semibold underline">Province ID:</p>
               <h3 class="text-normal">{{ infos.province_id }}</h3>
            </div>
            <div v-if="infos.barony" class="flex gap-2">
               <p class="font-semibold underline">Barony:</p>
               <h4 class="">{{ infos.barony }}</h4>
            </div>
            <div v-if="infos.holding_type" class="flex gap-2">
               <p class="font-semibold underline">Holding:</p>
               <p class="">
                  {{ infos.holding_type }}
               </p>
            </div>
            <div v-if="infos.culture" class="flex gap-2">
               <p class="font-semibold underline">Culture:</p>
               <p class="">{{ infos.culture }}</p>
            </div>
            <div v-if="infos.religion" class="flex gap-2">
               <p class="font-semibold underline">Religion:</p>
               <p class="">{{ infos.religion }}</p>
            </div>
            <div v-if="infos.duchy_capital_building" class="flex gap-2">
               <p class="font-semibold underline">Duchy Capital Building:</p>
               <p class="">
                  {{ infos.duchy_capital_building }}
               </p>
            </div>
            <div v-if="infos.special_building_slot" class="flex gap-2">
               <p class="font-semibold underline">Special Building Slot:</p>
               <p class="">
                  {{ infos.special_building_slot }}
               </p>
            </div>
            <div v-if="infos.terrain" class="flex gap-2">
               <p class="font-semibold underline">Terrain:</p>
               <p class="">{{ infos.terrain }}</p>
            </div>
            <!-- Title type infos -->
            <div v-if="infos.title" class="flex gap-2">
               <p class="font-semibold underline">Title:</p>
               <h3 class="text-normal">{{ infos.title }}</h3>
            </div>
            <div v-if="infos.liege" class="flex gap-2">
               <p class="font-semibold underline">Liege:</p>
               <h3 class="text-normal">{{ infos.liege }}</h3>
            </div>
            <div v-if="infos.holder" class="flex gap-2">
               <p class="font-semibold underline">Holder:</p>
               <h3 class="text-normal">{{ infos.holder }}</h3>
            </div>
            <div v-if="infos.government" class="flex gap-2">
               <p class="font-semibold underline">Government:</p>
               <h3 class="text-normal">{{ infos.government }}</h3>
            </div>
            <div v-if="infos.change_development_level" class="flex gap-2">
               <p class="font-semibold underline">Development Level:</p>
               <h3 class="text-normal">{{ infos.change_development_level }}</h3>
            </div>
            <div
               v-if="infos.succession_laws && infos.succession_laws.length > 0"
               class="flex gap-2"
            >
               <p class="font-semibold underline">Succession Laws:</p>
               <h3 class="text-normal">{{ infos.succession_laws }}</h3>
            </div>
            <div v-if="infos.de_jure_liege" class="flex gap-2">
               <p class="font-semibold underline">De jure liege:</p>
               <h3 class="text-normal">{{ infos.de_jure_liege }}</h3>
            </div>
            <div v-if="infos.effect" class="flex gap-2">
               <p class="font-semibold underline">Effect:</p>
               <h3 class="text-normal">{{ infos.effect }}</h3>
            </div>
            <div v-if="infos.insert_title_history" class="flex gap-2">
               <p class="font-semibold underline">Insert title history:</p>
               <h3 class="text-normal">{{ infos.insert_title_history }}</h3>
            </div>
            <div
               v-if="infos.holder_ignore_head_of_faith_requirement"
               class="flex gap-2"
            >
               <p class="font-semibold underline">
                  Holder ignore head of faith requirement:
               </p>
               <h3 class="text-normal">
                  {{ infos.holder_ignore_head_of_faith_requirement }}
               </h3>
            </div>
            <div v-if="infos.author.name" class="flex gap-2">
               <p class="font-semibold underline">Author:</p>
               <p class="">{{ infos.author.name }}</p>
            </div>
         </div>
      </div>
   </div>
</template>

<style>
.test {
   box-shadow: 3px 4px 0px 0 #000;
}
</style>
