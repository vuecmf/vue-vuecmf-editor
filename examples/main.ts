import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'


import VuecmfEditor from "../packages/index"

createApp(App).use(VuecmfEditor).mount('#app')

