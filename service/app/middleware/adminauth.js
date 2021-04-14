module.exports = options =>{
  // router 中使用 app.middleware.adminauth()
  return async function adminauth(ctx,next){
    console.log('ctx.session.openId: ',ctx.session.openId)
    if(ctx.session.openId){
        await next();
    } else{
        ctx.body={data:'没有登录'}
    }
  }
}