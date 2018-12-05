import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './plugins/font-awesome.js'
import './plugins/paginate.js'
import i18n from './plugins/i18n'
import VueMoment from 'vue-moment'

Vue.use(VueMoment)
Vue.config.debug = process.env.NODE_ENV === 'development'
Vue.config.silent = process.env.NODE_ENV === 'production'
Vue.config.devtools = true
Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
