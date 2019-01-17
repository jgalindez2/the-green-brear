import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGofore } from '@fortawesome/free-brands-svg-icons'
import {
  faUser,
  faCalendarAlt,
  faComments,
  faInfoCircle,
  faEdit,
  faGrinSquintTears,
  faBookReader
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faUser,
  faCalendarAlt,
  faGofore,
  faInfoCircle,
  faEdit,
  faComments,
  faGrinSquintTears,
  faBookReader
)

Vue.component('font-awesome-icon', FontAwesomeIcon)
