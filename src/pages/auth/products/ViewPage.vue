<template>
  <XView
    v-model="form"
    :return-to="{ name: 'products-list' }"
    :api-get-params="{ with: ['category', 'productPrices.measurementUnit', 'complements.measurementUnit'] }"
    title="Produtos"
    api-get="products"
  >

    <XFieldGroup>
      <XField
        class="col-md-shrink col-xs-12"
        field="Imagem do Produto:"
      >
        <q-img
          :src="form.image_url"
          class="shadow-up-1"
          style="max-height: 200px; max-width: 200px"
        />
      </XField>
    </XFieldGroup>

    <XFieldGroup>
      <XField
        class="col-md-grow col-xs-12"
        field="Nome:"
        :value="form.name"
      />

      <XField
        class="col-md-grow col-xs-12"
        field="Categoria:"
        :value="form.category?.name"
      />

      <XField
        class="col-md-grow col-xs-12"
        field="Status:"
        :value="enums.getName('status', form.status)"
      />
    </XFieldGroup>

    <XFieldGroup>
      <XField
        class="col-md-grow col-xs-12"
        field="Descrição:"
        :value="form.description"
      />
    </XFieldGroup>

    <XField
      class="col-12"
      field="Preços:"
    >
      <q-chip
        v-for="(item, index) in form.product_prices"
        :key="index"
      >
        {{ `${item.quantity} ${item.measurement_unit.initials} - ${item.name} - R$ ${helpers.floatToMoney(item.price)}` }}
      </q-chip>
    </XField>

    <XField
      class="col-12"
      field="Complementos:"
    >
      <q-chip
        v-for="(item, index) in form.complements"
        :key="index"
      >
      {{ `${item.quantity} ${item.measurement_unit.initials} - ${item.name} - R$ ${helpers.floatToMoney(item.price)}` }}
      </q-chip>
    </XField>

    <XFieldGroup>
      <XField
        class="col-md-grow col-xs-12"
        field="Dt. Criação:"
        :value="helpers.brDateTime(form.created_at)"
      />

      <XField
        class="col-md-grow col-xs-12"
        field="Dt. Edição"
        :value="helpers.brDateTime(form.updated_at)"
      />
    </XFieldGroup>
  </XView>
</template>

<script setup>
import helpers from 'src/utils/helpers'
import { ref } from 'vue'
import XView from 'src/components/crud/view/XView.vue'
import XField from 'src/components/crud/view/XField.vue'
import { useEnumsStore } from 'src/stores/enums'
import XFieldGroup from 'src/components/crud/view/XFieldGroup.vue'

const enums = useEnumsStore()

const form = ref({
  file: null,
  image: null,
  name: null,
  description: null,
  category: null,
  status: null,
  product_prices: [],
  complements: []
})

</script>
