'use strict';

var koa = require('koa');
var app = koa();
var path = require('path');
var router = require('koa-router')();
var fs = require('fs');

app.use(require('koa-static')(path.resolve(__dirname, './static')));

// logger
app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

// response
router.get('/index/:pid', function* (next) {
  var pid = this.params.pid;
  this.type = 'html';
  this.body = fs.readFileSync(path.resolve(__dirname, './html/', `index${pid}.html`));
  yield next;
});

router.get('/api/v1', function* (next) {
  this.type = 'json';
  this.body = {};
  yield next;
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);