import { useRoute } from './common';

export const path = '/example';
export const gainPath = useRoute(path);
export default [
  { title: '栏目介绍', path: gainPath() },
  {
    title: 'start',
    children: [
      {
        title: '目标',
        path: gainPath('/start'),
      },
      {
        title: '第 1 步 - 创建文件',
        path: gainPath('/start/step-1'),
      },
      {
        title: '第 2 步 - 编码',
        path: gainPath('/start/step-2'),
      },
      {
        title: '第 3 步 - 导出',
        path: gainPath('/start/step-3'),
      },
      {
        title: '第 3.5 步 - 测试',
        path: gainPath('/start/step-3-5'),
      },
      {
        title: '第 4 步 - 发布',
        path: gainPath('/start/step-4'),
      },
      {
        title: '第 5 步 - 成品',
        path: gainPath('/start/step-5'),
      },
      {
        title: '本地测试',
        path: gainPath('/start/x-index-test'),
      },
    ],
  },
  {
    title: 'dev',
    children: [
      {
        title: '目标',
        path: gainPath('/dev'),
      },
      {
        title: '第 1 步 - 创建文件',
        path: gainPath('/dev/step-1'),
      },
      {
        title: '第 2 步 - 编码',
        path: gainPath('/dev/step-2'),
      },
      {
        title: '第 3 步 - 导出',
        path: gainPath('/dev/step-3'),
      },
      {
        title: '第 4 步 - 发布',
        path: gainPath('/dev/step-4'),
      },
      {
        title: '第 5 步 - 成品',
        path: gainPath('/dev/step-5'),
      },
      {
        title: '本地测试',
        path: gainPath('/dev/step-test'),
      },
    ],
  },
];
