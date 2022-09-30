import { defineConfig } from 'dumi';
import { navs, menus } from './routes';

const isProd = process.env.NODE_ENV === 'production';

// more config: https://d.umijs.org/config
export default defineConfig({
  title: 'ShangChun Lin',
  mode: 'site',
  logo: isProd
    ? 'https://linshangchun.github.io/app/okay-logo.jpeg'
    : '/okay-logo.jpeg',
  exportStatic: {},
  base: isProd ? '/app/' : '/',
  publicPath: isProd ? '/app/' : '/',
  navs,
  menus,
});
