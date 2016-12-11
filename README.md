koa-enrouten
==================

based on [koa-router@7](https://github.com/alexmingoia/koa-router/tree/v7.1.0)
Node version > 6

### Usage

npm install koa-routen

```
const enrouten = require('koa-routen')
const Koa = require('koa')
const app = new Koa()

app.use(enrouten({ cwd: `${__dirname}/api` }))
```

### Tests

```
$ npm test
```
