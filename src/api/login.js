import request from './fetch'
import config from './config'

export default {
  login (params) {
    let url = config.api.auth
    return request.post(url, params)
  }
}
