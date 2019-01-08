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
        name: 'Topic',
        path: 'topic/:id',
        props: true,
        component: () => import(/* webpackChunkName: "Topic" */ './views/Topic/')
      }, {
        name: 'Category',
        path: 'category/:slug',
        props: true,
        component: () => import(/* webpackChunkName: "Category" */ './views/Category/')
      }, {
        name: 'Categories',
        path: 'categories',
        component: () => import(/* webpackChunkName: "Categories" */ './views/Categories/')
      }, {
        name: 'Profile',
        path: 'me',
        component: () => import(/* webpackChunkName: "Categories" */ './views/Profile/')
      }, {
        name: 'Profile',
        path: 'me/edit',
        props: { edit: true },
        component: () => import(/* webpackChunkName: "Categories" */ './views/Profile/')
      }]
    },
    {
      name: 'NoFound',
      path: '*',
      component: () => import(/* webpackChunkName: "NoFound" */ './views/NoFound/')
    }
  ]
})
