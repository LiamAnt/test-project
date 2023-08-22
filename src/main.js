import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import BeautimodeTestApp from './BeautimodeTestApp.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(BeautimodeTestApp)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')
