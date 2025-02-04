 <script setup lang="ts">
import { ref, watch } from 'vue';
import type { Ref } from 'vue';
import { Team } from 'src/interfaces/team';
import BaseInput from 'src/components/BaseInput.vue';
import CropperImage from 'src/components/CropperImage.vue';
import { file_url } from 'src/boot/axios';
import { Image } from 'src/interfaces/image';
import { useImage } from 'src/composables/useImage';
// import { getData } from 'src/services/communServices';

const emit = defineEmits(['postTeam', 'editTeam', 'putTeam', 'onReset']);
const props = defineProps(['team']);
const formTeam: Ref<Team> = ref(props.team);
const { getImage } = useImage();

const onSubmit = () => {
  let formData = new FormData();
  formData.set('name', formTeam.value.name);
  if (formTeam.value.image) formData.set('image', formTeam.value.image);
  if (formTeam.value.id) {
    formData.set('id', formTeam.value.id.toString());
    emit('putTeam', formData, formTeam.value.id);
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

watch(
  () => props.team,
  async (newVal) => {
    formTeam.value = newVal;
    if (newVal.image) {
      let base64code = await getImage(newVal.image);
      img.value.src = `${base64code}`;
      // src.value = file_url + newVal.image;
      // img.value.src = file_url + newVal.image;
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
      class="bg-header-dark relative-position bg-new-dark"
      style="width: 80%; max-width: 900px; height: 65%"
    >
      <q-card-section class=" ">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <div class="row">
            <div class="col-12">
              <p class="text-h5 text-grey-7">
                <i class="fa-solid fa-user-plus q-mr-xs text-primary"></i>
                Crear Equipos
              </p>
              <div class="title">
                <p class="q-mb-none text-h6 text-grey-7">
                  <i
                    class="fa-solid fa-shield-halved q-mr-xs text-secondary"
                  ></i>
                  Imagen / Nombre de equipo
                </p>
              </div>
              <!-- <p class="q-px-md">Imagen de equipo</p> -->
              <CropperImage
                class="q-mt-sm"
                :circle="true"
                :img="img"
                @onCropper="onCropper"
              >
                <template v-slot:form>
                  <BaseInput
                    v-model="formTeam.name"
                    label=""
                    class="q-mt-md"
                    placeholder="Nombre de equipo"
                    type="text"
                    required
                  />
                  <div class="q-mt-sm">
                    <q-btn
                      unelevated
                      class="full-width"
                      :label="formTeam.id ? 'Guardar' : 'Crear'"
                      type="submit"
                      color="primary"
                    />
                    <q-btn
                      unelevated
                      label="Cancelar"
                      type="reset"
                      color="red-5"
                      outline
                      class="full-width q-mt-sm"
                      v-close-popup
                    />
                  </div>
                </template>
              </CropperImage>
            </div>
            <!-- <div class="col-6">
            <BaseInput label="Nombre" v-model="formTeam.name" type="text" required />

            <q-btn class="q-mx-xs" label="Submit" type="submit" color="primary" />
            <q-btn label="Limpiar" type="reset" color="red-5" flat class="q-mx-xs" />
          </div> -->
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
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
