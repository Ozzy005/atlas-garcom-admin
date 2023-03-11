<template>
  <div class="row q-gap-x-xs q-gap-y-md items-center">
    <span class="text-h6">{{ crud }}</span>
    <q-space />
    <div class="row q-gap-sm">
      <XBtn
        v-if="showDestroy"
        @click="destroy"
        :disable="!items.length"
        label="Excluir"
        icon="mdi-close"
      />
      <XBtn
        v-if="showEdit"
        @click="edit"
        :disable="!(items.length === 1)"
        label="Editar"
        icon="mdi-pencil"
      />
      <XBtn
        v-if="showView"
        @click="view"
        :disable="!(items.length === 1)"
        label="Visualizar"
        icon="mdi-eye"
      />
      <XBtn
        v-if="showCreate"
        :to="{ name: `${props.model}-create` }"
        label="Adicionar novo"
        icon="mdi-plus"
      />
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar'
import notify from 'src/composables/notify'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { api } from 'src/boot/axios'
import XBtn from '../common/XBtn.vue'

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
