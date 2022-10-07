```jsx
/**
 * inline: true
 */

import React, { useEffect } from 'react';
import { PageHeader } from '@lshch/app';
export default () => {
  return (
    <PageHeader
      title="这里是开发测试，效果预览页面"
      subTitle={'查看源码：'}
      subAction={{
        text: REPOPAGE,
        href: REPOPAGE,
      }}
    />
  );
};
```

```jsx
// /**
//  * inline: true
//  */

import React, { useEffect } from 'react';
import { Button, Divider } from 'antd';
import { UpCircleOutlined } from '@ant-design/icons';
import { ToolItem, QRCodeByText, utils, hooks } from '@lshch/app';

export default () => {
  const { math, log } = utils;
  const { userHook } = hooks;
  const c = math.add(1, 5);
  const [name, age, setAge] = userHook.useInfo({ name: 'cat', age: 8 });
  useEffect(() => {
    log.info(c);
  }, []);
  return (
    <div>
      <ToolItem title="name" description={name} />
      <ToolItem title="age" description={age} />
      <Button type="primary" onClick={() => setAge(age + 1)}>
        {' '}
        age++{' '}
      </Button>
      &nbsp;&nbsp;
      <Button onClick={() => setAge(age - 1)}> age-- </Button>
      <Divider />
      <QRCodeByText />
      <Divider />
    </div>
  );
};
```
