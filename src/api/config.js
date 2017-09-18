// import store from 'store'

const config = {
  header: {
    mode: 'cros',
    // method: 'POST',
    // credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  },
  api: {
    base: process.env.API_BASE,
    auth: 'auth/token',
    user: 'user/index',
    node: {
      index: 'node/index'
    }
  }
}

// if (store.getters.accessToken) {
//   config.header.headers.Authorization = store.state.login.token
// }

const API_TIMEOUT = 5000

export { API_TIMEOUT, config as default }
