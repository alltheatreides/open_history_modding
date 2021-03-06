<script setup>
import { ref, onBeforeMount, onMounted, watch } from "vue";
import { supabase } from "../supabase/supabase";
import { userStatusStore } from "../stores/counter";

// REACTIVE STATE START
const confirmationPrompt = ref(false);
const selectedCategory = ref("");
// Province infos
const province_id = ref("");
const holding_type = ref("");
const religion = ref("");
const culture = ref("");
const date = ref("");
const barony = ref("");
const buildings = ref([]);
const special_buildings = ref("");
const terrain = ref("");
const duchy_capital_building = ref("");
const special_building_slot = ref("");
// Title infos
const title = ref("");
const title_date = ref("");
const liege = ref("");
const holder = ref("");
const government = ref("");
const change_development_level = ref(0);
const succession_laws = ref([]);
const de_jure_liege = ref("");
const insert_title_history = ref("");
const holder_ignore_head_of_faith_requirement = ref("");

// Async message
const message = ref({});

// Instance pinia user store
const userStore = ref(userStatusStore());

// REACTIVE STATE END

// Page Methods START
function createHistoryEntry() {
   if (selectedCategory.value === "Provinces") {
      supabaseCreateProvinceHistory();
      confirmationPrompt = false;
   } else if (selectedCategory.value === "Titles") {
      supabaseCreateTitleHistory();
      confirmationPrompt.value = false;
   }
}
async function supabaseCreateProvinceHistory() {
   // Supabase Writing
   const { data, error, status } = await supabase
      .from("user_province_history")
      .insert([
         {
            province_id: province_id.value,
            holding_type: holding_type.value,
            religion: religion.value,
            culture: culture.value,
            date: date.value,
            barony: barony.value,
            buildings: buildings.value,
            special_buildings: special_buildings.value,
            terrain: terrain.value,
            duchy_capital_building: duchy_capital_building.value,
            special_building_slot: special_building_slot.value,
            manual: true,
            author: userStore.value.userInfo.id,
         },
      ]);
   if (error !== null) {
      message.value = error;
   } else {
      message.value.message = "Entry Successfuly Added !";
   }
   console.log(status, error);
}
async function supabaseCreateTitleHistory() {
   // Supabase Writing
   const { data, error, status } = await supabase
      .from("user_title_history")
      .insert([
         {
            title: title.value,
            date: title_date.value,
            liege: liege.value,
            holder: holder.value,
            government: government.value,
            change_development_level: change_development_level.value,
            succession_laws: succession_laws.value,
            de_jure_liege: de_jure_liege.value,
            insert_title_history: insert_title_history.value,
            holder_ignore_head_of_faith_requirement:
               holder_ignore_head_of_faith_requirement.value,
            manual: true,
            author: userStore.value.userInfo.id,
         },
      ]);

   if (error !== null) {
      message.value = error;
   } else {
      message.value.message = "Entry Successfuly Added !";
   }

   console.log(status, error);
}

// lifecycle hooks
onBeforeMount(() => {});
onMounted(() => {});
</script>

<template>
   <main
      class="container mx-auto mb-10 relative"
      :class="{ 'blur-content': confirmationPrompt }"
   >
      <section class="mt-24">
         <h1 class="text-4xl text-center">Create a new history entry</h1>

         <article class="flex gap-10 mt-14">
            <!-- Drop Down select -->
            <div class="">
               <select
                  v-model="selectedCategory"
                  class="text-tertiary bg-secondary focus:outline-none font-medium text-xl px-5 py-3.5 text-center inline-flex items-center focus:ring-0 border-0 focus:border-0 pr-10 self-start"
                  name="select"
               >
                  <option disabled value="">Category</option>
                  <option value="Provinces" selected>Provinces</option>
                  <option value="Titles">Titles</option>
               </select>
               <p class="font-bold mt-6">{{ message.message }}</p>
            </div>
            <div>
               <!-- Province form -->
               <div v-if="selectedCategory === 'Provinces'" class="flex-1">
                  <form class="bg-secondary10 p-6 w-full mx-auto relative">
                     <div class="flex flex-wrap gap-10 w-full mx-auto mb-10">
                        <!-- Form entry: province id -->
                        <div class="">
                           <label
                              for="province_id"
                              class="block mb-2 font-medium text-secondary dark:text-gray-300"
                           >
                              Province ID
                           </label>
                           <input
                              type="number"
                              id="province_id"
                              class="bg-customWhite border border-gray-300 text-secondary text-sm rounded-lg focus:ring-tertiary focus:border-tertiary block w-full p-2.5"
                              placeholder="Province ID"
                              required
                              v-model="province_id"
                           />
                        </div>
                        <!-- Form entry: barony -->
                        <div class="">
                           <label
                              for="barony"
                              class="block mb-2 font-medium text-secondary dark:text-gray-300"
                           >
                              Barony
                           </label>
                           <input
                              type="text"
                              id="barony"
                              class="bg-customWhite border border-gray-300 text-secondary text-sm rounded-lg focus:ring-tertiary focus:border-tertiary block w-full p-2.5"
                              placeholder="Barony"
                              required
                              v-model="barony"
                           />
                        </div>
                        <!-- Form entry: date -->
                        <div class="">
                           <label
                              for="date"
                              class="block mb-2 font-medium text-secondary dark:text-gray-300"
                           >
                              Date
                           </label>
                           <input
                              type="text"
                              id="date"
                              class="bg-customWhite border border-gray-300 text-secondary text-sm rounded-lg focus:ring-tertiary focus:border-tertiary block w-full p-2.5"
                              placeholder="Date"
                              required
                              v-model="date"
                           />
                        </div>
                        <!-- Form entry: culture -->
                        <div class="">
                           <label
                              for="culture"
                              class="block mb-2 font-medium text-secondary dark:text-gray-300"
                           >
                              Culture
                           </label>
                           <input
                              type="text"
                              id="culture"
                              class="bg-customWhite border border-gray-300 text-secondary text-sm rounded-lg focus:ring-tertiary focus:border-tertiary block w-full p-2.5"
                              placeholder="Culture"
                              v-model="culture"
                           />
                        </div>
                        <!-- Form entry: religion -->
                        <div class="">
                           <label
                              for="religion"
                              class="block mb-2 font-medium text-secondary dark:text-gray-300"
                           >
                              Religion
                           </label>
                           <input
                              type="text"
                              id="religion"
                              class="bg-customWhite border border-gray-300 text-secondary text-sm rounded-lg focus:ring-tertiary focus:border-tertiary block w-full p-2.5"
                              placeholder="Religion"
                              v-model="religion"
                           />
                        </div>
                        <!-- Form entry: holding_type -->
                        <div class="">
                           <label
                              for="holding_type"
                              class="block mb-2 font-medium text-secondary dark:text-gray-300"
                           >
                              Holding type
                           </label>
                           <input
                              type="text"
                              id="holding_type"
                              class="bg-customWhite border border-gray-300 text-secondary text-sm rounded-lg focus:ring-tertiary focus:border-tertiary block w-full p-2.5"
                              placeholder="Holding type"
                              v-model="holding_type"
                           />
                        </div>
                        <!-- Form entry: buildings -->
                        <div class="">
                           <label
                              for="buildings"
                              class="block mb-2 font-medium text-secondary dark:text-gray-300"
                           >
                              Buildings
                           </label>
                           <input
                              type="text"
                              id="buildings"
                              class="bg-customWhite border border-gray-300 text-secondary text-sm rounded-lg focus:ring-tertiary focus:border-tertiary block w-full p-2.5"
                              placeholder="Buildings"
                              v-model="buildings"
                           />
                        </div>
                        <!-- Form entry: special_buildings -->
                        <div class="">
                           <label
                              for="special_buildings"
                              class="block mb-2 font-medium text-secondary dark:text-gray-300"
                           >
                              Special buildings
                           </label>
                           <input
                              type="text"
                              id="special_buildings"
                              class="bg-customWhite border border-gray-300 text-secondary text-sm rounded-lg focus:ring-tertiary focus:border-tertiary block w-full p-2.5"
                              placeholder="Special buildings"
                              v-model="special_buildings"
                           />
                        </div>
                        <!-- Form entry: duchy_capital_building -->
                        <div class="">
                           <label
                              for="duchy_capital_building"
                              class="block mb-2 font-medium text-secondary dark:text-gray-300"
                           >
                              Duchy capital building
                           </label>
                           <input
                              type="text"
                              id="duchy_capital_building"
                              class="bg-customWhite border border-gray-300 text-secondary text-sm rounded-lg focus:ring-tertiary focus:border-tertiary block w-full p-2.5"
                              placeholder="Duchy capital building"
                              v-model="duchy_capital_building"
                           />
                        </div>
                        <!-- Form entry: special_building_slot -->
                        <div class="">
                           <label
                              for="special_building_slot"
                              class="block mb-2 font-medium text-secondary dark:text-gray-300"
                           >
                              Special building slot
                           </label>
                           <input
                              type="text"
                              id="special_building_slot"
                              class="bg-customWhite border border-gray-300 text-secondary text-sm rounded-lg focus:ring-tertiary focus:border-tertiary block w-full p-2.5"
                              placeholder="Special building slot"
                              v-model="special_building_slot"
                           />
                        </div>
                        <!-- Form entry: terrain -->
                        <div class="">
                           <label
                              for="terrain"
                              class="block mb-2 font-medium text-secondary dark:text-gray-300"
                           >
                              Terrain
                           </label>
                           <input
                              type="text"
                              id="terrain"
                              class="bg-customWhite border border-gray-300 text-secondary text-sm rounded-lg focus:ring-tertiary focus:border-tertiary block w-full p-2.5"
                              placeholder="Terrain"
                              v-model="terrain"
                           />
                        </div>
                     </div>

                     <!-- Confirmation button -->
                     <button
                        type="submit"
                        class="text-primary bg-secondary hover:bg-tertiary hover:text-secondary focus:ring-4 focus:outline-none focus:ring-tertiary font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                        @click="
                           (e) => {
                              e.preventDefault();
                              confirmationPrompt = true;
                           }
                        "
                     >
                        Submit
                     </button>
                  </form>
               </div>
               <!-- Title form -->
               <div v-if="selectedCategory === 'Titles'" class="flex-1">
                  <form class="bg-secondary10 p-6 w-full mx-auto relative">
                     <div class="flex flex-wrap gap-10 w-full mx-auto mb-10">
                        <!-- Form entry: title -->
                        <div class="">
                           <label
                              for="title"
                              class="block mb-2 font-medium text-secondary dark:text-gray-300"
                           >
                              Title
                           </label>
                           <input
                              type="text"
                              id="title"
                              class="bg-customWhite border border-gray-300 text-secondary text-sm rounded-lg focus:ring-tertiary focus:border-tertiary block w-full p-2.5"
                              placeholder="Title"
                              required
                              v-model="title"
                           />
                        </div>
                        <!-- Form entry: date -->
                        <div class="">
                           <label
                              for="title_date"
                              class="block mb-2 font-medium text-secondary dark:text-gray-300"
                           >
                              Date
                           </label>
                           <input
                              type="text"
                              id="title_date"
                              class="bg-customWhite border border-gray-300 text-secondary text-sm rounded-lg focus:ring-tertiary focus:border-tertiary block w-full p-2.5"
                              placeholder="Date"
                              required
                              v-model="title_date"
                           />
                        </div>
                        <!-- Form entry: liege -->
                        <div class="">
                           <label
                              for="liege"
                              class="block mb-2 font-medium text-secondary dark:text-gray-300"
                           >
                              Liege
                           </label>
                           <input
                              type="text"
                              id="liege"
                              class="bg-customWhite border border-gray-300 text-secondary text-sm rounded-lg focus:ring-tertiary focus:border-tertiary block w-full p-2.5"
                              placeholder="Liege"
                              v-model="liege"
                           />
                        </div>
                        <!-- Form entry: holder -->
                        <div class="">
                           <label
                              for="holder"
                              class="block mb-2 font-medium text-secondary dark:text-gray-300"
                           >
                              Holder
                           </label>
                           <input
                              type="text"
                              id="holder"
                              class="bg-customWhite border border-gray-300 text-secondary text-sm rounded-lg focus:ring-tertiary focus:border-tertiary block w-full p-2.5"
                              placeholder="Holder"
                              v-model="holder"
                           />
                        </div>
                        <!-- Form entry: government -->
                        <div class="">
                           <label
                              for="government"
                              class="block mb-2 font-medium text-secondary dark:text-gray-300"
                           >
                              Government
                           </label>
                           <input
                              type="text"
                              id="government"
                              class="bg-customWhite border border-gray-300 text-secondary text-sm rounded-lg focus:ring-tertiary focus:border-tertiary block w-full p-2.5"
                              placeholder="Government"
                              required
                              v-model="government"
                           />
                        </div>
                        <!-- Form entry: change_development_level -->
                        <div class="">
                           <label
                              for="change_development_level"
                              class="block mb-2 font-medium text-secondary dark:text-gray-300"
                           >
                              Change development level
                           </label>
                           <input
                              type="text"
                              id="change_development_level"
                              class="bg-customWhite border border-gray-300 text-secondary text-sm rounded-lg focus:ring-tertiary focus:border-tertiary block w-full p-2.5"
                              placeholder="Change development level"
                              v-model="change_development_level"
                           />
                        </div>
                        <!-- Form entry: succession_laws -->
                        <div class="">
                           <label
                              for="succession_laws"
                              class="block mb-2 font-medium text-secondary dark:text-gray-300"
                           >
                              Succession Laws
                           </label>
                           <input
                              type="text"
                              id="succession_laws"
                              class="bg-customWhite border border-gray-300 text-secondary text-sm rounded-lg focus:ring-tertiary focus:border-tertiary block w-full p-2.5"
                              placeholder="Succession Laws"
                              v-model="succession_laws"
                           />
                        </div>
                        <!-- Form entry: de_jure_liege -->
                        <div class="">
                           <label
                              for="de_jure_liege"
                              class="block mb-2 font-medium text-secondary dark:text-gray-300"
                           >
                              De Jure Liege
                           </label>
                           <input
                              type="text"
                              id="de_jure_liege"
                              class="bg-customWhite border border-gray-300 text-secondary text-sm rounded-lg focus:ring-tertiary focus:border-tertiary block w-full p-2.5"
                              placeholder="De Jure Liege"
                              v-model="de_jure_liege"
                           />
                        </div>
                        <!-- Form entry: insert_title_history -->
                        <div class="">
                           <label
                              for="insert_title_history"
                              class="block mb-2 font-medium text-secondary dark:text-gray-300"
                           >
                              Insert Title History
                           </label>
                           <input
                              type="text"
                              id="insert_title_history"
                              class="bg-customWhite border border-gray-300 text-secondary text-sm rounded-lg focus:ring-tertiary focus:border-tertiary block w-full p-2.5"
                              placeholder="Insert Title History"
                              v-model="insert_title_history"
                           />
                        </div>
                        <!-- Form entry: holder_ignore_head_of_faith_requirement -->
                        <div class="">
                           <label
                              for="holder_ignore_head_of_faith_requirement"
                              class="block mb-2 font-medium text-secondary dark:text-gray-300"
                           >
                              Holder ignore head of faith requirement
                           </label>
                           <input
                              type="text"
                              id="holder_ignore_head_of_faith_requirement"
                              class="bg-customWhite border border-gray-300 text-secondary text-sm rounded-lg focus:ring-tertiary focus:border-tertiary block w-full p-2.5"
                              placeholder="Holder ignore head of faith requirement"
                              v-model="holder_ignore_head_of_faith_requirement"
                           />
                        </div>
                     </div>

                     <!-- Confirmation button -->
                     <button
                        type="submit"
                        class="text-primary bg-secondary hover:bg-tertiary hover:text-secondary focus:ring-4 focus:outline-none focus:ring-tertiary font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                        @click="
                           (e) => {
                              e.preventDefault();
                              confirmationPrompt = true;
                           }
                        "
                     >
                        Submit
                     </button>
                  </form>
               </div>
               <!-- Placeholder -->
               <div
                  v-if="selectedCategory === ''"
                  class="flex-1 grid place-content-center bg-secondary10 p-10 w-full h-full mx-auto"
               >
                  <h2 class="text-xl text-center">
                     Select a category to create an entry
                  </h2>
               </div>
            </div>
         </article>
      </section>
   </main>

   <!-- Confirmation modal -->
   <div
      v-if="confirmationPrompt"
      id="defaultModal"
      tabindex="-1"
      aria-hidden="true"
      class="fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
   >
      <div
         class="relative w-full top-[45%] mx-auto h-full max-w-2xl p-4 md:h-auto"
      >
         <!-- Modal content -->
         <div class="relative bg-customWhite rounded-lg">
            <!-- Modal header -->
            <div
               class="flex items-start justify-between p-4 border-b rounded-t"
            >
               <h3 class="text-xl font-semibold text-secondary">
                  Are you sure of your choices ?
               </h3>
               <button
                  type="button"
                  class="text-secondary bg-transparent hover:bg-tertiary rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                  @click="
                     (e) => {
                        e.preventDefault();
                        confirmationPrompt = false;
                     }
                  "
               >
                  <svg
                     class="w-5 h-5"
                     fill="currentColor"
                     viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                     ></path>
                  </svg>
               </button>
            </div>
            <!-- Modal footer -->
            <div
               class="flex items-center p-6 space-x-2 border-t border-secondary rounded-b"
            >
               <button
                  data-modal-toggle="defaultModal"
                  type="button"
                  class="text-customWhite bg-secondary hover:bg-tertiary hover:text-secondary focus:ring-4 focus:outline-none focus:ring-tertiary font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  @click="createHistoryEntry"
               >
                  Yes I am sure
               </button>
               <button
                  data-modal-toggle="defaultModal"
                  type="button"
                  class="text-secondary bg-whiteCustom hover:bg-primary focus:ring-4 focus:outline-none focus:ring-tertiary rounded-lg border border-secondary text-sm font-medium px-5 py-2.5 focus:z-10"
                  @click="
                     (e) => {
                        e.preventDefault();
                        confirmationPrompt = false;
                     }
                  "
               >
                  No, cancel
               </button>
            </div>
         </div>
      </div>
   </div>
</template>

<style>
.blur-content {
   filter: blur(3px);
}
</style>
