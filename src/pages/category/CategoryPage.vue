<template>
  <div>
    <div class="title q-mt-md q-ml-md">
      <p class="text-h5" :class="$q.dark.isActive ? 'text-white' : 'text-dark'">
        <i
          class="fa-solid fa-coins q-mr-xs"
          :class="$q.dark.isActive ? 'text-secondary' : 'text-primary'"
        ></i>
        Precio de Quinielas
      </p>
    </div>
    <section class="flex justify-center">
      <div class="w-section">
        <div class="row">
          <div
            class="col-12 col-sm-6 q-px-sm"
            v-for="subscribe in subscribes"
            :key="subscribe.id"
          >
            <div class="row">
              <div class="col-12">
                <p
                  class="text-center text-uppercase q-my-sm q-py-sm"
                  :class="
                    $q.dark.isActive
                      ? 'bg-header-dark'
                      : 'bg-primary text-white'
                  "
                >
                  organizador {{ subscribe.name }}
                </p>
              </div>
              <div
                class="col-12 col-md-4 column content-center"
                v-for="credit in subscribe.credits"
                :key="credit.name"
              >
                <p class="text-bold q-mb-none">
                  {{ credit.category_room.name }}
                </p>
                <q-input
                  :dark="$q.dark.isActive"
                  class="text-center q-pb-2 input-w hide-number-arrows"
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
                      <q-tooltip class="bg-primary shadow-4">
                        Guardar
                      </q-tooltip>
                    </q-btn>
                  </template>
                </q-input>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import { getData, putData } from 'src/services/communServices';
interface keyable {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const subscribes: Ref<Array<keyable>> = ref([]);

function getSubscribes() {
  getData('creditos').then((resp) => {
    let data = resp.subscribes;
    let array: Array<object> = [];
    data.forEach((val: keyable) => {
      let credits = data.filter(
        (v: keyable) => v.subscribe_id == val.subscribe_id
      );
      let exist = array.find((v: keyable) => v.id == val.subscribe_id);
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

function updateSubscribe(credit: keyable) {
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
  max-width: 1100px;
  margin-bottom: 5%;
}

.input-w {
  width: 100px;
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
