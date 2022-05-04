<script setup>
import { supabase } from "../supabase/supabase";
import amLandedTitles from "../assets/modded_ck3/parsed_ave_maria_landed_titles.json";
// import vanillaLandedTitles from "../assets/vanilla_ck3/parsed_vanilla_landed_titles_test";
import vanillaLandedTitles from "../assets/vanilla_ck3/parsed_vanilla_landed_titles.json";
// import vanillaProvinceHistory from "../assets/vanilla_ck3/vanilla_province_history_test.json";
import vanillaProvinceHistory from "../assets/vanilla_ck3/parsed_vanilla_province_history.json";
// import vanillaTitleHistory from "../assets/vanilla_ck3/test_title_history.json";
import vanillaTitleHistory from "../assets/vanilla_ck3/parsed_vanilla_title_history.json";
</script>

<script>
async function test() {
   try {
      let { data, error, status } = await supabase
         .from("landed_title")
         .select(`id, title, capital`);

      console.log(data);
   } catch (error) {
      alert(error.message);
   } finally {
   }
}
// async function getProvinceBarony(top_level_entry_key) {
//    try {
//       const { data } = await supabase
//          .from("landed_title")
//          .select("title")
//          .eq("province", parseInt(top_level_entry_key));

//       const provinceBarony = data;
//       return provinceBarony;
//    } catch (error) {
//       alert(error.message);
//    } finally {
//    }
// }
async function importLandedTitles() {
   try {
      // console.log(amLandedTitles);

      // Regex pattern name
      let empire_pattern = /^e_/;
      let kingdom_pattern = /^k_/;
      let duchy_pattern = /^d_/;
      let county_pattern = /^c_/;
      let barony_pattern = /^b_/;

      // for (let key in vanillaLandedTitles) {
      //    console.log(key);
      //    // console.log(key.color);
      //    // console.log(Object.values(vanillaLandedTitles)[0]);
      // }
      // Getting the keys in json converted object
      // top level tier title
      for (const iterator of Object.keys(vanillaLandedTitles)) {
         // console.log(iterator);
         // console.log(iterator);

         // Variable declaration of top level title for clearer syntax below
         const top_level_title = vanillaLandedTitles[iterator];

         // Writing top_level_title informations
         // Supabase Writing
         const { data, error } = await supabase.from("landed_title").insert([
            {
               title: iterator,
               color: top_level_title.color,
               color2: top_level_title.color2,
               capital: top_level_title.capital,
               manual: false,
            },
         ]);

         // console.log(top_level_title);

         // looping over all the keys in the top level title object
         for (const empireKey of Object.keys(top_level_title)) {
            // Getting the kingdom entries and looping over them
            if (empireKey.match(kingdom_pattern)) {
               // Variable declaration of kingdoms for clearer syntax below
               const kingdom = top_level_title[empireKey];

               // console.log(empireKey);

               // Writing Empire informations
               // Supabase Writing
               const { data, error } = await supabase
                  .from("landed_title")
                  .insert([
                     {
                        title: empireKey,
                        color: kingdom.color,
                        color2: kingdom.color2,
                        capital: kingdom.capital,
                        empire: iterator,
                        manual: false,
                        game_version: "1.5.1.1",
                     },
                  ]);

               // looping over all the keys in the kingdom object
               for (const kingdomKey of Object.keys(kingdom)) {
                  // Getting the duchies entries and looping over them
                  if (kingdomKey.match(duchy_pattern)) {
                     // Variable declaration of duchies for clearer syntax below
                     const duchy = kingdom[kingdomKey];

                     // console.log(kingdomKey);

                     // Writing Empire informations
                     // Supabase Writing
                     const { data, error } = await supabase
                        .from("landed_title")
                        .insert([
                           {
                              title: kingdomKey,
                              color: duchy.color,
                              color2: duchy.color2,
                              capital: duchy.capital,
                              empire: iterator,
                              kingdom: empireKey,
                              manual: false,
                              game_version: "1.5.1.1",
                           },
                        ]);

                     // looping over all the keys in the duchy object
                     for (const duchyKey of Object.keys(duchy)) {
                        // Getting the duchy entries and looping over them
                        if (duchyKey.match(county_pattern)) {
                           // Variable declaration of counties for clearer syntax below
                           const county = duchy[duchyKey];

                           // console.log(duchyKey);

                           // Writing Empire informations
                           // Supabase Writing
                           const { data, error } = await supabase
                              .from("landed_title")
                              .insert([
                                 {
                                    title: duchyKey,
                                    color: county.color,
                                    color2: county.color2,
                                    capital: county.capital,
                                    empire: iterator,
                                    kingdom: empireKey,
                                    duchy: kingdomKey,
                                    manual: false,
                                    game_version: "1.5.1.1",
                                 },
                              ]);

                           // Storing baronies keys & object in a separate array to populate the capital_county column
                           const tempBaronies = [];

                           // looping over all the keys in the county object
                           for (const countyKey of Object.keys(county)) {
                              // Searching for the baronies entries
                              if (countyKey.match(barony_pattern)) {
                                 // Variable declaration of baronies for clearer syntax below
                                 const barony = county[countyKey];

                                 // console.log(countyKey);

                                 // Pushing the baronies keys inside the aforementioned array
                                 // tempBaronies.push({ [countyKey]: barony });
                                 tempBaronies.push(countyKey);
                                 // console.log(tempBaronies[0]);

                                 // Writing Empire informations
                                 // Supabase Writing
                                 const { data, error } = await supabase
                                    .from("landed_title")
                                    .insert([
                                       {
                                          title: countyKey,
                                          color: barony.color,
                                          color2: barony.color2,
                                          capital: barony.capital,
                                          province: barony.province,
                                          empire: iterator,
                                          kingdom: empireKey,
                                          duchy: kingdomKey,
                                          county: duchyKey,
                                          county_capital: tempBaronies[0], // getting the first key of the temp array of baronies
                                          manual: false,
                                          game_version: "1.5.1.1",
                                       },
                                    ]);

                                 // console.log(barony.province);
                              }
                           }

                           // console.log(tempBaronies[0]);
                        }
                     }
                  }
               }
            }
         }
      }

      // console.log(data);
   } catch (error) {
      alert(error.message);
   } finally {
   }
}
async function importProvinceHistory() {
   try {
      for (const top_level_entry_key of Object.keys(vanillaProvinceHistory)) {
         // console.log(top_level_entry_key);
         // console.log(parseInt(top_level_entry_key));

         // Variable declaration of top level title for clearer syntax below
         const top_level_entry = vanillaProvinceHistory[top_level_entry_key];

         // Querying the related title of the province
         const baronyQuery = await supabase
            .from("landed_title")
            .select("title")
            .eq("province", parseInt(top_level_entry_key));

         const provinceBarony = baronyQuery.data[0].title;

         // Supabase Writing
         const { data, error, status } = await supabase
            .from("province_history")
            .insert([
               {
                  province_id: top_level_entry_key,
                  holding_type: top_level_entry.holding,
                  religion: top_level_entry.religion,
                  culture: top_level_entry.culture,
                  date: "600.1.1", // Default array has no information, assign a before 867 date
                  barony: provinceBarony,
                  buildings: top_level_entry.buildings,
                  special_buildings: top_level_entry.special_buildings,
                  terrain: top_level_entry.terrain,
                  duchy_capital_building:
                     top_level_entry.duchy_capital_building,
                  special_building_slot: top_level_entry.special_building_slot,
                  manual: false,
               },
            ]);

         // Log validation
         // console.log(baronyQuery.data[0]);

         for (const lower_level_entry_key of Object.keys(top_level_entry)) {
            if (
               lower_level_entry_key !== "holding" &&
               lower_level_entry_key !== "culture" &&
               lower_level_entry_key !== "religion" &&
               lower_level_entry_key !== "buildings" &&
               lower_level_entry_key !== "special_building" &&
               lower_level_entry_key !== "special_building_slot" &&
               lower_level_entry_key !== "terrain" &&
               lower_level_entry_key !== "duchy_capital_building"
            ) {
               // console.log(lower_level_entry_key);
               // Variable declaration of top level title for clearer syntax below
               const lower_level_entry =
                  vanillaProvinceHistory[top_level_entry_key][
                     lower_level_entry_key
                  ];

               // Supabase Writing
               // Either copy higher level entry info or if info exists overwrite it
               const { data, error, status } = await supabase
                  .from("province_history")
                  .insert([
                     {
                        province_id: top_level_entry_key,
                        holding_type:
                           typeof lower_level_entry.holding === "undefined"
                              ? top_level_entry.holding
                              : lower_level_entry.holding,
                        religion:
                           typeof lower_level_entry.religion === "undefined"
                              ? top_level_entry.religion
                              : lower_level_entry.religion,
                        culture:
                           typeof lower_level_entry.culture === "undefined"
                              ? top_level_entry.culture
                              : lower_level_entry.culture,
                        date: lower_level_entry_key,
                        barony: provinceBarony,
                        buildings:
                           typeof lower_level_entry.buildings === "undefined"
                              ? top_level_entry.buildings
                              : lower_level_entry.buildings,
                        special_buildings:
                           typeof lower_level_entry.special_buildings ===
                           "undefined"
                              ? top_level_entry.special_buildings
                              : lower_level_entry.special_buildings,
                        terrain:
                           typeof lower_level_entry.terrain === "undefined"
                              ? top_level_entry.terrain
                              : lower_level_entry.terrain,
                        duchy_capital_building:
                           typeof lower_level_entry.duchy_capital_building ===
                           "undefined"
                              ? top_level_entry.duchy_capital_building
                              : lower_level_entry.duchy_capital_building,
                        special_building_slot:
                           typeof lower_level_entry.special_building_slot ===
                           "undefined"
                              ? top_level_entry.special_building_slot
                              : lower_level_entry.special_building_slot,
                        manual: false,
                     },
                  ]);

               // console.log(status);
            }
         }
      }
      // console.log(status);
   } catch (error) {
      alert(error.message);
   } finally {
   }
}
async function importTitleHistory() {
   try {
      for (const top_level_entry_key of Object.keys(vanillaTitleHistory)) {
         // console.log(top_level_entry_key);
         // console.log(parseInt(top_level_entry_key));

         // Variable declaration of top level title for clearer syntax below
         const top_level_entry = vanillaTitleHistory[top_level_entry_key];
         // console.log(top_level_entry);

         // Looking at all the date entries
         for (const lower_level_entry_key of Object.keys(top_level_entry)) {
            // Variable declaration of top level title for clearer syntax below
            const lower_level_entry = top_level_entry[lower_level_entry_key];

            // console.log(lower_level_entry_key);
            // console.log(lower_level_entry);

            // Malformed syntax in the parser due to identical dates repeated several times in the title history
            if (Array.isArray(lower_level_entry)) {
               // console.log("motherfucker is an array");
               // Populating a temp array with all infos
               const tempInfo = {};

               // Going through the information entries inside the date array
               lower_level_entry.map((date) => {
                  // console.log(date.liege);
                  // console.log(date);

                  // Populating tempInfo, if there is no info, populate it, else ignore and move on
                  typeof tempInfo["liege"] === "undefined"
                     ? (tempInfo["liege"] = date.liege)
                     : "";
                  typeof tempInfo["holder"] === "undefined"
                     ? (tempInfo["holder"] = date.holder)
                     : "";
                  typeof tempInfo["government"] === "undefined"
                     ? (tempInfo["government"] = date.government)
                     : "";
                  typeof tempInfo["change_development_level"] === "undefined"
                     ? (tempInfo["change_development_level"] =
                          date.change_development_level)
                     : "";
                  typeof tempInfo["succession_laws"] === "undefined"
                     ? (tempInfo["succession_laws"] = date.succession_laws)
                     : "";
                  typeof tempInfo["de_jure_liege"] === "undefined"
                     ? (tempInfo["de_jure_liege"] = date.de_jure_liege)
                     : "";
                  typeof tempInfo["de_jure_liege"] === "undefined"
                     ? (tempInfo["de_jure_liege"] = date.de_jure_liege)
                     : "";
                  typeof tempInfo["insert_title_history"] === "undefined"
                     ? (tempInfo["insert_title_history"] =
                          date.insert_title_history)
                     : "";
                  typeof tempInfo["holder_ignore_head_of_faith_requirement"] ===
                  "undefined"
                     ? (tempInfo["holder_ignore_head_of_faith_requirement"] =
                          date.holder_ignore_head_of_faith_requirement)
                     : "";
               });

               // Supabase Writing
               const { data, error, status } = await supabase
                  .from("title_history")
                  .insert([
                     {
                        title: top_level_entry_key,
                        date: lower_level_entry_key,
                        liege: tempInfo.liege,
                        holder: tempInfo.holder,
                        government: tempInfo.government,
                        change_development_level:
                           tempInfo.change_development_level,
                        succession_laws: tempInfo.succession_laws,
                        de_jure_liege: tempInfo.de_jure_liege,
                        insert_title_history: tempInfo.insert_title_history,
                        holder_ignore_head_of_faith_requirement:
                           tempInfo.holder_ignore_head_of_faith_requirement,
                        manual: false,
                     },
                  ]);

               // console.log(tempInfo);
               // console.log(tempInfo.liege);
            } else {
               // console.log(lower_level_entry);
               // console.log(lower_level_entry.liege);

               // Supabase Writing
               const { data, error, status } = await supabase
                  .from("title_history")
                  .insert([
                     {
                        title: top_level_entry_key,
                        date: lower_level_entry_key,
                        liege: lower_level_entry.liege,
                        holder: lower_level_entry.holder,
                        government: lower_level_entry.government,
                        change_development_level:
                           lower_level_entry.change_development_level,
                        succession_laws: lower_level_entry.succession_laws,
                        de_jure_liege: lower_level_entry.de_jure_liege,
                        insert_title_history:
                           lower_level_entry.insert_title_history,
                        holder_ignore_head_of_faith_requirement:
                           lower_level_entry.holder_ignore_head_of_faith_requirement,
                        manual: false,
                     },
                  ]);
            }
         }
      }
   } catch (error) {
      alert(error.message);
   } finally {
   }
}
async function importAMLandedTitles() {
   try {
      // console.log(amLandedTitles);

      // Regex pattern name
      let empire_pattern = /^e_/;
      let kingdom_pattern = /^k_/;
      let duchy_pattern = /^d_/;
      let county_pattern = /^c_/;
      let barony_pattern = /^b_/;

      // Getting the keys in json converted object
      // top level tier title
      for (const iterator of Object.keys(amLandedTitles)) {
         // console.log(iterator);
         // console.log(iterator);

         // Variable declaration of top level title for clearer syntax below
         const top_level_title = amLandedTitles[iterator];

         // Writing top_level_title informations
         // Supabase Writing
         const { data, error } = await supabase
            .from("ave_maria_landed_title")
            .insert([
               {
                  title: iterator,
                  color: top_level_title.color,
                  color2: top_level_title.color2,
                  capital: top_level_title.capital,
                  manual: false,
               },
            ]);

         // console.log(top_level_title);

         // looping over all the keys in the top level title object
         for (const empireKey of Object.keys(top_level_title)) {
            // Getting the kingdom entries and looping over them
            if (empireKey.match(kingdom_pattern)) {
               // Variable declaration of kingdoms for clearer syntax below
               const kingdom = top_level_title[empireKey];

               // console.log(empireKey);

               // Writing Empire informations
               // Supabase Writing
               const { data, error } = await supabase
                  .from("ave_maria_landed_title")
                  .insert([
                     {
                        title: empireKey,
                        color: kingdom.color,
                        color2: kingdom.color2,
                        capital: kingdom.capital,
                        empire: iterator,
                        manual: false,
                        game_version: "1.5.1.1",
                     },
                  ]);

               // looping over all the keys in the kingdom object
               for (const kingdomKey of Object.keys(kingdom)) {
                  // Getting the duchies entries and looping over them
                  if (kingdomKey.match(duchy_pattern)) {
                     // Variable declaration of duchies for clearer syntax below
                     const duchy = kingdom[kingdomKey];

                     // console.log(kingdomKey);

                     // Writing Empire informations
                     // Supabase Writing
                     const { data, error } = await supabase
                        .from("ave_maria_landed_title")
                        .insert([
                           {
                              title: kingdomKey,
                              color: duchy.color,
                              color2: duchy.color2,
                              capital: duchy.capital,
                              empire: iterator,
                              kingdom: empireKey,
                              manual: false,
                              game_version: "1.5.1.1",
                           },
                        ]);

                     // looping over all the keys in the duchy object
                     for (const duchyKey of Object.keys(duchy)) {
                        // Getting the duchy entries and looping over them
                        if (duchyKey.match(county_pattern)) {
                           // Variable declaration of counties for clearer syntax below
                           const county = duchy[duchyKey];

                           // console.log(duchyKey);

                           // Writing Empire informations
                           // Supabase Writing
                           const { data, error } = await supabase
                              .from("ave_maria_landed_title")
                              .insert([
                                 {
                                    title: duchyKey,
                                    color: county.color,
                                    color2: county.color2,
                                    capital: county.capital,
                                    empire: iterator,
                                    kingdom: empireKey,
                                    duchy: kingdomKey,
                                    manual: false,
                                    game_version: "1.5.1.1",
                                 },
                              ]);

                           // Storing baronies keys & object in a separate array to populate the capital_county column
                           const tempBaronies = [];

                           // looping over all the keys in the county object
                           for (const countyKey of Object.keys(county)) {
                              // Searching for the baronies entries
                              if (countyKey.match(barony_pattern)) {
                                 // Variable declaration of baronies for clearer syntax below
                                 const barony = county[countyKey];

                                 // console.log(countyKey);

                                 // Pushing the baronies keys inside the aforementioned array
                                 // tempBaronies.push({ [countyKey]: barony });
                                 tempBaronies.push(countyKey);
                                 // console.log(tempBaronies[0]);

                                 // Writing Empire informations
                                 // Supabase Writing
                                 const { data, error } = await supabase
                                    .from("ave_maria_landed_title")
                                    .insert([
                                       {
                                          title: countyKey,
                                          color: barony.color,
                                          color2: barony.color2,
                                          capital: barony.capital,
                                          province: barony.province,
                                          empire: iterator,
                                          kingdom: empireKey,
                                          duchy: kingdomKey,
                                          county: duchyKey,
                                          county_capital: tempBaronies[0], // getting the first key of the temp array of baronies
                                          manual: false,
                                          game_version: "1.5.1.1",
                                       },
                                    ]);

                                 // console.log(barony.province);
                              }
                           }

                           // console.log(tempBaronies[0]);
                        }
                     }
                  }
               }
            }
         }
      }

      // console.log(data);
   } catch (error) {
      alert(error.message);
   } finally {
   }
}
</script>

<template>
   <div class="about">
      <h1 class="mb-10">This is an about page</h1>
      <button @click="test" class="mb-10">Click me GET</button>
      <button @click="importLandedTitles" class="mb-10">
         Click me INSERT landed titles
      </button>
      <!-- <button @click="importProvinceHistory" class="mb-10"> -->
      <!-- Click me INSERT province history -->
      <!-- </button> -->
      <!-- <button @click="importTitleHistory" class="mb-10">
         Click me INSERT title history
      </button> -->
      <!-- <button @click="importAMLandedTitles" class="mb-10"> -->
      <!-- Click me INSERT AVE MARIA Landed Titles -->
      <!-- </button> -->
      <!-- <button @click="test3">Click me JSON</button> -->
   </div>
</template>

<style>
@media (min-width: 1024px) {
   .about {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
   }
}
</style>
