<template>
  <q-btn-dropdown color="primary"
    dropdown-icon="menu"
    size="lg"
    no-icon-animation
    dense
    flat>
    <q-list>
      <q-item v-if="showView"
        clickable
        v-close-popup
        @click="view(item)">
        <q-item-section>
          <q-item-label>Visualizar</q-item-label>
        </q-item-section>
      </q-item>
      <q-item v-if="showEdit"
        clickable
        v-close-popup
        @click="edit(item)">
        <q-item-section>
          <q-item-label>Editar</q-item-label>
        </q-item-section>
      </q-item>
      <q-item v-if="showDestroy"
        clickable
        v-close-popup
        @click="destroy(item)">
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
import notify from 'src/composables/notify'
import { computed } from 'vue'
import { api } from 'src/boot/axios'

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
  modelValue: {
    type: Array,
    required: true
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

const emit = defineEmits(['update:modelValue'])

const rows = computed({
  get () {
    return props.modelValue
  },
  set (value) {
    emit('update:modelValue', value)
  }
})

const view = (item) => {
  router.push({ name: `${props.model}-view`, params: { id: item.id } })
}

const edit = (item) => {
  router.push({ name: `${props.model}-edit`, params: { id: item.id } })
}

const destroy = (item) => {
  $q.dialog({
    title: 'Atenção !',
    message: 'Tem certeza que deseja excluir esse item?',
    cancel: true,
    persistent: true
  }).onOk(async () => {
    try {
      const { data } = await api({ method: 'delete', url: `/api/${props.model}/${item.id}` })
      rows.value = rows.value.filter(val => val.id !== item.id)
      notify.success(data.message)
    } catch (error) {
      notify.error(error)
    }
  })
}
</script>
