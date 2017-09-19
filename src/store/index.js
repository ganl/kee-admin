import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import category from './modules/category'
import menu from './modules/menu'

import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    auth,
    category,
    menu
  }
})
