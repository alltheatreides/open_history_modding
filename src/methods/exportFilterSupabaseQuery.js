import { supabase } from "../supabase/supabase";
import bulkExportTxtFile from "./bulkExportTxtFile";
import bulkExportTxtFileEBAC from "./bulkExportTxtFileEBAC";

// Query supabase based off tier filter as well as string input on said tier
// Use the bulk export txt file method and triggers the txt file download to the user
export default async function exportFilterSupabaseQuery(selectedCategory, tier, exportFilterInput, EBAC) {

   // Change the query depending on the category
   // Province query only takes the barony entries from landed titles
   if (selectedCategory === "Provinces") {
      // Depending on export tier use a different like filter
      if (tier === "Empire") {
         const { data, error } = await supabase
            .from("landed_title")
            .select(
               "title, province_history!province_history_barony_fkey(*), title_history!title_history_title_fkey(*), province, county_capital (title, province_history!province_history_barony_fkey(*), user_province_history!user_province_history_barony_fkey(*)), county, duchy, kingdom, empire, user_province_history!user_province_history_barony_fkey(*), user_title_history!user_title_history_title_fkey(*)"
            )
            .like("title", "b_%")
            .like("empire", "%" + exportFilterInput + "%");

         console.log(data);
         console.log(error);
         // Triggers the txt file export
         if (EBAC === true) {
            console.log("ebac activated")
            bulkExportTxtFileEBAC(data, selectedCategory, exportFilterInput);
         } else {
            bulkExportTxtFile(data, selectedCategory, exportFilterInput);
         }
      }

      if (tier === "Kingdom") {
         const { data, error } = await supabase
            .from("landed_title")
            .select(
               "title, province_history!province_history_barony_fkey(*), title_history!title_history_title_fkey(*), province, county_capital (title, province_history!province_history_barony_fkey(*), user_province_history!user_province_history_barony_fkey(*)), county, duchy, kingdom, empire, user_province_history!user_province_history_barony_fkey(*), user_title_history!user_title_history_title_fkey(*)"
            )
            .like("title", "b_%")
            .like("kingdom", "%" + exportFilterInput + "%");

         console.log(data);
         console.log(error);
         // Triggers the txt file export
         if (EBAC === true) {
            console.log("ebac activated")
            bulkExportTxtFileEBAC(data, selectedCategory, exportFilterInput)
         } else {
            bulkExportTxtFile(data, selectedCategory, exportFilterInput);
         }
      }

      if (tier === "Duchy") {
         const { data, error } = await supabase
            .from("landed_title")
            .select(
               "title, province_history!province_history_barony_fkey(*), title_history!title_history_title_fkey(*), province, county_capital (title, province_history!province_history_barony_fkey(*), user_province_history!user_province_history_barony_fkey(*)), county, duchy, kingdom, empire, user_province_history!user_province_history_barony_fkey(*), user_title_history!user_title_history_title_fkey(*)"
            )
            .like("title", "b_%")
            .like("duchy", "%" + exportFilterInput + "%");

         console.log(data);
         console.log(error);
         // Triggers the txt file export
         if (EBAC === true) {
            console.log("ebac activated")
            bulkExportTxtFileEBAC(data, selectedCategory, exportFilterInput)
         } else {
            bulkExportTxtFile(data, selectedCategory, exportFilterInput);
         }
      }
   }
   // TODO clean up the query to discard not needed stuff
   if (selectedCategory === "Titles") {
      // Depending on export tier use a different like filter
      if (tier === "Empire") {
         const { data, error } = await supabase
            .from("landed_title")
            .select(
               "title, province_history!province_history_barony_fkey(*), title_history!title_history_title_fkey(*), province, county_capital (title, province_history!province_history_barony_fkey(*), user_province_history!user_province_history_barony_fkey(*)), county, duchy, kingdom, empire, user_province_history!user_province_history_barony_fkey(*), user_title_history!user_title_history_title_fkey(*)"
            )
            .like("empire", "%" + exportFilterInput + "%");

         console.log(data);
         console.log(error);
         // Triggers the txt file export
         if (EBAC === true) {
            console.log("ebac activated")
            bulkExportTxtFileEBAC(data, selectedCategory, exportFilterInput);
         } else {
            bulkExportTxtFile(data, selectedCategory, exportFilterInput);
         }
      }

      if (tier === "Kingdom") {
         const { data, error } = await supabase
            .from("landed_title")
            .select(
               "title, province_history!province_history_barony_fkey(*), title_history!title_history_title_fkey(*), province, county_capital (title, province_history!province_history_barony_fkey(*), user_province_history!user_province_history_barony_fkey(*)), county, duchy, kingdom, empire, user_province_history!user_province_history_barony_fkey(*), user_title_history!user_title_history_title_fkey(*)"
            )
            .like("kingdom", "%" + exportFilterInput + "%");

         console.log(data);
         console.log(error);
         // Triggers the txt file export
         if (EBAC === true) {
            console.log("ebac activated")
            bulkExportTxtFileEBAC(data, selectedCategory, exportFilterInput)
         } else {
            bulkExportTxtFile(data, selectedCategory, exportFilterInput);
         }
      }

      if (tier === "Duchy") {
         const { data, error } = await supabase
            .from("landed_title")
            .select(
               "title, province_history!province_history_barony_fkey(*), title_history!title_history_title_fkey(*), province, county_capital, county (title, province_history!province_history_barony_fkey(*), user_province_history!user_province_history_barony_fkey(*), title_history!title_history_title_fkey(*), user_title_history!user_title_history_title_fkey(*)), duchy, kingdom, empire, user_province_history!user_province_history_barony_fkey(*), user_title_history!user_title_history_title_fkey(*)"
            )
            .like("duchy", "%" + exportFilterInput + "%");

         console.log(data);
         console.log(error);
         // Triggers the txt file export
         if (EBAC === true) {
            console.log("ebac activated")
            bulkExportTxtFileEBAC(data, selectedCategory, exportFilterInput)
         } else {
            bulkExportTxtFile(data, selectedCategory, exportFilterInput);
         }
      }
   }


}