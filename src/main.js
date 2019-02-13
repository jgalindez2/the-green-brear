import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import './plugins/element.js'
import './plugins/font-awesome.js'
import './plugins/paginate.js'
import i18n from './plugins/i18n'
import firebase from 'firebase'
import VueMoment from 'vue-moment'

Vue.use(VueMoment)
Vue.config.debug = process.env.NODE_ENV === 'development'
Vue.config.silent = process.env.NODE_ENV === 'production'
Vue.config.devtools = true
Vue.config.productionTip = false

// Initialize Firebase
var config = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID
}

firebase.initializeApp(config)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
