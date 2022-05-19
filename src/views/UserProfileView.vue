<script setup>
import { ref, onBeforeMount, onMounted, watch } from "vue";
import { supabase } from "../supabase/supabase";

import ProfileOverviewSection from "../components/ProfileOverviewSection.vue";
import ProfileCreatedSection from "../components/ProfileCreatedSection.vue";
import ProfileCreateSection from "../components/ProfileCreateSection.vue";
import ProfileExportSection from "../components/ProfileExportSection.vue";
import ProvinceCard from "../components/ProvinceCard.vue";
import TitleCard from "../components/TitleCard.vue";
import EntryCard from "../components/EntryCard.vue";

import { userStatusStore } from "../stores/counter";
import downloadIcon from "../assets/svg/download_arrow.svg";
import router from "../router";
import exportUserHistory from "../methods/exportUserHistory";
import getLastUserEntries from "../methods/getLastUserEntries";
import EBACView from "./EBACView.vue";

// Instance pinia user store
const userStore = ref(userStatusStore());
// Define user email and id from the store
const user_email = userStore.value.getUserInfo().email;
const user_id = userStore.value.getUserInfo().id;

// Internal page array to hold last user created entries
let userLatestEntries = ref([]);

// Selected section variable
let selectedSection = ref("Overview");

// METHODS
function instanceGLUE() {
   const glue = getLastUserEntries(6, user_id);
   // console.log(glue);
   glue.then((value) => {
      userLatestEntries.value = value;
      // console.log(userLatestEntries.value);
   });
}

function showOverviewSection() {
   selectedSection.value = "Overview";
}
function showCreatedHistorySection() {
   selectedSection.value = "Created History";
}
function showCreateHistorySection() {
   selectedSection.value = "Create History";
}
function showExportHistorySection() {
   selectedSection.value = "Export History";
}

onBeforeMount(() => {
   // Prevent the page rendering if not logged in
   if (userStore.value.getUserInfo() === null) {
      router.push("/404");
   }
});
onMounted(() => {
   // console.log(userStore.value.getUserInfo().email);
   instanceGLUE();
});
</script>

<template>
   <main
      class="mb-10 w-full flex after:block after:absolute after:border-b after:border-secondary after:pb-8 after:w-full relative after:pointer-events-none"
   >
      <div class="w-2/6">
         <!-- Profile section -->
         <section class="pl-12">
            <div class="w-3/6 mx-auto relative flex flex-col">
               <svg
                  width="175"
                  height="175"
                  viewBox="0 0 175 175"
                  fill="none"
                  class="absolute -top-4 inset-x-0 mx-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid meet"
               >
                  <circle cx="87.5" cy="87.5" r="87.5" fill="#3A343A"></circle>
               </svg>

               <h3 class="pt-[175px] text-center">{{ user_email }}</h3>

               <button
                  class="uppercase mt-4 bg-tertiary rounded-[5px] border border-secondary px-3 py-1 mx-auto font-bold shadow-brutal-sm hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all duration-75"
               >
                  Edit profile
               </button>
            </div>
         </section>
      </div>
      <div class="w-4/6 flex flex-col relative">
         <!-- Profile page navigation -->
         <nav class="">
            <ul class="flex gap-28">
               <li
                  @click="showOverviewSection"
                  class="flex gap-2 items-center relative cursor-pointer"
                  :class="{ 'nav-active': selectedSection === 'Overview' }"
               >
                  <svg
                     width="28"
                     height="28"
                     viewBox="0 0 28 28"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                     class=""
                     preserveAspectRatio="none"
                  >
                     <path
                        opacity="0.5"
                        d="M9.3335 7H23.3335V9.72222H9.3335V7ZM9.3335 12.8333H23.3335V15.5556H9.3335V12.8333ZM9.3335 18.6667H23.3335V21.3889H9.3335V18.6667Z"
                        fill="#3A343A"
                     ></path>
                     <path
                        opacity="0.5"
                        d="M4.6665 18.6667H7.38873V21.3889H4.6665V18.6667ZM4.6665 12.8333H7.38873V15.5556H4.6665V12.8333ZM4.6665 7H7.38873V9.72222H4.6665V7Z"
                        fill="#3A343A"
                     ></path>
                     <path
                        d="M22.9443 9.72222H9.72206C9.61892 9.72222 9.52 9.68125 9.44707 9.60832C9.37414 9.53539 9.33317 9.43647 9.33317 9.33333V7.38889C9.33317 7.28575 9.37414 7.18683 9.44707 7.1139C9.52 7.04097 9.61892 7 9.72206 7H22.9443C23.0474 7 23.1463 7.04097 23.2193 7.1139C23.2922 7.18683 23.3332 7.28575 23.3332 7.38889V9.33333C23.3332 9.43647 23.2922 9.53539 23.2193 9.60832C23.1463 9.68125 23.0474 9.72222 22.9443 9.72222ZM22.9443 15.5556H9.72206C9.61892 15.5556 9.52 15.5146 9.44707 15.4417C9.37414 15.3687 9.33317 15.2698 9.33317 15.1667V13.2222C9.33317 13.1191 9.37414 13.0202 9.44707 12.9472C9.52 12.8743 9.61892 12.8333 9.72206 12.8333H22.9443C23.0474 12.8333 23.1463 12.8743 23.2193 12.9472C23.2922 13.0202 23.3332 13.1191 23.3332 13.2222V15.1667C23.3332 15.2698 23.2922 15.3687 23.2193 15.4417C23.1463 15.5146 23.0474 15.5556 22.9443 15.5556ZM22.9443 21.3889H9.72206C9.61892 21.3889 9.52 21.3479 9.44707 21.275C9.37414 21.2021 9.33317 21.1031 9.33317 21V19.0556C9.33317 18.9524 9.37414 18.8535 9.44707 18.7806C9.52 18.7076 9.61892 18.6667 9.72206 18.6667H22.9443C23.0474 18.6667 23.1463 18.7076 23.2193 18.7806C23.2922 18.8535 23.3332 18.9524 23.3332 19.0556V21C23.3332 21.1031 23.2922 21.2021 23.2193 21.275C23.1463 21.3479 23.0474 21.3889 22.9443 21.3889ZM6.99984 9.72222H5.05539C4.95225 9.72222 4.85334 9.68125 4.78041 9.60832C4.70748 9.53539 4.6665 9.43647 4.6665 9.33333V7.38889C4.6665 7.28575 4.70748 7.18683 4.78041 7.1139C4.85334 7.04097 4.95225 7 5.05539 7H6.99984C7.10298 7 7.20189 7.04097 7.27482 7.1139C7.34775 7.18683 7.38873 7.28575 7.38873 7.38889V9.33333C7.38873 9.43647 7.34775 9.53539 7.27482 9.60832C7.20189 9.68125 7.10298 9.72222 6.99984 9.72222ZM6.99984 15.5556H5.05539C4.95225 15.5556 4.85334 15.5146 4.78041 15.4417C4.70748 15.3687 4.6665 15.2698 4.6665 15.1667V13.2222C4.6665 13.1191 4.70748 13.0202 4.78041 12.9472C4.85334 12.8743 4.95225 12.8333 5.05539 12.8333H6.99984C7.10298 12.8333 7.20189 12.8743 7.27482 12.9472C7.34775 13.0202 7.38873 13.1191 7.38873 13.2222V15.1667C7.38873 15.2698 7.34775 15.3687 7.27482 15.4417C7.20189 15.5146 7.10298 15.5556 6.99984 15.5556ZM6.99984 21.3889H5.05539C4.95225 21.3889 4.85334 21.3479 4.78041 21.275C4.70748 21.2021 4.6665 21.1031 4.6665 21V19.0556C4.6665 18.9524 4.70748 18.8535 4.78041 18.7806C4.85334 18.7076 4.95225 18.6667 5.05539 18.6667H6.99984C7.10298 18.6667 7.20189 18.7076 7.27482 18.7806C7.34775 18.8535 7.38873 18.9524 7.38873 19.0556V21C7.38873 21.1031 7.34775 21.2021 7.27482 21.275C7.20189 21.3479 7.10298 21.3889 6.99984 21.3889Z"
                        stroke="#3A343A"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                     ></path>
                  </svg>
                  <p>Overview</p>
               </li>
               <li
                  @click="showCreatedHistorySection"
                  class="flex gap-2 items-center relative cursor-pointer"
                  :class="{
                     'nav-active': selectedSection === 'Created History',
                  }"
               >
                  <svg
                     width="24"
                     height="24"
                     viewBox="0 0 24 24"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                     class=""
                     preserveAspectRatio="none"
                  >
                     <path
                        d="M3 3H11V11H3V3ZM5 5V9V5ZM13 3H21V11H13V3ZM15 5V9V5ZM3 13H11V21H3V13ZM5 15V19V15ZM16 13H18V16H21V18H18V21H16V18H13V16H16V13ZM15 5V9H19V5H15ZM5 5V9H9V5H5ZM5 15V19H9V15H5Z"
                        fill="#3A343A"
                     ></path>
                  </svg>
                  <p class="cursor-pointer">Created History</p>
               </li>
               <li
                  @click="showCreateHistorySection"
                  class="flex gap-2 items-center relative cursor-pointer"
                  :class="{
                     'nav-active': selectedSection === 'Create History',
                  }"
               >
                  <svg
                     width="22"
                     height="22"
                     viewBox="0 0 22 22"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                     class=""
                     preserveAspectRatio="xMidYMid meet"
                  >
                     <g clip-path="url(#clip0_106_339)">
                        <path
                           d="M18.9861 -0.0533447C18.6688 -0.0533447 18.3667 0.0905014 18.1129 0.344348L17.5054 0.925655L21.0744 4.49473L21.6566 3.88719C22.1643 3.3795 22.1643 2.62304 21.6566 2.11535L19.8847 0.343501C19.6309 0.0896552 19.3026 -0.0533447 18.9853 -0.0533447H18.9861ZM16.9232 1.42827L15.9975 2.19573L19.8052 6.00342L20.6514 5.15727L16.9232 1.42742V1.42827ZM15.4949 2.80327L7.85413 10.3662C7.81545 10.3981 7.77976 10.4335 7.74752 10.472L7.69505 10.4982C7.60276 10.604 7.53898 10.7315 7.50975 10.8688L6.47828 14.4912C6.43408 14.6346 6.4298 14.7873 6.46593 14.9329C6.50205 15.0785 6.5772 15.2116 6.6833 15.3176C6.78939 15.4237 6.9224 15.4989 7.06803 15.535C7.21365 15.5711 7.36637 15.5669 7.50975 15.5227L11.1321 14.4912C11.2524 14.4627 11.3647 14.4075 11.4608 14.3297C11.5569 14.2519 11.6343 14.1536 11.6872 14.0419L19.1977 6.61096L17.7694 5.07689V5.15642L16.7641 4.15119H16.8437L15.4957 2.80327H15.4949ZM0.688054 3.38458C0.492025 3.42186 0.31548 3.52722 0.189603 3.68205C0.0637258 3.83688 -0.00338274 4.03122 0.000131324 4.23073V21.1538C0.000131324 21.3782 0.0892794 21.5934 0.247964 21.7521C0.406649 21.9108 0.621871 22 0.846285 22H17.7694C17.9938 22 18.209 21.9108 18.3677 21.7521C18.5264 21.5934 18.6155 21.3782 18.6155 21.1538V11.8461C18.6155 11.6217 18.5264 11.4065 18.3677 11.2478C18.209 11.0891 17.9938 11 17.7694 11C17.5449 11 17.3297 11.0891 17.171 11.2478C17.0124 11.4065 16.9232 11.6217 16.9232 11.8461V20.3077H1.69244V5.07689H10.154C10.3784 5.07689 10.5936 4.98774 10.7523 4.82905C10.911 4.67037 11.0001 4.45515 11.0001 4.23073C11.0001 4.00632 10.911 3.7911 10.7523 3.63241C10.5936 3.47373 10.3784 3.38458 10.154 3.38458H0.846285C0.819787 3.38333 0.793245 3.38333 0.766747 3.38458C0.740249 3.38333 0.713706 3.38333 0.687208 3.38458H0.688054ZM8.99136 11.6879L10.1548 11.7666L10.2344 13.0358L9.0709 13.3793L8.62159 12.9309L8.99136 11.687V11.6879Z"
                           fill="#3A343A"
                        ></path>
                     </g>
                     <defs>
                        <clipPath id="clip0_106_339">
                           <rect width="22" height="22" fill="white"></rect>
                        </clipPath>
                     </defs>
                  </svg>
                  <p>Create History</p>
               </li>
               <li
                  @click="showExportHistorySection"
                  class="flex gap-2 items-center relative cursor-pointer"
                  :class="{
                     'nav-active': selectedSection === 'Export History',
                  }"
               >
                  <svg
                     width="24"
                     height="24"
                     viewBox="0 0 24 24"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                     class=""
                     preserveAspectRatio="xMidYMid meet"
                  >
                     <path
                        d="M9.75 15.75H19.6275L17.6925 17.6925L18.75 18.75L22.5 15L18.75 11.25L17.6925 12.3075L19.6275 14.25H9.75V15.75Z"
                        fill="#3A343A"
                     ></path>
                     <path
                        d="M16.5 10.5V7.50001C16.5006 7.40131 16.4817 7.30346 16.4443 7.21208C16.407 7.1207 16.352 7.03759 16.2825 6.96751L11.0325 1.71751C10.9624 1.648 10.8793 1.59301 10.7879 1.55568C10.6966 1.51836 10.5987 1.49944 10.5 1.50001H3C2.60218 1.50001 2.22064 1.65805 1.93934 1.93935C1.65804 2.22066 1.5 2.60219 1.5 3.00001V21C1.5 21.3978 1.65804 21.7794 1.93934 22.0607C2.22064 22.342 2.60218 22.5 3 22.5H15C15.3978 22.5 15.7794 22.342 16.0607 22.0607C16.342 21.7794 16.5 21.3978 16.5 21V19.5H15V21H3V3.00001H9V7.50001C9 7.89784 9.15804 8.27937 9.43934 8.56067C9.72064 8.84198 10.1022 9.00001 10.5 9.00001H15V10.5H16.5ZM10.5 7.50001V3.30751L14.6925 7.50001H10.5Z"
                        fill="#3A343A"
                     ></path>
                  </svg>
                  <p>Export History</p>
               </li>
            </ul>
         </nav>
         <!-- Overview section -->
         <ProfileOverviewSection
            v-if="selectedSection === 'Overview'"
            :info="userLatestEntries"
         ></ProfileOverviewSection>
         <ProfileCreatedSection
            class="mt-12 w-4/6"
            v-if="selectedSection === 'Created History'"
            :info="userLatestEntries"
         >
         </ProfileCreatedSection>
         <ProfileCreateSection v-if="selectedSection === 'Create History'">
         </ProfileCreateSection>
         <ProfileExportSection v-if="selectedSection === 'Export History'">
         </ProfileExportSection>
      </div>
   </main>
</template>

<style>
.nav-active {
   @apply after:block after:h-[6px] after:inset-x-0 after:-bottom-2 after:z-10 after:absolute after:rounded-lg after:bg-tertiary !important;
}
</style>
