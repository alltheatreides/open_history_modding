<script setup>
import { ref, onBeforeMount, onMounted, watch } from "vue";
import EntryCard from "../components/EntryCard.vue";
import SortButton from "./small_components/SortButton.vue";
import LoadingIcon from "./small_components/LoadingIcon.vue";
import { userStatusStore } from "../stores/counter";

import exportFilterSupabaseQuery from "../methods/exportFilterSupabaseQuery.js";
import exportFilterSupabaseQueryAVEMARIA from "../methods/exportFilterSupabaseQueryAVEMARIA.js";

// Instance pinia user store
const userStore = ref(userStatusStore());
const user_id = userStore.value.getUserInfo().id;

// Variables
let selectedCategory = ref("");
let selectedTier = ref("");

const EBAC = ref(false);
const exportFilterInput = ref("");

let displayExportProgressIcon = ref(false);

// Method triggered by the export button
function exportBulk() {
   displayExportProgressIcon.value = true;
   // Instancing the supabase query, returns an array of title objects
   if (EBAC.value === false) {
      const test = exportFilterSupabaseQuery(
         selectedCategory.value,
         selectedTier.value,
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
         selectedTier.value,
         exportFilterInput.value,
         EBAC.value
      );
      test.then(() => {
         displayExportProgressIcon.value = false;
      });
   }
}
</script>

<template>
   <section class="mt-12 w-4/6">
      <article class="">
         <h2 class="text-xl font-bold mb-6">
            Export your created history with vanilla history
         </h2>
         <div class="bg-[#DED6C5] rounded-[10px] shadow-brutal p-6">
            <div class="flex gap-6">
               <select
                  v-model="selectedCategory"
                  class="flex justify-between pr-10 px-2.5 py-2 rounded-[10px] bg-tertiary border border-secondary shadow-brutal-sm font-semibold focus:outline-none focus:ring-0 focus:border-secondary"
               >
                  <option class="" disabled value="" selected>Category</option>
                  <option class="" value="Provinces">Provinces</option>
                  <option class="" value="Titles">Titles</option>
               </select>

               <select
                  v-model="selectedTier"
                  class="flex justify-between pr-10 px-2.5 py-2 rounded-[10px] bg-tertiary border border-secondary shadow-brutal-sm font-semibold focus:outline-none focus:ring-0 focus:border-secondary"
               >
                  <option class="" disabled value="" selected>Tier</option>
                  <option class="" value="Empire">Empire</option>
                  <option class="" value="Kingdom">Kingdom</option>
                  <option class="" value="Duchy">Duchy</option>
               </select>
               <div
                  class="flex gap-2 items-center px-2.5 py-2 rounded-[10px] bg-tertiary border border-secondary shadow-brutal-sm font-semibold"
               >
                  <label for="EBAC">EBAC</label>
                  <input
                     name="EBAC"
                     type="checkbox"
                     v-model="EBAC"
                     placeholder="EBAC"
                     class="w-4 h-4 text-secondary bg-primary rounded border-primary focus:ring-secondary focus:ring-2"
                  />
               </div>
            </div>
            <input
               v-model="exportFilterInput"
               class="w-full h-10 mt-6 rounded-[10px] bg-primary border border-secondary font-extralight p-3 focus:outline-tertiary"
               placeholder="Filter your export history by title name"
            />
            <div class="flex justify-end mt-4">
               <button
                  class="flex justify-around items-center gap-2 px-2.5 py-2 rounded-[10px] bg-tertiary border border-secondary shadow-brutal-sm font-semibold"
                  @click="exportBulk()"
                  title="Click to export the txt file"
               >
                  Export
                  <svg
                     v-if="displayExportProgressIcon"
                     role="status"
                     class="w-6 h-6 mx-2 text-gray-200 animate-spin fill-secondary"
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
                  <svg
                     v-if="!displayExportProgressIcon"
                     width="16"
                     height="20"
                     viewBox="0 0 16 20"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                     class="flex-grow-0 flex-shrink-0"
                     preserveAspectRatio="none"
                  >
                     <path
                        d="M14 20C14.5304 20 15.0391 19.7893 15.4142 19.4142C15.7893 19.0391 16 18.5304 16 18V13L11 17V14H4V12H11V9L16 13V6L10 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V18C0 18.5304 0.210714 19.0391 0.585786 19.4142C0.960859 19.7893 1.46957 20 2 20H14ZM9 2L14 7H9V2Z"
                        fill="#3A343A"
                     ></path>
                  </svg>
               </button>
            </div>
         </div>
      </article>
      <article class="mt-20 xl:mt-40">
         <h2 class="text-xl font-bold mb-6">
            Export your created history individually
         </h2>
         <div class="bg-[#DED6C5] rounded-[10px] shadow-brutal p-6"></div>
      </article>
   </section>
</template>

<style></style>
