<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<template>
  <q-dialog persistent>
    <q-card>
      <q-card-section
        class="row items-center"
        v-for="item in subscribes"
        :key="item.id"
      >
        <span class="q-ml-sm">{{ item.name }}</span>
        <span class="q-ml-sm"
          >{{ getTicketAmount(item.id) || 'Ilimitados' }} Tickets</span
        >
        <q-btn color="primary" :label="`${getPrice(item.id)} monedas`">
          <q-popup-proxy>
            <q-banner>
              ¿Desea mejorar el plan?
              <q-btn
                color="primary"
                icon="check"
                label="OK"
                @click="onUpgrade(item)"
                v-close-popup
              />
              <q-btn
                color="primary"
                icon="check"
                label="cancelar"
                v-close-popup
              />
            </q-banner>
          </q-popup-proxy>
        </q-btn>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cerrar" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSubscribeStore } from 'src/stores/subscribe';
import { onMounted } from 'vue';

const props = defineProps(['category_id']);
const { subscribes } = storeToRefs(useSubscribeStore());
const { getSubscribe } = useSubscribeStore();

const getPrice = (id: number) => {
  let price = 1;
  const subscribe = subscribes.value.find((val: any) => val.id == id);

  const credit: any = subscribe?.credits?.find(
    (val: any) => val.category_room_id == props.category_id
  );

  if (credit) {
    price = credit.price;
  }

  return price;
};

const getTicketAmount = (id: number) => {
  let amount = '20';
  switch (id) {
    case 2:
      amount = '50';
      break;
    case 3:
      amount = '100';
      break;
    case 4:
      amount = '300';
      break;

    case 5:
      amount = 'Ilimitados';
      break;
  }

  return amount;
};

const onUpgrade = (value) => {
  console.log('🚀 ~ file: DialogUpgrade.vue:72 ~ onUpgrade ~ value:', value);
};

onMounted(() => {
  if (subscribes.value.length == 0) {
    getSubscribe();
  }
});
</script>
