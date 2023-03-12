<template>
  <XListPage
    :columns="columns"
    crud="Atribuições/Módulos"
    model="roles"
    filter-placeholder="Pesquisar por nome e descrição"
  >
    <template #body-cell-type="props">
      <q-td :props="props">
        <BadgeStatus
          :name="enums.getName('role-types', props.row.type)"
          :color="enums.getColor('role-types', props.row.type)"
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
