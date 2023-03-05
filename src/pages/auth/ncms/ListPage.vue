<!-- eslint-disable vue/no-v-text-v-html-on-component -->
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
            <span class="text-h6">Ncms</span>
          </div>
          <div class="row">
            <q-space />
            <q-input class="col-md-4 col-xs-12"
              v-model="filter"
              outlined
              dense
              debounce="300"
              placeholder="Pesquisar por código/descrição">
              <template #append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </div>
      </template>
      <template #body-cell-description="props">
        <q-td :props="props" v-html="props.row.description" />
      </template>
      <template #body-cell-actions="props">
        <q-td :props="props">
          <ActionsDefault model="ncms"
            :item="props.row"
            :show-view="auth.hasPermission('ncms_view')"
            :show-edit="false"
            :show-destroy="false"
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
import ActionsDefault from 'src/components/crud/ActionsDefault.vue'
import { useAuthStore } from 'src/stores/auth'

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
    label: 'Descrição',
    name: 'description',
    field: 'description',
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

const handleGetItems = async (props) => {
  try {
    const { page, rowsPerPage, sortBy, descending } = props.pagination
    loading.value = true
    const { data } = await api(
      {
        url: '/api/ncms',
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

onMounted(() => tableRef.value.requestServerInteraction())

</script>
