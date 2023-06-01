<script setup lang="ts">
import { ref } from 'vue';
import formLogin from 'pages/auth/login/components/FormLogin.vue';
import videoComponent from 'pages/auth/login/components/VideoComponent.vue';
import { useRouter } from 'vue-router';
import { useUserStore } from 'stores/user';
import { login } from 'src/services/auth/login';
import { dataLogin } from 'src/interfaces/DataLogin';

const router = useRouter();
// const userFlash = ref('');
const store = useUserStore();

const postLogin = async (value: any) => {
  console.log('value: ', value);
  store.handlebarLoading(store.barLoading);

  try {
    await login(value).then((data: dataLogin) => {
      store.userAuth(data.user_data);

      setTimeout(() => {
        router.push('/dashboard');
      }, 800);
    });
  } catch (error) {
    console.log(error);
  } finally {
    store.handlebarLoading(store.barLoading);
  }
};
</script>
<template>
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
