const assert = require('assert')
const supertest = require('supertest')
const Koa = require('koa')
const app = new Koa()
const enrouten = require('../lib')
app.use(enrouten({ cwd: __dirname + '/routes' }))
const request = supertest(app.listen())

const routes = [
  '/',
  '/one/two/',
  '/one/two/three/',
]
routes.forEach(route => {
  describe(`${route}`, () => {
    it('should return 1 | with /', done => {
      request
        .get(route)
        .expect(200)
        .end((err, res) => {
          if (err)
            throw err
          assert(res.body)
          done()
        })
    })

    it('should return 1 | with /test', done => {
      request
        .get(route)
        .expect(200)
        .end((err, res) => {
          if (err)
            throw err
          assert(res.body)
          done()
        })
    })
  })
})

const ignores = [
  '/one/_two/',
  '/one/two/_three/',
]
ignores.forEach(route => {
  describe(`${route}`, () => {
    it('should return 404 status', done => {
      request
        .get(route)
        .expect(404)
        .end((err, res) => {
          done()
        })
    })
  })
})
