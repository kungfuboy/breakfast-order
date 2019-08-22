const fs = require('fs')
const Router = require('koa-router')
const router = new Router()
const Redis = require('koa-redis')

const Store = new Redis().client

// router.prefix('/api')

router
.post('/api/pushData', (ctx, next) => {
    // req
    const {name, order} = ctx.request.body
    const key = escape(name)
    Store.hset('order', key, JSON.stringify(order))
    ctx.response.type = 'json'
    ctx.response.body = { status: 200, data: 'ok' }
})
.post('/api/changeMenu', (ctx, next) => {
    const {data} = ctx.request.body
    Store.hset('menu', 'menuList', JSON.stringify(data))
    ctx.response.type = 'json'
    ctx.response.body = { success: true, data: 'ok' }
})
.get('/api/getData', async (ctx, next) => {
    // req
    const arr = await Store.hkeys('order')
    console.log(arr)
    const res = await Promise.all(arr.map(async item => ({
        name: unescape(item),
        order: JSON.parse(await Store.hget('order', item))
    })))
    // res
    ctx.response.type = 'json'
    ctx.response.body = { data: res }
})
.get('/api/search', async (ctx, next) => {
    const {name} = ctx.query
    const res = await Store.hget('order', escape(name))
    // res
    ctx.response.type = 'json'
    ctx.response.body = { data: JSON.parse(res) || null }
})

module.exports = router