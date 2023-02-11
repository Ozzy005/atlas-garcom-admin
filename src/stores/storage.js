import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from 'src/boot/axios'

export const useStorageStore = defineStore(
  'storage',
  () => {
    const userLogin = ref({ email: null, password: null })
    const rememberMe = ref(false)
    const isAuthenticated = ref(false)
    const user = ref(null)

    async function axios (config) {
      try {
        const data = await api(config)
        return data
      } catch (error) {
        if (error.response) {
          const response = error.response
          if (response.status === 422) {
            const errors = response.data.errors
            const property = Object.keys(errors)[0]
            throw errors[property][0]
          }
          throw response.data.message
        }
        throw error.message
      }
    }

    const csrf = async () => {
      await axios({ url: '/sanctum/csrf-cookie' })
    }

    const getUser = async () => {
      const { data } = await axios({ url: '/api/user' })
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
      if (rememberMe.value) {
        userLogin.value = data
      } else {
        userLogin.value = { email: null, password: null }
      }
    }

    const logout = async () => {
      await axios({
        method: 'post',
        url: '/logout'
      })
    }

    return {
      axios,
      userLogin,
      rememberMe,
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
