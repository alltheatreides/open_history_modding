import { supabase } from "../supabase/supabase";

export default async function getLastUserEntries(amount, userID) {
   const titles = await supabase
      .from("user_title_history")
      .select(
         "*"
      )
      .limit(Math.round(amount / 2))
      .eq('author', userID)

   // console.log(titles.data);
   console.log(titles.error);

   const provinces = await supabase
      .from("user_province_history")
      .select(
         "*"
      )
      .limit(Math.round(amount / 2))
      .eq('author', userID)

   // provinces.then(() => {
   provinces.data.forEach(element => {
      titles.data.push(element)
   })
   // console.log(titles.data)
   // });

   return titles.data
}