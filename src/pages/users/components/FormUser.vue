<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';

import { user } from 'src/interfaces/user';
import BaseInput from 'src/components/BaseInput.vue';
import OptionGroup from 'src/components/OptionGroup.vue';

const emit = defineEmits(['postUser', 'editUser']);

const type_disabled: Ref<boolean> = ref(true);

const isPwd = ref(false);

const optionsData = [
  {
    label: 'Manager',
    value: 1,
  },
  {
    label: 'Reseller',
    value: 2,
  },
  {
    label: 'Organizer',
    value: 3,
  },
];

const formUser: Ref<user> = ref({
  prefix: '@gmail.com',
  email: 'jesus',
  name: 'jesus rosales',
  password: 'asdasd',
  confirm_password: 'asdasd',
  phone: '04145342922',
  role_id: 3,
  subscribe_id: null,
  referral_id: '',
});

const onReset = () => {
  console.log('onReset');
};

const onSubmit = () => {
  console.log('onSubmit: ');
  console.log('formUser.value: ', formUser.value);
  emit('postUser', formUser.value);
};
</script>
<template>
  <q-dialog persistent>
    <q-card
      square
      class="relative-position"
      style="width: 80%; max-width: 900px"
    >
      <q-card-section style="max-height: 60vh" class="scroll q-mb-md">
        <q-form @reset="onReset" class="user_dialog_form full-width">
          <div class="title">
            <p class="text-h5 text-grey-7">
              <i class="fa-solid fa-user-plus q-mr-xs text-primary"></i>
              Crear nuevo usuario
            </p>
          </div>
          <div class="title">
            <p class="q-mb-none text-h6 text-grey-7">
              <i class="fa-solid fa-envelope q-mr-xs text-secondary"></i>
              Correo
            </p>
          </div>
          <div>
            <BaseInput
              label="Subfijo correo"
              :disable="type_disabled"
              v-model="formUser.prefix"
              hint="Crea un subfijo para tus correos"
              bottom-slots
            >
              <template v-slot:before>
                <q-checkbox left-label v-model="type_disabled" />
              </template>
            </BaseInput>
          </div>
          <div>
            <BaseInput
              label="Dato de correo"
              v-model="formUser.email"
              type="email"
            >
              <template v-slot:after>
                <span class="hint_email">
                  {{ formUser.prefix }}
                </span>
              </template>
            </BaseInput>
          </div>
          <div class="title">
            <p class="q-mb-none text-h6 text-grey-7">
              <i class="fa-solid fa-user q-mr-xs text-secondary"></i>
              Datos
            </p>
          </div>
          <div>
            <BaseInput label="Nombre" v-model="formUser.name" type="text" />
          </div>
          <div>
            <BaseInput label="Teléfono" v-model="formUser.phone" type="text">
              <template v-slot:span>
                <span class="text-caption text-secondary">(opcional)</span>
              </template>
            </BaseInput>
          </div>
          <div>
            <BaseInput
              label="Contraseña"
              v-model="formUser.password"
              :type="!isPwd ? 'password' : 'text'"
            >
              <template v-slot:append>
                <q-icon
                  class="cursor-pointer"
                  :name="!isPwd ? 'visibility' : 'visibility_off'"
                  @click="isPwd = !isPwd"
                />
              </template>
            </BaseInput>
          </div>
          <div>
            <BaseInput
              label="Repetir Contraseña"
              v-model="formUser.confirm_password"
              :type="!isPwd ? 'password' : 'text'"
            >
              <template v-slot:append>
                <q-icon
                  class="cursor-pointer"
                  :name="!isPwd ? 'visibility' : 'visibility_off'"
                  @click="isPwd = !isPwd"
                />
              </template>
            </BaseInput>
          </div>
          <div class="title">
            <p class="q-mb-none text-h6">
              <i class="fa-solid fa-user-tag q-mr-xs text-secondary"></i>
              Rol del usuario
            </p>
            <div class="q-gutter-sm">
              <OptionGroup
                v-model="formUser.role_id"
                :optionsData="optionsData"
                inline
              ></OptionGroup>
              <!-- <q-radio
                color="primary"
                :val="1"
                label="Manager"
              />
              <q-radio
                color="secondary"
                v-model="formUser.role_id"
                :val="2"
                label="Reseller"
              />
              <q-radio
                color="negative"
                v-model="formUser.role_id"
                :val="3"
                label="Organizer"
              />-->
            </div>
          </div>
        </q-form>
      </q-card-section>
      <q-card-actions class="user_form_buttons">
        <q-btn
          class="q-mx-xs"
          flat
          label="cancelar"
          color="red-5"
          v-close-popup
        />
        <q-btn
          @click="onSubmit"
          class="q-mx-xs"
          label="Registrar"
          color="primary"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped>
.user_dialog_form {
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

.user_form_buttons {
  display: grid;
  grid-template-columns: 50% 50%;
}
@media screen and (max-width: 1023.99px) {
  .user_dialog_form {
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
  .user_dialog_form {
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
