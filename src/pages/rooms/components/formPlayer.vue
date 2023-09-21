<template>
  <q-dialog>
    <q-card>
      <q-card-section>
        <q-form @submit="onSubmit">
          <div class="row">
            <div class="col-6 q-pa-xs">
              <!-- <p class="label-input">
          Nombre
        </p> -->
              <q-input
                v-model="formPlayer.name"
                dense
                filled
                type="text"
                placeholder="Nombre"
                required
              />
            </div>
            <div class="col-6 q-pa-xs">
              <!-- <p class="label-input">
          Teléfono
        </p> -->
              <q-input
                v-model="formPlayer.phone"
                dense
                filled
                type="text"
                placeholder="Teléfono"
                required
              />
            </div>
          </div>
          <div class="row">
            <div class="col-12 q-pa-xs">
              <!-- <p class="label-input">
          Correo <span class="text-caption">(opcional)</span>
        </p> -->
              <q-input
                v-model="formPlayer.email"
                dense
                filled
                type="text"
                placeholder="Correo (opcional)"
              />
            </div>
          </div>
          <div>
            <q-btn label="Submit" type="submit" color="primary" />
            <q-btn
              label="Reset"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const emit = defineEmits(['savePlayer']);
const formPlayer = ref({
  name: '',
  phone: '',
  email: '',
});

const onSubmit = () => {
  emit('savePlayer', formPlayer.value);
};
</script>

<style scoped></style>
