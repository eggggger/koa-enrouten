
'use strict'

/**
 * Module dependencies
 */

const router = require('koa-router')()

/**
 * test
 */

router.get('/', (ctx) => {
  ctx.body = 1
})

router.get('/test', (ctx) => {
  ctx.body = 1
})

/**
 * Expose router
 */

module.exports = router
