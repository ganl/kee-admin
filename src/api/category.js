import request from './axios'
import config from './config'

export default {
  getCategory () {
    let url = config.api.category
    return request.get(url)
  }
}
