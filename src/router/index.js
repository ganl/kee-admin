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
const Dashboard = _import('home/index')
const Err404 = _import('error/404')
const PermissionDenied = _import('error/permission')

import Node from './node'
import User from './user'
import Vp from './vp'

const items = [
  Node,
  User,
  Vp
]

// scrollBehavior: https://github.com/vuejs/vue-router/blob/next/examples/scroll-behavior/app.js
// - only available in html5 history mode
// - defaults to no scroll behavior
// - return false to prevent scroll
const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    // savedPosition is only available for popstate navigations.
    return savedPosition
  } else {
    const position = {}
    // new navigation.
    // scroll to anchor by returning the selector
    if (to.hash) {
      position.selector = to.hash
    }
    // check if any matched route config has meta that requires scrolling to top
    if (to.matched.some(m => m.meta.scrollToTop)) {
      // cords will be used if no selector is provided,
      // or if the selector didn't match any element.
      position.x = 0
      position.y = 0
    }
    // if the returned position is falsy or an empty object,
    // will retain current scroll position.
    return position
  }
}

const router = new Router({
  // mode: 'history',
  scrollBehavior,
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/portal',
      // component: Index,
      meta: {
        noAuth: true,
        title: i18n.t('hello'),
        scrollToTop: true
      }
    }, {
      path: '/portal',
      name: 'portal',
      component: Index, // webconsole index
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
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        noAuth: false
      }
    }, {
      path: '/404',
      component: Err404,
      meta: {
        // noAuth: true
      }
    }, {
      path: '/permission_denied',
      component: PermissionDenied,
      meta: {
        noAuth: true
      }
    },
    { path: '*', redirect: '/404', hidden: true }
  ]
})

function generateRoutesByCategory (categories = [], items = []) {
  const licensedCategories = []
  for (let i = 0, l = categories.length; i < l; i++) {
    for (let j = 0; j < items.length; j++) {
      let item = items[j]
      if (item.meta.category.toLowerCase().indexOf(categories[i].category) >= 0) {
        licensedCategories.push(item)
      }
    }
  }
  return licensedCategories
}

function generateRoutesFromItem (items = [], routes = []) {
  for (let i = 0, l = items.length; i < l; i++) {
    let item = items[i]
    if (item.path) {
      routes.push(item)
    }
    // if (item.children) {
    //   generateRoutesFromItem(item.children, routes)
    // }
  }
  // console.log(items, routes)
  return routes
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => {
    return typeof record.meta.noAuth === 'undefined' || !record.meta.noAuth
  })) {
    if (store.getters.accessToken) {
      if (store.getters.categories.length === 0) {
        store.dispatch('getCategory').then((res) => {
          const licensedCategories = generateRoutesByCategory(res.categories, items)
          const routes = generateRoutesFromItem(licensedCategories)
          store.commit('SET_MENU', routes)
          router.addRoutes(routes)
          // router.addRoutes({ path: '*', redirect: '/404', hidden: true })
          next(to.path)
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
