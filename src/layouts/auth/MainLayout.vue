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
        accordion>
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
import { ref, onMounted } from 'vue'
import { useAuthStore } from 'src/stores/auth'
import { useRoute, useRouter } from 'vue-router'
import notify from 'src/composables/notify'

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
  if (['home'].includes(node.name)) {
    tree.value.collapseAll()
  }
  router.push({ name: node.name })
}

const tree = ref(null)
const selected = ref(null)
const nodes = [
  {
    label: 'Home',
    name: 'home',
    names: ['home'],
    icon: 'home',
    handler: handleNodeClick
  },
  {
    label: 'Gerenciamento',
    name: 'management',
    icon: 'mdi-account-cog',
    selectable: false,
    children: [
      {
        label: 'Usuários',
        name: 'users',
        names: ['users', 'users-create', 'users-edit', 'users-view'],
        icon: 'mdi-account-group',
        handler: handleNodeClick
      },
      {
        label: 'Atribuições',
        name: 'roles',
        names: ['roles', 'roles-create', 'roles-edit', 'roles-view'],
        icon: 'mdi-account-lock'
      },
      {
        label: 'Permissões',
        name: 'permissions',
        names: ['permissions', 'permissions-create', 'permissions-edit', 'permissions-view'],
        icon: 'mdi-lock'
      }
    ]
  }
]

const walkTree = (array) => {
  array.every((node) => {
    if ('children' in node) {
      walkTree(node.children)
      if (selected.value) {
        tree.value.setExpanded(node.name, true)
      }
    } else if (node.names.includes(route.name)) {
      selected.value = node.name
    }
    return !selected.value
  })
}

onMounted(() => {
  walkTree(nodes)
})

</script>
