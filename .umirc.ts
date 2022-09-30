import { defineConfig } from 'dumi';

const isProd = process.env.NODE_ENV === 'production';

// more config: https://d.umijs.org/config
export default defineConfig({
  title: 'Okay',
  mode: 'site',
  logo: isProd
    ? 'https://github.com/linshangchun/app/blob/gh-pages/okay-logo.jpeg'
    : '/okay-logo.jpeg',
  exportStatic: {},
  base: isProd ? '/app/' : '/',
  publicPath: isProd ? '/app/' : '/',
  navs: [
    // 配置【顶部导航栏】顺序、菜单名、子项
    { title: '工具', path: '/tool' },
    { title: '笔记', path: '/note' },
  ],
  menus: {
    // 配置【左侧菜单】顺序、菜单名、子项
    '/tool': [{ title: '栏目简介', path: '/tool' }],
    '/note': [{ title: '栏目简介', path: '/note' }],
  },
});
