<script setup>
// const title = defineProps([""]);
// const date = defineProps([""]);
defineProps({
   title: String,
   date: String,
});
</script>

<template>
   <div
      class="px-3.5 py-2 bg-tertiary rounded-[10px] shadow-brutal border border-secondary flex flex-col justify-between w-[250px] h-[95px] test"
   >
      <!-- Upper part, title and date information -->
      <div class="flex justify-between">
         <h4 class="font-semibold">{{ title }}</h4>
         <p>{{ date }}</p>
      </div>
      <!-- Lower part, detail to expand info and icon type -->
      <div class="flex justify-between">
         <div class="flex justify-between items-center gap-2">
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
         </div>
         <slot></slot>
      </div>
   </div>
</template>

<style>
.test {
   box-shadow: 3px 4px 0px 0 #000;
}
</style>
