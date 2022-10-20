import devMenu, { nav as devNav } from './dev';
import toolMenu, { nav as toolNav } from './tool';
import noteMenu, { nav as noteNav } from './note';
import essayMenu, { nav as essayNav } from './essay';

const isProd = process.env.NODE_ENV === 'production';

// 配置【顶部导航栏】顺序、栏目名、子栏目
export const navs = [!isProd ? devNav : [], toolNav, noteNav, essayNav];

// 配置【左侧菜单】顺序、菜单名、子菜单
export const menus = {
  [devNav.path]: devMenu,
  [toolNav.path]: toolMenu,
  [noteNav.path]: noteMenu,
  [essayNav.path]: essayMenu,
};
