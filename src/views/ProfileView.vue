<script setup>
import { supabase } from "../supabase/supabase";
import ProvinceCard from "../components/ProvinceCard.vue";
import TitleCard from "../components/TitleCard.vue";
import { userStatusStore } from "../stores/counter";
</script>

<script>
export default {
   data() {
      return {
         createdProvinceHistory: [],
         createdTitleHistory: [],

         // Instance pinia user store
         userStore: userStatusStore(),

         // Inputs
         selectedCategory: "",
         checkedProvinceEntry: [],
         searchInput1: "",
         searchInput2: "",
         searchInput3: "",

         // Details of entry visibility
         isVisible: false,
         activeClass: "block",
      };
   },
   watch: {
      // whenever category changes, this function will run
      // selectedCategory(newCategory, oldCategory) {
      //    if (newCategory === "Titles") {
      //       // console.log("Hello titles");
      //       this.supabaseQueryUserTitle();
      //    }
      //    if (newCategory === "Provinces") {
      //       // console.log("Hello provinces");
      //       this.supabaseQueryUserProvince();
      //    }
      // },
      //
      checkedProvinceEntry() {
         console.log("hellow world");
         console.log(this.checkedProvinceEntry);
      },
      // watch the search input and query the database according to the value
      // searchInput1(newValue) {
      //    this.supabaseQueryTest(newValue);
      //    // this.supabaseQueryTest(this.searchInput1);
      //    console.log(newValue);
      // },
   },
   methods: {
      // REST method to query created province history
      async supabaseQueryUserProvince() {
         try {
            let { data, error, status } = await supabase
               .from("user_province_history")
               .select(
                  "province_id, holding_type, religion, culture, date, barony, buildings, special_buildings, terrain, duchy_capital_building, special_building_slot, manual, author (name), ave_maria_landed_title!inner(*)"
               )
               .eq("author", this.userStore.userInfo.id)
               .like(
                  "ave_maria_landed_title.empire",
                  "%" + this.searchInput1 + "%"
               )
               .like(
                  "ave_maria_landed_title.kingdom",
                  "%" + this.searchInput2 + "%"
               )
               .like(
                  "ave_maria_landed_title.duchy",
                  "%" + this.searchInput3 + "%"
               );

            this.createdProvinceHistory = data;
            console.log(status, error);
            console.log(data);
            // console.log(this.searchResults);
         } catch (error) {
            console.log(error.message);
         } finally {
         }
      },
      // REST method to query created title history
      async supabaseQueryUserTitle() {
         try {
            let { data, error, status } = await supabase
               .from("user_title_history")
               .select(
                  "title, date, liege, holder, government, change_development_level, succession_laws, de_jure_liege, insert_title_history, holder_ignore_head_of_faith_requirement, game_version, effect, author (name), ave_maria_landed_title!inner(*)"
               )
               .eq("author", this.userStore.userInfo.id)
               .like(
                  "ave_maria_landed_title.empire",
                  "%" + this.searchInput1 + "%"
               )
               .like(
                  "ave_maria_landed_title.kingdom",
                  "%" + this.searchInput2 + "%"
               )
               .like(
                  "ave_maria_landed_title.duchy",
                  "%" + this.searchInput3 + "%"
               );
            this.createdTitleHistory = data;
            console.log(status, error);
            console.log(data);
            // console.log(this.searchResults);
         } catch (error) {
            console.log(error.message);
         } finally {
         }
      },
      async supabaseQueryTest() {
         const { data, error } = await supabase
            .from("province_history")
            .select("barony, ave_maria_landed_title!inner(*)")
            .like(
               "ave_maria_landed_title.empire",
               "%" + this.searchInput1 + "%"
            )
            .like(
               "ave_maria_landed_title.kingdom",
               "%" + this.searchInput2 + "%"
            )
            .like(
               "ave_maria_landed_title.duchy",
               "%" + this.searchInput3 + "%"
            );

         console.log(data);
         console.log(error);
      },

      filterUserEntries() {
         if (this.selectedCategory === "Provinces") {
            this.createdProvinceHistory = [];
            this.supabaseQueryUserProvince();
         } else if (this.selectedCategory === "Titles") {
            this.createdTitleHistory = [];
            this.supabaseQueryUserTitle();
         }
      },

      showDetails(entry) {
         entry.isVisible = !entry.isVisible;
         // console.log(entry);
      },

      resetFilters() {
         this.selectedCategory = "";
         this.searchInput1 = "";
         this.searchInput2 = "";
         this.searchInput3 = "";
      },
   },
   mounted() {
      // this.supabaseQueryUserProvince();
      // this.supabaseQueryUserTitle();
      // this.supabaseQueryTest();
   },
};
</script>

<template>
   <main class="container mx-auto mb-10">
      <section class="mt-24">
         <!-- Page title -->
         <h1 class="text-3xl font-semibold border-b pb-6 border-secondary">
            User Created History
         </h1>
         <!-- Created Informations -->
         <div class="flex flex-col md:flex-row gap-10">
            <!-- Left column, Filter options -->
            <article
               class="mt-10 bg-secondary10 w-2/6 p-6 rounded flex flex-col"
            >
               <div class="flex justify-between items-center mb-6">
                  <h2 class="text-lg font-semibold">Filter options</h2>
                  <p class="text-sm" @click="resetFilters()">
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

            <!-- Right column, empty category selected -->
            <article class="mt-10 w-4/6" v-if="selectedCategory === ''">
               <p>Select filter options to see results</p>
            </article>
            <!-- Right column , province created results -->
            <article
               class="mt-10 w-4/6"
               v-if="selectedCategory === 'Provinces'"
            >
               <!-- Province Results entry -->
               <div
                  v-for="entry in createdProvinceHistory"
                  :key="entry.id"
                  class="bg-[#fcf9f2] rounded-lg p-6 mb-4"
               >
                  <div class="flex items-center">
                     <!-- Checkbox for export -->
                     <input
                        type="checkbox"
                        :id="entry.province_id"
                        :value="entry.province_id"
                        v-model="checkedProvinceEntry"
                     />
                     <!-- Basic infos -->
                     <div class="pl-4 flex">
                        <label :for="entry.province_id" class=""
                           >Province id: {{ entry.province_id }}
                        </label>
                        <span class="ml-6">{{ entry.barony }}</span>
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
                        :duchy_capital_building="entry.duchy_capital_building"
                        :special_building_slot="entry.special_building_slot"
                        :terrain="entry.terrain"
                        :author="entry.author"
                        :manual="entry.manual"
                     />
                  </div>
               </div>
            </article>
            <!-- Right column , title created results -->
            <article class="mt-10 w-4/6" v-if="selectedCategory === 'Titles'">
               <!-- Title Results entry -->
               <div
                  v-for="entry in createdTitleHistory"
                  :key="entry.id"
                  class="bg-[#fcf9f2] rounded-lg p-6 mb-4"
               >
                  <div class="flex items-center">
                     <!-- Checkbox for export -->
                     <input
                        type="checkbox"
                        :id="entry.province_id"
                        :value="entry.province_id"
                        v-model="checkedProvinceEntry"
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
                  <div
                     :class="entry.isVisible ? activeClass : 'hidden'"
                     class="mt-6"
                  >
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
            </article>
         </div>
      </section>
   </main>
</template>
