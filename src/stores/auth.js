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
    const permissions = ref(null)

    const hasPermission = (permission) => {
      const has = permissions.value.find(item => item.name === permission)
      return !!has
    }

    const csrf = async () => {
      await api({ url: '/sanctum/csrf-cookie' })
    }

    const forgotPassword = async (data) => {
      await csrf()
      const rsp = await api({
        method: 'post',
        url: '/forgot-password',
        data
      })
      return rsp
    }

    const resetPassword = async (data) => {
      await csrf()
      const rsp = await api({
        method: 'post',
        url: '/reset-password',
        data
      })
      return rsp
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
      permissions,
      hasPermission,
      forgotPassword,
      resetPassword,
      login,
      logout
    }
  },
  {
    persist: true
  }
)
