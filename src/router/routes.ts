import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/landing',
    name: 'index',

    component: () => import('layouts/landing/LandingPage.vue'),
  },
  {
    path: '/',
    name: 'login',
    component: () => import('pages/auth/login/LoginPage.vue'),
  },
  {
    name: 'roomMatch',
    path: '/rooms/:code',
    component: () => import('pages/rooms/player/RoomPlayer.vue'),
  },
  {
    name: 'ticket-pdf',
    path: '/ticket/:id/pdf',
    component: () => import('pages/rooms/pdf/TicketPDF.vue'),
  },
  {
    name: 'ticket-status',
    path: '/invoices/:id/tickets/status',
    component: () => import('pages/rooms/pdf/TicketPDF.vue'),
  },
  {
    path: '/admin',
    name: 'admin',
    redirect: '/admin/dashboard',
    meta: { requiresAuth: true, roles: [1, 2, 3] },
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
        meta: { requiresAuth: true, roles: [1] },
        component: () => import('pages/rooms/RoomsPage.vue'),
      },
      {
        name: 'organizer-rooms',
        path: 'organizer/rooms',
        component: () => import('pages/rooms/OrganizerRoomsPage.vue'),
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
    meta: { requiresAuth: true, roles: [4] },
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
