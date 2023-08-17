<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Ref } from 'vue';
import { Room } from 'src/interfaces/room';
import BaseInput from 'src/components/BaseInput.vue';
import OptionGroup from 'src/components/OptionGroup.vue';

const emit = defineEmits(['postRoom', 'editUser', 'putRoom']);
const props = defineProps(['room']);

const formRooms: Ref<Room> = ref(props.room);

const optionsRules = ref([
  { label: 'Normal', value: 1 },
  { label: 'Avanzada', value: 2 },
  { label: 'LEV', value: 3 },
]);
const optionsCategory = ref([
  { label: 'Tabla General', value: 1 },
  { label: 'Perzonalizado 1', value: 2 },
  { label: 'Perzonalizado 2', value: 3 },
]);
// const optionsType = ref(['Global', 'Fases']);

const onSubmit = () => {
  if (formRooms.value.id) {
    emit('putRoom', formRooms.value);
  } else {
    emit('postRoom', formRooms.value);
  }
};

watch(
  () => props.room,
  (val) => {
    formRooms.value = val;
  }
);
</script>
<template>
  <q-dialog persistent>
    <q-card
      square
      class="relative-position q-pa-lg"
      style="width: 80%; max-width: 900px; height: auto"
    >
      <q-card-section class=" ">
        <q-form class="room_dialog_form full-width" @submit="onSubmit">
          <div class="title">
            <p class="text-h5 text-grey-7">
              <i class="fa-solid fa-user-plus q-mr-xs text-primary"></i>
              Crear nueva quiniela
            </p>
          </div>
          <div class="title">
            <p class="q-mb-none text-h6 text-grey-7">
              <i class="fa-regular fa-futbol q-mr-xs text-secondary"></i>
              Datos
            </p>
          </div>
          <div class="mid-width">
            <BaseInput label="Nombre" v-model="formRooms.name" required>
            </BaseInput>
          </div>
          <div class="title">
            <p class="q-mb-none text-h6 text-grey-7">
              <i class="fa-solid fa-gear q-mr-xs text-secondary"></i>
              Reglas
            </p>
          </div>
          <div>
            <p class="label-input">Regla de puntos</p>
            <OptionGroup
              v-model="formRooms.type"
              :optionsData="optionsRules"
            ></OptionGroup>
            <!-- <q-select
              dense
              filled
              v-model="formRooms.type"
              :options="optionsRules"
              behavior="menu"
            /> -->
          </div>
          <div>
            <p class="label-input">Categoría</p>
            <OptionGroup
              v-model="formRooms.category_room_id"
              :optionsData="optionsCategory"
            ></OptionGroup>
            <!-- <q-select
              dense
              filled
              v-model="formRooms.category_room_id"
              :options="optionsCategory"
              behavior="menu"
              map-options
            /> -->
          </div>
          <!-- <div class="">
            <p class="label-input">Tipo de quinielas</p>
            <q-select
              dense
              filled
              v-model="formRooms.type"
              :options="optionsType"
              behavior="menu"
            />
          </div> -->
          <!-- <div class="">
            <BaseInput label="Precio" v-model="formRooms.price" required>
            </BaseInput>
          </div> -->
          <div class="user_form_buttons q-mt-md">
            <q-btn
              class="q-mx-xs"
              flat
              label="cancelar"
              color="red-5"
              v-close-popup
            />
            <q-btn
              class="q-mx-xs"
              :label="formRooms.id ? 'Editar' : 'Registrar'"
              color="secondary"
              type="submit"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped>
.room_dialog_form {
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, minmax(160px, 400px));
  grid-auto-flow: row dense;
  grid-gap: 15px;
  justify-content: center;

  & > .mid-width {
    max-width: 50%;
  }

  & > div:nth-of-type(3),
  & > div:nth-of-type(9) {
    grid-column: span 2;
  }

  & > .title {
    grid-column: span 2;
  }
}

.user_form_buttons {
  display: grid;
  grid-template-columns: 50% 50%;
}

@media screen and (max-width: 1023.99px) {
  .room_dialog_form {
    display: grid;
    grid-template-columns: repeat(2, minmax(160px, 400px));
    grid-auto-flow: row dense;
    grid-gap: 15px;
    justify-content: center;

    & > .title {
      grid-column: span 2;
    }
  }
}

@media screen and (max-width: 700px) {
  .room_dialog_form {
    display: grid;
    grid-template-columns: 100%;
    grid-auto-flow: row dense;
    grid-gap: 15px;
    justify-content: center;

    & > .title {
      grid-column: 1 / -1;
    }
  }
}
</style>
