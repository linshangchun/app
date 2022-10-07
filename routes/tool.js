import { useRoute } from './common';

export const title = '工具';
export const path = '/tool';
export const nav = {
  title,
  path,
};

export const gainPath = useRoute(path);
export default [
  { title: '栏目介绍', path: gainPath() },
  {
    title: '在线工具',
    children: [
      { title: '文本转二维码', path: gainPath('/qrcode') },
      { title: '更多工具', path: gainPath('/other-util') },
    ],
  },
  {
    title: 'npm',
    children: [
      { title: 'yourl', path: gainPath('/yourl') },
      { title: 'cli-item', path: gainPath('/cli-item') },
      { title: 'robot-dd', path: gainPath('/robot-dd') },
      { title: 'more npm', path: gainPath('/npms') },
    ],
  },
  {
    title: 'utils',
    path: gainPath('/utils'),
    children: [{ title: 'log', path: gainPath('/utils/log') }],
  },
  {
    title: 'hooks',
    path: gainPath('/hooks'),
    children: [{ title: 'browser', path: gainPath('/hooks/browser') }],
  },
];
