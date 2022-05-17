import { supabase } from "../supabase/supabase";

export default async function createUserEntry(category, object, author) {
   if (category === "Provinces") {
      // Supabase Writing
      const { data, error, status } = await supabase
         .from("user_province_history")
         .insert([
            {
               province_id: object.province_id,
               holding_type: object.holding_type,
               religion: object.religion,
               culture: object.culture,
               date: object.date,
               barony: object.barony,
               buildings: object.buildings,
               special_buildings: object.special_buildings,
               terrain: object.terrain,
               duchy_capital_building: object.duchy_capital_building,
               special_building_slot: object.special_building_slot,
               manual: true,
               author: author,
            },
         ]);
      if (error !== null) {
         return error;
      } else {
         return { message: "Entry Successfuly Added !" };
      }
      console.log(status, error);
   } else if (category === "Titles") {
      // Supabase Writing
      const { data, error, status } = await supabase
         .from("user_title_history")
         .insert([
            {
               title: object.title,
               date: object.title_date,
               liege: object.liege,
               holder: object.holder,
               government: object.government,
               change_development_level: object.change_development_level,
               succession_laws: object.succession_laws,
               de_jure_liege: object.de_jure_liege,
               insert_title_history: object.insert_title_history,
               holder_ignore_head_of_faith_requirement:
                  object.holder_ignore_head_of_faith_requirement,
               manual: true,
               author: author,
            },
         ]);

      if (error !== null) {
         return error;
      } else {
         return { message: "Entry Successfuly Added !" };
      }
   }
}