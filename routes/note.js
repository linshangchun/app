const root = '/note';
const localRoute = (route) => `${root}${route}`;

export default [
  { title: '栏目介绍', path: root },
  {
    title: 'ES6',
    path: localRoute('/es6/class'),
    children: [{ title: 'Class', path: localRoute('/es6/class') }],
  },
  { title: 'Axios', path: localRoute('/axios/base') },
  { title: 'Koa', path: localRoute('/koa/base') },
  {
    title: 'Eggjs',
    path: localRoute('/eggjs/koa'),
    children: [
      { title: 'koa回顾', path: localRoute('/eggjs/koa') },
      { title: 'egg初始化', path: localRoute('/eggjs/egg-init') },
      { title: '启动自定义', path: localRoute('/eggjs/custom') },
      { title: '运行环境配置', path: localRoute('/eggjs/env') },
      { title: '内置基础对象', path: localRoute('/eggjs/built-in-objects') },
      { title: '框架扩展', path: localRoute('/eggjs/extend') },
      {
        title: 'Cookie与Session',
        path: localRoute('/eggjs/cookie-and-session'),
      },
      { title: '模板渲染', path: localRoute('/eggjs/view') },
      { title: '数据请求', path: localRoute('/eggjs/http-client') },
    ],
  },
  {
    title: 'Linux',
    path: localRoute('/linux/base'),
    children: [
      { title: '基础知识', path: localRoute('/linux/base') },
      { title: 'Nginx', path: localRoute('/linux/nginx') },
      // { title: 'Software', path: '/skill/linux/software' },
    ],
  },
];
