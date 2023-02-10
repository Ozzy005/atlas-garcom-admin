import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from 'src/boot/axios'

export const useStorageStore = defineStore(
  'storage',
  () => {
    const isAuthenticated = ref(false)
    const user = ref(null)

    async function axios(config) {
      try {
        const data = await api(config)
        return data
      } catch (error) {
        if (!!error.response) {
          const response = error.response
          throw response.data.message
        }
        throw error.message
      }
    }

    const csrf = () => api.get('/sanctum/csrf-cookie')

    const getUser = async () => {
      const { data } = await axios({
        method: 'get',
        url: '/api/user'
      })
      user.value = data
    }

    const login = async (data) => {
      await csrf()
      await axios({
        method: 'post',
        url: '/login',
        data
      })
      isAuthenticated.value = true
    }

    const logout = async () => {
      await axios({
        method: 'post',
        url: '/logout'
      })
    }

    return {
      axios,
      isAuthenticated,
      user,
      getUser,
      login,
      logout
    }
  },
  {
    persist: true
  }
)
