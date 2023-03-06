<template>
  <q-drawer v-model="leftDrawerOpen"
    show-if-above
    elevated>
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
            size="sm" />
          <div v-html="props.node.label" />
        </div>
      </template>
    </q-tree>
  </q-drawer>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useAuthStore } from 'src/stores/auth'
import { useRoute, useRouter } from 'vue-router'
import notify from 'src/composables/notify'
import { api } from 'src/boot/axios'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const leftDrawerOpen = computed({
  get () {
    return props.modelValue
  },
  set (value) {
    emit('update:modelValue', value)
  }
})

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()
const tree = ref(null)
const selected = ref(null)
const nodes = ref([])

watch(selected, (newValue, OldValue) => {
  if (!newValue) {
    selected.value = OldValue
  }
})

const handleGetUserPermissions = async () => {
  try {
    const { data } = await api({ url: '/api/user-permissions' })
    auth.permissions = data.data
  } catch (error) {
    notify.error(error)
  }
}

const handleNodeClick = (node) => {
  if (['dashboard'].includes(node.name)) {
    tree.value.collapseAll()
  }
  router.push({ name: node.name })
}

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
  await handleGetUserPermissions()
  const nodesTmp = [
    // Dashboard
    handleCheckPermission(['dashboard_view']) ? {
      label: 'Painel',
      name: 'dashboard',
      selected: handleCheckSelected('dashboard', ['dashboard']),
      icon: 'mdi-chart-pie',
      handler: handleNodeClick
    } : null,

    // Agrupador Cadastros
    handleCheckPermission([
      'tenants_view',
      'payment-methods_view',
      'measurement-units_view',
      'ncms_view',
      'states_view',
      'cities_view'
    ]) ? {
          label: 'Cadastros',
          name: 'registrations',
          icon: 'mdi-folder-edit',
          expanded: handleCheckExpanded('registrations', [
            'tenants', 'tenants-create', 'tenants-edit', 'tenants-view',
            'payment-methods', 'payment-methods-create', 'payment-methods-edit', 'payment-methods-view',
            'measurement-units', 'measurement-units-create', 'measurement-units-edit', 'measurement-units-view',
            'ncms', 'ncms-view',
            'states', 'states-view',
            'cities', 'cities-view'
          ]),
          selectable: false,
          children: [
            // Agrupador Pessoas
            handleCheckPermission(['tenants_view']) ? {
              label: 'Pessoas',
              name: 'people',
              icon: 'mdi-account-group',
              expanded: handleCheckExpanded('people', ['tenants', 'tenants-create', 'tenants-edit', 'tenants-view']),
              selectable: false,
              children: [
                // Contratantes
                handleCheckPermission(['tenants_view']) ? {
                  label: 'Contratantes',
                  name: 'tenants',
                  selected: handleCheckSelected('tenants', ['tenants', 'tenants-create', 'tenants-edit', 'tenants-view']),
                  icon: 'mdi-account-tie',
                  handler: handleNodeClick
                } : null
              ]
            } : null,
            // Agrupador Geral
            handleCheckPermission([
              'payment-methods_view',
              'measurement-units_view',
              'ncms_view',
              'states_view',
              'cities_view'
            ]) ? {
                  label: 'Geral',
                  name: 'general',
                  icon: 'mdi-menu',
                  expanded: handleCheckExpanded('general', [
                    'payment-methods', 'payment-methods-create', 'payment-methods-edit', 'payment-methods-view',
                    'measurement-units', 'measurement-units-create', 'measurement-units-edit', 'measurement-units-view',
                    'ncms', 'ncms-view',
                    'states', 'states-view',
                    'cities', 'cities-view'
                  ]),
                  selectable: false,
                  children: [
                    // Métodos de Pagamento
                    handleCheckPermission(['payment-methods_view']) ? {
                      label: 'Métodos de<br>Pagamento',
                      name: 'payment-methods',
                      selected: handleCheckSelected('payment-methods', ['payment-methods', 'payment-methods-create', 'payment-methods-edit', 'payment-methods-view']),
                      icon: 'mdi-wallet',
                      handler: handleNodeClick
                    } : null,
                    // Unidades de Medida
                    handleCheckPermission(['measurement-units_view']) ? {
                      label: 'Unidades de<br>Medida',
                      name: 'measurement-units',
                      selected: handleCheckSelected('measurement-units', ['measurement-units', 'measurement-units-create', 'measurement-units-edit', 'measurement-units-view']),
                      icon: 'mdi-ruler',
                      handler: handleNodeClick
                    } : null,
                    // Ncms
                    handleCheckPermission(['ncms_view']) ? {
                      label: 'Ncms',
                      name: 'ncms',
                      selected: handleCheckSelected('ncms', ['ncms', 'ncms-view']),
                      icon: 'mdi-tag',
                      handler: handleNodeClick
                    } : null,
                    // Estados
                    handleCheckPermission(['states_view']) ? {
                      label: 'Estados',
                      name: 'states',
                      selected: handleCheckSelected('states', ['states', 'states-view']),
                      icon: 'mdi-diving-scuba-flag',
                      handler: handleNodeClick
                    } : null,
                    // Cidades
                    handleCheckPermission(['cities_view']) ? {
                      label: 'Cidades',
                      name: 'cities',
                      selected: handleCheckSelected('cities', ['cities', 'cities-view']),
                      icon: 'mdi-city',
                      handler: handleNodeClick
                    } : null
                  ]
                } : null
          ]
        } : null,
    // Agrupador Gerenciamento
    handleCheckPermission([
      'users_view',
      'roles_view',
      'permissions_view'
    ]) ? {
          label: 'Gerenciamento',
          name: 'management',
          icon: 'mdi-account-cog',
          expanded: handleCheckExpanded('management', [
            'users', 'users-create', 'users-edit', 'users-view',
            'roles', 'roles-create', 'roles-edit', 'roles-view',
            'permissions', 'permissions-edit', 'permissions-view'
          ]),
          selectable: false,
          children: [
            // Usuários
            handleCheckPermission(['users_view']) ? {
              label: 'Usuários',
              name: 'users',
              selected: handleCheckSelected('users', ['users', 'users-create', 'users-edit', 'users-view']),
              icon: 'mdi-account-supervisor',
              handler: handleNodeClick
            } : null,
            // Atribuições
            handleCheckPermission(['roles_view']) ? {
              label: 'Atribuições',
              name: 'roles',
              selected: handleCheckSelected('roles', ['roles', 'roles-create', 'roles-edit', 'roles-view']),
              icon: 'mdi-account-lock',
              handler: handleNodeClick
            } : null,
            // Permissões
            handleCheckPermission(['permissions_view']) ? {
              label: 'Permissões',
              name: 'permissions',
              selected: handleCheckSelected('permissions', ['permissions', 'permissions-edit', 'permissions-view']),
              icon: 'mdi-lock',
              handler: handleNodeClick
            } : null
          ]
        } : null
  ]
  nodes.value = removeNullValues(nodesTmp)
})
</script>
