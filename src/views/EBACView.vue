<script setup>
import { ref, onMounted, watch } from "vue";
import exportFilterSupabaseQuery from "../methods/exportFilterSupabaseQuery.js";
import exportFilterSupabaseQueryAVEMARIA from "../methods/exportFilterSupabaseQueryAVEMARIA.js";
import exportTxtFile from "../methods/bulkExportTxtFile.js";

// reactive state
// User Selection options
const selectedCategory = ref("");
const selectedFilterTier = ref("");
const exportFilterInput = ref("");
const EBAC = ref(false);

// Page Methods
// Method triggered by the export button
function exportBulk() {
   // Instancing the supabase query, returns an array of title objects
   if (EBAC.value === false) {
      const test = exportFilterSupabaseQuery(
         selectedCategory.value,
         selectedFilterTier.value,
         exportFilterInput.value,
         EBAC.value
      );
   }
   if (EBAC.value === true) {
      const test = exportFilterSupabaseQueryAVEMARIA(
         selectedCategory.value,
         selectedFilterTier.value,
         exportFilterInput.value,
         EBAC.value
      );
   }
}

function resetExportFilters() {
   selectedFilterTier.value = "";
   exportFilterInput.value = "";
}

function click() {
   console.log(EBAC.value);
}

// lifecycle hooks
onMounted(() => {
   // console.log();
});
</script>

<template>
   <main class="container mx-auto mb-10">
      <section class="mx-auto">
         <div class="xl:w-3/12 xl:mx-auto">
            <!-- Left column, Export Filter options -->
            <article class="mt-10 bg-secondary10 p-6 rounded flex flex-col">
               <!-- Reset export filters -->
               <div class="flex justify-between items-center mb-6">
                  <h2 class="text-xl font-semibold">Export options</h2>
                  <p
                     class="text-sm cursor-pointer"
                     @click="resetExportFilters()"
                  >
                     Clear all export filters
                  </p>
               </div>

               <!-- First filter: Category -->
               <h3 class="font-semibold mb-2">Category</h3>
               <!-- Category Drop Down select -->
               <select
                  v-model="selectedCategory"
                  class="text-tertiary bg-[#625862] focus:outline-none font-medium px-2.5 py-1.25 text-center inline-flex items-center focus:ring-0 border-0 focus:border-0 pr-10 self-start"
                  name="select"
               >
                  <option disabled value="">Category</option>
                  <option value="Provinces" selected>Provinces</option>
                  <option value="Titles">Titles</option>
               </select>

               <!-- Second filter: Tier -->
               <h3 class="font-semibold mb-2 mt-6">Tier</h3>
               <!-- Tier Drop Down select -->
               <select
                  v-model="selectedFilterTier"
                  class="text-tertiary bg-[#625862] focus:outline-none font-medium px-2.5 py-1.25 text-center inline-flex items-center focus:ring-0 border-0 focus:border-0 pr-10 self-start"
                  name="select"
               >
                  <option disabled value="">Tier</option>
                  <option value="Empire" selected>Empire</option>
                  <option value="Kingdom">Kingdom</option>
                  <option value="Duchy">Duchy</option>
               </select>

               <!-- EBAC or not -->
               <h3>EBAC</h3>
               <input type="checkbox" v-model="EBAC" />
               <!-- <label for="checkbox">{{ EBAC }}</label> -->

               <div class="mt-6">
                  <input
                     v-model="exportFilterInput"
                     type="text"
                     placeholder="Export all custom history by title tier name"
                     class="border-0 bg-[#fcf9f2] w-full px-5 py-3.5 text-sm font-medium focus:ring-0"
                  />
               </div>

               <!-- Search button -->
               <button
                  class="mt-6 self-center text-tertiary bg-secondary focus:outline-none rounded font-medium text-xl px-2.5 py-2 text-center inline-flex items-center focus:ring-0 border-0 focus:border-0"
                  @click="exportBulk()"
                  title="Export your created entries according to above options"
               >
                  Export
               </button>
            </article>
         </div>
      </section>
   </main>
</template>
