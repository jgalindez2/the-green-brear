import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('./layouts/AppCommon.vue'),
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
    },
    {
      name: 'NoFound',
      path: '*',
      component: () => import(/* webpackChunkName: "NoFound" */ './views/NoFound/')
    }
  ]
})
