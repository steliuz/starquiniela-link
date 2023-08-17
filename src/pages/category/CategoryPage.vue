<template>
  <div>
    <div class="title q-mt-md q-ml-md">
      <p class="text-h5 text-grey-7">
        <i class="fa-solid fa-coins q-mr-xs text-secondary"></i>
        Precio de Quinielas
      </p>
    </div>
    <section class="flex justify-center">
      <div class="w-section">
        <div class="row" v-for="subscribe in subscribes" :key="subscribe.id">
          <div class="col-12">
            <p
              class="text-center bg-secondary text-white text-uppercase q-my-1"
            >
              organizador {{ subscribe.name }}
            </p>
          </div>
          <div
            class="col-12 col-md-4 column content-center"
            v-for="credit in subscribe.credits"
            :key="credit.name"
          >
            <p class="text-bold q-mb-none">{{ credit.category_room.name }}</p>
            <q-input
              class="text-center pb-2 input-w"
              input-class="text-center text-bold"
              outlined
              dense
              bottom-slots
              v-model="credit.price"
              label=""
              type="number"
              maxlength="4"
            >
              <template v-slot:after>
                <q-btn
                  size="sm"
                  color="secondary"
                  round
                  dense
                  flat
                  icon="check"
                  @click="updateSubscribe(credit)"
                >
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
import { Ref, ref } from 'vue';
import { getData, putData } from 'src/services/communServices';
const subscribes: Ref<Array> = ref([]);

function getSubscribes() {
  getData('creditos').then((resp) => {
    let data = resp.subscribes;
    let array = [];
    data.forEach((val) => {
      let credits = data.filter((v) => v.subscribe_id == val.subscribe_id);
      let exist = array.find((v) => v.id == val.subscribe_id);
      if (!exist)
        array.push({
          id: val.subscribe.id,
          name: val.subscribe.name,
          credits: credits,
        });
    });
    subscribes.value = array;
  });
}
getSubscribes();

function updateSubscribe(credit) {
  let payload = {
    price: credit.price,
    id: credit.id,
  };
  putData(`creditos/${credit.id}/update`, payload);
}
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
