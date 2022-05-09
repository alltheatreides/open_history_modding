import { supabase } from "../supabase/supabase";


export default async function supabaseQueryParentCapital(barony_capital) {

   const { data, error } = await supabase
      .from("landed_title")
      .select(
         "title, province_history!province_history_barony_fkey(religion, culture), province, county, duchy, kingdom, empire, user_province_history!user_province_history_barony_fkey(*)"
      )
      .eq("title", barony_capital);

   console.log(data)
   console.log(error)

   return data
}