import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGofore } from '@fortawesome/free-brands-svg-icons'
import { faUser, faCalendarAlt, faComments } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUser, faCalendarAlt, faGofore, faComments)

Vue.component('font-awesome-icon', FontAwesomeIcon)
