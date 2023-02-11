<template>
  <q-btn-dropdown color="primary"
    dropdown-icon="menu"
    size="lg"
    no-icon-animation
    dense
    flat>
    <q-list>
      <q-item clickable
        v-close-popup
        @click="handleShow(item)">
        <q-item-section>
          <q-item-label>Visualizar</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable
        v-close-popup
        @click="handleEdit(item)">
        <q-item-section>
          <q-item-label>Editar</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable
        v-close-popup
        @click="handleDestroy(item)">
        <q-item-section>
          <q-item-label>Excluir</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { useStorageStore } from 'src/stores/storage'
import notify from 'src/composables/notify'
import { computed } from 'vue'

const store = useStorageStore()
const $q = useQuasar()
const router = useRouter()

const props = defineProps({
  model: {
    type: String,
    required: true
  },
  item: {
    type: Object,
    required: true
  },
  data: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const rows = computed({
  get () {
    return props.data
  },
  set (value) {
    emit('update:modelValue', value)
  }
})

const handleShow = (item) => {
  router.push({ name: `${props.model}-show`, params: { id: item.id } })
}

const handleEdit = (item) => {
  router.push({ name: `${props.model}-edit`, params: { id: item.id } })
}

const handleDestroy = (item) => {
  $q.dialog({
    title: 'Atenção !',
    message: 'Tem certeza que deseja excluir esse item?',
    cancel: true,
    persistent: true
  }).onOk(async () => {
    try {
      const { data } = await store.axios({ method: 'delete', url: `/api/${props.model}/${item.id}` })
      rows.value = rows.value.filter(val => val.id !== item.id)
      notify.success(data.message)
    } catch (error) {
      notify.error(error)
    }
  })
}
</script>
