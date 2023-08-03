import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/landing/LandingPage.vue'),
  },
  {
    path: '/login',
    component: () => import('pages/auth/login/LoginPage.vue'),
  },
  {
    path: '/dashboard',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: '/users',
        component: () => import('pages/users/UsersPage.vue'),
      },
      {
        path: '/teams',
        component: () => import('pages/teams/TeamsPage.vue'),
      },
      {
        path: '/rooms',
        component: () => import('pages/users/UsersPage.vue'),
      },
      {
        path: '/categories',
        component: () => import('pages/users/UsersPage.vue'),
      },
      {
        path: '/advertises',
        component: () => import('pages/advertises/AdvertisesPage.vue'),
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
