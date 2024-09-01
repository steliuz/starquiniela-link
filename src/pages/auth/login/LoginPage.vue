<script setup lang="ts">
import formLogin from 'pages/auth/login/components/FormLogin.vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'stores/auth';
import { login } from 'src/services/auth/login';
import { dataLogin } from 'src/interfaces/DataLogin';
import { loginAuth } from 'src/interfaces/auth';
import SecureLS from 'secure-ls';
import Dialog2fa from 'src/components/Dialog-2fa.vue';
import { use2fa } from 'src/composables/use2fa';
import { handleMessages } from 'src/services/notifys';

let ls = new SecureLS({ isCompression: false, encodingType: 'aes' });
const router = useRouter();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let dataFormLogin: any = {};

const store = useAuthStore();

const {
  dialog2fa,
  secret,
  qrCodeUrl,
  handleOnComplete,
  closeDialog,
  showDialog,
} = use2fa();

const postLogin = async (value: loginAuth) => {
  dataFormLogin = value;
  store.handlebarLoading(true);

  try {
    await login(value)
      .then((data: dataLogin) => {
        store.userAuth(data);
        saveData(value);
        setTimeout(() => {
          router.push('/admin/dashboard');
        }, 800);
      })
      .catch((err) => {
        if (err.active2fa) {
          showDialog();
          return;
        }
      });
  } catch (error) {
    console.log(error);
  } finally {
    store.handlebarLoading(false);
  }
};

const saveData = (formLogin: loginAuth) => {
  let rmb = formLogin.remember;
  if (rmb == true) {
    ls.set('user-quiniela', {
      email: formLogin.email,
      password: formLogin.password,
      remember: formLogin.remember,
    });
  } else {
    formLogin = {
      email: '',
      password: '',
      remember: false,
    };
    ls.remove('user-quiniela');
  }
};

const onBack = () => {
  window.location.href = 'https://starquiniela.com/';
  return;
};

const submit2faCodeHandler = async (value: string | '') => {
  dataFormLogin.two_factor_code = value;
  try {
    await login(dataFormLogin).then((data: dataLogin) => {
      store.userAuth(data);
      saveData(dataFormLogin);
      setTimeout(() => {
        router.push('/admin/dashboard');
      }, 800);
    });
    return;
  } catch (err) {
    handleMessages({
      color: 'negative',
      icon: 'cancel',
      message: 'Error enviando el código 2FA',
    });
  }
};
</script>
<template>
  <q-btn
    unelevated
    color="white"
    style="position: absolute; top: 20px; right: 40px"
    @click="onBack()"
  >
    <q-icon color="primary" name="arrow_back" />
    <span class="text-primary q-px-sm">Regresar</span>
  </q-btn>
  <div class="video-background">
    <q-img
      class="parallax-img"
      src="~assets/parallax5.jpg"
      spinner-color="primary"
      spinner-size="82px"
      fit="cover"
      style="min-height: 100vh"
    />

    <div class="overlay"></div>
  </div>
  <div class="">
    <div class="flex flex-center full-width window-height">
      <formLogin @loginData="postLogin" />
    </div>
  </div>
  <Dialog2fa
    v-model="dialog2fa"
    :qrCodeUrl="qrCodeUrl"
    :secret="secret"
    @update:model-value="closeDialog"
    @onComplete="handleOnComplete"
    @submit2faCodeHandler="submit2faCodeHandler"
  />
</template>

<style scoped>
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(92, 0, 190, 0.6),
    rgba(92, 0, 190, 0.2)
  );
}
.video-background {
  min-height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: -1;
  overflow: hidden;
}
</style>
