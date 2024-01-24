<template>
  <div class="padding-container">
    <div class="">
      <p class="text-center text-tittle q-mb-md">Juega tu primera QUINIELA</p>
      <p class="text-center subtittle-black">
        Para obtener un usuario <b>ORGANIZADOR</b> comunicate con
        <a href="">NOSOTROS</a> o consigue un <b>RESELLER</b>
      </p>
    </div>
    <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      swipeable
      animated
      control-color="primary"
      padding
      arrows
      infinite
      height="auto"
      class="carousel-style"
    >
      <q-carousel-slide
        :name="index"
        class="row no-wrap"
        v-for="(comment, index) in arrayCarousel"
        :key="index"
      >
        <div class="box-cards">
          <q-card
            flat
            class="card-comment"
            v-for="(card, index) in comment.cards"
            :key="index"
          >
            <q-card-section class="q-mb-xs q-pb-xs flex column flex-center">
              <div class="img-avatar">
                <q-img :src="card.avatar" />
              </div>
              <p class="text-h6 text-dark text-bold q-mt-sm q-mb-none">
                {{ card.name }}
              </p>
            </q-card-section>
            <q-card-section class="q-mt-xs q-pt-xs">
              <div class="message-card">
                {{ card.comment }}
              </div>
            </q-card-section>
            <q-card-actions align="center" class="q-ml-xs q-mt-xs q-py-none">
              <div class="row no-wrap flex flex-center full-width">
                <q-rating
                  color="orange-5"
                  v-model="card.rating"
                  :max="5"
                  size="24px"
                  readonly
                />
              </div>
            </q-card-actions>
          </q-card>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const slide = ref(0);
const arrayCarousel = ref([]);
const arrayBack = [
  {
    avatar: '/src/assets/icons/avatar.png',
    name: 'Rafael Garcia',
    rating: 4,
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim iste nisi qui dignissimos! Sint aperiam ipsum odio minima, nostrum dolores quas veritatis sunt nisi error quaerat voluptas dolorum quod labore.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim iste nisi qui dignissimos! Sint aperiam ipsum odio minima, nostrum dolores quas veritatis sunt nisi error quaerat voluptas dolorum quod labore.',
  },
  {
    avatar: '/src/assets/icons/avatar.png',
    name: 'Jesus Rosales',
    rating: 4,
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim iste nisi qui dignissimos! Sint aperiam ipsum odio minima, nostrum dolores quas  ',
  },
  {
    avatar: '/src/assets/icons/avatar.png',
    name: 'Alirio Guerra',
    rating: 5,
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim iste nisi qui dignissimos! Sint aperiam ipsum odio minima, nostrum dolores quas veritatis sunt nisi error quaerat voluptas dolorum quod labore.',
  },
  {
    avatar: '/src/assets/icons/avatar.png',
    name: 'Rafael Garcia',
    rating: 4,
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim iste nisi qui dignissimos! Sint aperiam ipsum odio minima, nostrum dolores quas veritatis sunt nisi error quaerat voluptas dolorum quod labore.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim iste nisi qui dignissimos! Sint aperiam ipsum odio minima, nostrum dolores quas veritatis sunt nisi error quaerat voluptas dolorum quod labore.',
  },
  {
    avatar: '/src/assets/icons/avatar.png',
    name: 'Jesus Rosales',
    rating: 4,
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim iste nisi qui dignissimos! Sint aperiam ipsum odio minima, nostrum dolores quas  ',
  },
  {
    avatar: '/src/assets/icons/avatar.png',
    name: 'Alirio Guerra',
    rating: 5,
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim iste nisi qui dignissimos! Sint aperiam ipsum odio minima, nostrum dolores quas veritatis sunt nisi error quaerat voluptas dolorum quod labore.',
  },
  {
    avatar: '/src/assets/icons/avatar.png',
    name: 'Rafael Garcia',
    rating: 4,
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim iste nisi qui dignissimos! Sint aperiam ipsum odio minima, nostrum dolores quas veritatis sunt nisi error quaerat voluptas dolorum quod labore.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim iste nisi qui dignissimos! Sint aperiam ipsum odio minima, nostrum dolores quas veritatis sunt nisi error quaerat voluptas dolorum quod labore.',
  },
  {
    avatar: '/src/assets/icons/avatar.png',
    name: 'Jesus Rosales',
    rating: 4,
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim iste nisi qui dignissimos! Sint aperiam ipsum odio minima, nostrum dolores quas  ',
  },
  {
    avatar: '/src/assets/icons/avatar.png',
    name: 'Alirio Guerra',
    rating: 5,
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim iste nisi qui dignissimos! Sint aperiam ipsum odio minima, nostrum dolores quas veritatis sunt nisi error quaerat voluptas dolorum quod labore.',
  },
  {
    avatar: '/src/assets/icons/avatar.png',
    name: 'Rafael Garcia',
    rating: 4,
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim iste nisi qui dignissimos! Sint aperiam ipsum odio minima, nostrum dolores quas veritatis sunt nisi error quaerat voluptas dolorum quod labore.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim iste nisi qui dignissimos! Sint aperiam ipsum odio minima, nostrum dolores quas veritatis sunt nisi error quaerat voluptas dolorum quod labore.',
  },
  {
    avatar: '/src/assets/icons/avatar.png',
    name: 'Jesus Rosales',
    rating: 4,
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim iste nisi qui dignissimos! Sint aperiam ipsum odio minima, nostrum dolores quas  ',
  },
  {
    avatar: '/src/assets/icons/avatar.png',
    name: 'Alirio Guerra',
    rating: 5,
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim iste nisi qui dignissimos! Sint aperiam ipsum odio minima, nostrum dolores quas veritatis sunt nisi error quaerat voluptas dolorum quod labore.',
  },
];

const formatCommentsCarousel = (arrayBack) => {
  arrayCarousel.value = arrayBack.reduce((acc, item, index) => {
    if (index % 3 === 0) {
      acc.push({
        cards: arrayBack.slice(index, index + 3),
        index: index,
      });
      return acc;
    }
    return acc;
  }, []);
};

formatCommentsCarousel(arrayBack);
</script>

<style lang="scss" scope>
.q-rating__icon {
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0), 0 1px 2px rgba(0, 0, 0, 0);
}

.card-style {
  width: 385px !important;
  min-height: 250px !important;
}

.card-comment {
  height: 280px !important;
  width: 100%;

  .img-avatar {
    width: 50px;
    height: 50px;
    overflow: hidden;
    background-color: $grey-6;
    border-radius: 50%;
    outline: 2px solid $secondary;
    outline-offset: 3px;
    padding: 7px;
  }

  .message-card {
    height: 100px;
    overflow-y: auto;
    padding-right: 15px;
    text-align: center;

    &::-webkit-scrollbar {
      height: 6px;
      width: 6px;
      background: transparent;
      z-index: 12;
      overflow: visible;
      cursor: pointer;
    }

    &::-webkit-scrollbar-track {
      border-radius: 0px;
    }

    &::-webkit-scrollbar-thumb {
      width: 10px;
      background-color: $secondary;
      border-radius: 10px;
      z-index: 12;
      transition: background-color 0.32s ease-in-out;
      min-height: 32px;
      min-width: 32px;
    }
  }
}
.box-cards {
  width: 100%;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, auto);
  place-content: center;

  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(1, auto);
  }
}
</style>
