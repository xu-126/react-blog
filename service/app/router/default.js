module.exports = app => {
  const {router,controller} = app
  router.get('/default/index',controller.default.home.index)
  router.post('/default/getArticleList',controller.default.home.getArticleList)
  router.get('/default/getArticleById/:id',controller.default.home.getArticleById)
  router.get('/default/getTypeInfo',controller.default.home.getTypeInfo)
  router.get('/default/getListById/:id',controller.default.home.getListById)
  router.get('/default/getArticleByViewCount', controller.default.home.getArticleByViewCount); 
  router.post('/default/addArticleComment', controller.default.home.addArticleComment); // 添加文章留言信息

}