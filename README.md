# react-blog

基于react-hooks egg.js 开发的个人博客系统

## blog 前台 用户使用，博客展现
(yarn dev)

react-markdown react专用的markdown解析组件 但这个插件的配置项太少了
所以改用 marked + highlight.js 方案 较为成熟

## service 使用egg.js搭建接口中台
(npm run dev)

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

首页点击文章到详情页 会出现 跨域 问题 就需要用到 yarn add egg-cors  再配置插件解决跨域问题

重构detaied页面 之前用react-markdown,但是这个插件的配置项还是太少了，所以改用 marked+highlight.js
重构detailed页面菜单栏 之前用 markdown-navbar 现在改用 tocify

接口模块化和读取文章类别，以及根据类别获取对应文章列表

-> 开始后台管理模块开发
## 后台管理  admin
(yarn start)

文章类别管理，系统设置
采用React Hooks + Ant Design，对博客文章的管理和登录系统进行开发
环境搭建 create-react-app admin
路由配置 yarn add react-router-dom  pages/main.js 文件下配置路由
