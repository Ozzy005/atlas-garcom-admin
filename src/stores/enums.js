import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import notify from 'src/composables/notify'

export const useEnumsStore = defineStore('enums', {
  state: () => ({
    enums: []
  }),
  actions: {
    async getEnums () {
      try {
        const { data } = await api({ url: '/api/enums' })
        this.enums = data.data
      } catch (error) {
        notify.error(error)
      }
    },
    getEnum (name) {
      return this.enums[name]
    },

    getName (name, val) {
      const status = name in this.enums ? this.enums[name].find(item => item.id === val) : null
      if (status) {
        return status.name
      }
      return 'Não informado'
    },
    getColor (name, val) {
      const status = name in this.enums ? this.enums[name].find(item => item.id === val) : null
      if (status) {
        return status.color
      }
      return '#000000'
    }
  },
  persist: true
})
