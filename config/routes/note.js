import { useRoute } from './common';

export const title = '笔记';
export const path = '/note';
export const nav = {
  title,
  path,
};

export const gainPath = useRoute(path);
export default [
  { title: '栏目介绍', path: gainPath() },
  {
    title: 'ES6',
    path: gainPath('/es6/class'),
    children: [{ title: 'Class', path: gainPath('/es6/class') }],
  },
  { title: 'Axios', path: gainPath('/axios/base') },
  { title: 'Koa', path: gainPath('/koa/base') },
  {
    title: 'Eggjs',
    path: gainPath('/eggjs/koa'),
    children: [
      { title: 'koa回顾', path: gainPath('/eggjs/koa') },
      { title: 'egg初始化', path: gainPath('/eggjs/egg-init') },
      { title: '启动自定义', path: gainPath('/eggjs/custom') },
      { title: '运行环境配置', path: gainPath('/eggjs/env') },
      { title: '内置基础对象', path: gainPath('/eggjs/built-in-objects') },
      { title: '框架扩展', path: gainPath('/eggjs/extend') },
      {
        title: 'Cookie与Session',
        path: gainPath('/eggjs/cookie-and-session'),
      },
      { title: '模板渲染', path: gainPath('/eggjs/view') },
      { title: '数据请求', path: gainPath('/eggjs/http-client') },
    ],
  },
  {
    title: 'Linux',
    path: gainPath('/linux/base'),
    children: [
      { title: '基础知识', path: gainPath('/linux/base') },
      { title: 'Nginx', path: gainPath('/linux/nginx') },
      // { title: 'Software', path: '/skill/linux/software' },
    ],
  },
];
