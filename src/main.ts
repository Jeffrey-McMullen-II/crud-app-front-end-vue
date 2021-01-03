import { Component, createApp } from 'vue';
import PrimeVue from 'primevue/config';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';

import App from './app/app.component.vue';
import { primeVueComponents } from './app/prime-vue-components';
import router from './app/router';
import store from './app/store';

const app = createApp(App).use(PrimeVue).use(router).use(store);

primeVueComponents.forEach((value: Component, key: string) => app.component(key, value));

app.mount('#app');
