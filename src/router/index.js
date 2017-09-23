import Vue from 'vue'
import Router from 'vue-router'
import _import from './_import'
import store from 'store'
import i18n from '../locale'

Vue.use(Router)

// const Index = () => import(/* webpackChunkName: "portal" */ '@/views/Index.vue')
// const Login = () => import(/* webpackChunkName: "login" */ '@/views/login/login.vue')
// const Home = () => import(/* webpackChunkName: "home" */ '@/views/home/index.vue')

const Index = _import('Index')
const Login = _import('login/login')
// const Home = _import('home/index')
const Err404 = _import('error/404')
const PermissionDenied = _import('error/permission')
const Layout = _import('layout')

import Node from './node'
import User from './user'
import Vp from './vp'

const items = [
  Node,
  User,
  Vp
]

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/portal',
      // component: Index,
      meta: {
        noAuth: true,
        title: i18n.t('hello')
      }
    }, {
      path: '/user',
      name: 'user',
      component: _import('user/index'),
      meta: {
        noAuth: true,
        title: i18n.t('hello')
      }
    }, {
      path: '/portal',
      name: 'portal',
      component: Index,
      meta: {
        noAuth: true,
        title: i18n.t('hello')
      }
    }, {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        noAuth: true,
        title: i18n.t('loginTitle')
      }
    }, {
      path: '/home',
      name: 'home',
      component: Layout,
      meta: {
        noAuth: false
      }
    }, {
      path: '/404',
      component: Err404,
      meta: {
        noAuth: true
      }
    }, {
      path: '/permission_denied',
      component: PermissionDenied,
      meta: {
        noAuth: true
      }
    },
    ...User,
    { path: '*', redirect: '/404', hidden: true }
  ]
})

function generateRoutesByCategory (categories = [], items = []) {
  const licensed = []
  for (let i = 0, l = categories.length; i < l; i++) {
    for (let j = 0; j < items.length; j++) {
      let item = items[j]
      if (item.name.toLowerCase().indexOf(categories[i].category) >= 0) {
        licensed.push(item)
      }
    }
  }
  return licensed
}

function generateRoutesFromItem (items = [], routes = []) {
  for (let i = 0, l = items.length; i < l; i++) {
    let item = items[i]
    if (item.path) {
      routes.push(item)
    }
    if (item.children) {
      generateRoutesFromItem(item.children, routes)
    }
  }
  return routes
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => {
    return typeof record.meta.noAuth === 'undefined' || !record.meta.noAuth
  })) {
    if (store.getters.accessToken) {
      if (store.getters.categories.length === 0) {
        store.dispatch('getCategory').then((res) => {
          const licensed = generateRoutesByCategory(res.categories, items)
          console.log(licensed)
          const routes = generateRoutesFromItem(licensed)
          console.log(routes)
          store.commit('SET_MENU', routes)
          router.addRoutes(store.getters.menu)
          next()
        })
      } else {
        next()
      }
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})

router.afterEach(route => {
  document.title = typeof route.meta.title !== 'undefined' ? route.meta.title : i18n.t('defaultTitle')
})

export default router
