let ipUrl = 'http://127.0.0.1:7001/default/' 

let servicePath = {
    getArticleList : ipUrl + 'getArticleList' ,  //  首页文章列表接口
    getArticleById : ipUrl + 'getArticleById/',  // 文章详细页内容接口 ,需要接收参数
    getTypeInfo: ipUrl + 'getTypeInfo', // 文章类别接口
    getListById : ipUrl + 'getListById/',  // 根据类别ID获得文章列表
    getArticleByViewCount: ipUrl + 'getArticleByViewCount', // 根据浏览量降序获取前六条文章信息
    addArticleComment: ipUrl + 'addArticleComment', // 添加文章留言信息接口

}
export default servicePath;
