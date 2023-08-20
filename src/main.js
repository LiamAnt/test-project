import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import TodolistApp from './TodolistApp.vue'
import router from './router'

const app = createApp(TodolistApp)

app.use(createPinia())
app.use(router)

app.mount('#app')
