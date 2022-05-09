import { supabase } from "../supabase/supabase";

// 
// @returns an array of landed title objects

export default function bulkExportTxtFile(data, selectedCategory) {
   // Reset the txt string
   let text = "";

   // console.log(data);
   // Depending on select option, search either title or province history export logic
   if (selectedCategory === "Provinces") {
      // Province history export
      if (data.length > 0) {
         // console.log("hi mom");

         // Looping over all the history entries info
         data.forEach((entry) => {
            // Checking there is something inside the entry
            if (
               entry.province_history.length > 0 ||
               entry.user_title_history.length > 0
            ) {
               // Opening bracket of province id entry
               const province_id_opening_bracket =
                  entry.province + " = {";
               // Writing to the txt string
               text = text.concat(province_id_opening_bracket);

               // Looping over the vanilla date entries inside the title entry
               entry.province_history.forEach((historyEntry) => {
                  // If the date entry is 600.1.1 which is the equivalent of no dated entries, write without a date entry
                  if (historyEntry.date === "600.1.1") {
                     // Defining province info & concat info the txt string
                     if (
                        historyEntry.holding_type !== null &&
                        historyEntry.holding_type !== "undefined" &&
                        historyEntry.holding_type !== ""
                     ) {
                        const province_holding_type =
                           "\n\tholding = " +
                           historyEntry.holding_type;
                        text = text.concat(
                           province_holding_type
                        );
                     }
                     if (
                        historyEntry.religion !== null &&
                        historyEntry.religion !== "undefined" &&
                        historyEntry.religion !== ""
                     ) {
                        const province_religion =
                           "\n\treligion = " + historyEntry.religion;
                        text = text.concat(province_religion);
                     }
                     if (
                        historyEntry.culture !== null &&
                        historyEntry.culture !== "undefined" &&
                        historyEntry.culture !== ""
                     ) {
                        const province_culture =
                           "\n\tculture = " + historyEntry.culture;
                        text = text.concat(province_culture);
                     }
                     if (
                        historyEntry.special_buildings !== null &&
                        historyEntry.special_buildings !== "undefined" &&
                        historyEntry.special_buildings !== ""
                     ) {
                        const province_special_building =
                           "\n\tspecial_building = " +
                           historyEntry.special_buildings;
                        text = text.concat(
                           province_special_building
                        );
                     }
                     if (
                        historyEntry.special_building_slot !== null &&
                        historyEntry.special_building_slot !==
                        "undefined" &&
                        historyEntry.special_building_slot !== ""
                     ) {
                        const province_special_building_slot =
                           "\n\tspecial_building_slot = " +
                           historyEntry.special_building_slot;
                        text = text.concat(
                           province_special_building_slot
                        );
                     }
                     if (
                        historyEntry.duchy_capital_building !== null &&
                        historyEntry.duchy_capital_building !==
                        "undefined" &&
                        historyEntry.duchy_capital_building !== ""
                     ) {
                        const province_duchy_capital_building =
                           "\n\tduchy_capital_building = " +
                           historyEntry.duchy_capital_building;
                        text = text.concat(
                           province_duchy_capital_building
                        );
                     }
                     if (
                        historyEntry.terrain !== null &&
                        historyEntry.terrain !== "undefined" &&
                        historyEntry.terrain !== ""
                     ) {
                        const province_terrain =
                           "\n\tterrain = " + historyEntry.terrain;
                        text = text.concat(province_terrain);
                     }

                     // If there are buildings, write them
                     if (
                        historyEntry.buildings !== null &&
                        historyEntry.buildings.length > 0
                     ) {
                        // Opening brackets of building entries
                        const province_building_opening_bracket =
                           "\n\tbuildings = {\n";
                        text = text.concat(
                           province_building_opening_bracket
                        );

                        // looping over building of date entry & writing them
                        historyEntry.buildings.forEach((building) => {
                           const building_entry =
                              "\t\t" + building + "\n";
                           // writing building entries
                           text = text.concat(building_entry);
                        });

                        // Closing brackets of building entries
                        const province_building_closing_bracket = "\t}";
                        text = text.concat(
                           province_building_closing_bracket
                        );
                     }
                  } else {
                     // Opening bracket of date entry
                     const date_opening_bracket =
                        "\n\t" + historyEntry.date + " = {";
                     text = text.concat(date_opening_bracket);

                     // Defining province info & concat info the txt string
                     if (
                        historyEntry.holding_type !== null &&
                        historyEntry.holding_type !== "undefined" &&
                        historyEntry.holding_type !== ""
                     ) {
                        const province_holding_type =
                           "\n\t\tholding = " +
                           historyEntry.holding_type;
                        text = text.concat(
                           province_holding_type
                        );
                     }
                     if (
                        historyEntry.religion !== null &&
                        historyEntry.religion !== "undefined" &&
                        historyEntry.religion !== ""
                     ) {
                        const province_religion =
                           "\n\t\treligion = " + historyEntry.religion;
                        text = text.concat(province_religion);
                     }
                     if (
                        historyEntry.culture !== null &&
                        historyEntry.culture !== "undefined" &&
                        historyEntry.culture !== ""
                     ) {
                        const province_culture =
                           "\n\t\tculture = " + historyEntry.culture;
                        text = text.concat(province_culture);
                     }
                     if (
                        historyEntry.special_buildings !== null &&
                        historyEntry.special_buildings !== "undefined" &&
                        historyEntry.special_buildings !== ""
                     ) {
                        const province_special_building =
                           "\n\t\tspecial_building = " +
                           historyEntry.special_buildings;
                        text = text.concat(
                           province_special_building
                        );
                     }
                     if (
                        historyEntry.special_building_slot !== null &&
                        historyEntry.special_building_slot !==
                        "undefined" &&
                        historyEntry.special_building_slot !== ""
                     ) {
                        const province_special_building_slot =
                           "\n\t\tspecial_building_slot = " +
                           historyEntry.special_building_slot;
                        text = text.concat(
                           province_special_building_slot
                        );
                     }
                     if (
                        historyEntry.duchy_capital_building !== null &&
                        historyEntry.duchy_capital_building !==
                        "undefined" &&
                        historyEntry.duchy_capital_building !== ""
                     ) {
                        const province_duchy_capital_building =
                           "\n\t\tduchy_capital_building = " +
                           historyEntry.duchy_capital_building;
                        text = text.concat(
                           province_duchy_capital_building
                        );
                     }
                     if (
                        historyEntry.terrain !== null &&
                        historyEntry.terrain !== "undefined" &&
                        historyEntry.terrain !== ""
                     ) {
                        const province_terrain =
                           "\n\t\tterrain = " + historyEntry.terrain;
                        text = text.concat(province_terrain);
                     }

                     // If there are buildings, write them
                     if (
                        historyEntry.buildings !== null &&
                        historyEntry.buildings.length > 0
                     ) {
                        // Opening brackets of building entries
                        const province_building_opening_bracket =
                           "\n\t\tbuildings = {\n";
                        text = text.concat(
                           province_building_opening_bracket
                        );

                        // looping over building of date entry & writing them
                        historyEntry.buildings.forEach((building) => {
                           const building_entry =
                              "\t\t\t" + building + "\n";
                           // writing building entries
                           text = text.concat(building_entry);
                        });

                        // Closing brackets of building entries
                        const province_building_closing_bracket = "\t\t}";
                        text = text.concat(
                           province_building_closing_bracket
                        );
                     }

                     // closing bracket of date entry
                     const date_closing_bracket = "\n\t}";
                     text = text.concat(date_closing_bracket);
                  }
               });

               // Looping over the user date entries inside the title entry
               entry.user_province_history.forEach((historyEntry) => {
                  // If the date entry is 600.1.1 which is the equivalent of no dated entries, write without a date entry
                  if (historyEntry.date === "600.1.1") {
                     // Defining province info & concat info the txt string
                     if (
                        historyEntry.holding_type !== null &&
                        historyEntry.holding_type !== "undefined" &&
                        historyEntry.holding_type !== ""
                     ) {
                        const province_holding_type =
                           "\n\tholding = " +
                           historyEntry.holding_type;
                        text = text.concat(
                           province_holding_type
                        );
                     }
                     if (
                        historyEntry.religion !== null &&
                        historyEntry.religion !== "undefined" &&
                        historyEntry.religion !== ""
                     ) {
                        const province_religion =
                           "\n\treligion = " + historyEntry.religion;
                        text = text.concat(province_religion);
                     }
                     if (
                        historyEntry.culture !== null &&
                        historyEntry.culture !== "undefined" &&
                        historyEntry.culture !== ""
                     ) {
                        const province_culture =
                           "\n\tculture = " + historyEntry.culture;
                        text = text.concat(province_culture);
                     }
                     if (
                        historyEntry.special_buildings !== null &&
                        historyEntry.special_buildings !== "undefined" &&
                        historyEntry.special_buildings !== ""
                     ) {
                        const province_special_building =
                           "\n\tspecial_building = " +
                           historyEntry.special_buildings;
                        text = text.concat(
                           province_special_building
                        );
                     }
                     if (
                        historyEntry.special_building_slot !== null &&
                        historyEntry.special_building_slot !==
                        "undefined" &&
                        historyEntry.special_building_slot !== ""
                     ) {
                        const province_special_building_slot =
                           "\n\tspecial_building_slot = " +
                           historyEntry.special_building_slot;
                        text = text.concat(
                           province_special_building_slot
                        );
                     }
                     if (
                        historyEntry.duchy_capital_building !== null &&
                        historyEntry.duchy_capital_building !==
                        "undefined" &&
                        historyEntry.duchy_capital_building !== ""
                     ) {
                        const province_duchy_capital_building =
                           "\n\tduchy_capital_building = " +
                           historyEntry.duchy_capital_building;
                        text = text.concat(
                           province_duchy_capital_building
                        );
                     }
                     if (
                        historyEntry.terrain !== null &&
                        historyEntry.terrain !== "undefined" &&
                        historyEntry.terrain !== ""
                     ) {
                        const province_terrain =
                           "\n\tterrain = " + historyEntry.terrain;
                        text = text.concat(province_terrain);
                     }

                     // If there are buildings, write them
                     if (
                        historyEntry.buildings !== null &&
                        historyEntry.buildings.length > 0
                     ) {
                        // Opening brackets of building entries
                        const province_building_opening_bracket =
                           "\n\tbuildings = {\n";
                        text = text.concat(
                           province_building_opening_bracket
                        );

                        // looping over building of date entry & writing them
                        historyEntry.buildings.forEach((building) => {
                           const building_entry =
                              "\t\t" + building + "\n";
                           // writing building entries
                           text = text.concat(building_entry);
                        });

                        // Closing brackets of building entries
                        const province_building_closing_bracket = "\t}";
                        text = text.concat(
                           province_building_closing_bracket
                        );
                     }
                  } else {
                     // Opening bracket of date entry
                     const date_opening_bracket =
                        "\n\t" + historyEntry.date + " = {";
                     text = text.concat(date_opening_bracket);

                     // Defining province info & concat info the txt string
                     if (
                        historyEntry.holding_type !== null &&
                        historyEntry.holding_type !== "undefined" &&
                        historyEntry.holding_type !== ""
                     ) {
                        const province_holding_type =
                           "\n\t\tholding = " +
                           historyEntry.holding_type;
                        text = text.concat(
                           province_holding_type
                        );
                     }
                     if (
                        historyEntry.religion !== null &&
                        historyEntry.religion !== "undefined" &&
                        historyEntry.religion !== ""
                     ) {
                        const province_religion =
                           "\n\t\treligion = " + historyEntry.religion;
                        text = text.concat(province_religion);
                     }
                     if (
                        historyEntry.culture !== null &&
                        historyEntry.culture !== "undefined" &&
                        historyEntry.culture !== ""
                     ) {
                        const province_culture =
                           "\n\t\tculture = " + historyEntry.culture;
                        text = text.concat(province_culture);
                     }
                     if (
                        historyEntry.special_buildings !== null &&
                        historyEntry.special_buildings !== "undefined" &&
                        historyEntry.special_buildings !== ""
                     ) {
                        const province_special_building =
                           "\n\t\tspecial_building = " +
                           historyEntry.special_buildings;
                        text = text.concat(
                           province_special_building
                        );
                     }
                     if (
                        historyEntry.special_building_slot !== null &&
                        historyEntry.special_building_slot !==
                        "undefined" &&
                        historyEntry.special_building_slot !== ""
                     ) {
                        const province_special_building_slot =
                           "\n\t\tspecial_building_slot = " +
                           historyEntry.special_building_slot;
                        text = text.concat(
                           province_special_building_slot
                        );
                     }
                     if (
                        historyEntry.duchy_capital_building !== null &&
                        historyEntry.duchy_capital_building !==
                        "undefined" &&
                        historyEntry.duchy_capital_building !== ""
                     ) {
                        const province_duchy_capital_building =
                           "\n\t\tduchy_capital_building = " +
                           historyEntry.duchy_capital_building;
                        text = text.concat(
                           province_duchy_capital_building
                        );
                     }
                     if (
                        historyEntry.terrain !== null &&
                        historyEntry.terrain !== "undefined" &&
                        historyEntry.terrain !== ""
                     ) {
                        const province_terrain =
                           "\n\t\tterrain = " + historyEntry.terrain;
                        text = text.concat(province_terrain);
                     }

                     // If there are buildings, write them
                     if (
                        historyEntry.buildings !== null &&
                        historyEntry.buildings.length > 0
                     ) {
                        // Opening brackets of building entries
                        const province_building_opening_bracket =
                           "\n\t\tbuildings = {\n";
                        text = text.concat(
                           province_building_opening_bracket
                        );

                        // looping over building of date entry & writing them
                        historyEntry.buildings.forEach((building) => {
                           const building_entry =
                              "\t\t\t" + building + "\n";
                           // writing building entries
                           text = text.concat(building_entry);
                        });

                        // Closing brackets of building entries
                        const province_building_closing_bracket = "\t\t}";
                        text = text.concat(
                           province_building_closing_bracket
                        );
                     }

                     // closing bracket of date entry
                     const date_closing_bracket = "\n\t}";
                     text = text.concat(date_closing_bracket);
                  }
               });

               // Closing bracket of province id entry
               const province_id_closing_bracket = "\n}\n";
               // Writing to the txt string
               text = text.concat(province_id_closing_bracket);
            }
         });

         // console.log(text);
      }
   } else if (selectedCategory === "Titles") {
      // title history export
      if (data.length > 0) {
         // console.log(data[0]);
         // console.log(data[0].title_history);

         // Looping over all the history entries info
         data.forEach((entry) => {
            // Checking there is something inside the entry
            if (
               entry.title_history.length > 0 ||
               entry.user_title_history.length > 0
            ) {
               // console.log(entry.title_history);
               // Opening bracket of title name entry
               const title_name_opening_bracket = entry.title + " = {";
               // Writing to the txt string
               text = text.concat(title_name_opening_bracket);

               // Looping over the vanilla date entries inside the title entry
               entry.title_history.forEach((historyEntry) => {
                  // Opening bracket of date entry
                  const date_opening_bracket =
                     "\n\t" + historyEntry.date + " = {";
                  text = text.concat(date_opening_bracket);

                  // Defining title info & concat info the txt string
                  if (
                     historyEntry.liege !== null &&
                     historyEntry.liege !== "undefined" &&
                     historyEntry.liege !== ""
                  ) {
                     const title_liege =
                        "\n\t\tliege = " + historyEntry.liege;
                     text = text.concat(title_liege);
                  }
                  if (
                     historyEntry.holder !== null &&
                     historyEntry.holder !== "undefined" &&
                     historyEntry.holder !== ""
                  ) {
                     const title_holder =
                        "\n\t\tholder = " + historyEntry.holder;
                     text = text.concat(title_holder);
                  }
                  if (
                     historyEntry.government !== null &&
                     historyEntry.government !== "undefined" &&
                     historyEntry.government !== ""
                  ) {
                     const title_government =
                        "\n\t\tgovernment = " + historyEntry.government;
                     text = text.concat(title_government);
                  }
                  if (
                     historyEntry.change_development_level !== null &&
                     historyEntry.change_development_level !==
                     "undefined" &&
                     historyEntry.change_development_level !== 0
                  ) {
                     const title_change_development_level =
                        "\n\t\tchange_development_level = " +
                        historyEntry.change_development_level;
                     text = text.concat(
                        title_change_development_level
                     );
                  }
                  if (
                     historyEntry.de_jure_liege !== null &&
                     historyEntry.de_jure_liege !== "undefined" &&
                     historyEntry.de_jure_liege !== ""
                  ) {
                     const title_de_jure_liege =
                        "\n\t\tde_jure_liege = " +
                        historyEntry.de_jure_liege;
                     text = text.concat(title_de_jure_liege);
                  }
                  if (
                     historyEntry.insert_title_history !== null &&
                     historyEntry.insert_title_history !== "undefined" &&
                     historyEntry.insert_title_history !== ""
                  ) {
                     const title_insert_title_history =
                        "\n\t\tinsert_title_history = " +
                        historyEntry.insert_title_history;
                     text = text.concat(
                        title_insert_title_history
                     );
                  }
                  if (
                     historyEntry.holder_ignore_head_of_faith_requirement !==
                     null &&
                     historyEntry.holder_ignore_head_of_faith_requirement !==
                     "undefined" &&
                     historyEntry.holder_ignore_head_of_faith_requirement !==
                     ""
                  ) {
                     const title_holder_ignore_head_of_faith_requirement =
                        "\n\t\tholder_ignore_head_of_faith_requirement = " +
                        historyEntry.holder_ignore_head_of_faith_requirement;
                     text = text.concat(
                        title_holder_ignore_head_of_faith_requirement
                     );
                  }

                  // If there are succession_laws, write them
                  if (
                     historyEntry.succession_laws !== null &&
                     historyEntry.succession_laws.length > 0
                  ) {
                     // Opening brackets of succession_law entries
                     const title_succession_laws_opening_bracket =
                        "\n\t\tsuccession_laws = {\n";
                     text = text.concat(
                        title_succession_laws_opening_bracket
                     );

                     // looping over succession_law of date entry & writing them
                     historyEntry.succession_laws.forEach(
                        (succession_law) => {
                           const succession_law_entry =
                              "\t\t\t" + succession_law + "\n";
                           // writing succession_law entries
                           text =
                              text.concat(succession_law_entry);
                        }
                     );

                     // Closing brackets of succession_law entries
                     const title_succession_laws_closing_bracket =
                        "\t\t}";
                     text = text.concat(
                        title_succession_laws_closing_bracket
                     );
                  }

                  // closing bracket of date entry
                  const date_closing_bracket = "\n\t}";
                  text = text.concat(date_closing_bracket);
               });

               // Looping over the user date entries inside the title entry
               entry.user_title_history.forEach((historyEntry) => {
                  // Opening bracket of date entry
                  const date_opening_bracket =
                     "\n\t" + historyEntry.date + " = {";
                  text = text.concat(date_opening_bracket);

                  // Defining title info & concat info the txt string
                  if (
                     historyEntry.liege !== null &&
                     historyEntry.liege !== "undefined" &&
                     historyEntry.liege !== ""
                  ) {
                     const title_liege =
                        "\n\t\tliege = " + historyEntry.liege;
                     text = text.concat(title_liege);
                  }
                  if (
                     historyEntry.holder !== null &&
                     historyEntry.holder !== "undefined" &&
                     historyEntry.holder !== ""
                  ) {
                     const title_holder =
                        "\n\t\tholder = " + historyEntry.holder;
                     text = text.concat(title_holder);
                  }
                  if (
                     historyEntry.government !== null &&
                     historyEntry.government !== "undefined" &&
                     historyEntry.government !== ""
                  ) {
                     const title_government =
                        "\n\t\tgovernment = " + historyEntry.government;
                     text = text.concat(title_government);
                  }
                  if (
                     historyEntry.change_development_level !== null &&
                     historyEntry.change_development_level !==
                     "undefined" &&
                     historyEntry.change_development_level !== 0
                  ) {
                     const title_change_development_level =
                        "\n\t\tchange_development_level = " +
                        historyEntry.change_development_level;
                     text = text.concat(
                        title_change_development_level
                     );
                  }
                  if (
                     historyEntry.de_jure_liege !== null &&
                     historyEntry.de_jure_liege !== "undefined" &&
                     historyEntry.de_jure_liege !== ""
                  ) {
                     const title_de_jure_liege =
                        "\n\t\tde_jure_liege = " +
                        historyEntry.de_jure_liege;
                     text = text.concat(title_de_jure_liege);
                  }
                  if (
                     historyEntry.insert_title_history !== null &&
                     historyEntry.insert_title_history !== "undefined" &&
                     historyEntry.insert_title_history !== ""
                  ) {
                     const title_insert_title_history =
                        "\n\t\tinsert_title_history = " +
                        historyEntry.insert_title_history;
                     text = text.concat(
                        title_insert_title_history
                     );
                  }
                  if (
                     historyEntry.holder_ignore_head_of_faith_requirement !==
                     null &&
                     historyEntry.holder_ignore_head_of_faith_requirement !==
                     "undefined" &&
                     historyEntry.holder_ignore_head_of_faith_requirement !==
                     ""
                  ) {
                     const title_holder_ignore_head_of_faith_requirement =
                        "\n\t\tholder_ignore_head_of_faith_requirement = " +
                        historyEntry.holder_ignore_head_of_faith_requirement;
                     text = text.concat(
                        title_holder_ignore_head_of_faith_requirement
                     );
                  }

                  // If there are succession_laws, write them
                  if (
                     historyEntry.succession_laws !== null &&
                     historyEntry.succession_laws.length > 0
                  ) {
                     // Opening brackets of succession_law entries
                     const title_succession_laws_opening_bracket =
                        "\n\t\tsuccession_laws = {\n";
                     text = text.concat(
                        title_succession_laws_opening_bracket
                     );

                     // looping over succession_law of date entry & writing them
                     historyEntry.succession_laws.forEach(
                        (succession_law) => {
                           const succession_law_entry =
                              "\t\t\t" + succession_law + "\n";
                           // writing succession_law entries
                           text =
                              text.concat(succession_law_entry);
                        }
                     );

                     // Closing brackets of succession_law entries
                     const title_succession_laws_closing_bracket =
                        "\t\t}";
                     text = text.concat(
                        title_succession_laws_closing_bracket
                     );
                  }

                  // closing bracket of date entry
                  const date_closing_bracket = "\n\t}";
                  text = text.concat(date_closing_bracket);
               });

               // Closing bracket of title name entry
               const title_name_closing_bracket = "\n}\n";
               // Writing to the txt string
               text = text.concat(title_name_closing_bracket);
            }
         });
      }
   }

   // Triggers the text file download
   const blob = new Blob([text], { type: "text/plain" });
   let link = document.createElement("a");
   link.href = window.URL.createObjectURL(blob);
   link.download = "allResults.txt";
   link.click();
}