import { copyToClipboard } from 'quasar';
<template>
  <section class="q-mt-md q-mx-lg" id="top">
    <div class="container">

    <div class="row">
      <div
        class="col-12 col-sm-6 col-md-3 flex justify-center items-start"
        v-for="(item, index) in arrayAdvantages"
        :key="index"
      >
        <div class="card q-mx-lg" >
          <div class="flex justify-center imgBox">
            <i
              class="fa-solid fa-4x q-my-sm"
              :class="
                $q.dark.isActive
                  ? ` ${item.icon}`
                  : ` ${item.icon}`
              "
            >
            </i>
          </div>
          <hr />
          <div class="content">
            <p class="text-h5">{{ item.title }}</p>
            {{ item.description }}
          </div>
        </div>
      </div>
    </div>
    </div>

    
   
  </section>
</template>

<script setup>
const arrayAdvantages = [
  {
    title: 'Fácil de usar',
    icon: 'fa-mobile-screen-button',
    description: 'Aplicación web y móvil en linea 24/7',
  },
  {
    title: 'Seguridad',
    icon: 'fa-user-shield',
    description:
      'Ya puedes olvidarte de las tediosas capturas, STARQUINIELA organiza todo por ti',
  },
  {
    title: 'Ranking',
    icon: 'fa-ranking-star',
    description:
      'Ya no te preocupes más por la suma con nuestra tabla tabla de ranking',
  },
  {
    title: 'Ahorra dinero',
    icon: 'fa-vault',
    description: 'Evita los costos adicionales de impresión',
  },
];
</script>

<style lang="scss" scoped>


.m-section {
  margin-top: 40px;
  padding-bottom: 40px;
}

.my-card {
  height: 110px;
  width: 75%;
  border: 5px solid $grey-11;
  border-radius: 10px;
  /* Añadir borde y sombra */
  border: 1px solid $grey-11;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.box-cards {
  display: grid;
  grid-template-columns: repeat(4, 0.25fr);
}

.card-info {
  padding: 20px;
  max-width: 230px;
  height: 270px;
  /* Añadir bordes y sombra a .card-info */
  border: 1px solid $grey-11;
  border-radius: 10px;
 box-shadow: rgba(0, 0, 0, 0.4) 0px 30px 90px;
}

.icon-size {
  font-size: 2.8rem;
}

.font-card {
  font-size: 1.1rem;
}

.padding-container {
  padding-right: 34px;
  padding-left: 34px;
}

.font-title {
  font-size: 5rem;
}








.titleCard h1{
  font-family: "Poppins", sans-serif;
  color: #03a9;
}

/* .titleCard2 h1{
  font-family: "Poppins", sans-serif;
  top: 20px;
  bottom: 20px;
  color: #03a9;
} */
.container {
  margin-top: 20px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 100px 50px;
  padding: 100px 50px;
}

.container .card {
   box-sizing: border-box;
  width: 280px;
  height: 284px;
  background: rgba(217, 217, 217, 0.58);
  border: 1px solid white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  backdrop-filter: blur(6px);
  border-radius: 17px;
  text-align: center;
  cursor: pointer;
  transition: all 0.5s;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  font-weight: bolder;
  color: black;
}

.card:hover {
  border: 1px solid $primary;
  transform: scale(1.05);
  opacity: 0.9;
}

.card:active {
  transform: scale(0.95) rotateZ(1.7deg);
}



.container .card .imgBox {
  position: absolute;
  top: 60px;
  width: 70px;
  height: 70px;
  transition: 0.5s;
  overflow: hidden;
}



.container .card .imgBox img {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  object-fit: cover;
}

.container .card .content {
  position: absolute;
  top: 140px;
  width: 100%;
  padding: 0 30px;
  height: 50px;
  text-align: center;
  transition: 0.5s;
}



.container .card:hover .imgBox {
  scale: 1.1;
  color:$primary;
}



.container .card .content h2 {
  font-size: 3.5em;
  font-weight: 700;
  color: var(--clr);
  line-height: 2.75rem;
}

.container .card .content p {
  font-size: 1.8em;
  color: #333;
}

.container .card .content a {
  position: relative;
  top: 5px;
  display: inline-block;
  padding: 12px 25px;
  background: var(--clr); 
  color: #fff;
  font-weight: 500;
  text-decoration: none;
  border-radius: 12px;
}

// @media screen and (min-width: 1024px) and (max-width: 1200px) {
//   .m-section {
//     margin: 60px 0 70px 0;
//   }
// }

/*------ Entre a 600px y 1023px ------*/

@media screen and (min-width: 601px) and (max-width: 1023px) {
  .padding-container {
    padding-right: 10px;
    padding-left: 10px;
  }

  .bg-box {
    padding: 20px 15px;
    color: #fff;
  }

  .font-title {
    font-size: 2.7rem;
  }

  .icon-size {
    font-size: 3rem;
  }

  .m-section {
    margin: -60px 0 70px 0;
  }

  .my-card {
    height: auto;
    width: 80%;
    border: 5px solid $grey-11;
    border-radius: 10px;
  }
}

/*------ Menor a 600px ------*/

@media screen and (max-width: 600px) {
  .padding-container {
    padding-right: 10px;
    padding-left: 10px;
  }

  .font-title {
    font-size: 2.7rem;
  }

  .icon-size {
    font-size: 3.8rem;
  }

  .my-card {
    height: 120px;
    width: 100%;
    border: 5px solid $grey-11;
    border-radius: 10px;
  }

  .m-section {
    margin: 40px 0 70px 0;
  }
}
</style>
