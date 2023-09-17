<template>
  <q-dialog persistent>
    <q-card>
      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-card-section class="row items-center">
          <q-input
            v-model="credit"
            type="number"
            label="Creditos"
            min="1"
            required
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Agregar" type="submit" color="primary" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const credit = ref();
const emit = defineEmits(['addCredits']);

const onSubmit = () => {
  emit('addCredits', credit.value);
};
</script>
