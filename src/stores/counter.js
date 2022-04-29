import { defineStore } from 'pinia'
import { supabase } from "../supabase/supabase";
import router from '../router';

export const userStatusStore = defineStore({
  id: 'user',
  state: () => ({
    count: 0,
    userStore: null,
    session: null,
    test: 0,
    loginError: null,

    isAuthenticated: false
  }),
  getters: {

  },
  actions: {
    // Modify store session variable with current browser JWT session
    getAuthStatus() {
      // Native supabase method
      const sessionInfo = supabase.auth.session()
      // Assigning supabase session info to the internal store variable
      this.session = sessionInfo

      return this.session
    },
    // Login user method triggered by the login page, updates the auth status after successful login
    // @param takes the page email and password
    async login(paramEmail, paramPassword) {
      try {
        // Native supabase method
        let { user, error } = await supabase.auth.signIn({
          email: paramEmail,
          password: paramPassword,
        });
        // If no login error, proceed
        if (error !== null) {
          // Saving the user info into the store user variable
          this.userStore = user
          // Updating the store session info
          this.getAuthStatus()
          // Redirecting user to the create entry page
          router.push("/create-history");
        } else {
          // Saving error info & message to the store error variable to be displayed in the login page error div 
          this.loginError = error
          return error
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        // this.increaseCount()
      }
    },
    async logout() {
      try {
        // Native supabase method
        const { error } = await supabase.auth.signOut()
        // If no error, clear out store variable of session
        if (error === null) {
          this.session = null
        } else {
          console.log(error);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        // this.increaseCount()
      }
    },
    testMethod() {
      this.test++
    },
    increaseCount() {
      this.count++
    }
  }
})
