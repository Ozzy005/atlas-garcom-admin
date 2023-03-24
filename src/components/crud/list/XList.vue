<template>
  <q-page padding>
    <q-table
      ref="tableRef"
      v-model:pagination="pagination"
      v-model:selected="selectedItems"
      @request="getItems"
      @row-click="rowClick"
      :rows-per-page-options="[5, 10, 15, 20, 25, 50, 100]"
      :columns="columns"
      :rows="rows"
      :loading="loading"
      :filter="filter"
      :fullscreen="fullscreen"
      selection="multiple"
      row-key="id"
    >
      <template #top>
        <div class="column full-width q-gap-lg">
          <div
            class="row items-center"
            style="min-height: 41.15px;"
          >
            <span class="text-h6">{{ title }}</span>
          </div>
          <XActions
            v-model:rows-value="rows"
            v-model:filter-value="filter"
            v-model:fullscreen-value="fullscreen"
            :show-create="auth.hasPermission(`${permissionsGroupName}_create`)"
            :show-view="auth.hasPermission(`${permissionsGroupName}_view`)"
            :show-edit="auth.hasPermission(`${permissionsGroupName}_edit`)"
            :show-destroy="auth.hasPermission(`${permissionsGroupName}_delete`)"
            :title="title"
            :filter-placeholder="filterPlaceholder"
            :selectedItems="selectedItems"
            :route-group-name="routeGroupName"
            :api-group-name="apiGroupName"
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
import XActions from 'src/components/crud/list/XActions.vue'

const props = defineProps({
  columns: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  routeGroupName: {
    type: String,
    required: true
  },
  permissionsGroupName: {
    tpye: String,
    required: true
  },
  apiGroupName: {
    tpye: String,
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
const selectedItems = ref([])
const fullscreen = ref(false)

const rowClick = (event, row) => {
  const exists = selectedItems.value.find(item => item.id === row.id)
  if (exists) {
    selectedItems.value = selectedItems.value.filter(item => item.id !== row.id)
  } else {
    selectedItems.value.push(row)
  }
}

const getItems = async (scope) => {
  try {
    const { page, rowsPerPage, sortBy, descending } = scope.pagination
    loading.value = true
    const { data } = await api(
      {
        url: `/api/${props.apiGroupName}`,
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
