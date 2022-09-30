## 初始化项目

```bash
$ mkdir egg-custom
$ cd egg-custom
$ npm init
$ npm i egg --save
$ npm i egg-bin --save-dev
```

## Egg 内置对象方法

来源： require('egg')[egg 内置对象方法]

```javascript
// app/controller/xxx.js
const Controller = require('egg').Controller;

// app/service/news.js
const Service = require('egg').Service;
```

- Controller
  一般配合路由模块处理路由响应的动作及结果

- Service
  在实际应用中，Controller 一般不会自己产出数据，也不会包含复杂的逻辑，复杂的过程应抽象为业务逻辑层 [Service](https://eggjs.org/zh-cn/basics/service.html)。

  框架提供了内置的 [HttpClient](https://eggjs.org/zh-cn/core/httpclient.html) 来方便开发者使用 HTTP 请求。

## Egg router -> app 对象方法

```javascript
// app/router.js
module.exports = (app) => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
};
```

- router
- controller

## Egg View 视图扩展

框架提供了一种快速扩展的方式，只需在 `app/extend` 目录下提供扩展脚本即可，具体参见[扩展](https://eggjs.org/zh-cn/basics/extend.html)。
在这里，我们可以使用 View 插件支持的 Helper 来实现：

```javascript
// app/extend/helper.js
const moment = require('moment');
exports.relativeTime = (time) => moment(new Date(time * 1000)).fromNow();
```

在模板里面使用：

```html
<!-- app/view/news/list.tpl -->
{{ helper.relativeTime(item.time) }}
```
