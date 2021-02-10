'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    this.ctx.body="api接口"
  }
  async list() {
    const { ctx } = this;
    ctx.body = '<h1>blog list</h1>';
  }
}

module.exports = HomeController;
