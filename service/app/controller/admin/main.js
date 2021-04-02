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
    const sql = " SELECT userName FROM admin_user WHERE userName = '"+userName +
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
}

module.exports = MainController