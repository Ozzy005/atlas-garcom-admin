import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from 'src/boot/axios'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const userLogin = ref({ email: null, password: null })
    const rememberMe = ref(false)
    const isAuthenticated = ref(false)
    const user = ref(null)

    const csrf = async () => {
      await api({ url: '/sanctum/csrf-cookie' })
    }

    const getUser = async () => {
      const { data } = await api({ url: '/api/user' })
      user.value = data
    }

    const login = async (data) => {
      await csrf()
      await api({
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
      await api({
        method: 'post',
        url: '/logout'
      })
    }

    return {
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
