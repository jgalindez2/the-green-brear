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
        name: 'Home',
        path: '',
        component: () => import(/* webpackChunkName: "Home" */ './views/Home/')
      }, {
        name: 'TopicShow',
        path: 'topic/:id',
        props: true,
        component: () => import(/* webpackChunkName: "TopicShow" */ './views/Topic/')
      }]
    }
  ]
})
