<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Ref } from 'vue';
import { Advertise } from 'src/interfaces/advertise';
import BaseInput from 'src/components/BaseInput.vue';
import CropperImage from 'src/components/CropperImage.vue';
import { file_url } from 'src/boot/axios';
import { Image } from 'src/interfaces/image';

const emit = defineEmits([
  'postAdvertise',
  'editAdvertise',
  'putAdvertise',
  'onReset',
]);
const props = defineProps(['advertise']);
const formAdvertise: Ref<Advertise> = ref(props.advertise);
const onSubmit = () => {
  let formData = new FormData();
  formData.set('name', formAdvertise.value.name);
  formData.set('client', formAdvertise.value.client);
  if (formAdvertise.value.image)
    formData.set('image', formAdvertise.value.image);
  if (formAdvertise.value.id) {
    formData.set('id', formAdvertise.value.id.toString());
    emit('putAdvertise', formData);
  } else {
    emit('postAdvertise', formData);
  }
};

const img: Ref<Image> = ref({
  src: formAdvertise.value.image ? file_url + formAdvertise.value.image : '',
  type: 'image/jpg',
});

const onCropper = (crop: string) => {
  formAdvertise.value.image = crop;
};

const onReset = () => {
  img.value = {
    src: '',
    type: 'image/jpg',
  };
  emit('onReset');
};

const fecthData: (url: string) => void = (url) => {
  fetch(url)
    .then((res) => res.blob())
    .then((blob) => {
      // Read the Blob as DataURL using the FileReader API
      const reader = new FileReader();
      reader.onloadend = () => {
        img.value.src = reader.result;
      };
      reader.readAsDataURL(blob);
    });
};

watch(
  () => props.advertise,
  (newVal) => {
    formAdvertise.value = newVal;
    if (newVal.image) {
      fecthData(file_url + newVal.image);
    } else {
      img.value.src = '';
    }
  }
);
</script>
<template>
  <q-dialog persistent>
    <q-card
      square
      class="relative-position"
      style="width: 80%; max-width: 900px; height: 65%"
    >
      <q-card-section class=" ">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <p>Imagen</p>
          <CropperImage class="q-mt-sm" :img="img" @onCropper="onCropper">
            <template v-slot:form>
              <BaseInput
                label="Nombre"
                v-model="formAdvertise.name"
                type="text"
                required
              />
              <BaseInput
                label="Cliente"
                v-model="formAdvertise.client"
                type="text"
                required
              />
              <div class="q-mt-sm">
                <q-btn
                  class="q-mx-xs"
                  label="Submit"
                  type="submit"
                  color="primary"
                />
                <q-btn
                  label="Cancelar"
                  type="reset"
                  color="red-5"
                  flat
                  class="q-mx-xs"
                />
              </div>
            </template>
          </CropperImage>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped>
.advertise_dialog_form {
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, minmax(160px, 400px));
  grid-auto-flow: row dense;
  grid-gap: 15px;
  justify-content: center;

  & > .title {
    grid-column: span 2;
  }
}

.advertise_form_buttons {
  display: grid;
  grid-template-columns: 50% 50%;
}

@media screen and (max-width: 1023.99px) {
  .advertise_dialog_form {
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
  .advertise_dialog_form {
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
