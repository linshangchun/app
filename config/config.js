import { defineConfig } from 'dumi';
import { navs, menus } from './routes';
import pkg from '../package.json';

const isProd = process.env.NODE_ENV === 'production';
const LOGO = 'https://linshangchun.github.io/app/okay-logo.jpeg';

// more config: https://d.umijs.org/config
export default defineConfig({
  title: 'ShangChun Lin',
  mode: 'site',
  logo: isProd ? LOGO : '/okay-logo.jpeg',
  locales: [['zh-CN', '中文']],
  exportStatic: {},
  base: isProd ? '/app/' : '/',
  publicPath: isProd ? '/app/' : '/',
  navs,
  menus,
  alias: {
    '@app': '@lshch/app/src',
  },
  define: {
    LOGO,
    HOMEPAGE: pkg.homepage,
    REPOPAGE: pkg.repopage,
  },
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
});
