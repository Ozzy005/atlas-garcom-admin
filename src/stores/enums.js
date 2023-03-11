import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from 'src/boot/axios'
import notify from 'src/composables/notify'

export const useEnumsStore = defineStore(
  'enums',
  () => {
    const enums = ref([])

    const getEnums = async () => {
      try {
        const { data } = await api({ url: '/api/enums' })
        enums.value = data.data
      } catch (error) {
        notify.error(error)
      }
    }

    const getEnum = (name) => {
      return enums.value[name]
    }

    const getName = (name, val) => {
      const status = name in enums.value ? enums.value[name].find(item => item.id === val) : null
      if (status) {
        return status.name
      }
      return 'Não informado'
    }

    const getColor = (name, val) => {
      const status = name in enums.value ? enums.value[name].find(item => item.id === val) : null
      if (status) {
        return status.color
      }
      return '#000000'
    }

    return {
      getEnums,
      getEnum,
      getName,
      getColor
    }
  },
  {
    persist: true
  }
)
