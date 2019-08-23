#! /usr/bin/env node

const Koa = require('koa')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const router = require('./router')
const Redis = require('koa-redis')

const Store = new Redis().client

const app = new Koa()
const time = 604800000

const timer = () => {
  setInterval(async () => {
    const arr = await Store.hkeys('order')
    const res = await Promise.all(arr.map(async item => ({
        name: unescape(item),
        order: JSON.parse(await Store.hget('order', item))
    })))
    console.log(res)
    Store.del('order')
  }, time)
}

app
  .use(cors()) // 允许跨域
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())

// 监听
app.listen(3030, () => {
  timer()
  console.log('Listening 3030...')
})