<script setup>
import searchIcon from "../assets/svg/search_icon.svg";
import { supabase } from "../supabase/supabase";
import ProvinceCard from "../components/ProvinceCard.vue";
import TitleCard from "../components/TitleCard.vue";
</script>

<script>
export default {
   data() {
      return {
         searchInput: "",
         searchResults: [],
         selectedSearchCategory: "",
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
            // console.log(this.searchResults);
            // console.log(this.searchResults[0].province_id);
         } catch (error) {
            console.log(error.message);
         } finally {
         }
      },
      async supabaseQueryTitle() {
         try {
            let { data, error, status } = await supabase
               .from("title_history")
               .select("*")
               .textSearch("title", this.searchInput);
            this.searchResults = data;
            console.log(status, error);
            console.log(data);
         } catch (error) {
            console.log(error.message);
         } finally {
         }
      },
      searchSupabase() {
         if (this.selectedSearchCategory === "Provinces") {
            this.supabaseQueryProvince();
         } else if (this.selectedSearchCategory === "Titles") {
            this.supabaseQueryTitle();
         }
      },
   },
};
</script>

<template>
   <main class="container mx-auto mb-10">
      <section class="lg:w-4/6 mx-auto mt-40">
         <h1 class="text-4xl text-center">Search vanilla history</h1>
         <!-- Search bar -->
         <article
            class="flex justify-between items-center w-full mx-auto mt-5 lg:mt-10 h-[55px] overflow-hidden"
         >
            <!-- Drop down menu -->
            <div class="h-full">
               <!-- Drop Down select -->
               <select
                  v-model="selectedSearchCategory"
                  class="text-tertiary bg-secondary focus:outline-none font-medium text-xl px-5 py-3.5 text-center inline-flex items-center focus:ring-0 border-0 focus:border-0 pr-10"
                  name="select"
               >
                  <option disabled value="">Category</option>
                  <option value="Provinces" selected>Provinces</option>
                  <option value="Titles">Titles</option>
               </select>
            </div>
            <!-- Search input -->
            <div class="flex-1 h-full">
               <input
                  v-model="searchInput"
                  type="text"
                  placeholder="Search for an entry from its title name"
                  class="border-0 bg-secondary10 w-full px-5 py-3.5 font-medium text-xl focus:ring-0"
                  @keyup.enter="searchSupabase"
               />
            </div>
            <!-- Search icon -->
            <img
               :src="searchIcon"
               alt="Search icon"
               class="bg-secondary p-4 h-full cursor-pointer"
               @click="searchSupabase"
            />
         </article>
      </section>
      <!-- Results of search province -->
      <section
         v-if="selectedSearchCategory === 'Provinces'"
         class="mt-16 flex gap-6 w-full mx-auto flex-wrap justify-start"
      >
         <!-- In case of no results -->
         <div
            class="w-full mx-auto"
            v-if="searchResults.length <= 0 && searchInput !== ''"
         >
            <p class="font-semibold text-center">No results were found</p>
         </div>
         <!-- Search results div holder for province -->
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
      <!-- Results of search for title -->
      <section
         v-if="selectedSearchCategory === 'Titles'"
         class="mt-16 flex gap-6 w-full mx-auto flex-wrap justify-start"
      >
         <!-- In case of no results -->
         <div
            class="w-full mx-auto"
            v-if="searchResults.length <= 0 && searchInput !== ''"
         >
            <p class="font-semibold text-center">No results were found</p>
         </div>
         <!-- Search results div holder for province -->
         <div v-for="result in searchResults" :key="result.id">
            <TitleCard
               :title="result.title"
               :date="result.date"
               :liege="result.liege"
               :holder="result.holder"
               :government="result.government"
               :change_development_level="result.change_development_level"
               :succession_laws="result.succession_laws"
               :de_jure_liege="result.de_jure_liege"
               :insert_title_history="result.insert_title_history"
               :holder_ignore_head_of_faith_requirement="
                  result.holder_ignore_head_of_faith_requirement
               "
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
