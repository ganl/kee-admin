import Mock from 'mockjs'
import api from './category'

// Mock.setup({})

Mock.mock(/permisson\/category/, 'get', api.getCategory)

export default Mock
