import { supabase } from "../supabase/supabase";

export default async function searchUserEntries(category, tier, author, searchInput, sort) {

   if (category === "Titles") {
      if (tier === "Empire") {
         try {
            let { data, error, status } = await supabase
               .from("user_title_history")
               .select(
                  "title, date, liege, holder, government, change_development_level, succession_laws, de_jure_liege, insert_title_history, holder_ignore_head_of_faith_requirement, game_version, effect, author (name), landed_title!inner(*)"
               )
               .eq("author", author)
               .like("landed_title.empire", "%" + searchInput + "%")
            console.log(status, error);
            console.log(data);
            // console.log(searchResults.value);
            return data
         } catch (error) {
            console.log(error.message);
         } finally {
         }
      }
      if (tier === "Kingdom") {
         try {
            let { data, error, status } = await supabase
               .from("user_title_history")
               .select(
                  "title, date, liege, holder, government, change_development_level, succession_laws, de_jure_liege, insert_title_history, holder_ignore_head_of_faith_requirement, game_version, effect, author (name), landed_title!inner(*)"
               )
               .eq("author", author)
               .like("landed_title.kingdom", "%" + searchInput + "%")
            console.log(status, error);
            console.log(data);
            // console.log(searchResults.value);
            return data
         } catch (error) {
            console.log(error.message);
         } finally {
         }
      }
      if (tier === "Duchy") {
         try {
            let { data, error, status } = await supabase
               .from("user_title_history")
               .select(
                  "title, date, liege, holder, government, change_development_level, succession_laws, de_jure_liege, insert_title_history, holder_ignore_head_of_faith_requirement, game_version, effect, author (name), landed_title!inner(*)"
               )
               .eq("author", author)
               .like("landed_title.duchy", "%" + searchInput + "%");
            console.log(status, error);
            console.log(data);
            // console.log(searchResults.value);
            return data
         } catch (error) {
            console.log(error.message);
         } finally {
         }
      }
   }

   if (category === "Provinces") {
      if (tier === "Empire") {
         try {
            let { data, error, status } = await supabase
               .from("user_province_history")
               .select(
                  "province_id, holding_type, religion, culture, date, barony, buildings, special_buildings, terrain, duchy_capital_building, special_building_slot, manual, author (name), landed_title!user_province_history_barony_fkey(title, empire, kingdom, duchy)"
               )
               .eq("author", author)
               .like("landed_title.empire", "%" + searchInput + "%")

            console.log(status, error);
            console.log(data);
            // console.log(searchResults.value);
            return data
         } catch (error) {
            console.log(error.message);
         } finally {
         }
      }
      if (tier === "Kingdom") {
         try {
            let { data, error, status } = await supabase
               .from("user_province_history")
               .select(
                  "province_id, holding_type, religion, culture, date, barony, buildings, special_buildings, terrain, duchy_capital_building, special_building_slot, manual, author (name), landed_title!user_province_history_barony_fkey(title, empire, kingdom, duchy)"
               )
               .eq("author", author)
               .like("landed_title.kingdom", "%" + searchInput + "%")

            console.log(status, error);
            console.log(data);
            // console.log(searchResults.value);
            return data
         } catch (error) {
            console.log(error.message);
         } finally {
         }
      }
      if (tier === "Duchy") {
         try {
            let { data, error, status } = await supabase
               .from("user_province_history")
               .select(
                  "province_id, holding_type, religion, culture, date, barony, buildings, special_buildings, terrain, duchy_capital_building, special_building_slot, manual, author (name), landed_title!user_province_history_barony_fkey(title, empire, kingdom, duchy)"
               )
               .eq("author", author)
               .like("landed_title.duchy", "%" + searchInput + "%");

            console.log(status, error);
            console.log(data);
            // console.log(searchResults.value);
            return data
         } catch (error) {
            console.log(error.message);
         } finally {
         }
      }

   }
}