<template>
  <q-dialog persistent>
    <q-card
      class="bg-header-dark q-pa-lg"
      style="width: 80%; max-width: 900px; height: auto"
    >
      <q-card-section>
        <div class="items-plans">
          <template v-for="(item, index) in subscribes" :key="item.id">
            <div v-if="index !== 0" class="flex column items-center">
              <q-img
                class="q-ml-sm shield-plan"
                width="100px"
                :src="getImageSrc(item.id)"
                :ratio="1 / 1"
                spinner-color="primary"
                spinner-size="82px"
              />
              <p class="text-subtitle1 q-mt-xs q-mb-none">
                {{ getTicketAmount(item.id) || 'Ilimitados' }} tickets
              </p>
              <p class="text-subtitle2 q-my-none">{{ item.name }}</p>
              <q-btn
                class="q-mt-sm"
                color="secondary"
                :label="`${getPrice(item.id)} monedas`"
                :disable="vip === item.id"
              >
                <q-popup-proxy>
                  <q-banner class="bg-header-dark q-pa-md">
                    <div class="row">
                      <div class="col-12">
                        <p class="ellipsis-2 text-center text-subtitle1">
                          ¿Desea mejorar el plan a
                          <span class="text-orange-5 text-bold">
                            {{ item.name }}</span
                          >?
                        </p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-12 col-sm-6 text-center q-pa-sm">
                        <q-btn
                          class="full-width"
                          outline
                          color="negative"
                          label="cancelar"
                          v-close-popup
                        />
                      </div>
                      <div class="col-12 col-sm-6 text-center q-pa-sm">
                        <q-btn
                          class="full-width"
                          color="secondary"
                          label="OK"
                          @click="onUpgrade(item.id)"
                          v-close-popup
                        />
                      </div>
                    </div>
                  </q-banner>
                </q-popup-proxy>
              </q-btn>
            </div>
          </template>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          outline
          class="full-width"
          label="Cerrar"
          color="negative"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSubscribeStore } from 'src/stores/subscribe';
import { onMounted } from 'vue';
import bronce from 'src/assets/medallas/bronce.png';
import plata from 'src/assets/medallas/plata.png';
import oro from 'src/assets/medallas/oro.png';
import platino from 'src/assets/medallas/platino.png';

const props = defineProps(['category_id', 'vip']);

const emit = defineEmits(['upgradePremium']);
const { subscribes } = storeToRefs(useSubscribeStore());
const { getSubscribe } = useSubscribeStore();

const getPrice = (id: number) => {
  let price = 1;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const subscribe = subscribes.value.find((val: any) => val.id == id);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const credit: any = subscribe?.credits?.find(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

const getImageSrc = (id: number) => {
  switch (id) {
    case 2:
      return bronce;
    case 3:
      return plata;
    case 4:
      return oro;
    case 5:
      return platino;
  }
};

const onUpgrade = (id: number) => {
  emit('upgradePremium', id);
};

onMounted(() => {
  if (subscribes.value.length == 0) {
    getSubscribe();
  }
});
</script>

<style lang="scss" scoped>
.items-plans {
  display: grid;
  grid-template-columns: repeat(auto-fit, minMax(120px, 1fr));
}
</style>
