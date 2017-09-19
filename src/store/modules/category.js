import * as types from '../mutation-type'
import api from 'api/category'

const state = {
  categories: []
}

const mutations = {
  [types.SUCCESS_GET_CATEGORY] (state, categories) {
    state.categories = categories
  },
  [types.FAILURE_GET_CATEGORY] (state) {
    state.categories = []
  }
}

const actions = {
  getCategory ({commit}) {
    return new Promise((resolve, reject) => {
      api.getCategory().then(response => {
        // const data = response.data
        // if (data.code === 0) {
        //   commit(types.SUCCESS_GET_CATEGORY, {token: data.token})
        //   resolve(data)
        // } else {
        //   console.log(data.code + ',' + data.message)
        //   reject(data)
        // }
        if (response.length === 0) {
          commit(types.FAILURE_GET_CATEGORY)
        } else {
          commit(types.SUCCESS_GET_CATEGORY, response)
        }
        resolve(response)
      }).catch(err => {
        commit(types.FAILURE_GET_CATEGORY)
        reject(err)
      })
    })
  }
}

export default {
  state,
  mutations,
  actions
}
