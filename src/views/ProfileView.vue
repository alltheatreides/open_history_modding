<script setup>
import { supabase } from "../supabase/supabase";
import ProvinceCard from "../components/ProvinceCard.vue";
import TitleCard from "../components/TitleCard.vue";
import { userStatusStore } from "../stores/counter";
import downloadIcon from "../assets/svg/download_arrow.svg";
</script>

<script>
export default {
   data() {
      return {
         createdProvinceHistory: [],
         createdTitleHistory: [],

         // Instance pinia user store
         userStore: userStatusStore(),

         // Search Inputs
         selectedCategory: "",
         checkedProvinceEntry: [],
         checkedTitleEntry: [],
         searchInput1: "",
         searchInput2: "",
         searchInput3: "",

         // Txt stream for the file export
         text: "",

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
      // checkedProvinceEntry() {
      //    console.log("hellow world");
      //    console.log(this.checkedProvinceEntry);
      // },
      // checkedTitleEntry(newTitleEntry, oldTitleEntry) {
      //    // console.log("hellow world");
      //    // console.log(this.checkedTitleEntry);
      //    // this.checkedTitleEntry = newTitleEntry;
      // },
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
                  "province_id, holding_type, religion, culture, date, barony, buildings, special_buildings, terrain, duchy_capital_building, special_building_slot, manual, author (name), ave_maria_landed_title!user_province_history_province_id_fkey(*)"
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
      // Rest tests
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

      // Triggers above rest methods depending on selected category
      filterUserEntries() {
         if (this.selectedCategory === "Provinces") {
            this.createdProvinceHistory = [];
            this.supabaseQueryUserProvince();
         } else if (this.selectedCategory === "Titles") {
            this.createdTitleHistory = [];
            this.supabaseQueryUserTitle();
         }
      },

      // Export selected history entries
      // TODO externalize that shit - this one is slightly different as the one in the search export as it looks for additional edge cases of row value
      exportAllResearchResults() {
         // Reset the txt string
         this.text = "";

         // Depending on select option, search either title or province history export logic
         if (this.selectedCategory === "Provinces") {
            // Province history export
            if (this.createdProvinceHistory.length > 0) {
               // console.log("hi mom");
               // Opening bracket of province id entry
               const province_id_opening_bracket =
                  this.createdProvinceHistory[0].province_id + " = {";
               // Writing to the txt string
               this.text = this.text.concat(province_id_opening_bracket);

               // Looping over all the history entries info
               this.createdProvinceHistory.forEach((entry) => {
                  // If the date entry is 600.1.1 which is the equivalent of no dated entries, write without a date entry
                  if (entry.date === "600.1.1") {
                     // Defining province info & concat info the txt string
                     if (
                        entry.holding_type !== null &&
                        entry.holding_type !== "undefined" &&
                        entry.holding_type !== ""
                     ) {
                        const province_holding_type =
                           "\n\tholding_type = " + entry.holding_type;
                        this.text = this.text.concat(province_holding_type);
                     }
                     if (
                        entry.religion !== null &&
                        entry.religion !== "undefined" &&
                        entry.religion !== ""
                     ) {
                        const province_religion =
                           "\n\treligion = " + entry.religion;
                        this.text = this.text.concat(province_religion);
                     }
                     if (
                        entry.culture !== null &&
                        entry.culture !== "undefined" &&
                        entry.culture !== ""
                     ) {
                        const province_culture =
                           "\n\tculture = " + entry.culture;
                        this.text = this.text.concat(province_culture);
                     }
                     if (
                        entry.special_buildings !== null &&
                        entry.special_buildings !== "undefined" &&
                        entry.special_buildings !== ""
                     ) {
                        const province_special_building =
                           "\n\tspecial_building = " + entry.special_buildings;
                        this.text = this.text.concat(province_special_building);
                     }
                     if (
                        entry.special_building_slot !== null &&
                        entry.special_building_slot !== "undefined" &&
                        entry.special_building_slot !== ""
                     ) {
                        const province_special_building_slot =
                           "\n\tspecial_building_slot = " +
                           entry.special_building_slot;
                        this.text = this.text.concat(
                           province_special_building_slot
                        );
                     }
                     if (
                        entry.duchy_capital_building !== null &&
                        entry.duchy_capital_building !== "undefined" &&
                        entry.duchy_capital_building !== ""
                     ) {
                        const province_duchy_capital_building =
                           "\n\tduchy_capital_building = " +
                           entry.duchy_capital_building;
                        this.text = this.text.concat(
                           province_duchy_capital_building
                        );
                     }
                     if (
                        entry.terrain !== null &&
                        entry.terrain !== "undefined" &&
                        entry.terrain !== ""
                     ) {
                        const province_terrain =
                           "\n\tterrain = " + entry.terrain;
                        this.text = this.text.concat(province_terrain);
                     }

                     // If there are buildings, write them
                     if (
                        entry.buildings !== null &&
                        entry.buildings.length > 0
                     ) {
                        // Opening brackets of building entries
                        const province_building_opening_bracket =
                           "\n\tbuildings = {\n";
                        this.text = this.text.concat(
                           province_building_opening_bracket
                        );

                        // looping over building of date entry & writing them
                        entry.buildings.forEach((building) => {
                           const building_entry = "\t\t" + building + "\n";
                           // writing building entries
                           this.text = this.text.concat(building_entry);
                        });

                        // Closing brackets of building entries
                        const province_building_closing_bracket = "\t}";
                        this.text = this.text.concat(
                           province_building_closing_bracket
                        );
                     }
                  } else {
                     // Opening bracket of date entry
                     const date_opening_bracket = "\n\t" + entry.date + " = {";
                     this.text = this.text.concat(date_opening_bracket);

                     // Defining province info & concat info the txt string
                     if (
                        entry.holding_type !== null &&
                        entry.holding_type !== "undefined" &&
                        entry.holding_type !== ""
                     ) {
                        const province_holding_type =
                           "\n\t\tholding_type = " + entry.holding_type;
                        this.text = this.text.concat(province_holding_type);
                     }
                     if (
                        entry.religion !== null &&
                        entry.religion !== "undefined" &&
                        entry.religion !== ""
                     ) {
                        const province_religion =
                           "\n\t\treligion = " + entry.religion;
                        this.text = this.text.concat(province_religion);
                     }
                     if (
                        entry.culture !== null &&
                        entry.culture !== "undefined" &&
                        entry.culture !== ""
                     ) {
                        const province_culture =
                           "\n\t\tculture = " + entry.culture;
                        this.text = this.text.concat(province_culture);
                     }
                     if (
                        entry.special_buildings !== null &&
                        entry.special_buildings !== "undefined" &&
                        entry.special_buildings !== ""
                     ) {
                        const province_special_building =
                           "\n\t\tspecial_building = " +
                           entry.special_buildings;
                        this.text = this.text.concat(province_special_building);
                     }
                     if (
                        entry.special_building_slot !== null &&
                        entry.special_building_slot !== "undefined" &&
                        entry.special_building_slot !== ""
                     ) {
                        const province_special_building_slot =
                           "\n\t\tspecial_building_slot = " +
                           entry.special_building_slot;
                        this.text = this.text.concat(
                           province_special_building_slot
                        );
                     }
                     if (
                        entry.duchy_capital_building !== null &&
                        entry.duchy_capital_building !== "undefined" &&
                        entry.duchy_capital_building !== ""
                     ) {
                        const province_duchy_capital_building =
                           "\n\t\tduchy_capital_building = " +
                           entry.duchy_capital_building;
                        this.text = this.text.concat(
                           province_duchy_capital_building
                        );
                     }
                     if (
                        entry.terrain !== null &&
                        entry.terrain !== "undefined" &&
                        entry.terrain !== ""
                     ) {
                        const province_terrain =
                           "\n\t\tterrain = " + entry.terrain;
                        this.text = this.text.concat(province_terrain);
                     }

                     // If there are buildings, write them
                     if (
                        entry.buildings !== null &&
                        entry.buildings.length > 0
                     ) {
                        // Opening brackets of building entries
                        const province_building_opening_bracket =
                           "\n\t\tbuildings = {\n";
                        this.text = this.text.concat(
                           province_building_opening_bracket
                        );

                        // looping over building of date entry & writing them
                        entry.buildings.forEach((building) => {
                           const building_entry = "\t\t\t" + building + "\n";
                           // writing building entries
                           this.text = this.text.concat(building_entry);
                        });

                        // Closing brackets of building entries
                        const province_building_closing_bracket = "\t\t}";
                        this.text = this.text.concat(
                           province_building_closing_bracket
                        );
                     }

                     // closing bracket of date entry
                     const date_closing_bracket = "\n\t}";
                     this.text = this.text.concat(date_closing_bracket);
                  }
               });

               // Closing bracket of province id entry
               const province_id_closing_bracket = "\n}\n";
               // Writing to the txt string
               this.text = this.text.concat(province_id_closing_bracket);

               // console.log(this.text);
            }
         } else if (this.selectedCategory === "Titles") {
            // title history export
            if (this.createdTitleHistory.length > 0) {
               // Opening bracket of title name entry
               const title_name_opening_bracket =
                  this.createdTitleHistory[0].title + " = {";
               // Writing to the txt string
               this.text = this.text.concat(title_name_opening_bracket);

               // Looping over all the history entries info
               this.createdTitleHistory.forEach((entry) => {
                  // Opening bracket of date entry
                  const date_opening_bracket = "\n\t" + entry.date + " = {";
                  this.text = this.text.concat(date_opening_bracket);

                  // Defining title info & concat info the txt string
                  if (
                     entry.liege !== null &&
                     entry.liege !== "undefined" &&
                     entry.liege !== ""
                  ) {
                     const title_liege = "\n\t\tliege = " + entry.liege;
                     this.text = this.text.concat(title_liege);
                  }
                  if (
                     entry.holder !== null &&
                     entry.holder !== "undefined" &&
                     entry.holder !== ""
                  ) {
                     const title_holder = "\n\t\tholder = " + entry.holder;
                     this.text = this.text.concat(title_holder);
                  }
                  if (
                     entry.government !== null &&
                     entry.government !== "undefined" &&
                     entry.government !== ""
                  ) {
                     const title_government =
                        "\n\t\tgovernment = " + entry.government;
                     this.text = this.text.concat(title_government);
                  }
                  if (
                     entry.change_development_level !== null &&
                     entry.change_development_level !== "undefined" &&
                     entry.change_development_level !== 0
                  ) {
                     const title_change_development_level =
                        "\n\t\tchange_development_level = " +
                        entry.change_development_level;
                     this.text = this.text.concat(
                        title_change_development_level
                     );
                  }
                  if (
                     entry.de_jure_liege !== null &&
                     entry.de_jure_liege !== "undefined" &&
                     entry.de_jure_liege !== ""
                  ) {
                     const title_de_jure_liege =
                        "\n\t\tde_jure_liege = " + entry.de_jure_liege;
                     this.text = this.text.concat(title_de_jure_liege);
                  }
                  if (
                     entry.insert_title_history !== null &&
                     entry.insert_title_history !== "undefined" &&
                     entry.insert_title_history !== ""
                  ) {
                     const title_insert_title_history =
                        "\n\t\tinsert_title_history = " +
                        entry.insert_title_history;
                     this.text = this.text.concat(title_insert_title_history);
                  }
                  if (
                     entry.holder_ignore_head_of_faith_requirement !== null &&
                     entry.holder_ignore_head_of_faith_requirement !==
                        "undefined" &&
                     entry.holder_ignore_head_of_faith_requirement !== ""
                  ) {
                     const title_holder_ignore_head_of_faith_requirement =
                        "\n\t\tholder_ignore_head_of_faith_requirement = " +
                        entry.holder_ignore_head_of_faith_requirement;
                     this.text = this.text.concat(
                        title_holder_ignore_head_of_faith_requirement
                     );
                  }

                  // If there are succession_laws, write them
                  if (
                     entry.succession_laws !== null &&
                     entry.succession_laws.length > 0
                  ) {
                     // Opening brackets of succession_law entries
                     const title_succession_laws_opening_bracket =
                        "\n\t\tsuccession_laws = {\n";
                     this.text = this.text.concat(
                        title_succession_laws_opening_bracket
                     );

                     // looping over succession_law of date entry & writing them
                     entry.succession_laws.forEach((succession_law) => {
                        const succession_law_entry =
                           "\t\t\t" + succession_law + "\n";
                        // writing succession_law entries
                        this.text = this.text.concat(succession_law_entry);
                     });

                     // Closing brackets of succession_law entries
                     const title_succession_laws_closing_bracket = "\t\t}";
                     this.text = this.text.concat(
                        title_succession_laws_closing_bracket
                     );
                  }

                  // closing bracket of date entry
                  const date_closing_bracket = "\n\t}";
                  this.text = this.text.concat(date_closing_bracket);
               });

               // Closing bracket of title name entry
               const title_name_closing_bracket = "\n}\n";
               // Writing to the txt string
               this.text = this.text.concat(title_name_closing_bracket);
            }

            // console.log(this.text);
         }

         // Triggers the text file download
         const blob = new Blob([this.text], { type: "text/plain" });
         let link = document.createElement("a");
         link.href = window.URL.createObjectURL(blob);
         link.download = "allResults.txt";
         link.click();
      },
      exportSelectedResearchResults() {
         // Reset the txt string
         this.text = "";

         // Depending on select option, search either title or province history export logic
         if (this.selectedCategory === "Provinces") {
            // Province history export
            if (this.checkedProvinceEntry.length > 0) {
               // console.log("hi mom");
               // Opening bracket of province id entry
               const province_id_opening_bracket =
                  this.checkedProvinceEntry[0].province_id + " = {";
               // Writing to the txt string
               this.text = this.text.concat(province_id_opening_bracket);

               // Looping over all the history entries info
               this.checkedProvinceEntry.forEach((entry) => {
                  // If the date entry is 600.1.1 which is the equivalent of no dated entries, write without a date entry
                  if (entry.date === "600.1.1") {
                     // Defining province info & concat info the txt string
                     if (
                        entry.holding_type !== null &&
                        entry.holding_type !== "undefined" &&
                        entry.holding_type !== ""
                     ) {
                        const province_holding_type =
                           "\n\tholding_type = " + entry.holding_type;
                        this.text = this.text.concat(province_holding_type);
                     }
                     if (
                        entry.religion !== null &&
                        entry.religion !== "undefined" &&
                        entry.religion !== ""
                     ) {
                        const province_religion =
                           "\n\treligion = " + entry.religion;
                        this.text = this.text.concat(province_religion);
                     }
                     if (
                        entry.culture !== null &&
                        entry.culture !== "undefined" &&
                        entry.culture !== ""
                     ) {
                        const province_culture =
                           "\n\tculture = " + entry.culture;
                        this.text = this.text.concat(province_culture);
                     }
                     if (
                        entry.special_buildings !== null &&
                        entry.special_buildings !== "undefined" &&
                        entry.special_buildings !== ""
                     ) {
                        const province_special_building =
                           "\n\tspecial_building = " + entry.special_buildings;
                        this.text = this.text.concat(province_special_building);
                     }
                     if (
                        entry.special_building_slot !== null &&
                        entry.special_building_slot !== "undefined" &&
                        entry.special_building_slot !== ""
                     ) {
                        const province_special_building_slot =
                           "\n\tspecial_building_slot = " +
                           entry.special_building_slot;
                        this.text = this.text.concat(
                           province_special_building_slot
                        );
                     }
                     if (
                        entry.duchy_capital_building !== null &&
                        entry.duchy_capital_building !== "undefined" &&
                        entry.duchy_capital_building !== ""
                     ) {
                        const province_duchy_capital_building =
                           "\n\tduchy_capital_building = " +
                           entry.duchy_capital_building;
                        this.text = this.text.concat(
                           province_duchy_capital_building
                        );
                     }
                     if (
                        entry.terrain !== null &&
                        entry.terrain !== "undefined" &&
                        entry.terrain !== ""
                     ) {
                        const province_terrain =
                           "\n\tterrain = " + entry.terrain;
                        this.text = this.text.concat(province_terrain);
                     }

                     // If there are buildings, write them
                     if (
                        entry.buildings !== null &&
                        entry.buildings.length > 0
                     ) {
                        // Opening brackets of building entries
                        const province_building_opening_bracket =
                           "\n\tbuildings = {\n";
                        this.text = this.text.concat(
                           province_building_opening_bracket
                        );

                        // looping over building of date entry & writing them
                        entry.buildings.forEach((building) => {
                           const building_entry = "\t\t" + building + "\n";
                           // writing building entries
                           this.text = this.text.concat(building_entry);
                        });

                        // Closing brackets of building entries
                        const province_building_closing_bracket = "\t}";
                        this.text = this.text.concat(
                           province_building_closing_bracket
                        );
                     }
                  } else {
                     // Opening bracket of date entry
                     const date_opening_bracket = "\n\t" + entry.date + " = {";
                     this.text = this.text.concat(date_opening_bracket);

                     // Defining province info & concat info the txt string
                     if (
                        entry.holding_type !== null &&
                        entry.holding_type !== "undefined" &&
                        entry.holding_type !== ""
                     ) {
                        const province_holding_type =
                           "\n\t\tholding_type = " + entry.holding_type;
                        this.text = this.text.concat(province_holding_type);
                     }
                     if (
                        entry.religion !== null &&
                        entry.religion !== "undefined" &&
                        entry.religion !== ""
                     ) {
                        const province_religion =
                           "\n\t\treligion = " + entry.religion;
                        this.text = this.text.concat(province_religion);
                     }
                     if (
                        entry.culture !== null &&
                        entry.culture !== "undefined" &&
                        entry.culture !== ""
                     ) {
                        const province_culture =
                           "\n\t\tculture = " + entry.culture;
                        this.text = this.text.concat(province_culture);
                     }
                     if (
                        entry.special_buildings !== null &&
                        entry.special_buildings !== "undefined" &&
                        entry.special_buildings !== ""
                     ) {
                        const province_special_building =
                           "\n\t\tspecial_building = " +
                           entry.special_buildings;
                        this.text = this.text.concat(province_special_building);
                     }
                     if (
                        entry.special_building_slot !== null &&
                        entry.special_building_slot !== "undefined" &&
                        entry.special_building_slot !== ""
                     ) {
                        const province_special_building_slot =
                           "\n\t\tspecial_building_slot = " +
                           entry.special_building_slot;
                        this.text = this.text.concat(
                           province_special_building_slot
                        );
                     }
                     if (
                        entry.duchy_capital_building !== null &&
                        entry.duchy_capital_building !== "undefined" &&
                        entry.duchy_capital_building !== ""
                     ) {
                        const province_duchy_capital_building =
                           "\n\t\tduchy_capital_building = " +
                           entry.duchy_capital_building;
                        this.text = this.text.concat(
                           province_duchy_capital_building
                        );
                     }
                     if (
                        entry.terrain !== null &&
                        entry.terrain !== "undefined" &&
                        entry.terrain !== ""
                     ) {
                        const province_terrain =
                           "\n\t\tterrain = " + entry.terrain;
                        this.text = this.text.concat(province_terrain);
                     }

                     // If there are buildings, write them
                     if (
                        entry.buildings !== null &&
                        entry.buildings.length > 0
                     ) {
                        // Opening brackets of building entries
                        const province_building_opening_bracket =
                           "\n\t\tbuildings = {\n";
                        this.text = this.text.concat(
                           province_building_opening_bracket
                        );

                        // looping over building of date entry & writing them
                        entry.buildings.forEach((building) => {
                           const building_entry = "\t\t\t" + building + "\n";
                           // writing building entries
                           this.text = this.text.concat(building_entry);
                        });

                        // Closing brackets of building entries
                        const province_building_closing_bracket = "\t\t}";
                        this.text = this.text.concat(
                           province_building_closing_bracket
                        );
                     }

                     // closing bracket of date entry
                     const date_closing_bracket = "\n\t}";
                     this.text = this.text.concat(date_closing_bracket);
                  }
               });

               // Closing bracket of province id entry
               const province_id_closing_bracket = "\n}\n";
               // Writing to the txt string
               this.text = this.text.concat(province_id_closing_bracket);

               // console.log(this.text);
            }
         } else if (this.selectedCategory === "Titles") {
            // title history export
            if (this.checkedTitleEntry.length > 0) {
               console.log(this.checkedTitleEntry);
               // Opening bracket of title name entry
               const title_name_opening_bracket =
                  this.checkedTitleEntry[0].title + " = {";
               // Writing to the txt string
               this.text = this.text.concat(title_name_opening_bracket);

               // Looping over all the history entries info
               this.checkedTitleEntry.forEach((entry) => {
                  // Opening bracket of date entry
                  const date_opening_bracket = "\n\t" + entry.date + " = {";
                  this.text = this.text.concat(date_opening_bracket);

                  // Defining title info & concat info the txt string
                  if (
                     entry.liege !== null &&
                     entry.liege !== "undefined" &&
                     entry.liege !== ""
                  ) {
                     const title_liege = "\n\t\tliege = " + entry.liege;
                     this.text = this.text.concat(title_liege);
                  }
                  if (
                     entry.holder !== null &&
                     entry.holder !== "undefined" &&
                     entry.holder !== ""
                  ) {
                     const title_holder = "\n\t\tholder = " + entry.holder;
                     this.text = this.text.concat(title_holder);
                  }
                  if (
                     entry.government !== null &&
                     entry.government !== "undefined" &&
                     entry.government !== ""
                  ) {
                     const title_government =
                        "\n\t\tgovernment = " + entry.government;
                     this.text = this.text.concat(title_government);
                  }
                  if (
                     entry.change_development_level !== null &&
                     entry.change_development_level !== "undefined" &&
                     entry.change_development_level !== 0
                  ) {
                     const title_change_development_level =
                        "\n\t\tchange_development_level = " +
                        entry.change_development_level;
                     this.text = this.text.concat(
                        title_change_development_level
                     );
                  }
                  if (
                     entry.de_jure_liege !== null &&
                     entry.de_jure_liege !== "undefined" &&
                     entry.de_jure_liege !== ""
                  ) {
                     const title_de_jure_liege =
                        "\n\t\tde_jure_liege = " + entry.de_jure_liege;
                     this.text = this.text.concat(title_de_jure_liege);
                  }
                  if (
                     entry.insert_title_history !== null &&
                     entry.insert_title_history !== "undefined" &&
                     entry.insert_title_history !== ""
                  ) {
                     const title_insert_title_history =
                        "\n\t\tinsert_title_history = " +
                        entry.insert_title_history;
                     this.text = this.text.concat(title_insert_title_history);
                  }
                  if (
                     entry.holder_ignore_head_of_faith_requirement !== null &&
                     entry.holder_ignore_head_of_faith_requirement !==
                        "undefined" &&
                     entry.holder_ignore_head_of_faith_requirement !== ""
                  ) {
                     const title_holder_ignore_head_of_faith_requirement =
                        "\n\t\tholder_ignore_head_of_faith_requirement = " +
                        entry.holder_ignore_head_of_faith_requirement;
                     this.text = this.text.concat(
                        title_holder_ignore_head_of_faith_requirement
                     );
                  }

                  // If there are succession_laws, write them
                  if (
                     entry.succession_laws !== null &&
                     entry.succession_laws.length > 0
                  ) {
                     // Opening brackets of succession_law entries
                     const title_succession_laws_opening_bracket =
                        "\n\t\tsuccession_laws = {\n";
                     this.text = this.text.concat(
                        title_succession_laws_opening_bracket
                     );

                     // looping over succession_law of date entry & writing them
                     entry.succession_laws.forEach((succession_law) => {
                        const succession_law_entry =
                           "\t\t\t" + succession_law + "\n";
                        // writing succession_law entries
                        this.text = this.text.concat(succession_law_entry);
                     });

                     // Closing brackets of succession_law entries
                     const title_succession_laws_closing_bracket = "\t\t}";
                     this.text = this.text.concat(
                        title_succession_laws_closing_bracket
                     );
                  }

                  // closing bracket of date entry
                  const date_closing_bracket = "\n\t}";
                  this.text = this.text.concat(date_closing_bracket);
               });

               // Closing bracket of title name entry
               const title_name_closing_bracket = "\n}\n";
               // Writing to the txt string
               this.text = this.text.concat(title_name_closing_bracket);
            }

            // console.log(this.text);
         }

         // Triggers the text file download
         const blob = new Blob([this.text], { type: "text/plain" });
         let link = document.createElement("a");
         link.href = window.URL.createObjectURL(blob);
         link.download = "allResults.txt";
         link.click();
      },

      // Handle the display of the detail cards
      showDetails(entry) {
         entry.isVisible = !entry.isVisible;
         // console.log(entry);
      },

      // Manages addition of checked items to the internal title array
      addTitleEntry(entry) {
         // console.log(entry);
         if (this.checkedTitleEntry.includes(entry)) {
            // console.log("it is there already");
            this.checkedTitleEntry.splice(
               this.checkedTitleEntry.indexOf(entry),
               1
            );
         } else {
            this.checkedTitleEntry.push(entry);
         }
         // console.log(this.checkedTitleEntry);
      },
      // Manages addition of checked items to the internal province array
      addProvinceEntry(entry) {
         // console.log(entry);
         if (this.checkedProvinceEntry.includes(entry)) {
            // console.log("it is there already");
            this.checkedProvinceEntry.splice(
               this.checkedProvinceEntry.indexOf(entry),
               1
            );
         } else {
            this.checkedProvinceEntry.push(entry);
         }
         // console.log(this.checkedTitleEntry);
      },

      // Resets all search filters and internal arrays to 0
      resetFilters() {
         this.selectedCategory = "";
         this.searchInput1 = "";
         this.searchInput2 = "";
         this.searchInput3 = "";
         this.createdProvinceHistory = [];
         this.createdTitleHistory = [];
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
         <!-- User Entry Informations -->
         <div class="flex flex-col xl:flex-row gap-10 w-full mx-auto">
            <!-- Left column, Filter options -->
            <article
               class="mt-10 bg-secondary10 xl:w-3/12 xl:mx-auto p-6 rounded flex flex-col"
            >
               <div class="flex justify-between items-center mb-6">
                  <h2 class="text-xl font-semibold">Filter options</h2>
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
            <article
               class="mt-10 w-9/12 mx-auto"
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
               <div
                  class="flex gap-4 border-b border-secondary"
                  v-if="createdProvinceHistory.length > 0"
               >
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
               <div
                  class="flex gap-4 border-b border-secondary"
                  v-if="createdTitleHistory.length > 0"
               >
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
