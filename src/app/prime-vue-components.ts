import { Component } from 'vue';

import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Paginator from 'primevue/paginator';

export const primeVueComponents = new Map<string, Component>([
    ['p-button', Button],
    ['p-inputText', InputText],
    ['p-paginator', Paginator]
]);