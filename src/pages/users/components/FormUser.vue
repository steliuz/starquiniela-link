<script setup lang="ts">
import { ref, watch, Ref, readonly } from 'vue';
import { User } from 'src/interfaces/user';
import BaseInput from 'src/components/BaseInput.vue';
import OptionGroup from 'src/components/OptionGroup.vue';

const emit = defineEmits(['postUser', 'editUser', 'putUser', 'onReset']);
const props = defineProps(['user']);
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
const formUser: Ref<User> = ref(props.user);
let tempUser = Object.assign({}, props.user);
const onSubmit = () => {
  if (formUser.value.id) {
    emit('putUser', formUser.value);
  } else {
    emit('postUser', formUser.value);
  }
};

const onReset = () => {
  formUser.value = tempUser;
  emit('onReset');
};

watch(
  () => props.user,
  (val) => {
    formUser.value = val;
    tempUser = Object.assign({}, val);
    if (val.email) {
      let email = val.email.split('@');
      formUser.value.emailUser = email[0];
      formUser.value.prefix = '@' + email[1];
    }
  }
);
</script>
<template>
  <q-dialog persistent>
    <q-card
      square
      class="bg-header-dark relative-position bg-new-dark"
      style="width: 80%; max-width: 900px; height: 85%"
    >
      <q-card-section class=" ">
        <q-form
          class="user_dialog_form full-width"
          @submit="onSubmit"
          @reset="onReset"
        >
          <div class="title">
            <p class="text-h5 text-white">
              <!-- <i class="fa-solid fa-user-plus q-mr-xs text-white"></i> -->
              Crear nuevo usuario
            </p>
          </div>
          <div class="title q-pl-sm">
            <p class="q-mb-none text-h6 text-white">
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
              required
            >
              <template v-slot:before>
                <q-checkbox
                  color="secondary"
                  left-label
                  v-model="type_disabled"
                />
              </template>
            </BaseInput>
          </div>
          <div>
            <BaseInput
              label="Dato de correo"
              v-model="formUser.emailUser"
              type="text"
              required
            >
              <template v-slot:after>
                <span class="hint_email">
                  {{ formUser.prefix }}
                </span>
              </template>
            </BaseInput>
          </div>
          <div class="title q-pl-sm">
            <p class="q-mb-none text-h6 text-white">
              <i class="fa-solid fa-user q-mr-xs text-secondary"></i>
              Datos
            </p>
          </div>
          <div>
            <BaseInput
              label="Nombre"
              v-model="formUser.name"
              type="text"
              required
            />
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
              :required="formUser.id ? false : true"
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
              v-model="formUser.password_confirmation"
              :type="!isPwd ? 'password' : 'text'"
              :required="formUser.id ? false : true"
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
          <div class="title q-pl-sm">
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
            </div>
          </div>
          <q-btn
            outline
            class="q-mx-xs"
            label="cancelar"
            color="negative"
            type="reset"
          />
          <q-btn
            class="q-mx-xs"
            :label="formUser.id ? 'Editar' : 'Registrar'"
            color="secondary"
            type="submit"
          />
        </q-form>
      </q-card-section>
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
