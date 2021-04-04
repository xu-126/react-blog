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
              // "FROM_UNIXTIME(article_content.release_time,'%Y-%m-%d %H:%i:%s' ) as release_time,"+
              'article_content.release_time as release_time,'+
              'article_content.visit_count as visit_count ,'+
              '.article_type.typeName as typeName '+
              'FROM article_content LEFT JOIN article_type ON article_content.type_id = article_type.id'              
   
     const results = await this.app.mysql.query(sql)
 
     this.ctx.body={
         data:results
     }
 }

   /**
   * 根据浏览量降序获取前面8条文章信息
   */
    async getArticleByViewCount() {
      const sql = 'SELECT * From article_content ORDER BY visit_count DESC LIMIT 10';
  
      const result = await this.app.mysql.query(sql);
  
      this.ctx.body = {
        data: result
      };
    }

  /**
   * 添加留言信息
   */
     async addArticleComment() {
      const tempComment = this.ctx.request.body
  
      const result = await this.app.mysql.insert('comment', tempComment)
      const isSuccess = result.affectedRows === 1 // 返回true添加成功，否则，添加失败
  
        this.ctx.body = {
          isSuccess
        }
    }

 // 根据接收的文章id查出内容
 async getArticleById() {
   // 先配置路由的动态传值，然后再接收值
   let id = this.ctx.params.id

   let sql = 'SELECT article_content.id as id,' +
   'article_content.title as title,'+
   'article_content.introduce as introduce,'+
   "FROM_UNIXTIME(article_content.release_time,'%Y-%m-%d %H:%i:%s' ) as release_time,"+
   'article_content.visit_count as visit_count ,'+
   '.article_type.typeName as typeName,'+
   '.article_type.id as typeId ' +
   'FROM article_content LEFT JOIN article_type ON article_content.type_id ' +
   'WHERE article_content.id='+id

   const results = await this.app.mysql.query(sql)
 
   this.ctx.body={
       data:results
   }
 }

 // 得到类别名称和编号
 async getTypeInfo() {
  const result = await this.app.mysql.select('article_type')  //article_type 表名
  this.ctx.body = {data:result}
 }

 // 根据类别ID获得文章列表
 async getListById(){
  let id = this.ctx.params.id
  let sql = 'SELECT article_content.id as id,'+
  'article_content.title as title,'+
  'article_content.introduce as introduce,'+
  "FROM_UNIXTIME(article_content.release_time,'%Y-%m-%d %H:%i:%s' ) as release_time,"+
  'article_content.visit_count as visit_count ,'+
  'article_type.typeName as typeName '+
  'FROM article_content LEFT JOIN article_type ON article_content.type_id = article_type.Id '+
  'WHERE article_type.id='+id
  const result = await this.app.mysql.query(sql)
  this.ctx.body={data:result}

}


}

module.exports = HomeController;
