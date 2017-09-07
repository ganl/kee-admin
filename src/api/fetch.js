import Qs from 'qs'
import Mock from 'mockjs'
import config from './config'

const request = {
  get (url, params) {
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
    this.request(url, body, 'POST')
  },
  put (url, body) {
    this.request(url, body, 'PUT')
  },
  delete (url, body) {
    this.request(url, body, 'DELETE')
  }
}

export default request
