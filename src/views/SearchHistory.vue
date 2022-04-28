<script setup>
import searchIcon from "../assets/svg/search_icon.svg";
import { supabase } from "../supabase/supabase";
import ProvinceCard from "../components/ProvinceCard.vue";
</script>

<script>
export default {
   data() {
      return {
         searchInput: "",
         searchResults: [],
      };
   },
   methods: {
      async supabaseQueryProvince() {
         try {
            let { data, error, status } = await supabase
               .from("province_history")
               .select(
                  "province_id, holding_type, religion, culture, date, barony, buildings, special_buildings, terrain, duchy_capital_building, special_building_slot, manual, author"
               )
               .textSearch("barony", this.searchInput);
            this.searchResults = data;
            console.log(status, error);
            // console.log(data);
            console.log(this.searchResults);
            console.log(this.searchResults[0].province_id);
         } catch (error) {
            console.log(error.message);
         } finally {
         }
         // try {
         //    let { data, error, status } = await supabase
         //       .from("province_history")
         //       .select(
         //          `province_id, holding_type, religon, culture, date, barony, buildings, special_buildings, terrain, duchy_capital_building, special_building_slot, author, landed_title!inner(title)`
         //       )
         //       .textSearch("landed_title.title", this.searchInput);
         //    console.log(status);
         //    console.log(data);
         // } catch (error) {
         //    console.log(error.message);
         // } finally {
         // }
      },
   },
};
</script>

<template>
   <main class="container mx-auto mb-10">
      <section class="lg:w-4/6 mx-auto mt-20">
         <h1 class="text-7xl text-center">Search vanilla history</h1>
         <!-- Search bar -->
         <article
            class="flex justify-between items-center w-full mx-auto mt-10 lg:mt-20 h-[55px] overflow-hidden"
         >
            <!-- Drop down menu -->
            <div class="h-full">
               <!-- Drop down button -->
               <button
                  id="dropdownDefault"
                  data-dropdown-toggle="dropdown"
                  class="text-tertiary bg-secondary focus:ring-4 focus:outline-none focus:ring-grey-300 font-medium text-xl px-5 py-3.5 text-center inline-flex items-center"
                  type="button"
               >
                  Provinces
                  <svg
                     class="w-5 h-5 ml-2"
                     fill="none"
                     stroke="#FFD263"
                     viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="4"
                        d="M19 9l-7 7-7-7"
                     ></path>
                  </svg>
               </button>
               <!-- Dropdown options -->
               <div
                  id="dropdown"
                  class="z-10 hidden bg-secondary divide-y divide-gray-100 rounded shadow w-44"
               >
                  <ul
                     class="py-1 text-tertiary"
                     aria-labelledby="dropdownDefault"
                  >
                     <li>
                        <a
                           href="#"
                           class="block px-4 py-2 hover:bg-tertiary hover:text-secondary"
                           >Landed Titles</a
                        >
                     </li>
                     <li>
                        <a
                           href="#"
                           class="block px-4 py-2 hover:bg-tertiary hover:text-secondary"
                           >Title History</a
                        >
                     </li>
                     <li>
                        <a
                           href="#"
                           class="block px-4 py-2 hover:bg-tertiary hover:text-secondary"
                           >Province History</a
                        >
                     </li>
                     <!-- <li>
                        <a
                           href="#"
                           class="block px-4 py-2 hover:bg-tertiary hover:text-secondary"
                           >Character History</a
                        >
                     </li> -->
                  </ul>
               </div>
            </div>
            <div class="flex-1 h-full">
               <input
                  v-model="searchInput"
                  type="text"
                  placeholder="Search for a province history from its barony name"
                  class="border-0 bg-secondary10 w-full px-5 py-3.5 font-medium text-xl focus:ring-0"
                  @keyup.enter="supabaseQueryProvince"
               />
            </div>
            <img
               :src="searchIcon"
               alt="Search icon"
               class="bg-secondary p-4 h-full cursor-pointer"
               @click="supabaseQueryProvince"
            />
         </article>
      </section>
      <!-- Results of search -->
      <section class="mt-16 flex gap-6 w-full mx-auto flex-wrap justify-start">
         <div v-if="searchResults.length <= 0 && searchInput !== ''">
            <p class="font-semibold">No results were found</p>
         </div>
         <div v-for="result in searchResults" :key="result.province_id">
            <ProvinceCard
               :province_id="result.province_id"
               :barony="result.barony"
               :date="result.date"
               :culture="result.culture"
               :religion="result.religion"
               :buildings="result.buildings"
               :special_buildings="result.special_buildings"
               :duchy_capital_building="result.duchy_capital_building"
               :special_building_slot="result.special_building_slot"
               :terrain="result.terrain"
               :author="result.author"
               :manual="result.manual"
            />
         </div>
      </section>
   </main>
</template>

<style>
/* input:focus {
   outline: none !important;
   border: 0 !important;
} */
</style>
