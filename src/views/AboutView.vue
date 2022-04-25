<script setup>
import { supabase } from "../supabase/supabase";
import amLandedTitles from "../assets/vanilla_ck3/landed_titles_test.json";
// import vanillaLandedTitles from "../assets/vanilla_ck3/parsed_vanilla_landed_titles_test";
import vanillaLandedTitles from "../assets/vanilla_ck3/parsed_vanilla_landed_titles.json";
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
</script>

<template>
   <div class="about">
      <h1>This is an about page</h1>
      <button @click="test">Click me GET</button>
      <button @click="importLandedTitles">Click me INSERT</button>
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
