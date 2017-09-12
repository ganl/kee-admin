// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {
  Row, Col,
  Button, Select, TimePicker, DatePicker,
  Form,
  FormItem,
  Input
} from 'element-ui'
import router from './router'
import store from './store'

import VueI18n from 'vue-i18n'
import Locales from './locale'
import enLocale from 'element-ui/lib/locale/lang/en'
import cnLocale from 'element-ui/lib/locale/lang/zh-CN'
import twLocale from 'element-ui/lib/locale/lang/zh-TW'
import ruLocale from 'element-ui/lib/locale/lang/ru-RU'
import ElementLocale from 'element-ui/lib/locale'

Vue.use(VueI18n)

const locales = Locales

const messages = {
  en: {
    ...locales['en'],
    ...enLocale
  },
  'zh-CN': Object.assign(cnLocale, locales['cn']),
  'zh-TW': Object.assign(twLocale, locales['tw']),
  'ru-RU': Object.assign(ruLocale, locales['ru'])
}

Vue.config.productionTip = false

Vue.component(Button.name, Button)
Vue.component(Select.name, Select)
/* 或写为
 * Vue.use(Button)
 * Vue.use(Select)
 */

Vue.use(Row)
Vue.use(Col)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)

Vue.use(TimePicker)
Vue.use(DatePicker)

// auto set language
const navLang = navigator.language
const localLang = (navLang === 'en' || navLang === 'zh-CN') ? navLang : false
Vue.config.lang = window.localStorage.getItem('language') || localLang || 'en'

// Vue.locale('en', mergeEN)
// Vue.locale('cn', mergeCN)

const i18n = new VueI18n({
  locale: Vue.config.lang,
  fallbackLocale: 'en',
  messages
})

ElementLocale.i18n((key, value) => i18n.t(key, value))

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  store,
  router,
  template: '<App/>',
  components: { App }
})
