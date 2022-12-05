import { useRoute } from './common';

export const title = '八股文';
export const path = '/essay';
export const nav = {
  title,
  path,
};

export const gainPath = useRoute(path);
export default [{ title: '栏目简介', path: gainPath() }];
