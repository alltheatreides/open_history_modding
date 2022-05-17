<script setup>
import { ref, onBeforeMount, onMounted, watch } from "vue";
import { supabase } from "../supabase/supabase";
import ProvinceCard from "../components/ProvinceCard.vue";
import TitleCard from "../components/TitleCard.vue";
import EntryCard from "../components/EntryCard.vue";
import { userStatusStore } from "../stores/counter";
import downloadIcon from "../assets/svg/download_arrow.svg";
import router from "../router";
import exportUserHistory from "../methods/exportUserHistory";
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
let text = ref("");

const bulkExport = ref([]);

// Details of entry visibility
const isVisible = ref(false);
const activeClass = ref("block");

// Request in progress indicator
let displaySearchProgressIcon = ref(false);

// REACTIVE STATE END

// Page Methods START
// REST method to query created province history
async function supabaseQueryUserProvince() {
   //
   displaySearchProgressIcon.value = true;
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
      displaySearchProgressIcon.value = false;
   }
}
// REST method to query created title history
async function supabaseQueryUserTitle() {
   displaySearchProgressIcon.value = true;
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
      displaySearchProgressIcon.value = false;
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

function exportAllResearchResults() {
   const test = exportUserHistory(
      selectedCategory.value,
      exportFilterInput.value,
      userStore.value.getUserInfo().id
   );
}

// Page Methods END

// lifecycle hooks
onBeforeMount(() => {
   if (userStore.value.getUserInfo() === null) {
      router.push("/404");
   }
});
onMounted(() => {
   // console.log(userStore.value.getUserInfo().id);
});
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
                     <svg
                        v-if="displaySearchProgressIcon"
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

               <!-- Left column, Export Filter options -->

               <EBACView></EBACView>
            </div>

            <!-- Right column, empty category selected -->
            <article
               class="mt-10 xl:w-9/12 mx-auto"
               v-if="selectedCategory === ''"
            >
               <p
                  v-if="
                     selectedCategory === '' &&
                     searchInput1 === '' &&
                     searchInput2 === '' &&
                     searchInput3 === ''
                  "
               >
                  Select filter options and click on search to see results
               </p>
               <p
                  v-if="
                     selectedCategory === '' &&
                     (searchInput1 !== '' ||
                        searchInput2 !== '' ||
                        searchInput3 !== '')
                  "
               >
                  Select a category, either Provinces or Titles to see search
                  results
               </p>
            </article>
            <!-- Right column , province created results -->
            <article
               class="mt-10 xl:w-9/12 max-h-[1rem]"
               v-if="selectedCategory === 'Provinces'"
            >
               <!-- Province Results entry -->
               <div class="flex flex-wrap gap-4 mt-6">
                  <div
                     v-for="entry in createdProvinceHistory"
                     :key="entry.id"
                     class=""
                  >
                     <EntryCard
                        :title="entry.barony"
                        :date="entry.date"
                        @click="showDetails(entry)"
                     >
                        <svg
                           width="27"
                           height="30"
                           viewBox="0 0 27 30"
                           fill="none"
                           xmlns="http://www.w3.org/2000/svg"
                           class=""
                           preserveAspectRatio="xMidYMid meet"
                        >
                           <path
                              d="M3.60574 22.7178C3.91494 22.0352 3.71901 21.3647 3.37921 21.1137C2.66898 20.5872 2.35673 19.8371 3.11287 19.2494C3.94555 18.582 3.76799 17.9759 3.38839 17.4309C2.9047 16.8707 2.32611 16.3227 0.871986 17.4707C0.437279 17.8473 -0.230088 17.3728 0.0791048 16.8952C0.587284 16.0962 1.2822 15.4809 2.27713 15.1043C2.78225 14.8962 3.26288 14.1186 2.8649 13.7237C2.39346 13.4727 2.10876 12.9645 2.37815 11.9328C2.53122 11.0695 2.36285 10.6073 1.83018 10.2736C2.03223 9.73478 2.19754 9.18987 2.20366 8.59291C2.10876 7.60717 1.97406 6.75 1.80875 6.09181C2.121 5.20709 2.44244 4.35911 3.0945 3.4499C3.67921 2.60804 4.83027 1.79679 6.16194 2.36313C6.78339 2.60804 7.50892 2.86212 7.79056 2.65702C8.32629 2.3019 8.12119 1.96516 7.67423 1.57637C7.1385 1.16615 6.7191 0.670221 7.51505 0.315108C8.81917 -0.291033 10.1049 0.0242827 11.057 0.860022C11.8284 1.25187 12.603 1.50902 13.3744 1.57025C14.2867 1.56413 14.8194 2.04781 15.802 2.8162C16.8674 3.48357 18.0276 3.43765 19.2062 1.5029C19.4236 3.42847 20.293 3.29683 21.4777 1.73556C22.3869 1.45392 23.4492 2.75804 22.9869 4.09277C22.7176 4.53054 22.9931 4.96831 24.2176 5.40608C24.2268 5.38771 24.2329 5.36934 24.2421 5.35098C26.3299 7.06225 26.137 10.047 24.3156 11.244C23.3268 11.5746 23.1921 12.7073 23.6451 13.5951C24.1686 14.0482 24.6615 15.0554 24.539 15.7993C24.288 17.0789 25.5156 17.9054 26.2534 19.4116C25.0013 20.7341 25.7268 21.0708 26.3268 20.6912C26.7371 20.2994 26.8809 20.7708 26.5258 21.2882C25.7391 22.3903 25.7544 23.7158 25.9534 24.9924C25.0105 26.0302 24.0156 25.8679 23.0329 25.2251C22.3257 24.7261 21.1257 25.1546 20.2563 26.1802C22.1451 25.9781 22.0134 28.0292 20.7706 28.1731C19.993 26.8567 19.0868 26.3884 17.9327 26.6333C17.048 26.8169 16.7817 27.2118 17.0572 27.7262C17.2745 28.1853 16.8827 29.3456 16.5245 29.5782C16.1571 29.217 15.3704 28.8129 14.5744 29.615C13.803 30.3466 13.3744 30.0558 13.4295 28.568C13.4142 28.1915 13.3346 27.8149 12.9856 27.4384C12.8019 27.1261 12.1591 27.022 11.7886 28.2986C11.5101 28.7119 11.155 28.6262 11.0141 28.2466C10.7998 27.8455 10.9652 27.2088 11.6815 26.2322C12.3734 25.4332 12.453 24.7689 12.9305 23.774C13.0652 23.4403 13.2856 22.9811 12.4438 23.2076C11.507 23.3301 11.5162 22.9719 11.7397 21.4688C11.6937 20.8872 11.3233 20.6147 10.7723 20.7678C10.1998 20.8443 10.0529 21.4168 9.07938 21.1688C8.70284 21.1382 8.32017 21.2484 8.24364 21.6127C8.14568 22.2433 7.91608 22.8617 7.48443 23.2168C7.24871 23.2658 6.88748 22.6076 6.58747 22.3015C6.34256 21.7841 5.71193 21.8086 5.48233 22.4576C5.33233 22.9107 4.9864 23.2474 4.4874 23.027C4.26086 22.828 3.90881 22.7454 3.60574 22.7178Z"
                              fill="#3A343A"
                           ></path>
                           <path
                              d="M13.9469 10.0685C13.0377 10.0685 12.2999 10.8063 12.2999 11.7155C12.2999 12.6247 13.0377 13.3625 13.9469 13.3625C14.8561 13.3625 15.5939 12.6247 15.5939 11.7155C15.5939 10.8063 14.8561 10.0685 13.9469 10.0685Z"
                              fill="#3A343A"
                           ></path>
                           <path
                              d="M16.7021 10.549C16.5521 10.1939 16.3378 9.87554 16.0623 9.60002C15.7868 9.32451 15.4684 9.11021 15.1133 8.96021C14.7459 8.80408 14.3541 8.72449 13.95 8.72449C13.5459 8.72449 13.1571 8.80408 12.7867 8.96021C12.4316 9.11021 12.1132 9.32451 11.8377 9.60002C11.5622 9.87554 11.3479 10.1939 11.1979 10.549C11.0418 10.9164 10.9622 11.3082 10.9622 11.7123C10.9622 12.1164 11.0418 12.5052 11.1979 12.8756C11.3479 13.2307 11.5622 13.5491 11.8377 13.8246C12.1132 14.1002 12.4316 14.3145 12.7867 14.4645C13.1541 14.6206 13.5459 14.7002 13.95 14.7002C14.3541 14.7002 14.7429 14.6206 15.1133 14.4645C15.4684 14.3145 15.7868 14.1002 16.0623 13.8246C16.3378 13.5491 16.5521 13.2307 16.7021 12.8756C16.8583 12.5083 16.9379 12.1164 16.9379 11.7123C16.9379 11.3082 16.8583 10.9164 16.7021 10.549ZM16.4511 11.7123C16.4511 13.0899 15.3307 14.2104 13.9531 14.2104C12.5755 14.2104 11.455 13.0899 11.455 11.7123C11.455 10.3347 12.5755 9.2143 13.9531 9.2143C15.3307 9.21124 16.4511 10.3317 16.4511 11.7123Z"
                              fill="#3A343A"
                           ></path>
                        </svg>
                     </EntryCard>
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
               <div class="grid grid-cols-4 gap-6 mt-6">
                  <div
                     v-for="entry in createdTitleHistory"
                     :key="entry.id"
                     class=""
                  >
                     <EntryCard
                        :title="entry.title"
                        :date="entry.date"
                        @click="showDetails(entry)"
                     >
                        <svg
                           width="24"
                           height="30"
                           viewBox="0 0 24 30"
                           fill="none"
                           xmlns="http://www.w3.org/2000/svg"
                           class=""
                           preserveAspectRatio="xMidYMid meet"
                        >
                           <path
                              d="M23.5548 0H0V23.0666H6.93334V30H23.5548V0ZM3.45305 3.51586H12.6202V5.29811H3.45305V3.51586ZM3.45305 6.48645H12.6201V8.26869H3.45305V6.48645ZM3.45305 9.45709H12.6201V11.2393H3.45305V9.45709ZM20.1018 20.69H3.45305V18.9078H20.1018V20.69H20.1018ZM20.1018 17.7195H3.45305V15.9372H20.1018V17.7195H20.1018ZM20.0457 8.7682V12.5834L17.7607 11.7626L15.4756 12.5834V8.7682C14.6291 8.0942 14.0849 7.05592 14.0849 5.89225C14.0849 3.86549 15.7339 2.21654 17.7606 2.21654C19.7874 2.21654 21.4363 3.86549 21.4363 5.89225C21.4365 7.05598 20.8922 8.09426 20.0457 8.7682Z"
                              fill="#3A343A"
                           ></path>
                           <path
                              d="M0.521973 24.8489L5.15105 29.478V24.8489H0.521973Z"
                              fill="#3A343A"
                           ></path>
                           <path
                              d="M17.7606 3.99878C16.7166 3.99878 15.8672 4.84821 15.8672 5.89224C15.8672 6.93626 16.7166 7.78569 17.7606 7.78569C18.8047 7.78569 19.6541 6.93626 19.6541 5.89224C19.6541 4.84821 18.8047 3.99878 17.7606 3.99878Z"
                              fill="#3A343A"
                           ></path>
                        </svg>
                     </EntryCard>
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
               <div v-if="createdTitleHistory.length <= 0">
                  <p>No results were found for selected search parameters</p>
               </div>
            </article>
            <!-- Right column, search input but no category selected Error message -->
         </div>
      </section>
   </main>
</template>
