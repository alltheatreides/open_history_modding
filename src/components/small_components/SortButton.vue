<script setup>
import { ref, onBeforeMount, onMounted, watch } from "vue";

defineProps({
   title: String,
   option1: String,
   option2: String,
   option3: String,
});

function getSelectOption(event) {
   console.log(event.target.value);
   optionSelected.value = event.target.value;
   // return event.target.value;
}

function emitSelectedOption(event) {
   context.emit("newValue", inputValue.value);
}

let optionSelected = ref("");
</script>

<template>
   <select
      class="flex justify-between pr-10 px-2.5 py-2 rounded-[10px] bg-tertiary border border-secondary shadow-brutal-sm font-semibold focus:outline-none focus:ring-0 focus:border-secondary"
      @change="$emit('testChild', 'hi mom')"
   >
      <option class="" disabled value="" selected>{{ title }}</option>
      <option class="" :value="option1">
         {{ option1 }}
      </option>
      <option class="" :value="option2">
         {{ option2 }}
      </option>
      <option class="" v-if="option3" :value="option3">
         {{ option3 }}
      </option>
   </select>
</template>
