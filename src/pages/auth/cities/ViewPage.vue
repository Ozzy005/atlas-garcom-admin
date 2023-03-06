<template>
  <q-page padding>
    <ViewDefault crud="Cidades"
      model="cities">
      <FieldView class="col-md-grow col-xs-12"
        field="Cidade:"
        :value="form.title" />

      <FieldView class="col-md-grow col-xs-12"
        field="Estado:"
        :value="form.state" />
    </ViewDefault>
  </q-page>
</template>

<script setup>
import notify from 'src/composables/notify'
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { api } from 'src/boot/axios'
import ViewDefault from 'src/components/crud/ViewDefault.vue'
import FieldView from 'src/components/crud/FieldView.vue'

const route = useRoute()

const form = ref({
  title: null,
  state: null
})

const getItem = async () => {
  try {
    const { data } = await api({ url: `/api/cities/${route.params.id}` })
    form.value = data.data
  } catch (error) {
    notify.error(error)
  }
}

onMounted(() => getItem())

</script>
