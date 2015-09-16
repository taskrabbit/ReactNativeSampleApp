"use strict";

const koa = require("koa");
const errorHandler = require("koa-error");
const bodyParser = require("koa-bodyparser");
const logger = require("koa-logger");
const Router = require("koa-router");

const app = module.exports = koa();
app.use(logger());
app.use(errorHandler());
app.use(bodyParser());


var router = new Router();

router.use(function *(next) {
  // everything json
  this.type = "json";
  this.headers['accept'] = "application/json";
  yield next;
});


var secured = require('./secured')
var auth    = require("./auth");
var posts   = require("./posts");
 
router.post("/api/signup",  auth.createUser);
router.post("/api/login",   auth.loginUser);
router.get ("/api/account", secured, auth.getCurrentUser);
router.get ("/api/posts/:username", posts.userPosts);
app.use(router.routes());

app.listen(3000);
console.log("Server started, listening on port: 3000");
