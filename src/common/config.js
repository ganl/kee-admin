export default {
  header: {
    method: 'POST',
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
