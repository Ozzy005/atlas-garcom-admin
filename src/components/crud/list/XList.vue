<style lang="scss" scoped>
.q-table--grid {
  color: #000;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
}

.q-table--dark {
  color: #fff !important;
  background-color: var(--q-dark) !important;
  border-color: rgba(255, 255, 255, 0.28) !important;
  box-shadow: 0 1px 5px rgba(255, 255, 255, 0.2), 0 2px 2px rgba(255, 255, 255, 0.14), 0 3px 1px -2px rgba(255, 255, 255, 0.12) !important;
}

.q-table--grid :deep(.q-table__grid-content) {
  padding: 4px 14px 0px 14px;
}
</style>

<template>
  <q-page padding>
    <q-table
      v-model:pagination="xList.pagination"
      v-model:selected="xList.selectedRows"
      @request="xList.getItems"
      @row-click="xList.rowClick"
      :rows-per-page-options="xList.rowsPerPageOptions"
      :columns="xList.columns"
      :rows="xList.rows"
      :loading="xList.tableLoadingMode"
      :filter="xList.filter"
      :fullscreen="xList.fullScreenMode"
      :grid="xList.gridMode"
      ref="tableRef"
      selection="multiple"
      row-key="id"
    >
      <template #top>
        <div class="column full-width q-gap-lg">
          <div
            class="row items-center"
            style="min-height: 41.15px;"
          >
            <span class="text-h6">{{ xList.title }}</span>
          </div>
          <XActions />
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
import XActions from 'src/components/crud/list/XActions.vue'
import { useXListStore } from 'src/stores/xList'

const xList = useXListStore()
const tableRef = ref()

onMounted(() => {
  tableRef.value.requestServerInteraction()
})

</script>
