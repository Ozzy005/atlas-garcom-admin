<template>
  <XList
    :columns="columns"
    title="Atribuições/Módulos"
    route-group-name="roles"
    permissions-group-name="roles"
    api-group-name="roles"
    filter-placeholder="Pesquisar por nome/descrição"
  >
    <template #body-cell-type="props">
      <q-td :props="props">
        <BadgeStatus
          :name="enums.getName('role-types', props.row.type)"
          :color="enums.getColor('role-types', props.row.type)"
        />
      </q-td>
    </template>
  </XList>
</template>

<script setup>
import { useEnumsStore } from 'src/stores/enums'
import XList from 'src/components/crud/list/XList.vue'
import helpers from 'src/utils/helpers'
import BadgeStatus from 'src/components/others/XBadge.vue'

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
    label: 'Tipo',
    name: 'type',
    field: 'type',
    align: 'center',
    sortable: true
  }
]

</script>
