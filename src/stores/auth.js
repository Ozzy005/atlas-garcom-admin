import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import notify from 'src/composables/notify'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    userLogin: { email: null, password: null },
    rememberMe: false,
    isAuthenticated: false,
    user: null,
    permissions: []

  }),
  getters: {
    isAdmin () {
      return this.user ? !!this.user.is_admin : false
    },
    isProviderEmployee () {
      return this.user ? !!this.user.is_provider_employee : false
    },
    isTenant () {
      return this.user ? !!this.user.is_tenant : false
    },
    isTenantEmployee () {
      return this.user ? !!this.user.is_tenant_employee : false
    },
    isTenantOrTenantEmployee () {
      return this.user ? !!this.user.is_tenant || !!this.user._is_tenant_employee : false
    }
  },
  actions: {
    async getPermissions () {
      try {
        const { data } = await api({ url: '/api/user-permissions' })
        this.permissions = data.data
      } catch (error) {
        notify.error(error)
      }
    },
    hasPermissions (permissions) {
      const has = this.permissions.find(item => permissions.includes(item.name))
      return !!has
    },
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
