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
          <XListActions
            v-model="rows"
            :show-create="auth.hasPermission(`${model}_create`)"
            :show-view="auth.hasPermission(`${model}_view`)"
            :show-edit="auth.hasPermission(`${model}_edit`)"
            :show-destroy="auth.hasPermission(`${model}_delete`)"
            :items="selected"
            :crud="crud"
            :model="model"
          />
          <XListFilter
            v-model:filter-value="filter"
            :placeholder="filterPlaceholder"
          />
        </div>
      </template>
      <template
        v-for="(_, slot) in $slots"
        :key="slot"
        v-slot:[slot]="scope"
      >
        <slot
          :name="slot"
          v-bind="scope"
          :key="slot"
        />
      </template>
    </q-table>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from 'src/stores/auth'
import { api } from 'src/boot/axios'
import notify from 'src/composables/notify'
import XListActions from 'src/components/crud/XListActions.vue'
import XListFilter from 'src/components/crud/XListFilter.vue'

const props = defineProps({
  columns: {
    type: Array,
    required: true
  },
  crud: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  filterPlaceholder: {
    type: String,
    required: true
  }
})

const auth = useAuthStore()
const tableRef = ref()
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

const getItems = async (scope) => {
  try {
    const { page, rowsPerPage, sortBy, descending } = scope.pagination
    loading.value = true
    const { data } = await api(
      {
        url: `/api/${props.model}`,
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
