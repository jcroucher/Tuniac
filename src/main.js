import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './assets/styles/index.css'

import { initDB } from './utils/db'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  faPlay,
  faPause,
  faStepForward,
  faStepBackward,
  faMusic,
  faListUl,
  faArrowLeft,
  faDownload,
  faUpload
} from '@fortawesome/free-solid-svg-icons'

library.add(
    faPlay,
    faPause,
    faStepForward,
    faStepBackward,
    faMusic,
    faListUl,
    faArrowLeft,
    faDownload,
    faUpload
)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;


initDB();


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
