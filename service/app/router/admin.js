module.exports = app =>{
  const {router,controller} = app
  var adminauth = app.middleware.adminauth()
  router.get('/admin/index', controller.admin.main.index)
  router.post('/admin/checkLogin',controller.admin.main.checkLogin)
  router.get('/admin/getTypeInfo',adminauth, controller.admin.main.getTypeInfo)
  router.post('/admin/addArticle', adminauth, controller.admin.main.addArticle)
  router.post('/admin/updateArticle',adminauth, controller.admin.main.updateArticle)
  router.get('/admin/getArticleList',adminauth,controller.admin.main.getArticleList)
  router.get('/admin/delArticle/:id',adminauth,controller.admin.main.delArticle)
  router.get('/admin/getArticleById/:id',adminauth,controller.admin.main.getArticleById)
  /*********留言管理***********/
  router.get('/admin/getCommentsInfo', adminauth, controller.admin.main.getCommentsInfo) // 获取留言列表信息
  router.get('/admin/deleteComment/:id', adminauth, controller.admin.main.deleteComment) // 删除留言信息

  router.post('/admin/logout', adminauth, controller.admin.main.logout) // 登出

  // /*********个人信息管理***********/
  router.get('/admin/getUserInfo', adminauth, controller.admin.main.getUserInfo) // 获取个人信息
  router.post('/admin/updateUserInfo', adminauth, controller.admin.main.updateUserInfo) // 更新个人信息
  // router.post('/admin/upload', controller.admin.main.upload) // 头像上传 
  
}