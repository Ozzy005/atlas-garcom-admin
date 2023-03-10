<template>
  <q-page padding>
    <q-table
      ref="tableRef"
      v-model:pagination="pagination"
      :rows-per-page-options="[5, 10, 15, 20, 25, 50, 100]"
      :rows="rows"
      :columns="columns"
      :loading="loading"
      @request="getItems"
      :filter="filter"
      row-key="id"
      binary-state-sort
      selection="multiple"
      v-model:selected="selected"
      @row-click="rowClick"
    >
      <template #top>
        <div class="column q-gap-y-lg full-width">
          <ActionsGroup
            v-model="rows"
            crud="Atribuições/Módulos"
            model="roles"
            :items="selected"
            :show-create="auth.hasPermission('roles_create')"
            :show-view="auth.hasPermission('roles_view')"
            :show-edit="auth.hasPermission('roles_edit')"
            :show-destroy="auth.hasPermission('roles_delete')"
          />
          <div class="row">
            <q-input
              class="col-md-4 col-xs-12"
              v-model="filter"
              outlined
              dense
              debounce="300"
              placeholder="Pesquisar por nome e descrição"
            >
              <template #append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </div>
      </template>
      <template #body-cell-type="props">
        <q-td :props="props">
          <BadgeStatus
            :name="formatType(props.row.type)"
            :color="getTypeColor(props.row.type)"
          />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup>
import { api } from 'src/boot/axios'
import notify from 'src/composables/notify'
import { ref, onMounted } from 'vue'
import helpers from 'src/utils/helpers'
import ActionsGroup from 'src/components/crud/ActionsGroup.vue'
import { useAuthStore } from 'src/stores/auth'
import BadgeStatus from 'src/components/common/BadgeStatus.vue'

const auth = useAuthStore()

const tableRef = ref(null)
const filter = ref(null)
const loading = ref(false)
const columns = [
  {
    label: 'ID',
    name: 'id',
    field: 'id',
    align: 'left',
    required: true,
    sortable: true
  },
  {
    label: 'Nome',
    name: 'name',
    field: 'name',
    align: 'center',
    sortable: true
  },
  {
    label: 'Descrição',
    name: 'description',
    field: 'description',
    align: 'center',
    sortable: true
  },
  {
    label: 'Dt.Criação',
    name: 'created_at',
    field: 'created_at',
    align: 'center',
    sortable: true,
    format: (val) => helpers.brDateTime(val)
  },
  {
    label: 'Dt.Edição',
    name: 'updated_at',
    field: 'updated_at',
    align: 'center',
    sortable: true,
    format: (val) => helpers.brDateTime(val)
  },
  {
    label: 'Tipo',
    name: 'type',
    field: 'type',
    align: 'center',
    sortable: true
  }
]
const rows = ref([])
const pagination = ref({
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 10,
  sortBy: 'id',
  descending: false
})
const selected = ref([])
const types = ref([])

const getItems = async (props) => {
  try {
    const { page, rowsPerPage, sortBy, descending } = props.pagination
    loading.value = true
    const { data } = await api(
      {
        url: '/api/roles',
        params: {
          page,
          rowsPerPage,
          sortBy,
          descending,
          search: filter.value
        }
      }
    )
    rows.value = data.data.data
    pagination.value.page = data.data.current_page
    pagination.value.rowsPerPage = data.data.per_page
    pagination.value.rowsNumber = data.data.total
    pagination.value.sortBy = sortBy
    pagination.value.descending = descending
    loading.value = false
  } catch (error) {
    notify.error(error)
  }
}

const rowClick = (event, row) => {
  const exists = selected.value.find(item => item.id === row.id)
  if (exists) {
    selected.value = selected.value.filter(item => item.id !== row.id)
  } else {
    selected.value.push(row)
  }
}

const getTypes = async () => {
  try {
    const { data } = await api({ url: '/api/role-types' })
    types.value = data.data
  } catch (error) {
    notify.error(error)
  }
}

const formatType = (val) => {
  const type = types.value.find(item => item.id === val)
  if (type) {
    return type.name
  }
  return 'Não informado'
}

const getTypeColor = (val) => {
  const type = types.value.find(item => item.id === val)
  if (type) {
    return type.color
  }
  return '#000000'
}

onMounted(() => {
  tableRef.value.requestServerInteraction()
  getTypes()
})

</script>
