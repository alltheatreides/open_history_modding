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
let displayExportProgressIcon = ref(false);

// Page Methods
// Method triggered by the export button
function exportBulk() {
   displayExportProgressIcon.value = true;
   // Instancing the supabase query, returns an array of title objects
   if (EBAC.value === false) {
      const test = exportFilterSupabaseQuery(
         selectedCategory.value,
         selectedFilterTier.value,
         exportFilterInput.value,
         EBAC.value
      );

      test.then(() => {
         displayExportProgressIcon.value = false;
      });
   }
   if (EBAC.value === true) {
      const test = exportFilterSupabaseQueryAVEMARIA(
         selectedCategory.value,
         selectedFilterTier.value,
         exportFilterInput.value,
         EBAC.value
      );
      test.then(() => {
         displayExportProgressIcon.value = false;
      });
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
         <div class="xl:mx-auto">
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

                  <svg
                     v-if="displayExportProgressIcon"
                     role="status"
                     class="w-6 h-6 mx-2 text-gray-200 animate-spin dark:text-gray-600 fill-tertiary"
                     viewBox="0 0 100 101"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                     />
                     <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                     />
                  </svg>
               </button>
            </article>
         </div>
      </section>
   </main>
</template>
