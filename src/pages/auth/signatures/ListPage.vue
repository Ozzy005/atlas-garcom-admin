<template>
  <XListPage
    :columns="columns"
    crud="Assinaturas"
    model="signatures"
    filter-placeholder="Pesquisar por nome/descrição"
  >
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

</script>
