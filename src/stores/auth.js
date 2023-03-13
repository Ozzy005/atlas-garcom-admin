import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    userLogin: { email: null, password: null },
    rememberMe: false,
    isAuthenticated: false,
    user: null,
    permissions: null

  }),
  actions: {
    hasPermission (permission) {
      const has = this.permissions.find(item => item.name === permission)
      return !!has
    },
    async csrf () {
      await api({ url: '/sanctum/csrf-cookie' })
    },
    async forgotPassword (data) {
      await this.csrf()
      const rsp = await api({
        method: 'post',
        url: '/forgot-password',
        data
      })
      return rsp
    },
    async resetPassword (data) {
      await this.csrf()
      const rsp = await api({
        method: 'post',
        url: '/reset-password',
        data
      })
      return rsp
    },
    async login (data) {
      await this.csrf()
      await api({
        method: 'post',
        url: '/login',
        data
      })
      this.isAuthenticated = true
      if (this.rememberMe) {
        this.userLogin = data
      } else {
        this.userLogin = { email: null, password: null }
      }
    },
    async logout () {
      await api({
        method: 'post',
        url: '/logout'
      })
    }
  },
  persist: true
})
