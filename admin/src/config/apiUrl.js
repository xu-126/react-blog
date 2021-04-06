let ipUrl = 'http://127.0.0.1:7001/admin/'  // 需要上线可以直接修改域名

let servicePath = {
  checkLogin: ipUrl + 'checkLogin', // 检查用户名和密码
  getTypeInfo: ipUrl + 'getTypeInfo' ,  //  获得文章类别信息
  addArticle: ipUrl + 'addArticle' ,  //  添加文章
  updateArticle: ipUrl + 'updateArticle' ,  //  修改文章
  getArticleList: ipUrl + 'getArticleList' ,  //  文章列表 
  delArticle: ipUrl + 'delArticle/' ,  //  删除文章
  getArticleById: ipUrl + 'getArticleById/' ,  //  根据ID获得文章详情

  getCommentsInfo: ipUrl + 'getCommentsInfo', // 获取留言信息接口
  deleteComment: ipUrl + 'deleteComment/', // 获取留言信息接口

  getUserInfo: baseUrl + 'getUserInfo', // 获取个人信息接口
  updateUserInfo: baseUrl + 'updateUserInfo', // 更新个人信息接口
  getArticleByTypeId: baseUrl + 'getArticleByTypeId/', // 根据文章类型id获取文章信息
}

export default servicePath;