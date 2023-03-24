<template>
  <XList>
    <template #body-cell-recurrence="props">
      <q-td :props="props">
        <XBadge
          :name="enums.getName('recurrences', props.row.recurrence)"
          :color="enums.getColor('recurrences', props.row.recurrence)"
        />
      </q-td>
    </template>
    <template #body-cell-status="props">
      <q-td :props="props">
        <XBadge
          :name="enums.getName('status', props.row.status)"
          :color="enums.getColor('status', props.row.status)"
        />
      </q-td>
    </template>
  </XList>
</template>

<script setup>
import { useEnumsStore } from 'src/stores/enums'
import XList from 'src/components/crud/list/XList.vue'
import helpers from 'src/utils/helpers'
import XBadge from 'src/components/others/XBadge.vue'
import { useXListStore } from 'src/stores/xList'

const enums = useEnumsStore()
const xList = useXListStore()
xList.reset()
xList.title = 'Assinaturas'
xList.routeGroupName = 'signatures'
xList.permissionsGroupName = 'signatures'
xList.apiGroupName = 'signatures'
xList.filterPlaceholder = 'Pesquisar por nome/descrição'
xList.columns = [
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
    sortable: true,
    format: (val) => xList.gridMode ? enums.getName('recurrences', val) : val
  },
  {
    label: 'Status',
    name: 'status',
    field: 'status',
    align: 'center',
    sortable: true,
    format: (val) => xList.gridMode ? enums.getName('status', val) : val
  }
]

</script>
