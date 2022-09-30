## Axios 基础了解

### 1. GET

```javascript
axios
  .get('/api?id=123')
  .then((res) => {})
  .catch((err) => {})
  .then(() => {
    /*always executed*/
  });
```

```javascript
axios
  .get('/api', { params: { id: 123 } })
  .then((res) => {})
  .catch((err) => {})
  .then(() => {
    /*always executed*/
  });
```

```javascript
async () => {
  try {
    let ret = await axios.get('/api?id=123');
  } catch (err) {}
};
```

```javascript
// GET request for remote image
axios({
  method: 'get',
  url: '/api/image',
  responseType: 'stream',
}).then((res) => {
  res.data.pipe(fs.createWriteStream('imgNmae.jpg'));
});
```

### 2. POST

```javascript
axios
  .post('/api', { name: 'name', pwd: 'pwd' })
  .then((res) => {})
  .catch((err) => {});
```

```javascript
axios({
  method: 'post',
  url: '/api/post',
  data: {
    name: 'name',
    pwd: 'pwd',
  },
});
```

### 3. ALL(More than two and more request)

```javascript
function GetApiOne() {
  return axios.get('/api/one');
}
function GetApiTwo() {
  return axios.get('/api/two');
}
axios.all([GetApiOne(), GetApiTwo()]).then(
  axios.spread((acct, perms) => {
    // Both requests are now complete
  }),
);
```

### 4. Default

```javascript
// axios(url[, config])
// Send a GET request (default method)
axios('/api/default', {});
```

### 5. Request method aliases[请求方法别称]

```javascript
// For convenience aliases have been provided for all supported request methods.
axios.request(config)
axios.get(url[, config])
axios.delete(url[, config])
axios.head(url[, config])
axios.options(url[, config])
axios.post(url[, data[, config]])
axios.put(url[, data[, config]])
axios.patch(url[, data[, config]])
// When using the alias methods url, method, and data properties don’t need to be specified in config.
```

### 6. Concurrency[并发]

```javascript
// Helper functions for dealing with concurrent requests.
axios.all(iterable);
axios.spread(callback);
```

### 7. Creating an instance[自建实例]

```javascript
// Create a new instance of axios with a custom config
// axios.create([config])
const instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' },
});
```

### 8. Instance methods(实例方法)

```javascript
// The available instance methods are listed below. The specified config will be merged with the instance config.
axios#request(config)
axios#get(url[, config])
axios#delete(url[, config])
axios#head(url[, config])
axios#options(url[, config])
axios#post(url[, data[, config]])
axios#put(url[, data[, config]])
axios#patch(url[, data[, config]])
axios#getUri([config])
```

### 9. Request config

```javascript
// These are the available config options for making requests. Only the url is required. Requests will default to GET if method is not specified.
{
    url: '/api',
    method: 'get', //default
    baseUrl: 'https://basedomain.com/apis',
    transformRequest: [(data,headers)=>{
        // Do whatever you want to transform the data
        return data;
    }],
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
    params: {id: 123},
    paramsSerializer: function (params) {
        return Qs.stringify(params, {arrayFormat: 'brackets'})
    },
    data: {
        name: 'name'
    },
    timeout: 1000,//default 0 (no timeout)
    withCredentials: false, //default
    adapter: function (config){

    },
    auth: {
        name: 'name',
        pwd: 'pwd'
    },
    responseType: 'json', //default
    responseEncoding: 'utf-8', //default
    xsrfCookieName: 'XSRF-TOKIN', //default
    xsrfHeaderName: 'X-XSRF-TOKEN', //default
    onUploadProgress: function (progressEvent) {
        // Do whatever you want with the native progress event
    },
    maxContentLength: 2000,
    validateStatus: function(status) {
        return status >= 200 && status < 300; // default
    },
    maxRedirects: 5, // default
    socketPath: null, // default
    httpAgent: new http.Agent({ keepAlive: true }),
  	httpsAgent: new https.Agent({ keepAlive: true }),
   	proxy: {
        host: '127.0.0.1',
        port: 9000,
        auth: {
          username: 'mikeymike',
          password: 'rapunz3l'
        }
  	},
    cancelToken: new CancelToken(function (cancel) {
  	})
}


```

### 10. Response Schema

```javascript
// The response(res) for a request contains the following information.
{
    data: {},
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {},
    request: {}
}
// `data` is the response that was provided by the server
// `status` is the HTTP status code from the server response
// `statusText` is the HTTP status message from the server response

// `headers` the headers that the server responded with
// All header names are lower cased

// `config` is the config that was provided to `axios` for the request

// `request` is the request that generated this response
// It is the last ClientRequest instance in node.js (in redirects)
// and an XMLHttpRequest instance the browser

axios.get('/user/12345')
  .then(function (res) {
    //res.data
    //res.data
    //res.status
    //res.statusText
    //res.headers
    //res.config
    //res.request
}
```

### 11. Global axios defaults

```javascript
axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';
```

### 12. Custom instance defaults

```javascript
// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: 'https://api.example.com',
});

// Alter defaults after instance has been created
instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
```

### 13. Config order of precedence[配置优先顺序]

```javascript
// Create an instance using the config defaults provided by the library
// At this point the timeout config value is `0` as is the default for the library
const instance = axios.create();

// Override timeout default for the library
// Now all requests using this instance will wait 2.5 seconds before timing out
instance.defaults.timeout = 2500;

// Override timeout for this request as it's known to take a long time
instance.get('/longRequest', {
  timeout: 5000,
});
```

### 14. Interceptors[拦截器]

```javascript
// intercept requests or responses before they are handled by then or catch

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (err) {
    // Do something with request error
    return Promise.reject(err);
  },
);

// Add a response interceptor
axios.interceptors.response.use(
  function (res) {
    // Do something with response data
    return res;
  },
  function (err) {
    // Do something with response error
    return Promise.reject(err);
  },
);

// If you may need to remove an interceptor later you can.
const myInterceptor = axios.interceptors.request.use(function () {
  /*...*/
});
axios.interceptors.request.eject(myInterceptor);

// You can add interceptors to a custom instance of axios.
const instance = axios.create();
instance.interceptors.request.use(function () {
  /*...*/
});
```

### 15. Handling Errors

```javascript
axios.get('/api/err').catch((err) => {
  if (err.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(err.response.data);
    console.log(err.response.status);
    console.log(err.response.headers);
  } else if (err.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an 					instance of
    // http.ClientRequest in node.js
    console.log(err.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', err.message);
  }
  console.log(err.config);
});

// You can define a custom HTTP status code error range using the validateStatus config option.
axios.get('/api/err', {
  validateStatus: function (status) {
    // Reject only if the status code is greater than or equal to 500
    return status < 500;
  },
});
```

### 16. Cancellation[清除请求]

```javascript
// You can cancel a request using a cancel token.

// You can create a cancel token using the CancelToken.source factory as shown below:
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
axios
  .get('/api/get', {
    cancelToken: source.token,
  })
  .catch(function (thrown) {
    if (axios.isCancel(thrown)) {
      console.log('Request canceled', thrown.message);
    } else {
      //handel error
    }
  });
axios.post(
  '/api/post',
  {
    name: 'name',
  },
  {
    cancelToken: source.token,
  },
);
// cancel the request (the message parameter is optional)
source.cancel('Operation canceled by the user.');

// You can also create a cancel token by passing an executor function to the CancelToken constructor:
const CancelToken = axios.CancelToken;
let cancel;
axios.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    // An executor function receives a cancel function as a parameter
    cancel = c;
  }),
});
// cancel the request
cancel();

// you can cancel several requests with the same cancel token.
```

### 17. Using application/x-www-form-urlencoded format

```javascript
// By default, axios serializes JavaScript objects to JSON. To send data in the application/x-www-form-urlencoded format instead, you can use one of the following options.

// Browser
// In a browser, you can use the URLSearchParams API as follows:
const params = new URLSearchParams();
params.append('param1', 'value1');
params.append('param2', 'value2');
axios.post('/foo', params);
// Alternatively, you can encode data using the qs library:
const qs = require('qs');
axios.post('/foo', qs.stringify({ bar: 123 }));
// Or in another way (ES6):
import qs from 'qs';
const data = { bar: 123 };
const options = {
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  data: qs.stringify(data),
  url,
};
axios(options);

// Nodejs
// In node.js, you can use the querystring module as follows:
const querystring = require('querystring');
axios.post('http://something.com/', querystring.stringify({ foo: 'bar' }));
// You can also use the qs library
```

### 18. vue-axios

#### 18.1 CommonJS:

```javascript
 npm install --save axios vue-axios
```

#### 18.2 And in your entry file:

```javascript
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);
```

#### 18.3 Script:

```javascript
 Just add 3 scripts in order: `vue`, `axios` and `vue-axios` to your `document`.
```

#### 18.4 Usage:

```javascript
// This wrapper bind axios to Vue or this if you’re using single file component.

// You can axios like this:
Vue.axios.get(api).then((response) => {
  console.log(response.data);
});

this.axios.get(api).then((response) => {
  console.log(response.data);
});

this.$http.get(api).then((response) => {
  console.log(response.data);
});
```

### 19. react-axios
