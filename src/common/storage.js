import Cookies from 'js-cookie'

const storage = {
  getItem (name) {
    return window.localStorage ? localStorage.getItem(name) : Cookies.get(name)
  },
  setItem (name, value) {
    return window.localStorage ? localStorage.setItem(name, value) : Cookies.set(name, value)
  },
  setJson (name, jsonVal) {
  },
  getJson (name) {
  }
}

export default storage
