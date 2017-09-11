import store from 'store'

const config = {
  header: {
    // method: 'POST',
    // credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  },
  api: {
    base: 'http://mockjs/api/',
    auth: 'auth/token',
    user: 'user/index',
    node: {
      index: 'node/index'
    }
  }
}

if (store.state.login.token) {
  config.header.headers.Authorization = store.state.login.token
}

const API_TIMEOUT = 5000

export {API_TIMEOUT, config as default}
