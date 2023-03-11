<template>
  <q-page padding>
    <q-table
      ref="tableRef"
      v-model:pagination="pagination"
      v-model:selected="selected"
      :rows-per-page-options="[5, 10, 15, 20, 25, 50, 100]"
      :columns="columns"
      :rows="rows"
      :loading="loading"
      :filter="filter"
      @request="getItems"
      @row-click="rowClick"
      selection="multiple"
      row-key="id"
    >
      <template #top>
        <div class="column q-gap-y-lg full-width">
          <ActionsDefault
            v-model="rows"
            :show-create="auth.hasPermission('signatures_create')"
            :show-view="auth.hasPermission('signatures_view')"
            :show-edit="auth.hasPermission('signatures_edit')"
            :show-destroy="auth.hasPermission('signatures_delete')"
            :items="selected"
            crud="Assinaturas"
            model="signatures"
          />
          <FilterDefault
            v-model:filter-value="filter"
            placeholder="Pesquisar por nome/descrição"
          />
        </div>
      </template>
      <template #body-cell-recurrence="props">
        <q-td :props="props">
          <BadgeStatus
            :name="enums.getName('recurrences', props.row.recurrence)"
            :color="enums.getColor('recurrences', props.row.recurrence)"
          />
        </q-td>
      </template>
      <template #body-cell-status="props">
        <q-td :props="props">
          <BadgeStatus
            :name="enums.getName('status', props.row.status)"
            :color="enums.getColor('status', props.row.status)"
          />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from 'src/stores/auth'
import { api } from 'src/boot/axios'
import helpers from 'src/utils/helpers'
import notify from 'src/composables/notify'
import ActionsDefault from 'src/components/crud/ActionsDefault.vue'
import FilterDefault from 'src/components/crud/FilterDefault.vue'
import BadgeStatus from 'src/components/common/BadgeStatus.vue'
import { useEnumsStore } from 'src/stores/enums'

const auth = useAuthStore()
const enums = useEnumsStore()
const tableRef = ref()
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
    label: 'Preço Total (R$)',
    name: 'total_price',
    field: 'total_price',
    align: 'center',
    sortable: true,
    format: (val) => helpers.floatToMoney(val)
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
    label: 'Recorrência',
    name: 'recurrence',
    field: 'recurrence',
    align: 'center',
    sortable: true
  },
  {
    label: 'Status',
    name: 'status',
    field: 'status',
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
const filter = ref()
const loading = ref(false)
const selected = ref([])

const rowClick = (event, row) => {
  const exists = selected.value.find(item => item.id === row.id)
  if (exists) {
    selected.value = selected.value.filter(item => item.id !== row.id)
  } else {
    selected.value.push(row)
  }
}

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

onMounted(() => {
  tableRef.value.requestServerInteraction()
})

</script>
