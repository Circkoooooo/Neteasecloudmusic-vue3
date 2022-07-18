import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { router } from './router';
import App from './App.vue';
import '~/axios';

const pinia = createPinia();

createApp(App).use(pinia).use(router).mount('#app');
