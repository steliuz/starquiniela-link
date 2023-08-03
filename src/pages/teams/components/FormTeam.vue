<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Ref } from 'vue';
import { Team } from 'src/interfaces/team';
import BaseInput from 'src/components/BaseInput.vue';
import CropperImage from 'src/components/CropperImage.vue';
import { file_url } from 'src/boot/axios';
import { Image } from 'src/interfaces/image';
// import { getData } from 'src/services/communServices';

const emit = defineEmits(['postTeam', 'editTeam', 'putTeam', 'onReset']);
const props = defineProps(['team']);
const formTeam: Ref<Team> = ref(props.team);
const onSubmit = () => {
  let formData = new FormData();
  formData.set('name', formTeam.value.name);
  if (formTeam.value.image) formData.set('image', formTeam.value.image);
  if (formTeam.value.id) {
    formData.set('id', formTeam.value.id.toString());
    emit('putTeam', formData);
  } else {
    emit('postTeam', formData);
  }
};

const img: Ref<Image> = ref({
  src: formTeam.value.image ? file_url + formTeam.value.image : '',
  type: 'image/jpg',
});

const onCropper = (crop: string) => {
  formTeam.value.image = crop;
};

const onReset = () => {
  img.value = {
    src: '',
    type: 'image/jpg',
  };
  emit('onReset');
};

const fecthData: (url: string) => void = async (url) => {
  await fetch(url)
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
  () => props.team,
  (newVal) => {
    formTeam.value = newVal;
    if (newVal.image) {
      fecthData(file_url + newVal.image);
      // src.value = file_url + newVal.image;
      // img.value.src = file_url + newVal.image;
    } else {
      img.value.src = '';
    }
  }
);
</script>
<template>
  <q-card square class="relative-position" style="width: 80%; max-width: 900px">
    <q-card-section style="max-height: 60vh" class="scroll q-mb-md">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <p>Imagen</p>
        <CropperImage
          :circle="true"
          :img="img"
          @onCropper="onCropper"
        ></CropperImage>
        <BaseInput
          label="Nombre"
          v-model="formTeam.name"
          type="text"
          required
        />
        <div>
          <q-btn class="q-mx-xs" label="Submit" type="submit" color="primary" />
          <q-btn
            label="Limpiar"
            type="reset"
            color="red-5"
            flat
            class="q-mx-xs"
          />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<style lang="scss" scoped>
.team_dialog_form {
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

.team_form_buttons {
  display: grid;
  grid-template-columns: 50% 50%;
}
@media screen and (max-width: 1023.99px) {
  .team_dialog_form {
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
  .team_dialog_form {
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
