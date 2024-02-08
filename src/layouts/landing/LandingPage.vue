<script setup lang="ts">
import { ref } from 'vue';
import Banner from 'src/components/landing/Banner-Page.vue';
import Cards from 'src/components/landing/Cards-Section.vue';
import { useRouter } from 'vue-router';
import Vip from 'src/components/landing/Vip-Section.vue';
import Whatsapp from 'src/components/landing/Whatsapp-Buttom.vue';
import CardBanner from 'src/components/landing/Card-Banner.vue';
import CarouselSection from 'src/components/landing/Carousel-Section.vue';
import CardOrganizer from 'src/components/landing/Card-Banner-2.vue';
import GenerateSection from 'src/components/landing/Generate-section.vue';
import StepsSection from 'src/components/landing/Steps-Section.vue';
import FooterSection from 'src/components/landing/Footer-Section.vue';
import ArrowUp from 'src/components/landing/Arrow-Up.vue';
import FormSection from 'src/components/landing/Form-Section.vue';
import Plans from 'src/components/landing/Plans-Section.vue';
import PlansWeb from 'src/components/landing/Plans-Section-Web.vue';

// import { scroll } from 'quasar';

const valueScroll = ref(false);

const arrayButtons = [
  {
    icon: 'home',
    label: 'Inicio',
    class: 'btn-flat',
    idSection: 'top',
  },
  // {
  //   icon: 'sports_soccer',
  //   label: 'Ventajas',
  //   class: 'btn-flat',
  //   idSection: 'advantages',
  // },
  {
    icon: 'important_devices',
    label: '¿Cómo Jugar?',
    class: 'btn-flat',
    idSection: 'steps',
  },
  {
    icon: 'monetization_on',
    label: 'Reglas',
    class: 'btn-flat',
    idSection: 'rules',
  },
  {
    icon: 'monetization_on',
    label: 'PLANES',
    class: 'btn-flat',
    idSection: 'planes',
  },
  {
    icon: 'monetization_on',
    label: 'CONTACTO',
    class: 'btn-flat',
    idSection: 'contacto',
  },
];

const router = useRouter();

const goLogin = () => {
  router.push('/login');
};
const scrollToElement = (idSection: string) => {
  const targetSection = document.getElementById(idSection);
  const offset = 50;

  if (targetSection) {
    window.scrollTo({
      top: targetSection.offsetTop - offset,
      behavior: 'smooth',
    });
  }
};

const onScroll = (position: number) => {
  position > 200 ? (valueScroll.value = true) : (valueScroll.value = false);
};
</script>
<template>
  <q-layout class="bg-white" id="top" v-scroll="onScroll">
    <q-header
      class="hg-nav"
      :elevated="valueScroll ? true : false"
      :class="valueScroll ? 'bg-nav' : 'transparent'"
    >
      <div class="row q-pt-xs">
        <div
          class="col-6 col-md-3 flex justify-start items-center q-pl-lg q-pt-xs"
        >
          <q-avatar class=""
            ><img src="~assets/logo/logo-white.png" alt="" />
          </q-avatar>
          <p class="text-white q-mb-none pl-3 text-h6 text-weight-bolder gt-xs">
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
            unelevated
            square
            @click="goLogin()"
          />
        </div>
      </div>
    </q-header>

    <Banner />
    <Cards class="position-cards-banner" />
    <ArrowUp />

    <section id="seccion1" class="q-my-md q-pb-lg">
      <CardBanner />
    </section>

    <section id="seccion2" class="q-mt-lg">
      <StepsSection id="steps" />
    </section>

    <section id="seccion6" class="">
      <GenerateSection />
    </section>

    <section id="rules" class="">
      <Vip />
    </section>

    <section id="planes" class="">
      <Plans />
    </section>

    <section id="rules" class="">
      <PlansWeb />
    </section>

    <!-- <section id="seccion2" class="q-my-md">
      <CarouselSection />
    </section> -->

    <section id="seccion3" class="q-my-lg q-pb-lg">
      <CardOrganizer />
    </section>

    <section class="q-my-lg q-pb-lg">
      <FormSection />
    </section>

    <section id="contacto" class="">
      <FooterSection />
    </section>

    <Whatsapp />
  </q-layout>
</template>

<style lang="scss" scope>
.hg-nav {
  height: 68px;
  position: fixed !important;
}

.btn-login {
  background-color: $secondary;
  color: #000;
  padding: 0 16px;
  border-radius: 0px;
  transition: all 0.3s ease-out;

  &:hover {
    background-color: $negative;
    color: $white;
    transform: scale(1.05);
  }
}

.btn-flat {
  color: $white;
  font-weight: 400;
}
.btn-flat:hover {
  border-bottom: 1px solid $white;
  color: $white;
  font-weight: 700;
  border-radius: 0%;
  background-color: transparent !important;
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

.position-cards-banner {
  margin-top: -300px;

  @media (max-width: 600px) {
    margin-top: 20px;
  }
}
</style>
