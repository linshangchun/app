const root = '/getting-started';
const localRoute = (route) => `${root}${route}`;

export default [
  { title: '栏目介绍', path: root },
  {
    title: 'start',
    children: [
      {
        title: '目标',
        path: localRoute('/start'),
      },
      {
        title: '第 1 步 - 创建文件',
        path: localRoute('/start/step-1'),
      },
      {
        title: '第 2 步 - 编码',
        path: localRoute('/start/step-2'),
      },
      {
        title: '第 3 步 - 导出',
        path: localRoute('/start/step-3'),
      },
      {
        title: '第 3.5 步 - 测试',
        path: localRoute('/start/step-3-5'),
      },
      {
        title: '第 4 步 - 发布',
        path: localRoute('/start/step-4'),
      },
      {
        title: '第 5 步 - 成品',
        path: localRoute('/start/step-5'),
      },
      {
        title: '本地测试',
        path: localRoute('/start/x-index-test'),
      },
    ],
  },
  {
    title: 'dev',
    children: [
      {
        title: '目标',
        path: localRoute('/dev'),
      },
      {
        title: '第 1 步 - 创建文件',
        path: localRoute('/dev/step-1'),
      },
      {
        title: '第 2 步 - 编码',
        path: localRoute('/dev/step-2'),
      },
      {
        title: '第 3 步 - 导出',
        path: localRoute('/dev/step-3'),
      },
      {
        title: '第 4 步 - 发布',
        path: localRoute('/dev/step-4'),
      },
      {
        title: '第 5 步 - 成品',
        path: localRoute('/dev/step-5'),
      },
      {
        title: '本地测试',
        path: localRoute('/dev/step-test'),
      },
    ],
  },
];
