import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSortUp, faSortDown, faSort } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSortUp, faSortDown, faSort)

import './assets/main.css'

createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
