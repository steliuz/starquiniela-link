<template>
  <div>
    <div class="title q-mt-md q-ml-md">
      <p class="text-h5 text-grey-7">
        <i class="fa-solid fa-coins q-mr-xs text-secondary"></i>
        Precio de Quinielas
      </p>
    </div>
    <br />
    <section class="flex justify-center">
      <div class="w-section">
        <div class="row" v-for="subscribe in subscribes" :key="subscribe.id">
          <div class="col-12">
            <h5 class="text-center bg-secondary text-white text-uppercase py-1">
              organizador {{ subscribe.name }}
            </h5>
          </div>
          <div class="col-12 col-md-4 column content-center" v-for="credit in subscribe.credits" :key="credit.id">
            <p class="pt-3 mb-2 text-bold">{{ credit.name }}</p>
            <q-input class="text-center mb-0 pb-2 input-w" input-class="text-center text-bold" outlined dense bottom-slots
              v-model="credit.price" label="" type="number" maxlength="4">
              <template v-slot:after>
                <q-btn size="sm" color="secondary" round dense flat icon="check">
                  <q-tooltip class="bg-primary shadow-4"> Guardar </q-tooltip>
                </q-btn>
              </template>
            </q-input>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const subscribes = [
  {
    id: 1,
    name: 'Básico',
    credits: [{ name: 'Tabla General', price: '1' }, { name: 'Perzonalizado 1', price: '2' }, { name: 'Perzonalizado 2', price: '3' }]
  },
  {
    id: 2,
    name: 'Bronce',
    credits: [{ name: 'Tabla General', price: '1' }, { name: 'Perzonalizado 1', price: '2' }, { name: 'Perzonalizado 2', price: '3' }]
  },
  {
    id: 3,
    name: 'Plata',
    credits: [{ name: 'Tabla General', price: '1' }, { name: 'Perzonalizado 1', price: '2' }, { name: 'Perzonalizado 2', price: '3' }]
  },
  {
    id: 4,
    name: 'Oro',
    credits: [{ name: 'Tabla General', price: '1' }, { name: 'Perzonalizado 1', price: '2' }, { name: 'Perzonalizado 2', price: '3' }]
  },
  {
    id: 4,
    name: 'Platino',
    credits: [{ name: 'Tabla General', price: '1' }, { name: 'Perzonalizado 1', price: '2' }, { name: 'Perzonalizado 2', price: '3' }]
  },
]
</script>

<style lang="scss" scoped>
.w-section {
  width: 90%;
  max-width: 600px;
  margin-bottom: 5%;
}

.input-w {
  width: 120px;
  text-align: center !important;
}

table {
  border-collapse: collapse;
}

table,
td,
th {
  border: 1px solid;
}
</style>