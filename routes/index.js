import tool from './tool';
import note from './note';

// 配置【顶部导航栏】顺序、菜单名、子项
export const navs = [
  { title: '工具', path: '/tool' },
  { title: '笔记', path: '/note' },
];

// 配置【左侧菜单】顺序、菜单名、子项
export const menus = {
  '/tool': tool,
  '/note': note,
};
