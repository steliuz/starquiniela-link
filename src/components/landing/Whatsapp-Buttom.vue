<template>
  <div>
    <a
      class="btn-whatsapp"
      href="https://api.whatsapp.com/send?phone=+528184624203&text=Saludos,%20quisiera%20obtener%20m%C3%A1s%20informaci%C3%B3n%20de%20como%20ser%20un%20organizador%20"
      target="_blank"
    >
      <img class="whatsapp-icon" src="~assets/whatsapp.png" />
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
.btn-whatsapp {
  position: fixed;
  width: 55px;
  height: 55px;
  line-height: 85px;
  border-radius: 50%;
  z-index: 9999;
  bottom: 2%;
  right: 3%;
  text-align: center;
  background-color: #fff;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4) !important;
  transition: all 0.3s ease;
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
