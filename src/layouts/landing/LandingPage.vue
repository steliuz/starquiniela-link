<script setup lang="ts">
import { ref } from 'vue';
import Banner from 'src/components/landing/Banner-Page.vue';
import Cards from 'src/components/landing/Cards-Section.vue';
import { useRouter } from 'vue-router';
import Vip from 'src/components/landing/Vip-Section.vue';
import Whatsapp from 'src/components/landing/Whatsapp-Buttom.vue';
import CardBanner from 'src/components/landing/Card-Banner.vue';
import GenerateSection from 'src/components/landing/Generate-Section.vue';

import { scroll } from 'quasar';
import whatsapp from 'src/components/landing/Whatsapp-Buttom.vue';
const { getScrollTarget, setScrollPosition } = scroll;

const valueScroll = ref(false);

const arrayButtons = [
  {
    icon: 'home',
    label: 'Inicio',
    class: 'btn-flat',
    idSection: 'top',
  },
  {
    icon: 'sports_soccer',
    label: 'Ventajas',
    class: 'btn-flat',
    idSection: 'advantages',
  },
  {
    icon: 'important_devices',
    label: '¿Cómo Jugar?',
    class: 'btn-flat',
    idSection: 'play',
  },
  {
    icon: 'monetization_on',
    label: 'Ingresos',
    class: 'btn-flat',
    idSection: 'income',
  },
];

const router = useRouter();

const goLogin = () => {
  router.push('/login');
};

const scrollToElement = (nameClass: string) => {
  let el = document.querySelector(`.${nameClass}`);
  let target = getScrollTarget(el);
  let offset = el.offsetTop - 80;
  let duration = 1000;
  setScrollPosition(target, offset, duration);
};

const onScroll = (position: number) => {
  position > 200 ? (valueScroll.value = true) : (valueScroll.value = false);
};
</script>
<template>
  <q-layout class="bg-white" v-scroll="onScroll">
    <!-- <NavBar /> -->

    <q-header
      class="fixed hg-nav"
      :elevated="valueScroll ? true : false"
      :class="valueScroll ? 'bg-nav' : 'transparent'"
    >
      <div class="row q-pt-xs">
        <div
          class="col-6 col-md-3 flex justify-start items-center q-pl-lg q-pt-xs"
        >
          <q-avatar class=""> </q-avatar>
          <p class="text-white pt-1 mb-0 pl-3 text-h6 text-weight-bolder gt-xs">
            StarQuiniela
          </p>
        </div>
        <div
          class="col-6 col-md-9 flex items-center justify-end q-pr-lg q-pt-xs"
        >
          <div class="gt-sm" v-for="(item, index) in arrayButtons" :key="index">
            <q-btn
              class="q-mx-xs btn-flat"
              size="md"
              flat
              :label="item.label"
              @click="scrollToElement(item.idSection)"
            />
            <span class="vl" v-if="index !== arrayButtons.length - 1"></span>
          </div>
          <q-btn
            class="q-mx-xs btn-login"
            size="md"
            label="Entrar"
            @click="goLogin()"
          />
        </div>
      </div>
    </q-header>
    <Banner />
    <Cards />
    
      <!-- <section id="seccion1" class="q-my-md">
        <CardBanner />
      </section> -->

      <section id="seccion2" class="q-my-md">
        <GenerateSection />
      </section>

    <Whatsapp />

    <Vip />
  </q-layout>
</template>

<style lang="scss" scoped>
.hg-nav {
  height: 68px;
}

.btn-login {
  background-color: #fff;
  color: $primary;
  padding: 0px 16px;
  border-radius: 30px;
  transition: all 0.3s ease-out;

  &:hover {
    background-color: $primary;
    color: $white;
    transform: scale(1.05);
    border: 1px solid $white;
  }
}

.btn-flat:hover {
  border: 1px solid $white;
  border-radius: 30px;
  background-color: $primary;
  color: $white;
}

.bg-nav {
  background-color: $primary;
  transition: background-color 0.5s ease;
}

.vl {
  border-left: 1px solid #fff;
  height: 10px;
}

.logoLogin {
  width: 25px;
  margin-right: 5px;
  height: auto;
}
</style>
