```jsx
/**
 * inline: true
 */

import React, { useEffect } from 'react';
import { PageHeader } from '@lshch/app';
export default () => {
  return (
    <PageHeader
      title="学习笔记"
      subTitle={'查看源码：'}
      subAction={{
        text: REPOPAGE,
        href: REPOPAGE,
      }}
    />
  );
};
```
