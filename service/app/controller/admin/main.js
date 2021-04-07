'use strict';

const Controller = require('egg').Controller

class MainController extends Controller{

  async index(){
    //首页的文章列表数据
    this.ctx.body='hi api'
  }

   //判断用户名密码是否正确
  async checkLogin(){
    let userName = this.ctx.request.body.userName
    let password = this.ctx.request.body.password
    const sql = " SELECT userName FROM userInfo WHERE userName = '"+userName +
                "' AND password = '"+password+"'"

    const res = await this.app.mysql.query(sql)
    if(res.length>0){
        //登录成功,进行session缓存
        let openId=new Date().getTime()
        this.ctx.session.openId={ 'openId':openId }
        this.ctx.body={'data':'登录成功','openId':openId}

    }else{
        this.ctx.body={data:'登录失败'}
    } 
  } 

  //后台文章分类信息
  async getTypeInfo(){
    const resType = await this.app.mysql.select('article_type')
    this.ctx.body={data:resType}
  }

  // 添加文章
  async addArticle(){
    let tmpArticle= this.ctx.request.body
    // tmpArticle.
    const result = await this.app.mysql.insert('article_content',tmpArticle)
    const insertSuccess = result.affectedRows === 1
    const insertId = result.insertId

    this.ctx.body={
        isScuccess: insertSuccess,
        insertId: insertId
    }
 }

 //修改文章
  async updateArticle(){
    let tmpArticle= this.ctx.request.body

    const result = await this.app.mysql.update('article_content', tmpArticle);
    const updateSuccess = result.affectedRows === 1;
    console.log(updateSuccess)
    this.ctx.body={
        isScuccess:updateSuccess
    }
  }  

  //获得文章列表
  async getArticleList(){
    let sql = 'SELECT article_content.id as id,'+
                'article_content.title as title,'+
                'article_content.introduce as introduce,'+
                'article_content.visit_count as visit_count,'+
                'article_content.release_time as release_time,'+
                'article_type.typeName as typeName '+
                'FROM article_content LEFT JOIN article_type ON article_content.type_id = article_type.Id '+
                'ORDER BY article_content.id DESC '

    const resList = await this.app.mysql.query(sql)
    this.ctx.body={list:resList}
  }

  //删除文章
  async delArticle(){
    let id = this.ctx.params.id
    const res = await this.app.mysql.delete('article_content',{'id':id})
    this.ctx.body={data:res}
  }

  //根据文章ID得到文章详情，用于修改文章
  async getArticleById(){
    let id = this.ctx.params.id

    let sql = 'SELECT article_content.id as id,'+
    'article_content.title as title,'+
    'article_content.introduce as introduce,'+
    'article_content.content as content,'+
    'article_content.release_time as release_time,'+
    'article_content.visit_count as visit_count,'+
    'article_type.typeName as typeName ,'+
    'article_type.id as typeId '+
    'FROM article_content LEFT JOIN article_type ON article_content.type_id = article_type.Id '+
    'WHERE article_content.id='+id
    const result = await this.app.mysql.query(sql)
    this.ctx.body={data:result}
  }

   /*********************************留言管理*************************************/

    /**
     * 获取留言信息
     */
     async getCommentsInfo() {
      const sql = 'SELECT comment.id as id, '+
                  'comment.nickname as nickname, '+
                  'comment.phone as phone, '+
                  'comment.content as content, '+
                  'comment.release_time as release_time, '+
                  'article_content.title as title '+
                  'FROM comment LEFT JOIN article_content ON comment.articleId = article_content.id '+
                  'ORDER BY comment.id DESC'

      const result = await this.app.mysql.query(sql)

      this.ctx.body = {
        data: result
      }
    }

    /**
     * 删除文章留言信息
     */
    async deleteComment() {
      const { id } = this.ctx.params

      const result = await this.app.mysql.delete('comment', { id })

      this.ctx.body = {
        data: result
      }
    }

    /**
     * 用户登出
     */
     async logout() {
      this.ctx.session = null
      let isSuccess = false
      // session中openId不存在，登出成功
      if(!this.ctx.session) {
        isSuccess = true
      }
      
      this.ctx.body = {
        isSuccess
      }
    }

    /*********************************个人信息管理*************************************/

    /**
     * 查询个人信息
     */
     async getUserInfo() {
      const result = await this.app.mysql.select('userinfo');

      this.ctx.body = {
        data: result
      }
    }

    /**
     * 更新个人信息
     */
    async updateUserInfo() {
      const tempUserInfo = this.ctx.request.body

      const result = await this.app.mysql.update('userinfo', tempUserInfo)
      const isSuccess = result.affectedRows === 1

      this.ctx.body = {
        isSuccess
      }
    }

    /**
     * 上传头像图片
     */
    // async upload() {
    //   const ctx = this.ctx;
    //   //egg-multipart 已经帮我们处理文件二进制对象
    //   // node.js 和 php 的上传唯一的不同就是 ，php 是转移一个 临时文件
    //   // node.js 和 其他语言（java c#） 一样操作文件流
    //   const stream = await ctx.getFileStream();
    //   //新建一个文件名
    //   const filename = md5(stream.filename) + path
    //       .extname(stream.filename)
    //       .toLocaleLowerCase();
    //   //文件生成绝对路径
    //   //当然这里这样是不行的，因为你还要判断一下是否存在文件路径
    //   const target = path.join(this.config.baseDir, 'app/public/uploads', filename);
    //   //生成一个文件写入 文件流
    //   const writeStream = fs.createWriteStream(target);
    //   try {
    //       //异步把文件流 写入
    //       await awaitWriteStream(stream.pipe(writeStream));
    //   } catch (err) {
    //       //如果出现错误，关闭管道
    //       await sendToWormhole(stream);
    //       throw err;
    //   }
    //   //文件响应
    //   ctx.body = {
    //       imgUrl: 'http://127.0.0.1:7001/public/uploads/' + filename
    //   };
    // }
}

module.exports = MainController