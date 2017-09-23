const _import = (module, webpackChunkName) => {
  if (process.env.NODE_ENV === 'production') {
    return () => import(/* webpackChunkName: "group-foo" */ 'views/' + module + '.vue')
  } else {
    return require('@/views/' + module + '.vue')
  }
}

export default _import
