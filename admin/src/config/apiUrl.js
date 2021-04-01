let ipUrl = 'http://127.0.0.1:7001/admin/'  // 需要上线可以直接修改域名

let servicePath = {
  checkLogin: ipUrl + 'checkLogin', // 检查用户名和密码
  getTypeInfo: ipUrl + 'getTypeInfo' ,  //  获得文章类别信息
  addArticle: ipUrl + 'addArticle' ,  //  添加文章
  updateArticle: ipUrl + 'updateArticle' ,  //  修改文章
}

export default servicePath;