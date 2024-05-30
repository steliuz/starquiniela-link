<script setup lang="ts">
import { ref, watch, Ref } from 'vue';
import { User } from 'src/interfaces/user';
import BaseInput from 'src/components/BaseInput.vue';
import OptionGroup from 'src/components/OptionGroup.vue';

const emit = defineEmits(['postUser', 'editUser', 'putUser', 'onReset']);
const props = defineProps(['user', 'admin']);
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
const onSubmit = () => {
  if (formUser.value.id) {
    emit('putUser', formUser.value);
  } else {
    emit('postUser', formUser.value);
  }
};

watch(
  () => props.user,
  (val) => {
    formUser.value = val;
    // if (val.email) {
    //   let email = val.email.split('@');
    //   formUser.value.emailUser = email[0];
    //   formUser.value.prefix = '@' + email[1];
    // }
  }
);
</script>
<template>
  <q-dialog persistent>
    <q-card
      square
      class="bg-header-dark relative-position bg-new-dark"
      style="width: 100%; max-width: 900px; height: 90%"
    >
      <q-card-section class=" ">
        <q-form
          class="user_dialog_form full-width"
          @submit="onSubmit"
          autocomplete="off"
        >
          <div class="title">
            <p
              class="text-h5"
              :class="$q.dark.isActive ? 'text-white' : 'text-dark'"
            >
              {{ formUser.id ? 'Actualizar usuario' : 'Crear nuevo usuario' }}
            </p>
          </div>
          <div class="title q-pl-sm">
            <p
              class="q-mb-none text-h6"
              :class="$q.dark.isActive ? 'text-white' : 'text-dark'"
            >
              <i
                class="fa-solid fa-user q-mr-xs"
                :class="$q.dark.isActive ? 'text-secondary' : 'text-primary'"
              ></i>
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
            <BaseInput
              label="Correo electrónico"
              v-model="formUser.email"
              type="email"
              required
            >
            </BaseInput>
          </div>
          <div>
            <BaseInput label="Teléfono" v-model="formUser.phone" type="text">
              <template v-slot:span>
                <span
                  class="text-caption"
                  :class="$q.dark.isActive ? 'text-secondary' : 'text-primary'"
                  >(opcional)</span
                >
              </template>
            </BaseInput>
          </div>
          <div></div>
          <div>
            <BaseInput
              label="Contraseña"
              v-model="formUser.password"
              :type="!isPwd ? 'password' : 'text'"
              :required="formUser.id ? false : true"
              autocomplete="off"
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
          <div class="title q-pl-sm" v-if="admin">
            <p class="q-mb-none text-h6">
              <i
                class="fa-solid fa-user-tag q-mr-xs"
                :class="$q.dark.isActive ? 'text-secondary' : 'text-primary'"
              ></i>
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
            type="button"
            v-close-popup
          />
          <q-btn
            class="q-mx-xs"
            :label="formUser.id ? 'Actualizar' : 'Registrar'"
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
