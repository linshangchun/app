```jsx
/**
 * inline: true
 */

import React, { useEffect } from 'react';
import { PageHeader } from '@lshch/app';
export default () => {
  return (
    <PageHeader
      title="cli-item"
      subTitle="查看源码："
      subAction={{
        text: 'https://github.com/linshangchun/cli-item',
        href: 'https://github.com/linshangchun/cli-item',
      }}
      noScan
    />
  );
};
```

## Description

cli: 本地项目(文件)管理工具

## Use

```
安装：
    >npm install -g cli-item

测试：
    >it
or  >it -h
添加项目:
    >cd your-folder && it add <alisa>
    >it <alisa>
查看项目:
    >it view <alisa>
编辑项目:
    >it set <alisa> [-n,-a,-d,-t]
or  >it edit data
删除项目:
    >it del <alisa>

默认说明：
1、打开项目[it alisa]或编辑所有项目[it edit data]时，默认使用vscode编辑器,也可设置idea或其他编辑器：it conf -e [idea|webstore|other-edit-cmd]
2、系统文件管理器打开项目[it open alisa]时，默认执行[open alisa-path]命令,如果是Windows或想使用其他方式打开项目可设置：it conf -o [start|other-open-way]

```

## Learn more

[cli-item repo](https://github.com/linshangchun/robot-dd)
<br />
[cli-item npm](https://www.npmjs.com/package/robot-dd)
