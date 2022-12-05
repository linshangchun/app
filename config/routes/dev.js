import { useRoute } from './common';

export const title = '开发测试';
export const path = '/dev';
export const nav = {
  title,
  path,
};

export const gainPath = useRoute(path);
export default [{ title: '开发测试', path: gainPath() }];
