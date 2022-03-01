import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'

import VuecmfDialog from 'vue-vuecmf-dialog'
import VuecmfEditor from "../packages/index"

createApp(App).use(VuecmfEditor).use(VuecmfDialog).mount('#app')

