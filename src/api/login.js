import request from './axios'
import config from './config'

export default {
  login (params) {
    let data = {
      username: params.username,
      pwd: params.password
    }
    let url = config.api.auth
    return request.post(url, data)
  }
}
