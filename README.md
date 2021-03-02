# react-blog

基于react-hooks egg.js 开发的个人博客系统

## blog 前台 用户使用，博客展现

react-markdown react专用的markdown解析组件 但这个插件的配置项太少了
所以改用 marked + highlight.js 方案 较为成熟

## service 使用egg.js搭建接口中台

数据接口，业务逻辑
egg.js 底层即为 koa
restful app 前后端 约束 请求方式 get: 获取资源 post: 新建资源 put: 更新资源 delete: 删除资源

app -> controller ->  admin 后台管理 控制器
app -> controller -> default 前台管理 控制器
app -> router 配置前后台路由

egg-mysql插件连接数据库mysql并使用
config.default.js 配置数据库连接

新建数据库 article_type 文章类型表 article_content 文章内容表
配置路由 访问页面 返回接口数据

前台读取文章列表接口数据 报错axios is not defined/ connect ECONNREFUSED 127.0.0.1:7001 =》 因为获取本地数据但是端口没有启动所以无法连接获取到数据，进入service层 运行 npm run dev 即可启动7001端口
## 后台管理

文章类别管理，系统设置
