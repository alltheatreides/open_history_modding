<script setup>
import { ref, onBeforeMount, onMounted, watch } from "vue";
import { supabase } from "../supabase/supabase";
import ProvinceCard from "../components/ProvinceCard.vue";
import TitleCard from "../components/TitleCard.vue";
import { userStatusStore } from "../stores/counter";
import downloadIcon from "../assets/svg/download_arrow.svg";
import router from "../router";

import EBACView from "./EBACView.vue";

// REACTIVE STATE START
const createdProvinceHistory = ref([]);
const createdTitleHistory = ref([]);

// Instance pinia user store
const userStore = ref(userStatusStore());

// Search Inputs
const selectedCategory = ref("");
const checkedProvinceEntry = ref([]);
const checkedTitleEntry = ref([]);
const searchInput1 = ref("");
const searchInput2 = ref("");
const searchInput3 = ref("");

const selectedFilterTier = ref("");
const exportFilterInput = ref("");

// Txt stream for the file export
const text = ref("");

const bulkExport = ref([]);

// Details of entry visibility
const isVisible = ref(false);
const activeClass = ref("block");

// REACTIVE STATE END

// Page Methods START
// REST method to query created province history
async function supabaseQueryUserProvince() {
   try {
      let { data, error, status } = await supabase
         .from("user_province_history")
         .select(
            "province_id, holding_type, religion, culture, date, barony, buildings, special_buildings, terrain, duchy_capital_building, special_building_slot, manual, author (name), landed_title!user_province_history_barony_fkey(title, empire, kingdom, duchy)"
         )
         .eq("author", userStore.value.userInfo.id)
         .like("landed_title.empire", "%" + searchInput1.value + "%")
         .like("landed_title.kingdom", "%" + searchInput2.value + "%")
         .like("landed_title.duchy", "%" + searchInput3.value + "%");

      createdProvinceHistory.value = data;
      console.log(status, error);
      console.log(data);
      // console.log(searchResults.value);
   } catch (error) {
      console.log(error.message);
   } finally {
   }
}
// REST method to query created title history
async function supabaseQueryUserTitle() {
   try {
      let { data, error, status } = await supabase
         .from("user_title_history")
         .select(
            "title, date, liege, holder, government, change_development_level, succession_laws, de_jure_liege, insert_title_history, holder_ignore_head_of_faith_requirement, game_version, effect, author (name), landed_title!inner(*)"
         )
         .eq("author", userStore.value.userInfo.id)
         .like("landed_title.empire", "%" + searchInput1.value + "%")
         .like("landed_title.kingdom", "%" + searchInput2.value + "%")
         .like("landed_title.duchy", "%" + searchInput3.value + "%");
      createdTitleHistory.value = data;
      console.log(status, error);
      console.log(data);
      // console.log(searchResults.value);
   } catch (error) {
      console.log(error.message);
   } finally {
   }
}
// REST method to query vanilla title history based on export options ; returns the result array
async function supabaseQueryFilteredVanillaTitleHistory() {
   const { data, error } = await supabase
      .from("title_history")
      .select("*, landed_title!inner(*)")
      .like("landed_title.empire", "%" + exportSearchInput1.value + "%")
      .like("landed_title.kingdom", "%" + exportSearchInput2.value + "%")
      .like("landed_title.duchy", "%" + exportSearchInput3.value + "%");

   console.log(data);
   console.log(error);

   return data;
}
// REST method to query user created title history based on export options ; returns the result array
async function supabaseQueryFilteredUserTitleHistory() {
   const { data, error } = await supabase
      .from("user_title_history")
      .select("*, landed_title!inner(*)")
      .like("landed_title.empire", "%" + exportSearchInput1.value + "%")
      .like("landed_title.kingdom", "%" + exportSearchInput2.value + "%")
      .like("landed_title.duchy", "%" + exportSearchInput3.value + "%");

   console.log(data);
   console.log(error);

   return data;
}

// Triggers relevant rest method depending on selected category, Title or Province, to display user created results
function filterUserEntries() {
   if (selectedCategory.value === "Provinces") {
      createdProvinceHistory.value = [];
      supabaseQueryUserProvince();
   } else if (selectedCategory.value === "Titles") {
      createdTitleHistory.value = [];
      supabaseQueryUserTitle();
   }
}

// Handle the display of the detail cards
function showDetails(entry) {
   entry.isVisible = !entry.isVisible;
   // console.log(entry);
}

// Manages addition of checked items to the internal title array
function addTitleEntry(entry) {
   // console.log(entry);
   if (checkedTitleEntry.value.includes(entry)) {
      // console.log("it is there already");
      checkedTitleEntry.splice(checkedTitleEntry.value.indexOf(entry), 1);
   } else {
      checkedTitleEntry.value.push(entry);
   }
   // console.log(checkedTitleEntry.value);
}
// Manages addition of checked items to the internal province array
function addProvinceEntry(entry) {
   // console.log(entry);
   if (checkedProvinceEntry.value.includes(entry)) {
      // console.log("it is there already");
      checkedProvinceEntry.value.splice(
         checkedProvinceEntry.value.indexOf(entry),
         1
      );
   } else {
      checkedProvinceEntry.value.push(entry);
   }
   // console.log(checkedTitleEntry.value);
}

// Resets all search filters and internal arrays to 0
function resetFilters() {
   selectedCategory.value = "";
   searchInput1.value = "";
   searchInput2.value = "";
   searchInput3.value = "";
   createdProvinceHistory.value = [];
   createdTitleHistory.value = [];
}
function resetExportFilters() {
   selectedFilterTier.value = "";
   exportFilterInput.value = "";
}
// Page Methods END

// lifecycle hooks
onBeforeMount(() => {
   if (userStore.value.getUserInfo() === null) {
      router.push("/404");
   }
});
onMounted(() => {});
</script>

<template>
   <main class="container mx-auto mb-10">
      <section class="mt-24">
         <!-- Page title -->
         <h1 class="text-3xl font-semibold border-b pb-6 border-secondary">
            User Created History
         </h1>
         <!-- User Entry Informations -->
         <div class="flex flex-col xl:flex-row gap-10 w-full mx-auto">
            <!-- Left column -->
            <div class="xl:w-3/12 xl:mx-auto">
               <!-- Left column, Filter options -->
               <article class="mt-10 bg-secondary10 p-6 rounded flex flex-col">
                  <!-- Reset filters -->
                  <div class="flex justify-between items-center mb-6">
                     <h2 class="text-xl font-semibold">Filter options</h2>
                     <p class="text-sm cursor-pointer" @click="resetFilters()">
                        Clear all filters
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

                  <!-- Second filter: Empire -->
                  <!-- Search input -->
                  <h3 class="font-semibold mb-2 mt-4">Empire</h3>
                  <div class="">
                     <input
                        v-model="searchInput1"
                        type="text"
                        placeholder="Filter your search by empire name"
                        class="border-0 bg-[#fcf9f2] w-full px-5 py-3.5 text-sm font-medium focus:ring-0"
                     />
                  </div>

                  <!-- Second filter: Kingdom -->
                  <!-- Search input -->
                  <h3 class="font-semibold mb-2 mt-4">Kingdom</h3>
                  <div class="">
                     <input
                        v-model="searchInput2"
                        type="text"
                        placeholder="Filter your search by kingdom name"
                        class="border-0 bg-[#fcf9f2] w-full px-5 py-3.5 text-sm font-medium focus:ring-0"
                     />
                  </div>

                  <!-- Third filter: Duchy -->
                  <!-- Search input -->
                  <h3 class="font-semibold mb-2 mt-4">Duchy</h3>
                  <div class="">
                     <input
                        v-model="searchInput3"
                        type="text"
                        placeholder="Filter your search by duchy name"
                        class="border-0 bg-[#fcf9f2] w-full px-5 py-3.5 text-sm font-medium focus:ring-0"
                     />
                  </div>

                  <!-- Search button -->
                  <button
                     class="mt-6 self-center text-tertiary bg-secondary focus:outline-none rounded font-medium text-xl px-2.5 py-2 text-center inline-flex items-center focus:ring-0 border-0 focus:border-0"
                     @click="filterUserEntries()"
                     title="Search your created entries according to above filters"
                  >
                     Search
                  </button>
               </article>

               <!-- Left column, Export Filter options -->

               <EBACView></EBACView>
            </div>

            <!-- Right column, empty category selected -->
            <article
               class="mt-10 xl:w-9/12 mx-auto"
               v-if="selectedCategory === ''"
            >
               <p>Select filter options and click on search to see results</p>
            </article>
            <!-- Right column , province created results -->
            <article
               class="mt-10 xl:w-9/12 max-h-[1rem]"
               v-if="selectedCategory === 'Provinces'"
            >
               <!-- Export button -->
               <!-- Buttons to export -->
               <div class="flex gap-4" v-if="createdProvinceHistory.length > 0">
                  <!-- Export all button -->
                  <button
                     class="text-secondary bg-tertiary focus:outline-none font-medium px-5 py-3.5 text-center inline-flex items-center focus:ring-0 border-0 focus:border-0 rounded-lg mb-6"
                     title="Export all search results into one file"
                     @click="exportAllResearchResults"
                  >
                     Export all
                     <img class="ml-5 h-[25px] color" :src="downloadIcon" />
                  </button>
                  <!-- Export all button -->
                  <button
                     class="text-secondary bg-tertiary focus:outline-none font-medium px-5 py-3.5 text-center inline-flex items-center focus:ring-0 border-0 focus:border-0 rounded-lg mb-6"
                     title="Export selected search results into one file"
                     @click="exportSelectedResearchResults"
                  >
                     Export selected
                     <img class="ml-5 h-[25px] color" :src="downloadIcon" />
                  </button>
               </div>
               <!-- Province Results entry -->
               <div class="flex flex-wrap gap-4 mt-6">
                  <div
                     v-for="entry in createdProvinceHistory"
                     :key="entry.id"
                     class="bg-[#fcf9f2] rounded-lg p-6 mb-4 self-start"
                  >
                     <div class="flex items-center">
                        <!-- Checkbox for export -->
                        <input
                           type="checkbox"
                           :id="entry.province_id"
                           :value="entry"
                           v-model="checkedProvinceEntry"
                           @click="addProvinceEntry(entry)"
                           class="w-4 h-4 text-secondary bg-gray-100 rounded border-gray-300 focus:ring-secondary dark:focus:ring-secondary focus:ring-2"
                        />
                        <!-- Basic infos -->
                        <div class="pl-4 flex">
                           <label :for="entry.province_id" class=""
                              >Province id: {{ entry.province_id }}
                           </label>
                           <span class="ml-6">Barony: {{ entry.barony }}</span>
                        </div>
                        <!-- Svg icon -->
                        <svg
                           class="w-4 h-4 ml-2 cursor-pointer"
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24"
                           xmlns="http://www.w3.org/2000/svg"
                           @click="showDetails(entry)"
                           title="Expand to show more informations"
                        >
                           <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M19 9l-7 7-7-7"
                           ></path>
                        </svg>
                     </div>
                     <!-- Province card more info -->
                     <div
                        :class="entry.isVisible ? activeClass : 'hidden'"
                        class="mt-6"
                     >
                        <ProvinceCard
                           :province_id="entry.province_id"
                           :barony="entry.barony"
                           :date="entry.date"
                           :holding_type="entry.holding_type"
                           :culture="entry.culture"
                           :religion="entry.religion"
                           :buildings="entry.buildings"
                           :special_buildings="entry.special_buildings"
                           :duchy_capital_building="
                              entry.duchy_capital_building
                           "
                           :special_building_slot="entry.special_building_slot"
                           :terrain="entry.terrain"
                           :author="entry.author"
                           :manual="entry.manual"
                        />
                     </div>
                  </div>
               </div>
            </article>
            <!-- Right column , title created results -->
            <article
               class="mt-10 xl:w-9/12 max-h-[1rem]"
               v-if="selectedCategory === 'Titles'"
            >
               <!-- Buttons to export -->
               <div class="flex gap-4" v-if="createdTitleHistory.length > 0">
                  <!-- Export all button -->
                  <button
                     class="text-secondary bg-tertiary focus:outline-none font-medium px-5 py-3.5 text-center inline-flex items-center focus:ring-0 border-0 focus:border-0 rounded-lg mb-6"
                     title="Export all search results into one file"
                     @click="exportAllResearchResults"
                  >
                     Export all
                     <img class="ml-5 h-[25px] color" :src="downloadIcon" />
                  </button>
                  <!-- Export all button -->
                  <button
                     class="text-secondary bg-tertiary focus:outline-none font-medium px-5 py-3.5 text-center inline-flex items-center focus:ring-0 border-0 focus:border-0 rounded-lg mb-6"
                     title="Export selected search results into one file"
                     @click="exportSelectedResearchResults"
                  >
                     Export selected
                     <img class="ml-5 h-[25px] color" :src="downloadIcon" />
                  </button>
               </div>
               <!-- Title Results entry -->
               <div class="flex flex-wrap gap-4 mt-6">
                  <div
                     v-for="entry in createdTitleHistory"
                     :key="entry.id"
                     class="bg-[#fcf9f2] rounded-lg p-6 mb-4 self-start"
                  >
                     <div class="flex items-center">
                        <!-- Checkbox for export -->
                        <input
                           type="checkbox"
                           :id="entry.province_id"
                           :value="entry"
                           v-model="checkedProvinceEntry"
                           @click="addTitleEntry(entry)"
                           class="w-4 h-4 text-secondary bg-gray-100 rounded border-gray-300 focus:ring-secondary dark:focus:ring-secondary focus:ring-2"
                        />
                        <!-- Basic infos -->
                        <div class="pl-4 flex">
                           <label :for="entry.province_id" class=""
                              >Title: {{ entry.title }}
                           </label>
                           <span class="ml-6">Date: {{ entry.date }}</span>
                        </div>
                        <!-- Svg icon -->
                        <svg
                           class="w-4 h-4 ml-2 cursor-pointer"
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24"
                           xmlns="http://www.w3.org/2000/svg"
                           @click="showDetails(entry)"
                           title="Expand to show more informations"
                        >
                           <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M19 9l-7 7-7-7"
                           ></path>
                        </svg>
                     </div>
                     <!-- Title card more info -->
                     <div v-if="entry.isVisible" class="mt-6">
                        <TitleCard
                           :title="entry.title"
                           :date="entry.date"
                           :liege="entry.liege"
                           :holder="entry.holder"
                           :government="entry.government"
                           :change_development_level="
                              entry.change_development_level
                           "
                           :succession_laws="entry.succession_laws"
                           :de_jure_liege="entry.de_jure_liege"
                           :insert_title_history="entry.insert_title_history"
                           :holder_ignore_head_of_faith_requirement="
                              entry.holder_ignore_head_of_faith_requirement
                           "
                        />
                     </div>
                  </div>
               </div>
            </article>
         </div>
      </section>
   </main>
</template>
