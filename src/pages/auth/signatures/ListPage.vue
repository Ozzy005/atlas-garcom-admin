<template>
  <q-page padding>
    <q-table ref="tableRef"
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
      card-class="bg-grey-4"
      grid
      grid-header
      hide-header>
      <template #top>
        <div class="column q-gap-y-lg full-width">
          <ActionsGroup v-model="rows"
            crud="Assinaturas"
            model="signatures"
            :items="selected"
            :show-create="auth.hasPermission('signatures_create')"
            :show-view="auth.hasPermission('signatures_view')"
            :show-edit="auth.hasPermission('signatures_edit')"
            :show-destroy="auth.hasPermission('signatures_delete')" />
          <div class="row">
            <q-input class="col-md-4 col-xs-12"
              v-model="filter"
              outlined
              dense
              debounce="300"
              placeholder="Pesquisar por dia/descrição">
              <template #append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </div>
      </template>
      <template #body-cell-recurrence="props">
        <q-td :props="props">
          <BadgeStatus :name="formatRecurrence(props.row.recurrence)"
            :color="getRecurrenceColor(props.row.recurrence)" />
        </q-td>
      </template>
      <template #body-cell-status="props">
        <q-td :props="props">
          <BadgeStatus :name="formatStatus(props.row.status)"
            :color="getStatusColor(props.row.status)" />
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
import { useAuthStore } from 'src/stores/auth'
import BadgeStatus from 'src/components/common/BadgeStatus.vue'
import ActionsGroup from 'src/components/crud/ActionsGroup.vue'

const auth = useAuthStore()

const tableRef = ref(null)
const filter = ref(null)
const loading = ref(false)
const columns = [
  {
    label: 'ID',
    name: 'id',
    field: 'id',
    align: 'center',
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
    label: 'Recorrência',
    name: 'recurrence',
    field: 'recurrence',
    align: 'center',
    sortable: true,
    format: (val) => formatRecurrence(val)
  },
  {
    label: 'Preço Total (R$)',
    name: 'total_price',
    field: 'total_price',
    align: 'center',
    sortable: true,
    format: (val) => helpers.floatToMoney(val)
  },
  {
    label: 'Status',
    name: 'status',
    field: 'status',
    align: 'center',
    sortable: true,
    format: (val) => formatStatus(val)
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
const statusOptions = ref([])
const recurrenceOptions = ref([])

const getItems = async (props) => {
  try {
    const { page, rowsPerPage, sortBy, descending } = props.pagination
    loading.value = true
    const { data } = await api(
      {
        url: '/api/signatures',
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

const getStatus = async () => {
  try {
    const { data } = await api({ url: '/api/status' })
    statusOptions.value = data.data
  } catch (error) {
    notify.error(error)
  }
}

const formatStatus = (val) => {
  const status = statusOptions.value.find(item => item.id === val)
  if (status) {
    return status.name
  }
  return 'Não informado'
}

const getStatusColor = (val) => {
  const status = statusOptions.value.find(item => item.id === val)
  if (status) {
    return status.color
  }
  return '#000000'
}

const getRecurrences = async () => {
  try {
    const { data } = await api({ url: '/api/recurrences' })
    recurrenceOptions.value = data.data
  } catch (error) {
    notify.error(error)
  }
}

const formatRecurrence = (val) => {
  const recurrence = recurrenceOptions.value.find(item => item.id === val)
  if (recurrence) {
    return recurrence.name
  }
  return 'Não informado'
}

const getRecurrenceColor = (val) => {
  const recurrence = recurrenceOptions.value.find(item => item.id === val)
  if (recurrence) {
    return recurrence.color
  }
  return '#000000'
}

onMounted(() => {
  tableRef.value.requestServerInteraction()
  getStatus()
  getRecurrences()
})

</script>
