import { createApp } from 'vue';

import App from './app/app.component.vue';
import router from './app/router';
import store from './app/store';

createApp(App).use(router).use(store).mount('#app');
