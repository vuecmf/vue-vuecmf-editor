import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VuecmfEditor from "../packages/index"

createApp(App).use(ElementPlus).use(VuecmfEditor).mount('#app')

