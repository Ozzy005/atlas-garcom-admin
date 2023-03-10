<template>
  <div class="row q-gap-x-xs q-gap-y-md items-center">
    <span class="text-h6">{{ crud }}</span>
    <q-space />
    <div class="row q-gap-sm">
      <q-btn v-if="showDestroy"
        style="min-width: 150px;"
        label="Excluir"
        color="primary"
        no-caps
        :disable="!items.length"
        @click="destroy" />
      <q-btn v-if="showEdit"
        style="min-width: 150px;"
        label="Editar"
        color="primary"
        no-caps
        :disable="!(items.length === 1)"
        @click="edit" />
      <q-btn v-if="showView"
        style="min-width: 150px;"
        label="Visualizar"
        color="primary"
        no-caps
        :disable="!(items.length === 1)"
        @click="view" />
      <q-btn v-if="showCreate"
        style="min-width: 150px;"
        label="Adicionar novo"
        color="primary"
        no-caps
        :to="{ name: `${props.model}-create` }" />
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar'
import notify from 'src/composables/notify'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { api } from 'src/boot/axios'

const props = defineProps({
  modelValue: {
    type: Array,
    required: true
  },
  crud: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  items: {
    type: Array,
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

const emit = defineEmits(['update:modelValue'])

const rows = computed({
  get () {
    return props.modelValue
  },
  set (value) {
    emit('update:modelValue', value)
  }
})

const router = useRouter()
const $q = useQuasar()

const items = computed(() => {
  return props.items.map(item => item.id)
})

const item = computed(() => {
  if (props.items.length) {
    return props.items[0]
  }
  return null
})

const view = () => {
  router.push({ name: `${props.model}-view`, params: { id: item.value.id } })
}

const edit = () => {
  router.push({ name: `${props.model}-edit`, params: { id: item.value.id } })
}

const destroy = () => {
  $q.dialog({
    title: 'Atenção !',
    message: 'Tem certeza que deseja excluir todos os itens selecionados?',
    cancel: true,
    persistent: true
  }).onOk(async () => {
    try {
      const { data } = await api({ method: 'delete', url: `/api/${props.model}`, data: { items: items.value } })
      rows.value = rows.value.filter(val => !(items.value.includes(val.id)))
      notify.success(data.message)
    } catch (error) {
      notify.error(error)
    }
  })
}

</script>
