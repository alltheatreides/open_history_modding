<script setup>
import HeroFeature from "../components/HeroFeature.vue";
import wtf from "../assets/wtf.jpg";
import discover_icon from "../assets/svg/discover_icon.svg";
import export_icon from "../assets/svg/export_icon.svg";
import ave_maria from "../assets/svg/ave_maria_icon.svg";
</script>

<template>
   <main class="container mx-auto">
      <section
         aria-labelledby="region-title"
         class="container mx-auto relative"
      >
         <!-- Landing Page Title -->
         <article class="flex justify-between lg:w-5/6 2xl:mx-auto ml-10">
            <div class="md:mt-5 xl:mt-10">
               <h1
                  id="region-title"
                  class="text-5xl lg:text-[64px] font-semibold md:whitespace-nowrap xl:whitespace-normal"
               >
                  Experience easier modding
               </h1>
               <h2
                  id="region-title"
                  class="text-4xl mt-5 lg:text-[48px] font-light"
               >
                  with an open source history library
               </h2>
            </div>
         </article>
         <!-- Landing page rectangle -->
         <span
            class="hidden md:block absolute -top-40 md:-top-32 right-10 md:right-0 xl:right-[23rem] -z-10 bg-tertiary min-h-[50vh] md:min-h-[30vh] lg:min-h-[50vh] min-w-[50vw] md:min-w-[372px] rounded-lg"
         >
         </span>
         <!-- Landing page image -->
         <div class="hidden xl:block absolute -top-32 right-0 -z-10">
            <img
               src="../assets/wtf.jpg"
               alt="promotional image of map modding"
               class="max-h-[75vh]"
            />
         </div>
         <!-- Landing Page features list -->
         <section
            class="grid grid-cols-1 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-6 md:px-0 xl:w-9/12 gap-5 mt-10 md:mt-[10vh] xl:mt-[12vh] 2xl:mt-[20vh]"
         >
            <HeroFeature
               title="View vanilla history"
               description="All of vanilla Crusader Kings 3 title and province history is browsable so you can look and search for history more easily than browsing vanilla text files."
               :picture="discover_icon"
               callToAction="View now"
               link="vanilla-history"
            />
            <HeroFeature
               title="Export modded history"
               description="Once you have created an account, you will be able to create your own history entries and export them in vanilla text format."
               :picture="export_icon"
               callToAction="Try now "
               link="vanilla-history"
            />
            <HeroFeature
               title="An AVE MARIA project"
               description="This project has been developed by the AVE MARIA team for the 'every barony a county' feature and to allow easier contribution to history modding."
               :picture="ave_maria"
               callToAction="Discover the mod "
               link="about"
            />
            <!-- <a
               href="https://steamcommunity.com/sharedfiles/filedetails/?id=2268393523"
               target="_blank"
               rel="noopener noreferrer"
               class="top-20 z-10"
            >
               A project made by the AVE MARIA team
            </a> -->
         </section>
      </section>
      <!-- Copyright ? -->
      <!-- <aside class="flex w-full mx-auto justify-end">
         <div class="w-[344px] px-4">
            <h2>Open Source from AVE MARIA</h2>
            <p>
               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
               eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
               enim ad minim veniam, quis nostrud exercitation ullamco laboris
               nisi ut aliquip ex ea commodo consequat.
            </p>
         </div>
      </aside> -->
   </main>
</template>
