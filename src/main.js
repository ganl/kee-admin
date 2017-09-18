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
import i18n from './locale'
import ElementLocale from 'element-ui/lib/locale'

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

ElementLocale.i18n((key, value) => i18n.t(key, value))

/* eslint-disable no-new */
new Vue({
  i18n,
  store,
  router,
  render: (h) => h(App)
}).$mount('#app')
