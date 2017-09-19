import config from './config'
import request from './axios'

export default {
  getUserlist () {
    let url = config.api.user
    return request.get(url)
  }
}
