import _import from './_import'
import i18n from '../locale'

export default {
  name: 'VP',
  meta: {
    title: i18n.t('hello'),
    iconname: 'vp'
  },
  children: [
    {
      name: 'virtual platform',
      path: '/vp/platform',
      component: _import('vp/platform'),
      meta: {
        title: i18n.t('hello')
      }
    }
  ]
}
