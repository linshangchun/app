```jsx
/**
 * inline: true
 */

import React, { useEffect } from 'react';
import { PageHeader } from '@lshch/app';
export default () => {
  return (
    <PageHeader
      title="文本转二维码"
      subTitle="组件来源："
      subAction={{
        text: 'https://zpao.github.io/qrcode.react/',
        href: 'https://zpao.github.io/qrcode.react/',
      }}
      noScan
    />
  );
};
```

```jsx
import React from 'react';
import { PageToolQRCode } from '@lshch/app';
export default () => <PageToolQRCode />;
```
