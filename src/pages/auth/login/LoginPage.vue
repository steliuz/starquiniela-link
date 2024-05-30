<script setup lang="ts">
import formLogin from 'pages/auth/login/components/FormLogin.vue';
import videoComponent from 'pages/auth/login/components/VideoComponent.vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'stores/auth';
import { login } from 'src/services/auth/login';
import { dataLogin } from 'src/interfaces/DataLogin';
import { loginAuth } from 'src/interfaces/auth';
import SecureLS from 'secure-ls';

let ls = new SecureLS({ isCompression: false, encodingType: 'aes' });
const router = useRouter();

const store = useAuthStore();

const postLogin = async (value: loginAuth) => {
  store.handlebarLoading(true);

  try {
    await login(value).then((data: dataLogin) => {
      store.userAuth(data);
      saveData(value);
      setTimeout(() => {
        router.push('/admin/dashboard');
      }, 800);
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
    // let dataUser = JSON.parse(localStorage.getItem('user')) || [];
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
    <videoComponent />
    <div class="overlay"></div>
  </div>
  <div class="">
    <div class="flex flex-center full-width window-height">
      <formLogin @loginData="postLogin" />
    </div>
  </div>
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
  height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: -1;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.7);
}
</style>
