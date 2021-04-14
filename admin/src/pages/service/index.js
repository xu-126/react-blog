import axios from 'axios';
import servicePath from '../../config/apiUrl'

// 获取留言列表信息
export const getCommentsInfo = () => axios({
  url: servicePath.getCommentsInfo,
  method: 'get',
  withCredentials: true
});

// 删除留言信息
export const deleteComment = (id) => axios({
  url: servicePath.deleteComment+id,
  method: 'get',
  withCredentials: true
})

// 用户登出
export const logout = () => axios({
  url: servicePath.logout,
  method: 'post',
  withCredentials: true
});

// 获取文章列表
export const getArticleList = () => axios({
  url: servicePath.getArticleList,
  method: 'get',
  withCredentials: true
});

// 删除文章信息
export const deleteArticle = (id) => axios({
  url: servicePath.delArticle+id,
  method: 'get',
  withCredentials: true
})

// 获取文章类型列表信息
export const getTypeInfo = () => axios({
  url: servicePath.getTypeInfo,
  method: 'get',
  withCredentials: true // 前后端共享session
})

// 根据文章类型id获取文章信息
export const getArticleByTypeId = (id) => axios({
  url: servicePath.getArticleByTypeId+id,
  method: 'get',
  withCredentials: true // 前后端共享session
})
