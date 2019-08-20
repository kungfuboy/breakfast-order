const fs = require('fs')
const Router = require('koa-router')
const router = new Router()

router
.post('/api/pushData', (ctx, next) => {
    console.log('==============')
    ctx.response.type = 'json'
    ctx.response.body = { data: 'ok' }
})

module.exports = router