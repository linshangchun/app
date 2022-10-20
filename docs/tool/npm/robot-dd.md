```jsx
/**
 * inline: true
 */

import React, { useEffect } from 'react';
import { PageHeader } from '@lshch/app';
export default () => {
  return (
    <PageHeader
      title="robot-dd"
      subTitle="查看源码："
      subAction={{
        text: 'https://github.com/linshangchun/robot-dd',
        href: 'https://github.com/linshangchun/robot-dd',
      }}
      noScan
    />
  );
};
```

## Description

robot-dd: 钉钉群自定义机器人消息接口全封装

## Features

- 作用全接口，统一入参
- 引用单一，使用方便

## Use

```
# npm install robot-dd

const Robot_DD = require("robot-dd");
const robotDD = new Robot_DD({
    access_token: xxxxxx,
    secret: xxxxxx
});
const res = await robotDD.sendText({
    text: `time: ${Date.now()}\n 测试钉钉机器人消息发送`,
});
if(res.errcode === 0){
    // todo: Success
}else{
    //todo: Error
}
```

## Learn more

[robot-dd 使用示例文档](https://github.com/linshangchun/robot-dd/blob/master/example.md)
<br />
[钉钉群自定义机器人官方文档](https://open.dingtalk.com/document/group/custom-robot-access)
<br />
[robot-dd repo](https://github.com/linshangchun/robot-dd)
<br />
[robot-dd npm](https://www.npmjs.com/package/robot-dd)
