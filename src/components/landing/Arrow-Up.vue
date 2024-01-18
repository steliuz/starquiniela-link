<template>
  <div>
    <a class="btn-arrow" @click="scrollToTop" v-if="showArrow" target="_blank">
      <img class="arrow-icon" src="/src/assets/icons/arrow-up.png" />
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showArrow: false,
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      // Calcula el porcentaje de desplazamiento
      const scrollPercentage =
        (document.documentElement.scrollTop /
          (document.documentElement.scrollHeight -
            document.documentElement.clientHeight)) *
        100;

      // Muestra la flecha cuando el usuario ha llegado al 80% del final de la página
      this.showArrow = scrollPercentage >= 80;
    },
    scrollToTop() {
      // Desplázate al principio de la página
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
  },
};
</script>

<style scope>
.arrow-icon {
  width: 50px;
  height: 50px;
}
.btn-arrow {
  position: fixed;
  z-index: 9999;
  bottom: 14%;
  right: 3.5%;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-whatsapp:hover {
  width: 175px;
  color: #000;
  text-align: right;
  border-radius: 30px;
  background-color: #5c00bf;
  border: 2px solid #fff;
}

.btn-whatsapp img {
  width: 40px;
  height: auto;
  transition: all 0.5s ease;
}

.btn-whatsapp:hover img {
  transform: translate(-45%, -22%);
  width: 30px;
  transition: all 0.3s ease;
}

.btn-whatsapp:hover::after {
  content: 'Contáctanos';
  position: absolute;
  top: 8px;
  right: 0px;
  font-size: 1.2rem;
  font-weight: bold;
  color: #fff;
  transform: translate(-45%);
  margin-top: -25px;
  transition: all 0.3s ease;
}
</style>
