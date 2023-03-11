<template>
  <q-page padding>
    <ViewDefault
      crud="Estados"
      model="states"
    >
      <FieldDefault
        class="col-md-grow col-xs-12"
        field="Nome:"
        :value="form.title"
      />

      <FieldDefault
        class="col-md-grow col-xs-12"
        field="Sigla:"
        :value="form.letter"
      />
    </ViewDefault>
  </q-page>
</template>

<script setup>
import notify from 'src/composables/notify'
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { api } from 'src/boot/axios'
import ViewDefault from 'src/components/crud/ViewDefault.vue'
import FieldDefault from 'src/components/crud/FieldDefault.vue'

const route = useRoute()

const form = ref({
  title: null,
  letter: null
})

const getItem = async () => {
  try {
    const { data } = await api({ url: `/api/states/${route.params.id}` })
    form.value = data.data
  } catch (error) {
    notify.error(error)
  }
}

onMounted(() => getItem())

</script>
