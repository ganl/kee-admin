import Vue from 'vue'
import Router from 'vue-router'
import store from 'store'
import i18n from '../locale'

// const Index = () => import(/* webpackChunkName: "portal" */ '@/views/Index.vue')
// const Login = () => import(/* webpackChunkName: "login" */ '@/views/login/login.vue')
// const Home = () => import(/* webpackChunkName: "home" */ '@/views/home/index.vue')

const _import = (module, webpackChunkName) => {
  if (process.env.NODE_ENV === 'production') {
    return () => import(/* webpackChunkName: "group-foo" */ 'views/' + module + '.vue')
  } else {
    return require('@/views/' + module + '.vue')
  }
}

const Index = _import('Index')
const Login = _import('login/login')
const Home = _import('home/index')
const Err404 = _import('error/404')
const PermissionDenied = _import('error/permission')

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
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
      component: Home,
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
    { path: '*', redirect: '/404', hidden: true }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => {
    return typeof record.meta.noAuth === 'undefined' || !record.meta.noAuth
  })) {
    if (store.getters.accessToken) {
      next()
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
