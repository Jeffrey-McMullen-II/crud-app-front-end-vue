import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import About from '../src/app/about/about.component.vue';
import Home from '../src/app/home/home.component.vue';
import Welcome from '../src/app/welcome/welcome.component.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome,
    props: route => ({ redirectUrl: route.query.redirectUrl })  
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
];

export default createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});