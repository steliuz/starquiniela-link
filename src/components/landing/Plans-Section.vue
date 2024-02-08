<template>
  <section class="q-mt-xl q-mx-lg lt-md">
    <div class="text-h4 text-center text-primary text-bold q-mb-lg">Planes</div>
    <div class="row flex-cards">
      <div
        v-for="(plan, index) in planes"
        :key="index"
        class="col-12 col-md-2 col-sm-6 q-mb-lg flex justify-center"
      >
        <q-card
          class="my-card"
          :class="{ 'plata-card': plan.nombre === 'Plata' }"
        >
          <q-card-section class="text-center q-pb-none">
            <q-card-title
              :class="{ 'plata-title': plan.nombre === 'Plata' }"
              class="q-mb-none text-h5 text-bold text-grey-7 text-capitalize text-center"
              >{{ plan.nombre }}</q-card-title
            >
          </q-card-section>
          <q-card-section class="q-py-none">
            <ul>
              <li class="q-py-xs" v-for="(item, i) in plan.list" :key="i">
                {{ item }}
              </li>
            </ul>
            <p class="text-h6 text-center q-mb-none">{{ plan.precio }}</p>
          </q-card-section>
          <q-card-section class="buttom-card no-margin">
            <q-btn
              class="full-width"
              :outline="index != 2"
              :color="index == 2 ? 'positive' : 'grey'"
              square
              label="Comprar"
              @click="sendPlans(plan)"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </section>
</template>

<script setup>
const planes = [
  {
    nombre: 'Básico',
    precio: 'Precio $ 40 MXN / 1 Moneda',
    priceMXN: 40,
    coins: 1,
    list: [
      ' Acceso a Panel de control',
      ' Tus jugadores pueden enviar varias boletas o ticket',
      ' Tabla de Ranking o de puntos en linea',
      ' Descargar Tablas en PDF',
      ' Solo puedes autorizar jugar en tu tabla a 20 jugadores o ticket',
    ],
  },
  {
    nombre: 'Bronce',
    precio: 'Precio $ 80 MXN / 2 Monedas',
    priceMXN: 80,
    coins: 2,
    list: [
      ' Acceso a Panel de control',
      ' Tus jugadores pueden enviar varias boletas o ticket',
      ' Tabla de Ranking o de puntos en linea',
      ' Descargar Tablas en PDF',
      ' Solo puedes autorizar jugar en tu tabla a 50 jugadores o ticket',
    ],
  },
  {
    nombre: 'Plata',
    precio: 'Precio $ 120 MXN / 3 Monedas',
    priceMXN: 120,
    coins: 3,
    list: [
      ' Acceso a Panel de control',
      ' Tus jugadores pueden enviar varias boletas o ticket',
      ' Tabla de Ranking o de puntos en linea',
      ' Descargar Tablas en PDF',
      ' Solo puedes autorizar jugar en tu tabla a 100 jugadores o ticket',
    ],
  },
  {
    nombre: 'Oro',
    precio: 'Precio $ 280 MXN / 7 Monedas',
    priceMXN: 280,
    coins: 7,
    list: [
      ' Acceso a Panel de control',
      ' Tus jugadores pueden enviar varias boletas o ticket',
      ' Tabla de Ranking o de puntos en linea',
      ' Descargar Tablas en PDF',
      ' Solo puedes autorizar jugar en tu tabla a 300 jugadores o ticket',
    ],
  },
  {
    nombre: 'Platino',
    precio: 'Precio $ 400 MXN / 10 Monedas',
    priceMXN: 400,
    coins: 10,
    list: [
      ' Acceso a Panel de control',
      ' Tus jugadores pueden enviar varias boletas o ticket',
      ' Tabla de Ranking o de puntos en linea',
      ' Descargar Tablas en PDF',
      ' Solo puedes autorizar jugar en tu tabla a 500 jugadores o ticket',
    ],
  },
];

const sendPlans = (plan) => {
  console.log('sendPlans: ', plan);

  const { nombre, priceMXN, coins } = plan;

  const whatsappMessage = `Saludos, quiero comprar el plan ${nombre} con un precio de $${priceMXN} MXN y ${coins} ${
    coins === 1 ? 'Moneda' : 'Monedas'
  }.`;
  const whatsappURL = `https://api.whatsapp.com/send?phone=+528184624203&text=${encodeURIComponent(
    whatsappMessage
  )}`;

  window.open(whatsappURL, '_blank');
};
</script>

<style lang="scss" scoped>
.plata-title {
  color: #ffffff !important; /* Cambia el color del título para la carta 'Plata' a blanco */
}
.plata-card {
  background-color: #5c00be;
  color: white !important;
}
ul {
  counter-reset: item;
  list-style-type: none !important;
  padding: 0;
}

ul > li {
  counter-increment: item;
}

ul > li::before {
  font-weight: bold;
}
.flex-cards {
  display: flex;
  justify-content: space-around;
  width: 100%;
}
.my-card {
  border-radius: 40px;
  color: black;
  width: 220px;
  display: flex;
  flex-direction: column;
  height: 100%;

  transition: all 0.4s ease-out;

  &:hover {
    transform: scale(1.05);
  }
}
.my-card .buttom-card {
  margin-top: auto;
  text-align: center;
  display: block;
  margin: auto;
}

/*------ Entre a 600px y 1023px ------*/

@media screen and (min-width: 601px) and (max-width: 1023px) {
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
    border: 1px solid $grey-11;
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
    height: auto;
    width: 100%;
    border: 1px solid $grey-11;
    border-radius: 10px;
  }

  .m-section {
    margin: 40px 0 70px 0;
  }
}
</style>
