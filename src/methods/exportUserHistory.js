import { supabase } from "../supabase/supabase";
import bulkExportTxtFile from "./bulkExportTxtFile";

export default async function exportUserHistory(selectedCategory, exportFilterInput, author) {
   // Change the query depending on the category
   if (selectedCategory === "Provinces") {
      const { data, error } = await supabase
         .from("user_province_history")
         .select(
            "*"
         )
         .eq("author", author)

      console.log(data);
      console.log(error);

      bulkExportTxtFile(data, selectedCategory, exportFilterInput);
   }

   if (selectedCategory === "Titles") {

   }
}