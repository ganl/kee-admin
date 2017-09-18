import Vue from 'vue'
import VueI18n from 'vue-i18n'
import lStorage from 'common/storage'

// import Locales from './locale'

import langEN from './locale/en'
import langCN from './locale/zh-CN'
import langRU from './locale/ru-RU'
import langTW from './locale/zh-TW'

const locales = {
  en: langEN,
  cn: langCN,
  tw: langTW,
  ru: langRU
}

import enLocale from 'element-ui/lib/locale/lang/en'
import cnLocale from 'element-ui/lib/locale/lang/zh-CN'
import twLocale from 'element-ui/lib/locale/lang/zh-TW'
import ruLocale from 'element-ui/lib/locale/lang/ru-RU'

Vue.use(VueI18n)

// const locales = Locales

const messages = {
  en: {
    ...locales['en'],
    ...enLocale
  },
  'zh-CN': Object.assign(cnLocale, locales['cn']),
  'zh-TW': Object.assign(twLocale, locales['tw']),
  'ru-RU': Object.assign(ruLocale, locales['ru'])
}

// auto set language
const navLang = navigator.language
const localLang = (navLang === 'en' || navLang === 'zh-CN') ? navLang : false
Vue.config.lang = lStorage.getItem('language') || localLang || 'en'

// Vue.locale('en', mergeEN)
// Vue.locale('cn', mergeCN)

const i18n = new VueI18n({
  locale: Vue.config.lang,
  fallbackLocale: 'en',
  messages
})

export default i18n
