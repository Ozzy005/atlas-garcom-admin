<template>
  <div class="row justify-between items-center q-gap-md">

    <q-input
      v-model="filter"
      :placeholder="filterPlaceholder"
      class="col-md-5 col-xs-12"
      debounce="300"
      dense
      outlined
      clearable
    >
      <template #append>
        <q-icon name="search" />
      </template>
    </q-input>

    <div class="row q-gap-sm">
      <XBtn
        @click="destroy"
        :disable="!selectedItems.length"
        v-if="showDestroy"
        tooltip-label="Excluir"
        icon="mdi-close"
        color="red"
      />
      <XBtn
        @click="edit"
        :disable="!(selectedItems.length === 1)"
        v-if="showEdit"
        tooltip-label="Editar"
        icon="mdi-pencil"
      />
      <XBtn
        @click="view"
        :disable="!(selectedItems.length === 1)"
        v-if="showView"
        tooltip-label="Visualizar"
        icon="mdi-eye"
      />
      <XBtn
        :to="{ name: `${props.routeGroupName}-create` }"
        v-if="showCreate"
        tooltip-label="Adicionar"
        icon="mdi-plus"
      />
      <XBtn
        @click="fullscreenClick"
        :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
        :tooltip-label="showFullscreenTooltip ? (fullscreen ? 'Sair do modo fullscreen' : 'Colocar em modo fullscreen') : null"
      />
      <XBtn
        @click="grid = !grid"
        :tooltip-label="grid ? 'Sair do modo grade' : 'Colocar em modo grade'"
        icon="mdi-grid"
      />
    </div>

  </div>
</template>

<script setup>
import { useQuasar } from 'quasar'
import notify from 'src/composables/notify'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from 'src/boot/axios'
import XBtn from 'src/components/buttons/XBtn.vue'

const props = defineProps({
  fullscreenValue: {
    type: Boolean,
    required: true
  },
  gridValue: {
    type: Boolean,
    required: true
  },
  rowsValue: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  filterValue: {
    type: String,
    required: false
  },
  filterPlaceholder: {
    type: String,
    required: true
  },
  selectedItems: {
    type: Array,
    required: true
  },
  routeGroupName: {
    type: String,
    required: true
  },
  apiGroupName: {
    type: String,
    required: true
  },
  showCreate: {
    type: Boolean,
    default: true
  },
  showView: {
    type: Boolean,
    default: true
  },
  showEdit: {
    type: Boolean,
    default: true
  },
  showDestroy: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits([
  'update:rowsValue',
  'update:filterValue',
  'update:fullscreenValue',
  'update:gridValue'
])

const rows = computed({
  get () {
    return props.rowsValue
  },
  set (value) {
    emit('update:rowsValue', value)
  }
})

const filter = computed({
  get () {
    return props.filterValue
  },
  set (value) {
    emit('update:filterValue', value)
  }
})

const fullscreen = computed({
  get () {
    return props.fullscreenValue
  },
  set (value) {
    emit('update:fullscreenValue', value)
  }
})

const grid = computed({
  get () {
    return props.gridValue
  },
  set (value) {
    emit('update:gridValue', value)
  }
})

const router = useRouter()
const $q = useQuasar()
const showFullscreenTooltip = ref(true)

const fullscreenClick = () => {
  fullscreen.value = !fullscreen.value
  showFullscreenTooltip.value = false
  setTimeout(() => { showFullscreenTooltip.value = true })
}

const selectedItems = computed(() => {
  return props.selectedItems.map(item => item.id)
})

const selectedItem = computed(() => {
  if (props.selectedItems.length) {
    return props.selectedItems[0]
  }
  return null
})

const view = () => {
  router.push({ name: `${props.routeGroupName}-view`, params: { id: selectedItem.value.id } })
}

const edit = () => {
  router.push({ name: `${props.routeGroupName}-edit`, params: { id: selectedItem.value.id } })
}

const destroy = () => {
  $q.dialog({
    title: 'Atenção !',
    message: 'Tem certeza que deseja excluir todos os itens selecionados?',
    cancel: true,
    persistent: true
  }).onOk(async () => {
    try {
      const { data } = await api({ method: 'delete', url: `/api/${props.apiGroupName}`, data: { items: selectedItems.value } })
      rows.value = rows.value.filter(val => !(selectedItems.value.includes(val.id)))
      notify.success(data.message)
    } catch (error) {
      notify.error(error)
    }
  })
}

</script>
