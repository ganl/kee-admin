import lStotage from 'common/storage'
import moment from 'moment'
import loginApi from 'api/login'
import * as types from '../mutation-type'

const getToken = () => {
  let expiresIn = lStotage.getItem('expires_in') || moment().subtract(1, 'hours') // get expires in OR set expires
  return moment().isBefore(expiresIn) ? lStotage.getItem('token') : ''
}

const setToken = (token) => {
  let date = moment().add(2, 'hours').format() // ISO 8601
  setTokenExpires(date)
  lStotage.setItem('token', token)
}

const setTokenExpires = (date) => {
  lStotage.setItem('expires_in', date)
}

const state = {
  username: '',
  profile: {},
  token: getToken(),
  roles: []
}

const mutations = {
  [types.SET_TOKEN] (state, {token}) {
    // lStotage.setItem('token', token)
    setToken(token)
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
  actions,
  mutations
}
