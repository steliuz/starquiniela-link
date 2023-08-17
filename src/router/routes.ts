import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'index',
    component: () => import('layouts/landing/LandingPage.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('pages/auth/login/LoginPage.vue'),
  },
  {
    path: '/admin',
    name: 'admin',
    redirect: '/admin/dashboard',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'admin-dashboard',
        path: 'dashboard',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        name: 'admin-users',
        path: 'users',
        component: () => import('pages/users/UsersPage.vue'),
      },
      {
        name: 'admin-teams',
        path: 'teams',
        component: () => import('pages/teams/TeamsPage.vue'),
      },
      {
        name: 'admin-advertises',
        path: 'advertises',
        component: () => import('pages/advertises/AdvertisesPage.vue'),
      },
      {
        name: 'admin-rooms',
        path: 'rooms',
        component: () => import('pages/rooms/RoomsPage.vue'),
      },
      {
        name: 'admin-categories',
        path: 'categories',
        component: () => import('pages/category/CategoryPage.vue'),
      },
      {
        name: 'admin-rooms-matches',
        path: 'rooms/matchs',
        component: () => import('pages/rooms/RoomMatchs.vue'),
      },
      {
        name: 'admin-rooms-ranking',
        path: 'rooms/ranking',
        component: () => import('pages/rooms/RoomRanking.vue'),
      },
    ],
  },
  {
    path: '/players',
    name: 'players',
    redirect: '/players/dashboard',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'players-dashboard',
        path: 'dashboard',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        name: 'players-rooms',
        path: 'rooms',
        component: () => import('pages/rooms/RoomsPage.vue'),
      },
      {
        name: 'players-rooms-matches',
        path: 'rooms/matchs',
        component: () => import('pages/rooms/RoomMatchsPlayer.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
