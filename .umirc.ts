import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'Site Name',
  mode: 'site',
  // more config: https://d.umijs.org/config
  exportStatic: { htmlSuffix: true },
  base: process.env.NODE_ENV === 'production' ? '/app/' : '/',
  publicPath: process.env.NODE_ENV === 'production' ? '/app/' : '/',
});
