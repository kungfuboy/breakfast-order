const fs = require('fs')
const Router = require('koa-router')
const router = new Router()
const Redis = require('koa-redis')

const Store = new Redis().client

// router.prefix('/api')
const _toString = (str) => unescape(str.replace(/\\u/g, '%u'))



router
.post('/api/pushData', (ctx, next) => {
    // req
    const {name, order} = ctx.request.body
    const key = name.charCodeAt(0).toString(16)
    Store.hset('order', key, JSON.stringify(order))
    ctx.response.type = 'json'
    ctx.response.body = { data: 'ok' }
})
.get('/api/getData', async (ctx, next) => {
    const arr = await Store.hkeys('order')
    const res = await Promise.all(arr.map(async item => ({
        name: _toString(item),
        order: await Store.hget('order', item)
    })))
    ctx.response.type = 'json'
    ctx.response.body = { data: 'ok' }
})

module.exports = router