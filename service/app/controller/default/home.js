'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  //获取用户表的数据
  async index(){      
    let result = await this.app.mysql.get("article_type",{})
    console.log(result)
    this.ctx.body = result
  }
  // 获取文章列表具体内容数据
  async getArticleList(){
    let sql = 'SELECT article_content.id as id,'+
              'article_content.title as title,'+
              'article_content.introduce as introduce,'+
              'article_content.release_time as release_time,'+
              'article_content.visit_count as visit_count ,'+
              '.article_type.typeName as typeName '+
              'FROM article_content LEFT JOIN article_type ON article_content.type_id = article_type.id'
 
     const results = await this.app.mysql.query(sql)
 
     this.ctx.body={
         data:results
     }
 }
}

module.exports = HomeController;
