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
      { title: '文本转二维码', path: gainPath('/online/qrcode') },
      { title: '工具导航', path: gainPath('/online/more') },
    ],
  },
  {
    title: 'npm',
    // path: gainPath('/npm'),
    children: [
      { title: 'yourl', path: gainPath('/npm/yourl') },
      { title: 'cli-item', path: gainPath('/npm/cli-item') },
      { title: 'robot-dd', path: gainPath('/npm/robot-dd') },
      { title: '常用|推荐', path: gainPath('/npm/more') },
    ],
  },
  {
    title: 'utils',
    // path: gainPath('/utils'),
    children: [{ title: 'log', path: gainPath('/utils/log') }],
  },
  {
    title: 'hooks',
    // path: gainPath('/hooks'),
    children: [{ title: 'browser', path: gainPath('/hooks/browser') }],
  },
];
