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
pages/Login.js  登录页面
后台管理界面搭建

中后台结合
service app controller admin main.js
后台登录报错（跨域） ： Access to XMLHttpRequest at 'http://127.0.0.1:7001/admin/checkLogin' from origin 'http://localhost:3001' has been blocked by CORS policy:
解决： 去service config config.defalt.js中 配置跨域设置 

路由守卫 没登录没法调用接口
利用egg.js中间件 app.middleware.xx 路由守卫 验证 service app  新建 middleware adminauth.js
错误效果：账号密码输入后无法登录
出现问题的原因: 无法获取ctx.session 
解决：改成由http:localhost (http://127.0.0.1/)访问即可获取 因为egg项目启动地址为本机ip地址：192.168.*.***前端项目自带的启动地址为：localhost
获取文章类型： 
1. service app controll admin.js 编写 getTypeInfo 接口 从数据库获取数据
2. 路由配置  service app router admin.js
3. 回到后台 admin src config apiUrl.js 
4. 页面获取数据 add src pages addArticle.js
添加文章：
修改文章： 解决 设置 id 字段为主键并且自增 
删除文章： 设置阻止默认事件！不然出现异常画面


前台详情页面评论功能 数据库comment 字段类型一定要传正确！