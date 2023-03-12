<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
  <XListPage
    :columns="columns"
    crud="Ncms"
    model="ncms"
    filter-placeholder="Pesquisar por código/descrição"
  >
    <template #body-cell-description="props">
      <q-td
        :props="props"
        v-html="props.row.description"
      />
    </template>
  </XListPage>
</template>

<script setup>
import XListPage from 'src/components/crud/XListPage.vue'

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
