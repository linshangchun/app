import React from 'react';
import { Descriptions } from 'antd';

import './index.less';

export default (props) => {
  const { noHeader, dataSource = {}, columns, ...restProps } = props;
  const throwErrTextLocal = (k, i) => {
    throw new ReferenceError(
      `the ${k} of columns[${i}] in object is not found!`,
    );
  };
  const throwTypeErrTextLocal = (k, t) => {
    throw new ReferenceError(`the ${k} of dataSource in object is not a ${t}!`);
  };
  const ItemsRender = columns?.map((item, index) => {
    if (!item.key) throwErrTextLocal('key', index);
    if (!item.title) throwErrTextLocal('title', index);
    if (item?.render && typeof item.render !== 'function')
      throwTypeErrTextLocal('render', 'function');

    return (
      <Descriptions.Item key={item.key} label={item.title} {...item.itemProps}>
        {item?.render && typeof item.render === 'function'
          ? item.render(dataSource[item?.key], dataSource)
          : dataSource[item?.key] || '--'}
      </Descriptions.Item>
    );
  });

  return (
    <div
      className={`app-descriptions-container ${
        noHeader ? 'app-descriptions-container-noheader' : ''
      }`}
    >
      <Descriptions title="HxDescriptions" {...restProps}>
        {ItemsRender}
      </Descriptions>
    </div>
  );
};
