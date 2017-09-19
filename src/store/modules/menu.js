import * as types from '../mutation-type'

const state = {
  menu: []
}

const mutations = {
  [types.SET_MENU] (state, menu) {
    state.menu = menu
  }
}

const actions = {

}

export default {
  state,
  actions,
  mutations
}
