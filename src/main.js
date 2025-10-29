import './main.sass'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { magnifierDirective } from './components/Dynamic/shared/utils/magnifierDirective.js'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.directive('magnifier', magnifierDirective)
app.mount('#app')
