import _import from './_import'
import i18n from '../locale'

export default {
  name: 'Users',
  path: '/users',
  component: _import('user/index'),
  meta: {
    title: i18n.t('hello'),
    iconname: 'user',
    role: ['admin'],
    category: 'system'
  },
  children: [
    {
      name: 'user',
      path: '/user/:id',
      component: _import('user/user'),
      meta: {
        title: i18n.t('hello'),
        role: ['admin']
      }
    }
  ]
}
