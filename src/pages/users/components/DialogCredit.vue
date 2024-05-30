<template>
  <q-dialog persistent>
    <q-card style="width: 100%; max-width: 400px">
      <q-form @submit="onSubmit" class="q-px-md">
        <q-card-section class="">
          <h6 class="text-h5 text-center q-mb-none q-mt-md">
            Asignar Créditos
          </h6>
          <h5 class="text-h5 text-center q-mt-md">{{ props.userData.name }}</h5>
          <p class="label-input q-mb-none">Cantidad de créditos</p>
          <q-input
            v-model="credit"
            class="hide-number-arrows"
            filled
            type="number"
            placeholder="0"
            min="1"
            required
          />
          <div class="row q-mt-lg">
            <div class="col-6">
              <q-btn
                class="full-width"
                flat
                label="Cancel"
                color="negative"
                @click="reset"
                v-close-popup
              />
            </div>
            <div class="col-6">
              <q-btn
                class="full-width"
                label="Agregar"
                type="submit"
                color="primary"
              />
            </div>
          </div>
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const credit = ref();
const props = defineProps(['userData']);
const emit = defineEmits(['addCredits']);

const reset = () => {
  credit.value = '';
};

const onSubmit = () => {
  emit('addCredits', credit.value);
  reset();
};
</script>
