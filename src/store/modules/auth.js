import loginApi from 'api/login'
import * as types from '../mutation-type'

const state = {
  username: '',
  profile: {},
  token: '',
  roles: []
}

const mutations = {
  [types.SET_TOKEN] (state, {token}) {
    state.token = token
  }
}

export default {
  state,
  mutations
}
