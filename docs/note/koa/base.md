## Koa 基础了解

> 简介： Koa 是一个新的 web 框架，由 Express 幕后的原班人马打造， 致力于成为 web 应用和 API 开发领域中的一个更小、更富有表现力、更健壮的基石。 通过利用 async 函数，Koa 帮你丢弃回调函数，并有力地增强错误处理。 Koa 并没有捆绑任何中间件， 而是提供了一套优雅的方法，帮助您快速而愉快地编写服务端应用程序。

### 安装

```bash
$ nvm install 7
$ yarn add koa
```

### 实例化 Koa App

```javascript
const koa = require('koa');
const app = new koa();
```

### app：实例化应用程序

- **console.log(app)** //=> { subdomainOffset: 2, proxy: false, env: 'development' }
- **app.use(Function)** 将给定的中间件方法添加到此应用程序
- **app.listen(Number)** Koa 应用程序不是 HTTP 服务器的 1 对 1 展现。 可以将一个或多个 Koa 应用程序安装在一起以形成具有单个 HTTP 服务器的更大应用程序。

```javascript
const koa = require('koa');
const app = new koa();
app.use(async (ctx) => {
  ctx.body = 'hello koaq';
});
app.listen(1314);

// 创建http服务器其他方法
// const http = require('http');
// const Koa = require('koa');
// const app = new Koa();
// http.createServer(app.callback()).listen(1314);

//同一个应用程序同时作为 HTTP 和 HTTPS 或多个地址
// const http = require('http');
// const https = require('https');
// const Koa = require('koa');
// const app = new Koa();
// http.createServer(app.callback()).listen(1314);
// https.createServer(app.callback()).listen(121314);
```

- **app.callback()**
- **app.keys = ['value1','calue2',...'valuen']** 设置签名的 Cookie 密钥
- **app.context.more = more()** 创建 ctx 的原型, 为 ctx 添加其他属性

```javascript
app.on('error', (err) => {
  log.error('server error', err);
});
```

### ctx：应用上下文对象

- **ctx.body = String/DOM/json** set siteContent
- **ctx.set(key,value)** set Response Headers
- **ctx.response.get(key)** get value of Response Header with key
- **ctx.req** Node 的 request 对象。
- **ctx.res** Node 的 response 对象。
- **ctx.request** koa 的 Request 对象。
- **ctx.response** koa 的 Response 对象。
- **ctx.state.user = await User.find(id)** ctx.state 推荐的命名空间，用于通过中间件传递信息和你的前端视图。
- **ctx.app** 应用程序实例引用
- **ctx.app.emit** Koa 应用扩展了内部 EventEmitter。
- **ctx.cookies.get(name, [options])** 获取 cookie
- **ctx.cookies.set(name, value, [options])** 设置 cookie

```text
通过[options]设置 cookie name 的 value相关属性 :
  maxAge: 一个数字表示从 Date.now() 得到的毫秒数
  signed: cookie 签名值
  expires: cookie 过期的 Date
  path: cookie 路径, 默认是'/'
  domain: cookie 域名
  secure: 安全 cookie
  httpOnly: 服务器可访问 cookie, 默认是 true
  overwrite: 一个布尔值，表示是否覆盖以前设置的同名的 cookie (默认是 false). 如果是 true, 在同一个请求中设置相同名称的所有 Cookie（不管路径或域）是否在设置此Cookie 时从 Set-Cookie 标头中过滤掉。
```

- **ctx.throw([status], [msg], [properties])** Helper 方法抛出一个 .status 属性默认为 500 的错误，这将允许 Koa 做出适当地响应。

```javascript
// 使用：
ctx.throw(400);
ctx.throw(400, 'name required');
ctx.throw(400, 'name required', { user: user });

// 例如 ctx.throw(400, 'name required') 等效于:
const err = new Error('name required');
err.status = 400;
err.expose = true;
throw err;
// 请注意，这些是用户级错误，并用 err.expose 标记;
// 这意味着消息适用于客户端响应，这通常不是错误消息的内容，因为您不想泄漏故障详细信息。
```

- **ctx.assert(value, [status], [msg], [properties])** 当 !value 时，Helper 方法抛出类似于 .throw() 的错误。这与 node 的 assert() 方法类似.

```javascript
ctx.assert(ctx.state.user, 401, 'User not found. Please login!');
```

- **ctx.respond = false** 为了绕过 Koa 的内置 response 处理，你可以显式设置 ctx.respond = false;。 如果您想要写入原始的 res 对象而不是让 Koa 处理你的 response，请使用此参数。
- **Request 别名**

```javascript
ctx.header;
ctx.headers;
ctx.method;
ctx.method = xxx;
ctx.url;
ctx.url = xxx;
ctx.originalUrl;
ctx.origin;
ctx.href;
ctx.path;
ctx.path = xxx;
ctx.query;
ctx.query = xxx;
ctx.querystring;
ctx.querystring = xxx;
ctx.host;
ctx.hostname;
ctx.fresh;
ctx.stale;
ctx.socket;
ctx.protocol;
ctx.secure;
ctx.ip;
ctx.ips;
ctx.subdomains;
ctx.is();
ctx.accepts();
ctx.acceptsEncodings();
ctx.acceptsCharsets();
ctx.acceptsLanguages();
ctx.get();
```

- **Response 别名**

```javascript
ctx.body;
ctx.body = xxx;
ctx.status;
ctx.status = xxx;
ctx.message;
ctx.message = xxx;
ctx.length = xxx;
ctx.length;
ctx.type = xxx;
ctx.type;
ctx.headerSent;
ctx.redirect();
ctx.attachment();
ctx.set();
ctx.append();
ctx.remove();
ctx.lastModified = xxx;
ctx.etag = xxx;
```

### 请求(Request)

- request.header 请求标头对象。
- request.header= 设置请求标头对象
- request.headers 请求标头对象。别名为 request.header.
- request.headers= 设置请求标头对象。别名为 request.header=.
- request.method 请求方法
- request.method= 设置请求方法，对于实现诸如 methodOverride() 的中间件是有用的。
- request.length 返回以数字返回请求的 Content-Length，或 undefined。
- request.url 获取请求 URL.
- request.url= 设置请求 URL, 对 url 重写有用。
- request.originalUrl 获取请求原始 URL。
- request.origin 获取 URL 的来源，包括 protocol 和 host。=> http://example.com
- request.href 获取完整的请求 URL，包括 protocol，host 和 url。=> http://example.com/foo/bar?q=1
- request.path 获取请求路径名。
- request.path= 设置请求路径名，并在存在时保留查询字符串。
- request.querystring 根据 ? 获取原始查询字符串.
- request.querystring= 设置原始查询字符串
- request.search 使用 ? 获取原始查询字符串。
- request.search= 设置原始查询字符串。
- request.host 获取当前主机（hostname:port）。当 app.proxy 是 true 时支持 X-Forwarded-Host，否则使用 Host。
- request.hostname 存在时获取主机名。当 app.proxy 是 true 时支持 X-Forwarded-Host，否则使用 Host。
- request.URL 获取 WHATWG 解析的 URL 对象。
- request.type 获取请求 Content-Type 不含参数 "charset"。=> "image/png"
- request.charset 在存在时获取请求字符集，或者 undefined。=> "utf-8"
- request.query 获取解析的查询字符串, 当没有查询字符串时，返回一个空对象。请注意，此 getter _不_ 支持嵌套解析。

```javascript
// 例如 "color=blue&size=small":
{
  color: 'blue',
  size: 'small'
}
```

- **request.query=** 将查询字符串设置为给定对象。 请注意，此 setter _不_ 支持嵌套对象。

```javascript
ctx.query = { next: '/login' };
```

- **request.fresh** 检查请求缓存是否“新鲜”，也就是内容没有改变。此方法用于 If-None-Match / ETag, 和 If-Modified-Since 和 Last-Modified 之间的缓存协商。 在设置一个或多个这些响应头后应该引用它。

```javascript
// 新鲜度检查需要状态20x或304
ctx.status = 200;
ctx.set('ETag', '123');

// 缓存是“新鲜”的
if (ctx.fresh) {
  ctx.status = 304;
  return;
} else {
  // 缓存是“陈旧”的，获取新数据
  ctx.body = await db.find('something');
}
```

- **request.stale** 相反与 request.fresh.
- **request.protocol** 返回请求协议，“https” 或 “http”。当 app.proxy 是 true 时支持 X-Forwarded-Proto。
- **request.secure** 通过 ctx.protocol == "https" 来检查请求是否通过 TLS 发出
- **request.ip** 请求远程地址。 当 app.proxy 是 true 时支持 X-Forwarded-Proto。
- **request.ips** 当 X-Forwarded-For 存在并且 app.proxy 被启用时，这些 ips 的数组被返回，从上游 - >下游排序。 禁用时返回一个空数组。
- **request.subdomains** 将子域返回为数组

```text
子域是应用程序主域之前主机的点分隔部分;
默认情况下，应用程序的域名假定为主机的最后两个部分，这可以通过设置 app.subdomainOffset 来更改
例如：
  域名：tobi.ferrets.example.com
  如果 app.subdomainOffset 未设置
    ctx.subdomains 是 ["ferrets", "tobi"]
  如果 app.subdomainOffset 是 3
    ctx.subdomains 是 ["tobi"]
```

- **request.is(types...)** 检查传入请求是否包含 Content-Type 头字段， 并且包含任意的 mime type。 如果没有请求主体，返回 null。 如果没有内容类型，或者匹配失败，则返回 false。 反之则返回匹配的 content-type。

```javascript
// 使用 Content-Type: text/html; charset=utf-8
ctx.is('html'); // => 'html'
ctx.is('text/html'); // => 'text/html'
ctx.is('text/*', 'text/html'); // => 'text/html'

// 当 Content-Type 是 application/json 时
ctx.is('json', 'urlencoded'); // => 'json'
ctx.is('application/json'); // => 'application/json'
ctx.is('html', 'application/*'); // => 'application/json'
ctx.is('html'); // => false

// 例如，如果要确保仅将图像发送到给定路由：
if (ctx.is('image/*')) {
  // 处理
} else {
  ctx.throw(415, 'images only!');
}
```

- **request.idempotent** 检查请求是否是幂等的。
- **request.socket** 返回请求套接字。
- **request.get(field)** 返回请求标头。

#### 内容协商

> Koa 的 request 对象包括由 accepts 和 negotiator 提供的有用的内容协商实体。

```text
这些实用程序是：
request.accepts(types)
request.acceptsEncodings(types)
request.acceptsCharsets(charsets)
request.acceptsLanguages(langs)
1、如果没有提供类型，则返回 所有 可接受的类型；
2、如果提供多种类型，将返回最佳匹配。 如果没有找到匹配项，则返回一个false，你应该向客户端发送一个406 "Not Acceptable" 响应；
3、如果接收到任何类型的接收头，则会返回第一个类型。 因此，你提供的类型的顺序很重要。
```

- **request.accepts(types)** 检查给定的 type(s) 是否可以接受，如果 true，返回最佳匹配，否则为 false。 type 值可能是一个或多个 mime 类型的字符串，如 application/json，扩展名称如 json，或数组 ["json", "html", "text/plain"]。

```javascript
// Accept: text/html
ctx.accepts('html');
// => "html"

// Accept: text/*, application/json
ctx.accepts('html');
// => "html"
ctx.accepts('text/html');
// => "text/html"
ctx.accepts('json', 'text');
// => "json"
ctx.accepts('application/json');
// => "application/json"

// Accept: text/*, application/json
ctx.accepts('image/png');
ctx.accepts('png');
// => false

// Accept: text/*;q=.5, application/json
ctx.accepts(['html', 'json']);
ctx.accepts('html', 'json');
// => "json"

// No Accept header
ctx.accepts('html', 'json');
// => "html"
ctx.accepts('json', 'html');
// => "json"

// 你可以根据需要多次调用 ctx.accepts()，或使用 switch：
switch (ctx.accepts('json', 'html', 'text')) {
  case 'json':
    break;
  case 'html':
    break;
  case 'text':
    break;
  default:
    ctx.throw(406, 'json, html, or text only');
}
```

- **request.acceptsEncodings(encodings)** 检查 encodings 是否可以接受，返回最佳匹配为 true，否则为 false。 请注意，您应该将 identity 作为编码之一

```javascript
// Accept-Encoding: gzip
ctx.acceptsEncodings('gzip', 'deflate', 'identity');
// => "gzip"

ctx.acceptsEncodings(['gzip', 'deflate', 'identity']);
// => "gzip"
// 当没有给出参数时，所有接受的编码将作为数组返回：

// Accept-Encoding: gzip, deflate
ctx.acceptsEncodings();
// => ["gzip", "deflate", "identity"]

// 注意，如果客户端显式地发送 identity;q=0，那么 identity 编码（这意味着没有编码）可能是不可接受的。 虽然这是一个边缘的情况，你仍然应该处理这种方法返回 false 的情况。
```

- **request.acceptsCharsets(charsets)** 检查 charsets 是否可以接受，在 true 时返回最佳匹配，否则为 false。

```javascript
// Accept-Charset: utf-8, iso-8859-1;q=0.2, utf-7;q=0.5
ctx.acceptsCharsets('utf-8', 'utf-7');
// => "utf-8"

ctx.acceptsCharsets(['utf-7', 'utf-8']);
// => "utf-8"

// 当没有参数被赋予所有被接受的字符集将作为数组返回
// Accept-Charset: utf-8, iso-8859-1;q=0.2, utf-7;q=0.5
ctx.acceptsCharsets();
// => ["utf-8", "utf-7", "iso-8859-1"]
```

- **request.acceptsLanguages(langs)** 检查 langs 是否可以接受，如果为 true，返回最佳匹配，否则为 false。

```javascript
// en;q=0.8 猜测为en的权重为0.8
// Accept-Language: en;q=0.8, es, pt
ctx.acceptsLanguages('es', 'en');
// => "es"

ctx.acceptsLanguages(['en', 'es']);
// => "es"

// 当没有参数被赋予所有接受的语言将作为数组返回：
// Accept-Language: en;q=0.8, es, pt
ctx.acceptsLanguages();
// => ["es", "pt", "en"]
```

### 响应(Response)

- **response.header** 响应标头对象。
- **response.headers** 响应标头对象。别名是 response.header.
- **response.socket** 响应套接字。
- **response.status** 获取响应状态。默认情况下，response.status 设置为 404 而不是像 node 的 res.statusCode 那样默认为 200。
- **response.status=** 通过数字代码设置响应状态

```json
100 "continue"
101 "switching protocols"
102 "processing"
200 "ok"
201 "created"
202 "accepted"
203 "non-authoritative information"
204 "no content"
205 "reset content"
206 "partial content"
207 "multi-status"
208 "already reported"
226 "im used"
300 "multiple choices"
301 "moved permanently"
302 "found"
303 "see other"
304 "not modified"
305 "use proxy"
307 "temporary redirect"
308 "permanent redirect"
400 "bad request"
401 "unauthorized"
402 "payment required"
403 "forbidden"
404 "not found"
405 "method not allowed"
406 "not acceptable"
407 "proxy authentication required"
408 "request timeout"
409 "conflict"
410 "gone"
411 "length required"
412 "precondition failed"
413 "payload too large"
414 "uri too long"
415 "unsupported media type"
416 "range not satisfiable"
417 "expectation failed"
418 "I'm a teapot"
422 "unprocessable entity"
423 "locked"
424 "failed dependency"
426 "upgrade required"
428 "precondition required"
429 "too many requests"
431 "request header fields too large"
500 "internal server error"
501 "not implemented"
502 "bad gateway"
503 "service unavailable"
504 "gateway timeout"
505 "http version not supported"
506 "variant also negotiates"
507 "insufficient storage"
508 "loop detected"
510 "not extended"
511 "network authentication required"
```

- **response.message** 获取响应的状态消息. 默认情况下, response.message 与 response.status 关联.
- **response.message=** 将响应的状态消息设置为给定值。
- **response.length=** 将响应的 Content-Length 设置为给定值
- **response.length** 以数字返回响应的 Content-Length，或者从 ctx.body 推导出来，或者 undefined。
- **response.body** 获取响应主体。
- **response.body=** 设置响应体。

```text
将响应体设置为以下之一：
  string 写入
  Buffer 写入
  Stream 管道
  Object || Array JSON-字符串化
  null 无内容响应
如果 response.status 未被设置, Koa 将会自动设置状态为 200 或 204。

Koa 没有防范作为响应体的所有内容 - 函数没有有意义地序列化，返回布尔值可能会根据您的应用程序而有意义;
并且当错误生效时，它可能无法正常工作 错误的属性无法枚举;
我们建议在您的应用中添加中间件，以确定每个应用的正文类型。
  示例中间件可能是：
  app.use(async (ctx, next) => {
    await next()
    ctx.assert.equal('object', typeof ctx, 500, '某些开发错误')
  })

1、String：Content-Type 默认为 text/html 或 text/plain, 同时默认字符集是 utf-8。Content-Length 字段也是如此。
2、Buffer：Content-Type 默认为 application/octet-stream, 并且 Content-Length 字段也是如此。
3、Stream：Content-Type 默认为 application/octet-stream；
  每当流被设置为响应主体时，.onerror 作为侦听器自动添加到 error 事件中以捕获任何错误；
  此外，每当请求关闭（甚至过早）时，流都将被销毁。
  以下是流错误处理的示例，而不会自动破坏流：
  const PassThrough = require('stream').PassThrough;
  app.use(async ctx => {
    ctx.body = someHTTPStream.on('error', ctx.onerror).pipe(PassThrough());
  });
4、Object：Content-Type 默认为 application/json. 这包括普通的对象 { foo: 'bar' } 和数组 ['foo', 'bar']。
```

- **response.get(field)** 不区分大小写获取响应标头字段值 field。

```javascript
const etag = ctx.response.get('ETag');
```

- **response.set(field, value)** 设置响应标头 field 到 value:

```javascript
ctx.set('Cache-Control', 'no-cache');
```

- **response.append(field, value)** 用值 value 附加额外的标头 field。

```javascript
ctx.append('Link', '<http://127.0.0.1/>');
```

- **response.set(fields)** 用一个对象设置多个响应标头 fields。

```javascript
ctx.set({
  Etag: '1234',
  'Last-Modified': date,
});
// 这将委托给 setHeader ，它通过指定的键设置或更新标头，并且不重置整个标头。
```

- **response.remove(field)** 删除标头 field。
- **response.type** 获取响应 Content-Type 不含参数 "charset"。

```javascript
const ct = ctx.type;
// => "image/png"
```

- **response.type=** 设置响应 Content-Type 通过 mime 字符串或文件扩展名。

```javascript
ctx.type = 'text/plain; charset=utf-8';
ctx.type = 'image/png';
ctx.type = '.png';
ctx.type = 'png';

// 注意: 在适当的情况下为你选择 charset, 比如 response.type = 'html' 将默认是 "utf-8". 如果你想覆盖 charset, 使用 ctx.set('Content-Type', 'text/html') 将响应头字段设置为直接值。
```

- **response.is(types...)** 非常类似 ctx.request.is(). 检查响应类型是否是所提供的类型之一。这对于创建操纵响应的中间件特别有用。

```javascript
// 例如, 这是一个中间件，可以削减除流之外的所有HTML响应。
const minify = require('html-minifier');
app.use(async (ctx, next) => {
  await next();
  if (!ctx.response.is('html')) return;
  let body = ctx.body;
  if (!body || body.pipe) return;
  if (Buffer.isBuffer(body)) body = body.toString();
  ctx.body = minify(body);
});
```

- **response.redirect(url, [alt])** 执行 [302] 重定向到 url.

```javascript
// 字符串 “back” 是特别提供Referrer支持的，当Referrer不存在时，使用 alt 或“/”。
ctx.redirect('back');
ctx.redirect('back', '/index.html');
ctx.redirect('/login');
ctx.redirect('http://google.com');

// 要更改 “302” 的默认状态，只需在该调用之前或之后分配状态。要变更主体请在此调用之后:
ctx.status = 301;
ctx.redirect('/cart');
ctx.body = 'Redirecting to shopping cart';
```

- **response.attachment([filename], [options])** 将 Content-Disposition 设置为 “附件” 以指示客户端提示下载。(可选)指定下载的 filename 和部分参数。
- **response.headerSent** 检查是否已经发送了一个响应头。 用于查看客户端是否可能会收到错误通知。
- **response.lastModified** 将 Last-Modified 标头返回为 Date, 如果存在。
- **response.lastModified=** 将 Last-Modified 标头设置为适当的 UTC 字符串。您可以将其设置为 Date 或日期字符串。

```javascript
ctx.response.lastModified = new Date();
```

- **response.etag=** 设置包含/包裹的 ETag 响应，请注意，没有相应的 response.etag getter。

```javascript
ctx.response.etag = crypto.createHash('md5').update(ctx.body).digest('hex');
```

- **response.vary(field)** 在 field 上变化
- **response.flushHeaders()** 刷新任何设置的标头，并开始主体。
