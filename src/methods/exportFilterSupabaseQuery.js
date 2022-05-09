import { supabase } from "../supabase/supabase";
import bulkExportTxtFile from "./bulkExportTxtFile";
import bulkExportTxtFileEBAC from "./bulkExportTxtFileEBAC";

// Query supabase based off tier filter as well as string input on said tier
// Use the bulk export txt file method and triggers the txt file download to the user
export default async function exportFilterSupabaseQuery(selectedCategory, tier, exportFilterInput, EBAC) {

   // Depending on export tier use a different like filter
   if (tier === "Empire") {
      const { data, error } = await supabase
         .from("landed_title")
         .select(
            "title, province_history!province_history_barony_fkey(*), province, county_capital, county, duchy, kingdom, empire, user_province_history!user_province_history_barony_fkey(*)"
         )
         .like("title", "b_%")
         .like("empire", "%" + exportFilterInput + "%");

      console.log(data);
      console.log(error);
      // Triggers the txt file export
      if (EBAC === true) {
         // console.log("hello world")
         bulkExportTxtFileEBAC(data, selectedCategory);
      } else {

         bulkExportTxtFile(data, selectedCategory);
      }
   }

   if (tier === "Kingdom") {
      const { data, error } = await supabase
         .from("landed_title")
         .select(
            "title, province_history!province_history_barony_fkey(*), province, county_capital, county, duchy, kingdom, empire, user_province_history!user_province_history_barony_fkey(*)"
         )
         .like("title", "b_%")
         .like("kingdom", "%" + exportFilterInput + "%");

      console.log(data);
      console.log(error);
      // Triggers the txt file export
      if (EBAC === true) {
         console.log("ebac activated")
         bulkExportTxtFileEBAC(data, selectedCategory)
      } else {

         bulkExportTxtFile(data, selectedCategory);
      }
   }

   if (tier === "Duchy") {
      const { data, error } = await supabase
         .from("landed_title")
         .select(
            "title, province_history!province_history_barony_fkey(*), province, county_capital (title, province_history!province_history_barony_fkey(*)), county, duchy, kingdom, empire, user_province_history!user_province_history_barony_fkey(*)"
         )
         .like("title", "b_%")
         .like("duchy", "%" + exportFilterInput + "%");

      console.log(data);
      console.log(error);
      // Triggers the txt file export
      if (EBAC === true) {
         console.log("ebac activated")
         bulkExportTxtFileEBAC(data, selectedCategory)
         // console.log("hello world")
      } else {

         bulkExportTxtFile(data, selectedCategory);
      }
   }
}