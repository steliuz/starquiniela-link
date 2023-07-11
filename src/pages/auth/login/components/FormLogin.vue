<script setup lang="ts">
import { ref, onMounted } from 'vue';
import SecureLS from 'secure-ls';
import type { Ref } from 'vue';
import logoLogin from 'pages/auth/login/components/LogoComponent.vue';
import { loginAuth } from 'src/interfaces/auth';

let ls = new SecureLS({ isCompression: false, encodingType: 'aes' });
const emit = defineEmits(['loginData']);

const isPwd = ref(false);

const formLogin: Ref<loginAuth> = ref({
  email: 'admin@admin.com',
  password: 'asdasd',
  remember: false,
});

const onReset = () => {
  console.log('onReset');
};

const onSubmit = () => {
  let user = {
    email: formLogin.value.email,
    password: formLogin.value.password,
  };
  emit('loginData', user);
};

const getDataLocal = () => {
  let form = ls.get('user-quiniela');
  if (form) {
    formLogin.value = form;
  }
};

onMounted(() => {
  getDataLocal();
});
</script>
<template>
  <logoLogin class="positionLogo" />
  <div class="form_login_social z-max flex q-gutter-lg">
    <a href="#" class="text-white">
      <i class="fa-brands fa-square-facebook fa-2x"></i>
    </a>
    <a href="#" class="text-white">
      <i class="fa-brands fa-instagram fa-2x"></i>
    </a>
  </div>
  <div class="flex column flex-center">
    <q-card class="my-card form_login_card_glass" flat style="width: 80%">
      <q-card-section>
        <div class="text-center full-width">
          <p class="text-h5 q-mb-0 text-white">Inicia sesión</p>
        </div>
        <q-form @submit="onSubmit" @reset="onReset" class="text-white">
          <div>
            <div class="row">
              <div class="col-12 q-pa-xs">
                <p class="label-input q-mb-none">Correo</p>
                <q-input
                  v-model="formLogin.email"
                  dark
                  color="secondary"
                  filled
                  type="text"
                />
              </div>
              <div class="col-12 q-pa-xs">
                <p class="label-input q-mb-none">Contraseña</p>
                <q-input
                  v-model="formLogin.password"
                  dark
                  color="secondary"
                  filled
                  :type="!isPwd ? 'password' : 'text'"
                >
                  <template v-slot:error>
                    <span>
                      <q-icon
                        class="q-mr-xs"
                        size="xs"
                        color="negative"
                        name="cancel"
                      />
                      6+ Caracteres
                    </span>
                  </template>
                  <template v-slot:append>
                    <q-icon
                      class="cursor-pointer"
                      :name="!isPwd ? 'visibility' : 'visibility_off'"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>
              </div>
              <div>
                <q-checkbox
                  dark
                  v-model="formLogin.remember"
                  color="secondary"
                  label="Recuérdame"
                />
              </div>
              <div class="col-12 q-pa-xs">
                <q-btn
                  class="full-width"
                  label="ENTRAR"
                  type="submit"
                  color="primary"
                />
              </div>
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
    <p class="text-white form_login_no_cuenta q-my-sm cursor-pointer">
      No tienes una cuenta?
    </p>
  </div>
</template>

<style scoped>
.form_login_card_glass {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}

.form_login_social {
  position: absolute;
  right: 40px;
  bottom: 20px;
  color: #fff;
}

.positionLogo {
  position: absolute;
  left: 0;
  top: 0;
}
</style>
