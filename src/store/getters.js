const accessToken = state => state.auth.token
const categories = state => state.category.categories
const menu = state => state.menu.menu

export {
  accessToken,
  categories,
  menu
}
