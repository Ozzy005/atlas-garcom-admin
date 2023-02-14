<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen" />

        <q-toolbar-title>
          Atlas Garçom
        </q-toolbar-title>

        <q-btn-dropdown flat
          color="white"
          icon="person">
          <q-list>
            <q-item clickable
              v-close-popup
              @click="router.push({ name: 'profile' })">
              <q-item-section>
                <q-item-label>Perfil</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable
              v-close-popup
              @click="router.push({ name: 'change-password' })">
              <q-item-section>
                <q-item-label>Editar senha</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable
              v-close-popup
              @click="handleLogout">
              <q-item-section>
                <q-item-label>Sair</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen"
      class="bg-grey-3"
      show-if-above
      bordered>
      <div class="text-h6 text-center q-my-md">Menu</div>
      <q-tree v-model:selected="selected"
        :nodes="nodes"
        ref="tree"
        node-key="name"
        selected-color="secondary"
        accordion
        no-transition>
        <template #default-header="props">
          <div class="row no-wrap items-center full-width">
            <q-icon :name="props.node.icon"
              class="q-mr-sm"
              size="md" />
            <div>{{ props.node.label }}</div>
          </div>
        </template>
      </q-tree>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useAuthStore } from 'src/stores/auth'
import { useRoute, useRouter } from 'vue-router'
import notify from 'src/composables/notify'
import { api } from 'src/boot/axios'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()
const leftDrawerOpen = ref(false)

const handleLogout = () => {
  try {
    auth.logout()
    auth.isAuthenticated = false
    auth.user = null
    router.push({ name: 'login' })
  } catch (error) {
    notify.error(error)
    auth.isAuthenticated = false
    auth.user = null
    router.push({ name: 'login' })
  }
}

const handleNodeClick = (node) => {
  if (['dashboard'].includes(node.name)) {
    tree.value.collapseAll()
  }
  router.push({ name: node.name })
}

const handleGetUser = async () => {
  try {
    const { data } = await api({ url: '/api/profile' })
    auth.user = data.data
    auth.permissions = data.data.permissions
  } catch (error) {
    notify.error(error)
  }
}

const tree = ref(null)
const selected = ref(null)
const nodes = ref([])

watch(selected, (newValue, OldValue) => {
  if (!newValue) {
    selected.value = OldValue
  }
})

const handleCheckPermission = (nodePermissions) => {
  let hasPermission = false
  auth.permissions.every(item => {
    hasPermission = nodePermissions.includes(item.name)
    return !hasPermission
  })
  return hasPermission
}

const handleCheckSelected = (selectNode, nodeRouteNames) => {
  if (nodeRouteNames.includes(route.name)) {
    selected.value = selectNode
    return true
  }
  return false
}

const handleCheckExpanded = (expandNode, nodeRouteNames) => {
  if (nodeRouteNames.includes(route.name)) {
    setTimeout(() => tree.value.setExpanded(expandNode, true))
    return true
  }
  return false
}

const removeNullValues = (array) => {
  return array.filter(function (obj) {
    if (obj === null) return false
    if (typeof obj === 'object') {
      for (const key in obj) {
        if (obj[key] === null) {
          delete obj[key]
        } else if (typeof obj[key] === 'object') {
          obj[key] = removeNullValues(obj[key])
        }
      }
    }
    return true
  })
}

onMounted(async () => {
  await handleGetUser()
  const nodesTmp = [
    handleCheckPermission([
      'dashboard_view'
    ]) ? {
          label: 'Painel',
          name: 'dashboard',
          selected: handleCheckSelected('dashboard', ['dashboard']),
          icon: 'mdi-chart-pie',
          handler: handleNodeClick
        } : null,
    handleCheckPermission([
      'users_view',
      'users_create',
      'users_edit',
      'users_delete',
      'roles_view',
      'roles_create',
      'roles_edit',
      'roles_delete',
      'permissions_view',
      'permissions_create',
      'permissions_edit',
      'permissions_delete'
    ]) ? {
          label: 'Gerenciamento',
          name: 'management',
          icon: 'mdi-account-cog',
          expanded: handleCheckExpanded('management', [
            'users', 'users-create', 'users-edit', 'users-view',
            'roles', 'roles-create', 'roles-edit', 'roles-view',
            'permissions', 'permissions-create', 'permissions-edit', 'permissions-view'
          ]),
          selectable: false,
          children: [
            handleCheckPermission(
              [
                'users_view',
                'users_create',
                'users_edit',
                'users_delete'
              ]
            ) ? {
                  label: 'Usuários',
                  name: 'users',
                  selected: handleCheckSelected('users', ['users', 'users-create', 'users-edit', 'users-view']),
                  icon: 'mdi-account-group',
                  handler: handleNodeClick
                } : null,
            handleCheckPermission(
              [
                'roles_view',
                'roles_create',
                'roles_edit',
                'roles_delete'
              ]
            ) ? {
                  label: 'Atribuições',
                  name: 'roles',
                  selected: handleCheckSelected('roles', ['roles', 'roles-create', 'roles-edit', 'roles-view']),
                  icon: 'mdi-account-lock',
                  handler: handleNodeClick
                } : null,
            handleCheckPermission(
              [
                'permissions_view',
                'permissions_create',
                'permissions_edit',
                'permissions_delete'
              ]
            ) ? {
                  label: 'Permissões',
                  name: 'permissions',
                  selected: handleCheckSelected('permissions', ['permissions', 'permissions-create', 'permissions-edit', 'permissions-view']),
                  icon: 'mdi-lock',
                  handler: handleNodeClick
                } : null
          ]
        } : null
  ]
  nodes.value = removeNullValues(nodesTmp)
})

</script>
