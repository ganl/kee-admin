import _import from './_import'
import i18n from '../locale'

export default {
  name: 'Nodes',
  path: '/nodes',
  component: _import('node/index'),
  meta: {
    title: i18n.t('hello'),
    iconname: 'node',
    category: 'system'
  },
  children: [
    {
      name: 'NodeItem',
      path: '/node/:id',
      component: _import('node/nodeitem'),
      meta: {
        title: i18n.t('hello')
      }
    }
  ]
}
