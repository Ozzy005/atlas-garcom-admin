import { defineStore } from 'pinia'
import { Dark } from 'quasar'

export const useDarkModeStore = defineStore('darkMode', {
  state: () => ({
    darkMode: false
  }),
  actions: {
    initialize () {
      Dark.set(this.darkMode)
    },
    toggle () {
      this.darkMode = !this.darkMode
      Dark.set(this.darkMode)
    }
  },
  persist: true
})
