import Vue from 'vue'
import Router from 'vue-router'
import store from './store/index'

Vue.use(Router)

const router = new Router({
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
        name: 'NewTopic',
        path: 'topic/create/:categoryId',
        props: true,
        component: () => import(/* webpackChunkName: "New-Topic" */ './views/TopicCreate/')
      }, {
        name: 'EditTopic',
        path: 'topic/edit/:topicId',
        props: true,
        component: () => import(/* webpackChunkName: "Edit-Topic" */ './views/TopicEdit/')
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
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "Profile" */ './views/Profile/')
      }, {
        name: 'MyProfile',
        path: 'me/edit',
        props: { edit: true },
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "My-Profile" */ './views/Profile/')
      }, {
        name: 'Signup',
        path: 'signup',
        component: () => import(/* webpackChunkName: "Signup" */ './views/Signup/')
      }, {
        name: 'Signin',
        path: 'signin',
        component: () => import(/* webpackChunkName: "Signin" */ './views/Signin/')
      }, {
        name: 'Signout',
        path: '/logout',
        async beforeEnter (to, from, next) {
          await store.dispatch('signOut')
          next({ name: 'Home' })
        }
      }]
    },
    {
      name: 'NoFound',
      path: '*',
      component: () => import(/* webpackChunkName: "NoFound" */ './views/NoFound/')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth)) {
    store.state.authId ? next() : next({ name: 'Home' })
  } else {
    next()
  }
})

export default router
