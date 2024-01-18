<template>
  <div class="padding-container-carousel">
    <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      swipeable
      animated
      control-color="amber"
      navigation
      padding
      arrows
      infinite
      height="500px"
      class="carousel-style"
    >
      <template v-for="item in 3" :key="item">
        <q-carousel-slide
          :name="index"
          class="row no-wrap"
          v-for="(comment, index) in comments"
          :key="index"
        >
          <div class="box-cards">
            <q-card
              class="card-comments"
              v-for="(card, index) in comment.cards"
              :key="index"
            >
              <q-card-section class="q-my-xs q-py-xs">
                <q-avatar size="60px">
                  <q-img :src="card.avatar" />
                </q-avatar>
                <span class="q-ml-sm text-h6 text-dark text-bold">{{
                  card.name
                }}</span>
              </q-card-section>
              <q-card-section class="q-mt-xs q-py-sm">
                <q-card-title>{{ card.title }}</q-card-title>
                <q-card-main class>{{ card.comment }}</q-card-main>
              </q-card-section>
              <q-card-actions align="start" class="q-ml-xs q-mt-xs q-py-none">
                <div class="text-h7 q-mt-sm">
                  <b>Danos una calificacion:</b>
                </div>
                <div class="row no-wrap items-center">
                  <q-rating v-model="stars" :max="5" size="28px" />
                  <span class="text-caption text-grey q-ml-sm">4.2 (551)</span>
                </div>
              </q-card-actions>
            </q-card>
          </div>
        </q-carousel-slide>
      </template>
    </q-carousel>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Cards from 'src/components/landing/Cards-Section.vue';
const slide = ref(0);

const comments = [
  {
    cards: [
      {
        avatar: '/src/assets/icons/avatar.png',
        name: 'Rafael Garcia',
        comment:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim iste nisi qui dignissimos! Sint aperiam ipsum odio minima, nostrum dolores quas veritatis sunt nisi error quaerat voluptas dolorum quod labore.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim iste nisi qui dignissimos! Sint aperiam ipsum odio minima, nostrum dolores quas veritatis sunt nisi error quaerat voluptas dolorum quod labore.',
      },
      {
        avatar: '/src/assets/icons/avatar.png',
        name: 'Jesus Rosales',
        comment:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim iste nisi qui dignissimos! Sint aperiam ipsum odio minima, nostrum dolores quas  ',
      },
      {
        avatar: '/src/assets/icons/avatar.png',
        name: 'Alirio Guerra',
        comment:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim iste nisi qui dignissimos! Sint aperiam ipsum odio minima, nostrum dolores quas veritatis sunt nisi error quaerat voluptas dolorum quod labore.',
      },
    ],
  },
];

console.log('comments: ', comments);
</script>

<style scope>
.q-card > div:not(:first-child),
.q-card > img:not(:first-child) {
  overflow-y: auto;
  max-height: 100px;
}

.card-style {
  width: 385px !important;
  min-height: 250px !important;
}

.card-comments {
  height: 280px !important;
  width: 100%;
}

.padding-container-carousel {
  padding-right: 10%;
  padding-left: 10%;
}

.box-cards {
  width: 100%;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, auto);
  place-content: center;
}
</style>
