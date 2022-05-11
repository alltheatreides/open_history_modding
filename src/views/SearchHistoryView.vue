<script setup>
import { ref, onMounted, watch } from "vue";
import searchIcon from "../assets/svg/search_icon.svg";
import downloadIcon from "../assets/svg/download_arrow.svg";
import { supabase } from "../supabase/supabase";
import ProvinceCard from "../components/ProvinceCard.vue";
import TitleCard from "../components/TitleCard.vue";

// reactive state
const searchInput = ref("");
const searchResults = ref([]);
const selectedSearchCategory = ref("");
const text = ref("");

// Page Methods
// REST method to query province history
async function supabaseQueryProvince() {
   try {
      let { data, error, status } = await supabase
         .from("province_history")
         .select(
            "province_id, holding_type, religion, culture, date, barony, buildings, special_buildings, terrain, duchy_capital_building, special_building_slot, manual"
         )
         .textSearch("barony", searchInput.value);
      searchResults.value = data;
      console.log(status, error);
      console.log(data);
      console.log(searchResults.value);
      // console.log(searchResults[0].province_id);
   } catch (error) {
      console.log(error.message);
   } finally {
   }
}
// REST method to query title history
async function supabaseQueryTitle() {
   try {
      let { data, error, status } = await supabase
         .from("title_history")
         .select("*")
         .textSearch("title", searchInput.value);
      searchResults.value = data;
      console.log(status, error);
      console.log(data);
   } catch (error) {
      console.log(error.message);
   } finally {
   }
}
// Depending on select option, search either title or province history
function searchSupabase() {
   if (selectedSearchCategory.value === "Provinces") {
      searchResults.value = [];
      supabaseQueryProvince();
   } else if (selectedSearchCategory.value === "Titles") {
      searchResults.value = [];
      supabaseQueryTitle();
   }
}
// Export all research result
function exportAllResearchResults() {
   // Reset the txt string
   // txt.value = "";

   // Depending on select option, search either title or province history export logic
   if (selectedSearchCategory.value === "Provinces") {
      // Province history export
      if (searchResults.value.length > 0) {
         // console.log("hi mom");
         // Opening bracket of province id entry
         const province_id_opening_bracket =
            searchResults.value[0].province_id + " = {";
         // Writing to the txt string
         text.value = text.value.concat(province_id_opening_bracket);

         // Looping over all the history entries info
         searchResults.value.forEach((entry) => {
            // If the date entry is 600.1.1 which is the equivalent of no dated entries, write without a date entry
            if (entry.date === "600.1.1") {
               // Defining province info & concat info the txt string
               if (
                  entry.holding_type !== null &&
                  entry.holding_type !== "undefined"
               ) {
                  const province_holding_type =
                     "\n\tholding_type = " + entry.holding_type;
                  text.value = text.value.concat(province_holding_type);
               }
               if (entry.religion !== null && entry.religion !== "undefined") {
                  const province_religion = "\n\treligion = " + entry.religion;
                  text.value = text.value.concat(province_religion);
               }
               if (entry.culture !== null && entry.culture !== "undefined") {
                  const province_culture = "\n\tculture = " + entry.culture;
                  text.value = text.value.concat(province_culture);
               }
               if (
                  entry.special_buildings !== null &&
                  entry.special_buildings !== "undefined"
               ) {
                  const province_special_building =
                     "\n\tspecial_building = " + entry.special_buildings;
                  text.value = text.value.concat(province_special_building);
               }
               if (
                  entry.special_building_slot !== null &&
                  entry.special_building_slot !== "undefined"
               ) {
                  const province_special_building_slot =
                     "\n\tspecial_building_slot = " +
                     entry.special_building_slot;
                  text.value = text.value.concat(
                     province_special_building_slot
                  );
               }
               if (
                  entry.duchy_capital_building !== null &&
                  entry.duchy_capital_building !== "undefined"
               ) {
                  const province_duchy_capital_building =
                     "\n\tduchy_capital_building = " +
                     entry.duchy_capital_building;
                  text.value = text.value.concat(
                     province_duchy_capital_building
                  );
               }
               if (entry.terrain !== null && entry.terrain !== "undefined") {
                  const province_terrain = "\n\tterrain = " + entry.terrain;
                  text.value = text.value.concat(province_terrain);
               }

               // If there are buildings, write them
               if (entry.buildings !== null) {
                  // Opening brackets of building entries
                  const province_building_opening_bracket =
                     "\n\tbuildings = {\n";
                  text.value = text.value.concat(
                     province_building_opening_bracket
                  );

                  // looping over building of date entry & writing them
                  entry.buildings.forEach((building) => {
                     const building_entry = "\t\t" + building + "\n";
                     // writing building entries
                     text.value = text.value.concat(building_entry);
                  });

                  // Closing brackets of building entries
                  const province_building_closing_bracket = "\t}";
                  text.value = text.value.concat(
                     province_building_closing_bracket
                  );
               }
            } else {
               // Opening bracket of date entry
               const date_opening_bracket = "\n\t" + entry.date + " = {";
               text.value = text.value.concat(date_opening_bracket);

               // Defining province info & concat info the txt string
               if (
                  entry.holding_type !== null &&
                  entry.holding_type !== "undefined"
               ) {
                  const province_holding_type =
                     "\n\t\tholding_type = " + entry.holding_type;
                  text.value = text.value.concat(province_holding_type);
               }
               if (entry.religion !== null && entry.religion !== "undefined") {
                  const province_religion =
                     "\n\t\treligion = " + entry.religion;
                  text.value = text.value.concat(province_religion);
               }
               if (entry.culture !== null && entry.culture !== "undefined") {
                  const province_culture = "\n\t\tculture = " + entry.culture;
                  text.value = text.value.concat(province_culture);
               }
               if (
                  entry.special_buildings !== null &&
                  entry.special_buildings !== "undefined"
               ) {
                  const province_special_building =
                     "\n\t\tspecial_building = " + entry.special_buildings;
                  text.value = text.value.concat(province_special_building);
               }
               if (
                  entry.special_building_slot !== null &&
                  entry.special_building_slot !== "undefined"
               ) {
                  const province_special_building_slot =
                     "\n\t\tspecial_building_slot = " +
                     entry.special_building_slot;
                  text.value = text.value.concat(
                     province_special_building_slot
                  );
               }
               if (
                  entry.duchy_capital_building !== null &&
                  entry.duchy_capital_building !== "undefined"
               ) {
                  const province_duchy_capital_building =
                     "\n\t\tduchy_capital_building = " +
                     entry.duchy_capital_building;
                  text.value = text.value.concat(
                     province_duchy_capital_building
                  );
               }
               if (entry.terrain !== null && entry.terrain !== "undefined") {
                  const province_terrain = "\n\t\tterrain = " + entry.terrain;
                  text.value = text.value.concat(province_terrain);
               }

               // If there are buildings, write them
               if (entry.buildings !== null) {
                  // Opening brackets of building entries
                  const province_building_opening_bracket =
                     "\n\t\tbuildings = {\n";
                  text.value = text.value.concat(
                     province_building_opening_bracket
                  );

                  // looping over building of date entry & writing them
                  entry.buildings.forEach((building) => {
                     const building_entry = "\t\t\t" + building + "\n";
                     // writing building entries
                     text.value = text.value.concat(building_entry);
                  });

                  // Closing brackets of building entries
                  const province_building_closing_bracket = "\t\t}";
                  text.value = text.value.concat(
                     province_building_closing_bracket
                  );
               }

               // closing bracket of date entry
               const date_closing_bracket = "\n\t}";
               text.value = text.value.concat(date_closing_bracket);
            }
         });

         // Closing bracket of province id entry
         const province_id_closing_bracket = "\n}\n";
         // Writing to the txt string
         text.value = text.value.concat(province_id_closing_bracket);

         // console.log(text.value);
      }
   } else if (selectedSearchCategory.value === "Titles") {
      // title history export
      if (searchResults.value.length > 0) {
         // Opening bracket of title name entry
         const title_name_opening_bracket =
            searchResults.value[0].title + " = {";
         // Writing to the txt string
         text.value = text.value.concat(title_name_opening_bracket);

         // Looping over all the history entries info
         searchResults.value.forEach((entry) => {
            // Opening bracket of date entry
            const date_opening_bracket = "\n\t" + entry.date + " = {";
            text.value = text.value.concat(date_opening_bracket);

            // Defining title info & concat info the txt string
            if (entry.liege !== null && entry.liege !== "undefined") {
               const title_liege = "\n\t\tliege = " + entry.liege;
               text.value = text.value.concat(title_liege);
            }
            if (entry.holder !== null && entry.holder !== "undefined") {
               const title_holder = "\n\t\tholder = " + entry.holder;
               text.value = text.value.concat(title_holder);
            }
            if (entry.government !== null && entry.government !== "undefined") {
               const title_government =
                  "\n\t\tgovernment = " + entry.government;
               text.value = text.value.concat(title_government);
            }
            if (
               entry.change_development_level !== null &&
               entry.change_development_level !== "undefined"
            ) {
               const title_change_development_level =
                  "\n\t\tchange_development_level = " +
                  entry.change_development_level;
               text.value = text.value.concat(title_change_development_level);
            }
            if (
               entry.de_jure_liege !== null &&
               entry.de_jure_liege !== "undefined"
            ) {
               const title_de_jure_liege =
                  "\n\t\tde_jure_liege = " + entry.de_jure_liege;
               text.value = text.value.concat(title_de_jure_liege);
            }
            if (
               entry.insert_title_history !== null &&
               entry.insert_title_history !== "undefined"
            ) {
               const title_insert_title_history =
                  "\n\t\tinsert_title_history = " + entry.insert_title_history;
               text.value = text.value.concat(title_insert_title_history);
            }
            if (
               entry.holder_ignore_head_of_faith_requirement !== null &&
               entry.holder_ignore_head_of_faith_requirement !== "undefined"
            ) {
               const title_holder_ignore_head_of_faith_requirement =
                  "\n\t\tholder_ignore_head_of_faith_requirement = " +
                  entry.holder_ignore_head_of_faith_requirement;
               text.value = text.value.concat(
                  title_holder_ignore_head_of_faith_requirement
               );
            }

            // If there are succession_laws, write them
            if (entry.succession_laws !== null) {
               // Opening brackets of succession_law entries
               const title_succession_laws_opening_bracket =
                  "\n\t\tsuccession_laws = {\n";
               text.value = text.value.concat(
                  title_succession_laws_opening_bracket
               );

               // looping over succession_law of date entry & writing them
               entry.succession_laws.forEach((succession_law) => {
                  const succession_law_entry = "\t\t\t" + succession_law + "\n";
                  // writing succession_law entries
                  text.value = text.value.concat(succession_law_entry);
               });

               // Closing brackets of succession_law entries
               const title_succession_laws_closing_bracket = "\t\t}";
               text.value = text.value.concat(
                  title_succession_laws_closing_bracket
               );
            }

            // closing bracket of date entry
            const date_closing_bracket = "\n\t}";
            text.value = text.value.concat(date_closing_bracket);
         });

         // Closing bracket of title name entry
         const title_name_closing_bracket = "\n}\n";
         // Writing to the txt string
         text.value = text.value.concat(title_name_closing_bracket);
      }

      // console.log(text.value);
   }

   // Triggers the text file download
   const blob = new Blob([text.value], { type: "text/plain" });
   let link = document.createElement("a");
   link.href = window.URL.createObjectURL(blob);
   link.download = "allResults.txt";
   link.click();
}
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

         <!-- Export all button -->
         <button
            v-if="searchResults.length > 0 && searchInput !== ''"
            class="mt-10 text-secondary bg-tertiary focus:outline-none font-medium px-5 py-3.5 text-center inline-flex items-center focus:ring-0 border-0 focus:border-0"
            title="Export search results into one file"
            @click="exportAllResearchResults"
         >
            Export search results into one file
            <img class="ml-5 h-[25px] color" :src="downloadIcon" />
         </button>
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
               :holding_type="result.holding_type"
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
