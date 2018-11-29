import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'app-common',
      component: () => import(/* webpackChunkName: "app-common" */ './layouts/AppCommon.vue'),
      children: [{
        name: 'home',
        path: '',
        component: () => import(/* webpackChunkName: "home" */ './views/Home/')
      }, {
        name: 'topic',
        path: 'topic/:id',
        props: true,
        component: () => import(/* webpackChunkName: "topic" */ './views/Topic/')
      }]
    }
  ]
})
