<template>
  <q-page padding>
    <q-table ref="tableRef"
      v-model:pagination="pagination"
      :rows-per-page-options="[5, 10, 15, 20, 25, 50, 100]"
      :rows="rows"
      :columns="columns"
      :loading="loading"
      @request="handleGetItems"
      :filter="filter"
      row-key="id"
      binary-state-sort>
      <template #top>
        <div class="column q-gap-y-md full-width">
          <div class="row no-wrap justify-between items-center">
            <span class="text-h6">Métodos de Pagamento</span>
            <q-btn v-if="auth.hasPermission('payment-methods_create')"
              style="min-width: 120px;"
              label="Adicionar novo"
              color="primary"
              no-caps
              :to="{ name: 'payment-methods-create' }" />
          </div>
          <div class="row">
            <q-space />
            <q-input class="col-md-4 col-xs-12"
              v-model="filter"
              outlined
              dense
              debounce="300"
              placeholder="Pesquisar por código e nome">
              <template #append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </div>
      </template>
      <template #body-cell-status="props">
        <q-td :props="props">
          <BadgeStatus :name="formatStatus(props.row.status)"
            :color="getStatusColor(props.row.status)" />
        </q-td>
      </template>
      <template #body-cell-actions="props">
        <q-td :props="props">
          <ActionsDefault model="payment-methods"
            :item="props.row"
            :show-view="auth.hasPermission('payment-methods_view')"
            :show-edit="auth.hasPermission('payment-methods_edit')"
            :show-destroy="auth.hasPermission('payment-methods_delete')"
            v-model="rows" />
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
import ActionsDefault from 'src/components/crud/ActionsDefault.vue'
import { useAuthStore } from 'src/stores/auth'
import BadgeStatus from 'src/components/BadgeStatus.vue'

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
    label: 'Código',
    name: 'code',
    field: 'code',
    align: 'center',
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
    label: 'Status',
    name: 'status',
    field: 'status',
    align: 'center',
    sortable: true
  },
  {
    label: 'Ações',
    name: 'actions',
    field: 'actions',
    align: 'right'
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
const statusOptions = ref([])

const handleGetItems = async (props) => {
  try {
    const { page, rowsPerPage, sortBy, descending } = props.pagination
    loading.value = true
    const { data } = await api(
      {
        url: '/api/payment-methods',
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

const handleGetStatus = async () => {
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

onMounted(() => {
  tableRef.value.requestServerInteraction()
  handleGetStatus()
})

</script>
