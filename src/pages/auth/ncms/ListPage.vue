<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
  <XList
    :columns="columns"
    title="Ncms"
    route-group-name="ncms"
    permissions-group-name="ncms"
    api-group-name="ncms"
    filter-placeholder="Pesquisar por código/descrição"
  >
    <template #body-cell-description="props">
      <q-td
        :props="props"
        v-html="props.row.description"
      />
    </template>
  </XList>
</template>

<script setup>
import XList from 'src/components/crud/list/XList.vue'

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
  }
]

</script>
