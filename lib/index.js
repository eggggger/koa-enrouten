
'use strict'

/**
 * Module dependencies
 */

const router = require('koa-router')()
const glob = require('glob')
const path = require('path')
const debug = require('debug')('api')

/**
 * Expose router
 * Load api in root directory
 *
 * @param {String} opts.cwd
 * @param {String} opts.prefix
 * @param {String} opts.root
 * @param {String} opts.pattern
 * @param {Array}  opts.ignore
 * @return middleware
 */

module.exports = (opts) => {
  if (!opts.cwd)
    throw new TypeError('opts.cwd lack!')

  const {
    cwd,
    prefix = '',
    root = 'root',
    pattern = '**/*.js',
    ignore = ['**/*test.js', '**/_*/*', '**/_*'],
    realpath = true
  } = opts
  const regExp = new RegExp(`(/|^)root(?=/)`, 'g')
  const matches = glob.sync(pattern, { cwd, realpath, ignore })

  matches.forEach(match => {
    const ext = path.parse(match).ext
    const apiRouter = require(match)
    const postfix = path.relative(cwd, match)
      .slice(0, -ext.length)
      .replace(regExp, '')
      .replace(/\/?index$/, '')
    const route = `${prefix && '/'}${prefix}/${postfix}`
    debug(route)
    router.use(route, apiRouter.routes())
  })

  return router.routes()
}
