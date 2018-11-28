import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGofore } from '@fortawesome/free-brands-svg-icons'
import { faUser, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUser, faCalendarAlt, faGofore)

Vue.component('font-awesome-icon', FontAwesomeIcon)
