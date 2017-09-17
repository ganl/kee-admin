import Vue from 'vue'
import Router from 'vue-router'

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

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: Index
    }, {
      path: '/login',
      name: 'login',
      component: Login
    }, {
      path: '/home',
      component: Home
    }, {
      path: '/404',
      component: Err404
    }, {
      path: '/permission_denied',
      component: PermissionDenied
    },
    { path: '*', redirect: '/404', hidden: true }
  ]
})
