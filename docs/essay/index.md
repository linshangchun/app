```jsx
/**
 * inline: true
 */

import React, { useEffect } from 'react';
import { PageHeader } from '@lshch/app';
export default () => {
  return (
    <PageHeader
      title="这里是八股文选集"
      subTitle={'查看源码：'}
      subAction={{
        text: REPOPAGE,
        href: REPOPAGE,
      }}
    >
      资料收集整理中
    </PageHeader>
  );
};
```
