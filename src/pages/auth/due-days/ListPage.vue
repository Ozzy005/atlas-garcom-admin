<template>
  <XListPage
    :columns="columns"
    crud="Dias de Vencimento"
    model="due-days"
    filter-placeholder="Pesquisar por dia/descrição"
  >
    <template #body-cell-status="props">
      <q-td :props="props">
        <BadgeStatus
          :name="enums.getName('status', props.row.status)"
          :color="enums.getColor('status', props.row.status)"
        />
      </q-td>
    </template>
  </XListPage>
</template>

<script setup>
import { useEnumsStore } from 'src/stores/enums'
import XListPage from 'src/components/crud/XListPage.vue'
import helpers from 'src/utils/helpers'
import BadgeStatus from 'src/components/common/BadgeStatus.vue'

const enums = useEnumsStore()
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
    label: 'Dia',
    name: 'day',
    field: 'day',
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
    label: 'Status',
    name: 'status',
    field: 'status',
    align: 'center',
    sortable: true
  }
]

</script>
