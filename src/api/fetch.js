import Qs from 'qs'
import Mock from 'mockjs'
import config from './config'

const request = {
  get (url, params) {
    url = config.api.base + url
    if (params) {
      url += '?' + Qs.stringify(params)
    }
    let options = {
      method: 'GET',
      ...config.header
    }
    return fetch(url, options)
      .then(response => response.json())
      .then(responseJson => Mock.mock(responseJson))
  },
  request (url, body, method) {
    url = config.api.base + url
    let options = {
      method: method,
      ...config.header,
      body: JSON.stringify(body)
    }
    return fetch(url, options)
      .then(response => response.json())
      .then(responseJson => Mock.mock(responseJson))
  },
  post (url, body) {
    return this.request(url, body, 'POST')
  },
  put (url, body) {
    return this.request(url, body, 'PUT')
  },
  delete (url, body) {
    return this.request(url, body, 'DELETE')
  }
}

export default request
