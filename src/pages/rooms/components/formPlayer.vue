<template>
  <q-dialog>
    <q-card square class="bg-header-dark relative-position bg-new-dark">
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
                :dark="$q.dark.isActive"
                filled
                type="text"
                placeholder="Nombre"
                required
                :rules="[(val) => val.length >= 3]"
              />
            </div>
            <div class="col-6 q-pa-xs">
              <!-- <p class="label-input">
          Teléfono
        </p> -->
              <q-input
                v-model="formPlayer.tel"
                dense
                :dark="$q.dark.isActive"
                filled
                type="tel"
                placeholder="Teléfono"
                required
                mask="##############"
                :prefix="codeCountry.value"
                unmasked-value
                :rules="[(val) => val.length >= 8]"
              >
                <template v-slot:before>
                  <q-select
                    filled
                    dense
                    behavior="menu"
                    v-model="codeCountry"
                    :options="options"
                    stack-label
                    color="secondary"
                  >
                    <template v-slot:selected-item="scope">
                      <img
                        v-if="scope.opt.value == '+52'"
                        src="~assets/flats/mexico.png"
                        alt="mx"
                      />
                      <img
                        v-else-if="scope.opt.value == '+1'"
                        src="~assets/flats/usa.png"
                        alt="usa"
                      />
                      <img v-else src="~assets/flats/venezuela.png" alt="vnz" />
                    </template>
                  </q-select>
                </template>
              </q-input>
            </div>
          </div>
          <div class="row">
            <div class="col-12 q-pa-xs">
              <p class="label-input">
                Correo
                <span class="text-caption text-negative">(opcional)</span>
              </p>
              <q-input
                v-model="formPlayer.email"
                dense
                :dark="$q.dark.isActive"
                filled
                type="text"
              />
            </div>
          </div>
          <div>
            <q-btn
              label="Cancelar"
              type="reset"
              color="negative"
              flat
              class="q-my-xs full-width"
              v-close-popup
            />
            <q-btn
              class="q-my-xs full-width"
              label="Enviar"
              type="submit"
              color="secondary"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
const emit = defineEmits(['savePlayer']);
const props = defineProps(['playerForm']);
const formPlayer = ref(props.playerForm);

const onSubmit = () => {
  formPlayer.value.phone = codeCountry.value.value + formPlayer.value.tel;
  emit('savePlayer', formPlayer.value);
};
const codeCountry = ref({
  label: 'Mexico',
  value: '+52',
  icon: 'mail',
});
const options = [
  {
    label: 'Mexico',
    value: '+52',
    icon: 'mail',
    src: '~assets/flats/mexico.png',
  },
  {
    label: 'Venezuela',
    value: '+58',
    icon: 'bluetooth',
    src: '~assets/flats/venezuela.png',
  },
  {
    label: 'USA',
    value: '+1',
    icon: 'bluetooth',
    src: '~assets/flats/usa.png',
  },
];

watch(
  () => props.playerForm,
  (newVal) => {
    formPlayer.value = newVal;
  }
);
</script>

<style scoped></style>
