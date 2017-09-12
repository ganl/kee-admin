import loginApi from 'api/login'
import * as types from '../mutation-type'

const state = {
  username: '',
  profile: {},
  token: '',
  roles: []
}

const getters = {
  accessToken: state => state.token
}

const mutations = {
  [types.SET_TOKEN] (state, {token}) {
    state.token = token
  }
}

const actions = {
  loginByIdentity ({ commit }, userLogin) {
    return new Promise((resolve, reject) => {
      loginApi.login(userLogin).then(
        response => {
          const data = response.data
          if (data.code === 0) {
            commit(types.SET_TOKEN, {token: data.token})
            resolve(data)
          } else {
            console.log(data.code + ',' + data.message)
            reject(data)
          }
        }
      ).catch(error => reject(error))
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
