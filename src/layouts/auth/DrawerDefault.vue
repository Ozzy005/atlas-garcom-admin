<template>
  <q-drawer v-model="leftDrawerOpen"
    :breakpoint="1200"
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

const getUserPermissions = async () => {
  try {
    const { data } = await api({ url: '/api/user-permissions' })
    auth.permissions = data.data
  } catch (error) {
    notify.error(error)
  }
}

const nodeClick = (node) => {
  if (['dashboard'].includes(node.name)) {
    tree.value.collapseAll()
  }
  router.push({ name: node.name })
}

const checkPermission = (nodePermissions) => {
  let hasPermission = false
  auth.permissions.every(item => {
    hasPermission = nodePermissions.includes(item.name)
    return !hasPermission
  })
  return hasPermission
}

const checkSelected = (selectNode, nodeRouteNames) => {
  if (nodeRouteNames.includes(route.name)) {
    selected.value = selectNode
    return true
  }
  return false
}

const checkExpanded = (expandNode, nodeRouteNames) => {
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
  await getUserPermissions()
  const nodesTmp = [
    // Dashboard
    checkPermission(['dashboard_view']) ? {
      label: 'Painel',
      name: 'dashboard',
      selected: checkSelected('dashboard', ['dashboard']),
      icon: 'mdi-chart-pie',
      handler: nodeClick
    } : null,

    // Agrupador Cadastros
    checkPermission([
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
          expanded: checkExpanded('registrations', [
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
            checkPermission(['tenants_view']) ? {
              label: 'Pessoas',
              name: 'people',
              icon: 'mdi-account-group',
              expanded: checkExpanded('people', ['tenants', 'tenants-create', 'tenants-edit', 'tenants-view']),
              selectable: false,
              children: [
                // Contratantes
                checkPermission(['tenants_view']) ? {
                  label: 'Contratantes',
                  name: 'tenants',
                  selected: checkSelected('tenants', ['tenants', 'tenants-create', 'tenants-edit', 'tenants-view']),
                  icon: 'mdi-account-tie',
                  handler: nodeClick
                } : null
              ]
            } : null,
            // Agrupador Geral
            checkPermission([
              'payment-methods_view',
              'measurement-units_view',
              'ncms_view',
              'states_view',
              'cities_view'
            ]) ? {
                  label: 'Geral',
                  name: 'general',
                  icon: 'mdi-menu',
                  expanded: checkExpanded('general', [
                    'payment-methods', 'payment-methods-create', 'payment-methods-edit', 'payment-methods-view',
                    'measurement-units', 'measurement-units-create', 'measurement-units-edit', 'measurement-units-view',
                    'ncms', 'ncms-view',
                    'states', 'states-view',
                    'cities', 'cities-view'
                  ]),
                  selectable: false,
                  children: [
                    // Métodos de Pagamento
                    checkPermission(['payment-methods_view']) ? {
                      label: 'Métodos de<br>Pagamento',
                      name: 'payment-methods',
                      selected: checkSelected('payment-methods', ['payment-methods', 'payment-methods-create', 'payment-methods-edit', 'payment-methods-view']),
                      icon: 'mdi-wallet',
                      handler: nodeClick
                    } : null,
                    // Unidades de Medida
                    checkPermission(['measurement-units_view']) ? {
                      label: 'Unidades de<br>Medida',
                      name: 'measurement-units',
                      selected: checkSelected('measurement-units', ['measurement-units', 'measurement-units-create', 'measurement-units-edit', 'measurement-units-view']),
                      icon: 'mdi-ruler',
                      handler: nodeClick
                    } : null,
                    // Ncms
                    checkPermission(['ncms_view']) ? {
                      label: 'Ncms',
                      name: 'ncms',
                      selected: checkSelected('ncms', ['ncms', 'ncms-view']),
                      icon: 'mdi-tag',
                      handler: nodeClick
                    } : null,
                    // Estados
                    checkPermission(['states_view']) ? {
                      label: 'Estados',
                      name: 'states',
                      selected: checkSelected('states', ['states', 'states-view']),
                      icon: 'mdi-diving-scuba-flag',
                      handler: nodeClick
                    } : null,
                    // Cidades
                    checkPermission(['cities_view']) ? {
                      label: 'Cidades',
                      name: 'cities',
                      selected: checkSelected('cities', ['cities', 'cities-view']),
                      icon: 'mdi-city',
                      handler: nodeClick
                    } : null
                  ]
                } : null
          ]
        } : null,
    // Agrupador Gerenciamento
    checkPermission([
      'users_view',
      'roles_view',
      'permissions_view'
    ]) ? {
          label: 'Gerenciamento',
          name: 'management',
          icon: 'mdi-account-cog',
          expanded: checkExpanded('management', [
            'users', 'users-create', 'users-edit', 'users-view',
            'roles', 'roles-create', 'roles-edit', 'roles-view',
            'permissions', 'permissions-edit', 'permissions-view'
          ]),
          selectable: false,
          children: [
            // Usuários
            checkPermission(['users_view']) ? {
              label: 'Usuários',
              name: 'users',
              selected: checkSelected('users', ['users', 'users-create', 'users-edit', 'users-view']),
              icon: 'mdi-account-supervisor',
              handler: nodeClick
            } : null,
            // Atribuições
            checkPermission(['roles_view']) ? {
              label: 'Atribuições',
              name: 'roles',
              selected: checkSelected('roles', ['roles', 'roles-create', 'roles-edit', 'roles-view']),
              icon: 'mdi-account-lock',
              handler: nodeClick
            } : null,
            // Permissões
            checkPermission(['permissions_view']) ? {
              label: 'Permissões',
              name: 'permissions',
              selected: checkSelected('permissions', ['permissions', 'permissions-edit', 'permissions-view']),
              icon: 'mdi-lock',
              handler: nodeClick
            } : null
          ]
        } : null
  ]
  nodes.value = removeNullValues(nodesTmp)
})
</script>
