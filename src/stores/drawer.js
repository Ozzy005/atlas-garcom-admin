import { defineStore } from 'pinia'

export const useDrawerStore = defineStore('drawer', {
  state: () => ({
    drawerOpen: true,
    miniState: true
  }),
  persist: true
})
